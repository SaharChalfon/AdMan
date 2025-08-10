export function onReady(fn){ document.addEventListener('DOMContentLoaded', fn); }
export function ensureNS(ns){ /* noop for LocalStorage */ }
export function getStore(key, fallback=null){
  try{ const v = localStorage.getItem(key); return v? JSON.parse(v): fallback; }catch{ return fallback; }
}
export function setStore(key, val){ localStorage.setItem(key, JSON.stringify(val)); }
export function uid(prefix='id'){ return `${prefix}_${Math.random().toString(36).slice(2,8)}` }
export function nowISO(){ return new Date().toISOString(); }