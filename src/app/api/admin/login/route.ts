import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { adminConfigurationReady,verifyPassword,createSessionToken,getSessionCookieOptions } from '@/lib/admin-auth'
export const runtime='nodejs'
export const dynamic='force-dynamic'
const attempts=new Map<string,{count:number;reset:number}>()
const schema=z.object({password:z.string().min(1).max(1024)})
export async function POST(req:NextRequest){const headers={'Cache-Control':'no-store'};const origin=req.headers.get('origin');const host=req.headers.get('host');if(origin){try{if(new URL(origin).host!==host)return NextResponse.json({ok:false,error:'Ungültige Anfrage.'},{status:403,headers})}catch{return NextResponse.json({ok:false,error:'Ungültige Anfrage.'},{status:403,headers})}}
 if(!adminConfigurationReady())return NextResponse.json({ok:false,error:'Die Admin-Anmeldung ist serverseitig noch nicht eingerichtet. ADMIN_PASSWORD und ADMIN_SESSION_SECRET müssen in der Umgebung dieses Deployments gesetzt sein.'},{status:503,headers})
 const now=Date.now();for(const [key,value]of attempts)if(value.reset<=now)attempts.delete(key)
 const ip=req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()||'unknown';let rec=attempts.get(ip);if(rec&&rec.count>=5)return NextResponse.json({ok:false,error:'Zu viele Anmeldeversuche. Bitte in 15 Minuten erneut versuchen.'},{status:429,headers:{...headers,'Retry-After':String(Math.ceil((rec.reset-now)/1000))}})
 const parsed=schema.safeParse(await req.json().catch(()=>null));if(!parsed.success)return NextResponse.json({ok:false,error:'Bitte Passwort eingeben.'},{status:400,headers});if(!rec){rec={count:0,reset:now+15*60*1000};attempts.set(ip,rec)}rec.count++
 if(!verifyPassword(parsed.data.password))return NextResponse.json({ok:false,error:'Das Passwort stimmt nicht mit dem für dieses Deployment hinterlegten Admin-Passwort überein.'},{status:401,headers})
 try{const opts=getSessionCookieOptions();const res=NextResponse.json({ok:true},{headers});res.cookies.set(opts.name,createSessionToken(),opts);attempts.delete(ip);return res}catch{return NextResponse.json({ok:false,error:'Die Sitzung konnte nicht erstellt werden. Bitte die Serverkonfiguration prüfen.'},{status:503,headers})}
}
