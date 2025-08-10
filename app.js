/* Shared app shell: nav, auth gate, toasts, keyboard save */
import { getStore, setStore, ensureNS, onReady } from './storage.js';

export const NS = 'adman';
ensureNS(NS);

export function toast(msg, type='info'){
  let t = document.querySelector('.toast');
  if(!t){
    t = document.createElement('div');
    t.className = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('show');
  if(type==='error'){ t.style.borderColor = '#ef4444'; }
  setTimeout(()=>{t.classList.remove('show'); t.style.borderColor = '#334155';},1500);
}

export function authGate(){
  const user = getStore(`${NS}.user`);
  if(!user){ window.location.href = 'login.html'; }
}

export function seedDefaults(){
  // Seed design presets, fonts, and an empty users list (no default user!)
  if(!getStore(`${NS}.seeded`)){
    if(!getStore(`${NS}.palettes`)){
      setStore(`${NS}.palettes`, {
        modern:{bg:'#0f172a',brand:'#3b82f6',accent:'#e5e7eb'},
        warm:{bg:'#2b2a2a',brand:'#f59e0b',accent:'#f3f4f6'},
        minimal:{bg:'#111827',brand:'#10b981',accent:'#f9fafb'}
      });
    }
    if(!getStore(`${NS}.fonts`)){
      setStore(`${NS}.fonts`, { a:'Inter', b:'Lora', c:'Montserrat' });
    }
    if(!getStore(`${NS}.users`)){
      setStore(`${NS}.users`, []); // will hold {email, password}
    }
    setStore(`${NS}.seeded`, true);
  }
}

export function wireSidebarActive(){
  const here = location.pathname.split('/').pop();
  document.querySelectorAll('.nav a').forEach(a=>{
    if(a.getAttribute('href')===here){ a.classList.add('active'); }
  });
}

export function initTopbar(){
  const email = (getStore(`${NS}.user`)||{}).email || 'Guest';
  const el = document.querySelector('#userEmail');
  if(el) el.textContent = email;
  const logoutBtn = document.querySelector('#logoutBtn');
  if(logoutBtn){
    logoutBtn.addEventListener('click',()=>{
      localStorage.removeItem(`${NS}.user`);
      toast('Signed out');
      setTimeout(()=>location.href='login.html',400);
    })
  }
}

export function enableCtrlS(onSave){
  window.addEventListener('keydown', (e)=>{
    if((e.ctrlKey||e.metaKey) && e.key.toLowerCase()==='s'){
      e.preventDefault(); onSave?.(); toast('Saved');
    }
  });
}

onReady(()=>{ seedDefaults(); });
