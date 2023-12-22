import { selectTaskPrompt } from "@/cli";
import { launchPuppeteer } from "@/puppeteer/launch-puppeteer";
import path from "path";

async function handlePromptSelection(browser) {
  const { meta, payload } = JSON.parse(await selectTaskPrompt());
  const taskDir = path.dirname(meta.filePath);
  const taskFileName = path.parse(meta.filePath).name;

  for (const name in payload.functions) {
    const meta = payload.functions[name];
    const taskModule = require(
      path.resolve(taskDir, meta?.path || taskFileName),
    );

    await taskModule[name](browser);
  }
}

(async function () {
  try {
    const browser = await launchPuppeteer();

    await handlePromptSelection(browser);
    await browser.close();
    process.exit();
  } catch (error) {
    console.error(error);
  }
})();
