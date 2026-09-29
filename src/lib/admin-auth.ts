import { cookies } from 'next/headers'
import { createHash, createHmac, timingSafeEqual } from 'node:crypto'
const COOKIE_NAME='admin_session'
const DURATION=30*24*60*60*1000
export const ADMIN_COOKIE_NAME=COOKIE_NAME
export function adminConfigurationReady():boolean{return !!process.env.ADMIN_PASSWORD&&process.env.ADMIN_PASSWORD.length>=8&&!!process.env.ADMIN_SESSION_SECRET&&process.env.ADMIN_SESSION_SECRET.length>=32}
function secret():string{const s=process.env.ADMIN_SESSION_SECRET;if(!s||s.length<32)throw new Error('Admin authentication is not configured');return s}
export function verifyPassword(input:string):boolean {const expected=process.env.ADMIN_PASSWORD;if(!expected||expected.length<8||typeof input!=='string'||input.length>1024)return false;const digest=(v:string)=>createHash('sha256').update(v,'utf8').digest();return timingSafeEqual(digest(input),digest(expected))}
export function createSessionToken():string{const p=String(Date.now()+DURATION);return `${p}.${createHmac('sha256',secret()).update(p).digest('hex')}`}
export function verifySessionToken(token:string|undefined):boolean{if(!token||token.length>128)return false;const parts=token.split('.');if(parts.length!==2)return false;const [p,s]=parts;if(!p||!s||!/^\d{13}$/.test(p)||!/^\w{64}$/.test(s))return false;const expires=Number(p);if(!Number.isFinite(expires)||expires<=Date.now()||expires>Date.now()+DURATION+60000)return false;try{const expected=createHmac('sha256',secret()).update(p).digest('hex');return timingSafeEqual(Buffer.from(s),Buffer.from(expected))}catch{return false}}
export async function isAdminLoggedIn():Promise<boolean>{const c=await cookies();return verifySessionToken(c.get(COOKIE_NAME)?.value)}
export function getSessionCookieOptions(){return {name:COOKIE_NAME,httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'strict' as const,path:'/',maxAge:DURATION/1000}}
