const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');
const ts = require('typescript');

function setup({ consent = true, environment = 'production', browser = true } = {}) {
  const calls = [];
  let stored = JSON.stringify({
    state: { necessary: true, statistics: consent, marketing: false },
    timestamp: Date.now(), version: 1,
  });
  const window = browser ? {
    localStorage: { getItem: () => stored },
    gtag: (...args) => calls.push(args),
  } : undefined;
  const cache = new Map();
  function load(filename) {
    if (cache.has(filename)) return cache.get(filename).exports;
    const module = { exports: {} };
    cache.set(filename, module);
    const compiled = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
    });
    const requireLocal = (relative) => load(path.resolve(path.dirname(filename), relative + '.ts'));
    new Function('module', 'exports', 'require', 'process', 'window', compiled.outputText)(
      module, module.exports, requireLocal, { env: { NODE_ENV: environment } }, window,
    );
    return module.exports;
  }
  return {
    track: load(path.resolve('src/lib/lead-analytics.ts')).trackConfirmedLead,
    calls, window, setStored: (value) => { stored = value; },
  };
}

const accepted = { ok: true, refNumber: '261124-A10F' };

test('confirmed enquiries emit only a form category, without customer data', () => {
  for (const form of ['contact-form', 'project-application-form', 'booking-form']) {
    const h = setup();
    h.track(form, { ...accepted, email: 'private@example.invalid', message: 'Private message' });
    assert.deepEqual(h.calls, [['event', 'generate_lead', { form_id: form, lead_source: form }]]);
  }
});

test('HTTP-200 spam acknowledgements and incomplete/error responses do not count', () => {
  const h = setup();
  for (const response of [
    { ok: true, refNumber: 'BOT-FILTERED' },
    { ok: true, refNumber: 'SPEED-FILTERED' },
    { ok: false, refNumber: accepted.refNumber },
    { ok: true }, { refNumber: accepted.refNumber }, null, {}, 'invalid',
  ]) h.track('contact-form', response);
  assert.equal(h.calls.length, 0);
});

test('one accepted response is counted once; another accepted enquiry can count', () => {
  const h = setup();
  h.track('contact-form', accepted);
  h.track('contact-form', accepted);
  h.track('contact-form', { ok: true, refNumber: '261124-A110' });
  assert.equal(h.calls.length, 2);
});

test('statistics refusal, missing consent and withdrawn consent suppress events', () => {
  const refused = setup({ consent: false });
  refused.track('contact-form', accepted);
  assert.equal(refused.calls.length, 0);
  const h = setup();
  h.setStored(null);
  h.track('contact-form', accepted);
  assert.equal(h.calls.length, 0);
  h.setStored(JSON.stringify({
    state: { necessary: true, statistics: true, marketing: false },
    timestamp: Date.now(), version: 1,
  }));
  h.track('contact-form', accepted);
  h.setStored(JSON.stringify({
    state: { necessary: true, statistics: false, marketing: false },
    timestamp: Date.now(), version: 1,
  }));
  h.track('contact-form', { ok: true, refNumber: '261124-A110' });
  assert.equal(h.calls.length, 1);
});

test('expired or unreadable consent suppresses events', () => {
  const h = setup();
  h.setStored(JSON.stringify({
    state: { necessary: true, statistics: true, marketing: false },
    timestamp: 0, version: 1,
  }));
  h.track('contact-form', accepted);
  h.setStored('not-json');
  h.track('contact-form', accepted);
  h.window.localStorage.getItem = () => { throw new Error('Storage blocked'); };
  h.track('contact-form', accepted);
  assert.equal(h.calls.length, 0);
});

test('analytics blocking does not turn a saved enquiry into a form error', () => {
  const h = setup();
  h.window.gtag = undefined;
  assert.doesNotThrow(() => h.track('contact-form', accepted));
  h.window.gtag = () => { throw new Error('Analytics blocked'); };
  assert.doesNotThrow(() => h.track('contact-form', accepted));
  assert.equal(h.calls.length, 0);
});

test('development and server rendering do not emit production analytics', () => {
  const dev = setup({ environment: 'development' });
  dev.track('contact-form', accepted);
  assert.equal(dev.calls.length, 0);
  assert.doesNotThrow(() => setup({ browser: false }).track('contact-form', accepted));
});
