const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');

const source = fs.readFileSync('src/lib/website-service.ts', 'utf8');
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  reportDiagnostics: true,
});
assert.equal((compiled.diagnostics || []).filter(d => d.category === ts.DiagnosticCategory.Error).length, 0);
const serviceModule = { exports: {} };
new Function('module', 'exports', compiled.outputText)(serviceModule, serviceModule.exports);
const { WEBSITE_SERVICES, WEBSITE_SERVICE_KEYS, getWebsiteService, websiteServiceRequestPath } = serviceModule.exports;
assert.deepEqual(WEBSITE_SERVICE_KEYS, ['soforthilfe', 'betreuung']);
for (const invalid of [null, undefined, '', '__proto__', 'constructor', '<script>', 'premium']) {
  assert.equal(getWebsiteService(invalid), undefined);
}
for (const key of WEBSITE_SERVICE_KEYS) {
  const service = getWebsiteService(key);
  assert.equal(service, WEBSITE_SERVICES[key]);
  assert.equal(service.price, 'ab 59 €');
  assert.ok(['relaunch', 'other'].includes(service.topic));
  const request = new URL(websiteServiceRequestPath(key), 'https://example.invalid');
  assert.equal(request.pathname, '/kontakt');
  assert.equal(request.searchParams.get('service'), key);
  assert.equal(request.searchParams.get('thema'), service.topic);
  assert.ok(fs.existsSync(path.join('src/app', service.path, 'page.tsx')));
  assert.ok(fs.readFileSync('src/app/sitemap.ts', 'utf8').includes(`'${service.path}'`));
  assert.ok(service.scope.length >= 3 && service.faq.length >= 4);
}
for (const filename of ['src/components/layout/header.tsx', 'src/components/layout/mobile-menu.tsx']) {
  assert.ok(fs.readFileSync(filename, 'utf8').includes("'/website-service'"));
}
const form = fs.readFileSync('src/components/sections/kontakt-form.tsx', 'utf8');
assert.ok(form.includes('message:messagePrefix+parsed.data.message'));
assert.ok(form.includes('maxMessageLength=4000-messagePrefix.length'));
assert.ok(form.includes('application?undefined:getWebsiteService'));
assert.ok(form.includes('!service&&'));
assert.ok(form.includes('formLoadTime:started.current'));
assert.ok(form.includes('leadSchema.safeParse'));
assert.ok(form.includes('key={selection}'));

async function httpChecks() {
  const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:3100';
  let ready = false;
  for (let attempt = 0; attempt < 45; attempt++) {
    try { ready = (await fetch(`${base}/website-service`)).ok; } catch {}
    if (ready) break;
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  assert.ok(ready, 'Test server did not become ready');
  for (const route of ['/website-service', '/website-soforthilfe', '/website-betreuung']) {
    const response = await fetch(base + route);
    assert.equal(response.status, 200, route);
    const html = await response.text();
    assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `One H1 on ${route}`);
    assert.ok(html.includes(`href="https://webdesign-alcor.at${route}"`), `Canonical for ${route}`);
    assert.ok(html.includes('59'), `Price on ${route}`);
    assert.ok(html.includes('/kontakt?thema=') || route === '/website-service', `Inquiry link on ${route}`);
  }
  const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
  for (const service of Object.values(WEBSITE_SERVICES)) assert.ok(sitemap.includes(service.path));
  for (const route of ['/', '/preise', '/bewerbung', '/kontakt?thema=relaunch&service=soforthilfe', '/kontakt?thema=other&service=betreuung', '/kontakt?service=__proto__']) {
    const response = await fetch(base + route);
    assert.equal(response.status, 200, route);
  }
}
(async () => {
  if (process.argv.includes('--http')) await httpChecks();
  console.log(JSON.stringify({ serviceData: 'PASS', invalidServiceKeys: 'PASS', requestLinks: 'PASS', routesAndNavigation: 'PASS', existingFormProtections: 'SOURCE CHECK PASS', http: process.argv.includes('--http') ? 'PASS' : 'NOT RUN', liveMail: 'NOT SENT', liveAdmin: 'NOT TESTED', browserInteraction: 'NOT TESTED' }, null, 2));
})().catch(error => { console.error(error); process.exitCode = 1; });
