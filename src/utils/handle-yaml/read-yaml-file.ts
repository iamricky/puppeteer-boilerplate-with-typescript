import * as yaml from "js-yaml";
import * as util from "util";
import { type Task } from "@/cli";

const readFile = util.promisify(require("fs").readFile);

/**
 * Reads the content of a YAML file.
 * @param {string} filePath - The path to the YAML file.
 * @returns {Promise<Task>} - A promise that resolves to the parsed content of the YAML file.
 */
export async function readYamlFile(filePath: string): Promise<Task> {
  try {
    const fileContent = await readFile(filePath, "utf8");
    return yaml.load(fileContent) as Task;
  } catch (readError) {
    console.error(
      `Error while reading YAML file ${filePath}: ${readError.message}`,
    );
    throw readError;
  }
}
