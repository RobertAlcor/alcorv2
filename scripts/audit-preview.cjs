// Lokale Prüfungen ohne echte Zugangsdaten oder externen Versand.
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const Module = require('node:module');
const ts = require('typescript');
const originalLoad = Module._load;
Module._load = function(request, ...rest) {
  if (request === 'server-only') return {}; // Next.js-Marker im isolierten Node-Test
  return originalLoad.call(this, request, ...rest);
};
const originalResolve = Module._resolveFilename;
Module._resolveFilename = function(request, parent, ...rest) {
  if (request.startsWith('@/')) request = path.join(process.cwd(), 'src', request.slice(2));
  return originalResolve.call(this, request, parent, ...rest);
};
for (const ext of ['.ts','.tsx']) {
  require.extensions[ext] = function(mod, filename) {
    const result = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
      compilerOptions: {module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true}
    });
    mod._compile(result.outputText, filename);
  };
}
(async()=>{
  const { PACKAGES, POSITIONING } = require('../src/lib/positioning.ts');
  assert.equal(PACKAGES[0].price,'599 €');
  assert(PACKAGES[0].excluded.includes('Kein Kontaktformular'));
  assert.equal(POSITIONING.portrait,null);
  const { BOOKING_CONFIG, generateSlotsForDate } = require('../src/lib/booking.ts');
  assert.equal(BOOKING_CONFIG.durationMinutes,15);
  let day = new Date();day.setDate(day.getDate()+3);day.setHours(0,0,0,0);
  while (![1,2,3,4,5].includes(day.getDay())) day.setDate(day.getDate()+1);
  const slots=generateSlotsForDate(day,[]);
  assert(slots.length>0);
  for (const slot of slots) assert.equal(new Date(slot.isoEnd)-new Date(slot.isoStart),15*60000);
  const auth = require('../src/lib/admin-auth.ts');
  delete process.env.ADMIN_PASSWORD;delete process.env.ADMIN_SESSION_SECRET;
  assert.equal(auth.adminConfigurationReady(),false);
  assert.equal(auth.verifyPassword('anything'),false);
  process.env.ADMIN_PASSWORD='Local-test-only-Example-127';
  process.env.ADMIN_SESSION_SECRET='local-test-secret-not-valid-for-deployment-127';
  assert.equal(auth.adminConfigurationReady(),true);
  assert.equal(auth.verifyPassword('wrong-password'),false);
  assert.equal(auth.verifyPassword('Local-test-only-Example-127'),true);
  assert.equal(auth.verifyPassword('ä'.repeat(26)),false);
  const session=auth.createSessionToken();assert(auth.verifySessionToken(session));
  assert.equal(auth.verifySessionToken(session+'.forged'),false);
  const { getAllPosts }=require('../src/lib/blog.ts');
  const { blogCover }=require('../src/lib/blog-cover.ts');
  const { editorialImage }=require('../src/lib/editorial-image.tsx');
  const posts=await getAllPosts(); assert(posts.length>0);
  const output=path.join(process.cwd(),'../validated-covers');fs.mkdirSync(output,{recursive:true});
  for (const post of posts) {
    assert.equal(blogCover(post),`/media/blog/${encodeURIComponent(post.slug)}`);
    const seed=[...post.slug].reduce((a,c)=>a+c.charCodeAt(0),0);
    const response=editorialImage(['design','strategy','technology'][seed%3],post.title,post.category);
    const image=Buffer.from(await response.arrayBuffer());
    assert.equal(image.slice(1,4).toString(),'PNG');
    fs.writeFileSync(path.join(output,post.slug+'.png'),image);
  }
  console.log(JSON.stringify({packages:'PASS',booking15Minutes:'PASS',authWithIsolatedTestCredentials:'PASS',blogCoverMapping:'PASS',renderedBlogPNGs:posts.length,liveMailTest:'NOT PERFORMED',liveAdminLogin:'NOT PERFORMED',deployment:'NOT PERFORMED'},null,2));
})().catch(error=>{console.error(error.message);process.exitCode=1});
