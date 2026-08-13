const { chromium } = require('playwright');
const assert = require('node:assert/strict');

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  });
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' });

  assert.equal(await page.locator('#saveWorkoutBtn').textContent(), 'Završi trening');
  assert.ok(await page.locator('.duo-machine-card').count() > 0);
  await page.locator('.workout-chip[data-workout="B"]').click();
  assert.equal(await page.locator('.workout-chip.active').getAttribute('data-workout'), 'B');
  await page.locator('.workout-chip[data-workout="A"]').click();
  assert.equal(await page.locator('.workout-chip.active').getAttribute('data-workout'), 'A');
  await page.locator('.duo-machine-card').first().click();
  assert.equal(await page.locator('.duo-person h3').first().textContent(), 'Silvio');

  const silvio = page.locator('.duo-person.silvio');
  const firstWeight = silvio.locator('.duo-input[data-f="w"]').first();
  await firstWeight.fill('42.5');
  const sameInput = await firstWeight.evaluate(el => {
    window.__duoInput = el;
    el.value = '43';
    el.dispatchEvent(new Event('input', { bubbles: true }));
    return window.__duoInput === el;
  });
  assert.equal(sameInput, true, 'typing must not re-render the focus screen');
  await silvio.locator('.duo-input[data-f="w"]').last().fill('43');
  await silvio.locator('.duo-input[data-f="r"]').last().fill('12');
  const before = await silvio.locator('.focus-set').count();
  await silvio.locator('.add-set').click();
  assert.equal(await silvio.locator('.focus-set').count(), before + 1);
  assert.equal(await silvio.locator('.duo-input[data-f="w"]').last().inputValue(), '43');
  assert.equal(await silvio.locator('.duo-input[data-f="r"]').last().inputValue(), '12');
  assert.equal(await silvio.locator('.duo-done').last().isChecked(), false);
  await silvio.locator('.delete-set').last().click();
  assert.equal(await silvio.locator('.focus-set').count(), before);

  if (await page.locator('.add-evelin').count()) {
    await page.locator('.add-evelin').click();
    assert.equal(await page.locator('.duo-person.evelin .focus-set').count(), 1);
  }
  await page.locator('[data-close-focus]').last().click();
  await page.locator('#saveWorkoutBtn').click();
  assert.equal(await page.locator('.duo-summary').count(), 2);
  const sessions = await page.evaluate(() => JSON.parse(localStorage.getItem('evelinSilvioTraining.v1')).sessions);
  assert.deepEqual(sessions.slice(-2).map(s => s.person), ['silvio', 'evelin']);
  assert.equal(errors.length, 0, errors.join('\n'));
  await browser.close();
  console.log('Duo browser sanity checks passed.');
})().catch(error => { console.error(error); process.exit(1); });
