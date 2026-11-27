const fs = require('node:fs');
const assert = require('node:assert/strict');
const { stripTypeScriptTypes } = require('node:module');
const sourcePath = process.argv[2] || 'src/app/api/booking/route.ts';
let source = fs.readFileSync(sourcePath,'utf8').replace(/^import[\s\S]*?from '[^']+'\n/gm,'').replaceAll('export ','');
source = stripTypeScriptTypes(source) + '\nreturn POST;';
const stringField = new Proxy(()=>{}, {get:()=>()=>stringField,apply:()=>stringField});
const z = {string:()=>stringField,number:()=>stringField,enum:()=>stringField,literal:()=>stringField,object:()=>({safeParse:data=>({success:true,data})})};
const start = new Date('2026-12-01T09:00:00Z');
const end = new Date('2026-12-01T09:30:00Z');
async function run(options={}) {
 const queries=[]; let insertCount=0,mailCount=0,alternativesChecked=false;
 const supabaseAdmin={from(table){
   const n=queries.filter(q=>q.table===table).length;
   const q={table,n,conditions:[]}; queries.push(q);
   const chain={
     select(){return chain},
     lt(field,val){q.conditions.push(['lt',field,val]);return chain},
     gt(field,val){q.conditions.push(['gt',field,val]);return chain},
     gte(field,val){q.conditions.push(['gte',field,val]);return chain},
     lte(field,val){q.conditions.push(['lte',field,val]);return chain},
     not(){return chain}, limit(){return chain},
     async insert(){insertCount++;return {error:null}},
     then(resolve,reject){
       const isAlt=n>0;
       const error=(table===options.errorTable && !isAlt)||(options.altError && isAlt)?{code:'MOCK'}:null;
       let rows=table==='bookings'?(options.conflict?[{slot_start:start.toISOString(),slot_end:end.toISOString()}]:[]):(options.block?[{slot_start:start.toISOString(),slot_end:end.toISOString()}]:[]);
       if (isAlt) rows=table==='busy_slots'?[{slot_start:'2026-11-30T23:00:00Z',slot_end:'2026-12-01T10:00:00Z'}]:[];
       for (const [op,field,val] of q.conditions) rows=rows.filter(r=>op==='lt'?r[field]<val:op==='gt'?r[field]>val:op==='gte'?r[field]>=val:r[field]<=val);
       return Promise.resolve({data:error?null:rows,error}).then(resolve,reject);
     }
   };return chain;
 }};
 const findAlternativeSlots=async(preferred,fetchBusy)=>{
   const rows=await fetchBusy(new Date('2026-12-01T00:00:00Z'),new Date('2026-12-01T23:59:59.999Z'));
   alternativesChecked=true;
   assert(rows.some(r=>r.slot_start==='2026-11-30T23:00:00Z'),'overnight block omitted from alternatives');
   return [{isoStart:'2026-12-02T10:00:00Z'}];
 };
 const POST=Function('NextResponse','z','randomBytes','validateSlot','findAlternativeSlots','BOOKING_CONFIG','supabaseAdmin','sendBookingPendingToAdmin','generateRefNumber','checkRateLimit','getClientIp','isSuspiciousSpeed','getWorkingHours','console',source)(
 {json:(body,opts={})=>({body,status:opts.status||200})},z,()=>({toString:()=> 'mock-token'}),()=>({valid:true,start,end}),findAlternativeSlots,{durationMinutes:30},supabaseAdmin,async()=>{mailCount++},()=> 'TEST-ONLY',()=>({allowed:true}),()=> 'mock-ip',()=>false,async()=>({start:9,end:18}),{error:()=>{}});
 const result=await POST({headers:{},json:async()=>({name:'Mock',email:'mock@example.invalid',phone:'00000',topic:'webdesign',channel:'phone',slotStart:start.toISOString(),source:'isolated-test'})});
 return {result,queries,insertCount,mailCount,alternativesChecked};
}
(async()=>{
 for(const [name,options,status,inserts] of [
 ['free slot',{},200,1],
 ['manual busy block',{block:true},409,0],
 ['existing booking',{conflict:true},409,0],
 ['booking query error',{errorTable:'bookings'},503,0],
 ['block query error',{errorTable:'busy_slots'},503,0],
 ['alternative query error',{conflict:true,altError:true},503,0],
 ]){
  const r=await run(options);assert.equal(r.result.status,status,name);assert.equal(r.insertCount,inserts,name);assert.equal(r.mailCount,inserts,name);
  for(const q of r.queries.filter(q=>q.n===0)){assert(q.conditions.some(c=>c[0]==='lt'&&c[1]==='slot_start'),'half-open start check');assert(q.conditions.some(c=>c[0]==='gt'&&c[1]==='slot_end'),'half-open end check');}
  console.log('PASS',name,status,'inserts/mail mocks:',inserts);
 }
 console.log('6 isolated route scenarios passed; no network, real DB or email used.');
})().catch(e=>{console.error(e);process.exitCode=1});

