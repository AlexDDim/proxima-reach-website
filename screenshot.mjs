import puppeteer from 'puppeteer-core';
import { mkdirSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const url = process.argv[2] || 'http://localhost:3000';
const label = process.argv[3] || '';

const dir = join(__dirname, 'temporary screenshots');
mkdirSync(dir, { recursive: true });

const existing = readdirSync(dir).filter(f => f.startsWith('screenshot-')).length;
const num = existing + 1;
const filename = label ? `screenshot-${num}-${label}.png` : `screenshot-${num}.png`;
const filepath = join(dir, filename);

const bravePath  = 'C:/Users/alexd/AppData/Local/BraveSoftware/Brave-Browser/Application/brave.exe';
const chromePath = 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe';
import { existsSync } from 'fs';
const executablePath = existsSync(bravePath) ? bravePath : chromePath;

const browser = await puppeteer.launch({
  executablePath,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
await new Promise(r => setTimeout(r, 9000)); // wait for Three.js + GSAP animations to render
const fullPage = process.argv.includes('--full');

if (fullPage) {
  // Scroll through the page to trigger all GSAP ScrollTrigger animations
  await page.evaluate(async () => {
    const h = document.body.scrollHeight;
    for (let y = 0; y <= h; y += 300) {
      window.scrollTo(0, y);
      await new Promise(r => setTimeout(r, 100));
    }
    window.scrollTo(0, 0);
    await new Promise(r => setTimeout(r, 500));
  });
}

await page.screenshot({ path: filepath, fullPage });
console.log(`Screenshot saved: ${filepath}`);
await browser.close();
