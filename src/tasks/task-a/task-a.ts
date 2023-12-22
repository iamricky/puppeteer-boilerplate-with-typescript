import { type BrowserContext } from "puppeteer";

export async function taskA1(browser: BrowserContext) {
  console.log("running task A-1!");
  const page = await browser.newPage();
  await page.goto("https://www.google.com");
  await new Promise((resolve) => setTimeout(resolve, 3000));
  await page.close();
  return null;
}

export async function taskA2(browser: BrowserContext) {
  console.log("running task A-2!");
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return null;
}
