import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  page.on('requestfailed', request => console.log('REQUEST FAILED:', request.url(), request.failure().errorText));
  page.on('response', async res => {
    if (res.url().includes('/chat')) {
      console.log('CHAT RESPONSE STATUS:', res.status());
      try {
        console.log('CHAT RESPONSE BODY:', await res.text());
      } catch (e) {}
    }
  });

  try {
    await page.goto('http://localhost:5174', { waitUntil: 'networkidle0', timeout: 10000 });
    
    console.log('Clicking AI widget...');
    await page.waitForSelector('button[title="RemitBikas AI Assistant"]');
    await page.click('button[title="RemitBikas AI Assistant"]');
    
    console.log('Typing message...');
    await page.waitForSelector('input[placeholder="Ask a question..."]');
    await page.type('input[placeholder="Ask a question..."]', 'hello');
    
    console.log('Sending message...');
    await page.click('button[type="submit"]');
    
    await new Promise(r => setTimeout(r, 4000));
  } catch (e) {
    console.log('SCRIPT ERROR:', e);
  } finally {
    await browser.close();
  }
})();
