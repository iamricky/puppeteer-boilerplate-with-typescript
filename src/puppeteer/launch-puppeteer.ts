import puppeteer from "puppeteer-extra";
import {
  type Browser,
  type BrowserContext,
  type PuppeteerLaunchOptions,
  DEFAULT_INTERCEPT_RESOLUTION_PRIORITY,
} from "puppeteer";
import AdblockerPlugin from "puppeteer-extra-plugin-adblocker";
import AnonymizeUserAgentPlugin from "puppeteer-extra-plugin-anonymize-ua";
import BlockResourcesPlugin from "puppeteer-extra-plugin-block-resources";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { defaultArgs, preventZombieInstances } from "./args";

puppeteer.use(StealthPlugin());
puppeteer.use(AnonymizeUserAgentPlugin());

puppeteer.use(
  BlockResourcesPlugin({
    blockedTypes: new Set([
      "image",
      "other",
      'stylesheet'
    ]),
    // Optionally enable Cooperative Mode for several request interceptors
    interceptResolutionPriority: DEFAULT_INTERCEPT_RESOLUTION_PRIORITY,
  }),
);

puppeteer.use(
  AdblockerPlugin({
    blockTrackers: true,
    // Optionally enable Cooperative Mode for several request interceptors
    interceptResolutionPriority: DEFAULT_INTERCEPT_RESOLUTION_PRIORITY,
  }),
);

const puppeteerOptions: PuppeteerLaunchOptions = {
  // devtools: true,
  dumpio: true,
  // headless: "new",
  headless: false,
  ignoreHTTPSErrors: true,
  args: defaultArgs.concat(preventZombieInstances, [
    // "--headless"
  ]),
};

export async function launchPuppeteer(): Promise <BrowserContext> {
  const browser = await puppeteer.launch(puppeteerOptions);
  const browserContext = browser.defaultBrowserContext();

  if (!browserContext) {
    process.on("exit", () => console.error("Browser failed to launch."));
    process.exit();
  }

  return browserContext;
}
