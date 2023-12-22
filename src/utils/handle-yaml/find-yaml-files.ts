import { glob } from "glob";
import path from "path";
import * as util from "util";

const stat = util.promisify(require("fs").stat);

const YAML_FILE_EXTENSION = "yml" as const;

/**
 * Finds YAML files in the specified directory using glob.
 * @param {string} directory - The directory to start the search.
 * @returns {Promise<string[]>} - A promise that resolves to an array of file paths.
 */
export async function findYamlFiles(directory: string): Promise<string[]> {
  const pattern = path.join(
    process.cwd(),
    directory,
    `**/*.${YAML_FILE_EXTENSION}`,
  );

  return await glob(pattern, async (findError, files) => {
    if (findError) {
      console.error(`Error while finding YAML file: ${findError.message}`);
    } else {
      try {
        return await filterFilesByExtension(files, YAML_FILE_EXTENSION);
      } catch (filterError) {
        console.error(
          `Error while filtering YAML files: ${filterError.message}`,
        );
        throw filterError;
      }
    }
  });
}

/**
 * Filters files based on their file extension.
 * @param {string[]} files - The array of file paths to filter.
 * @param {typeof YAML_FILE_EXTENSION} fileExtension - The file extension to filter.
 * @returns {Promise<string[]>} - A promise that resolves to an array of filtered file paths.
 */
async function filterFilesByExtension(
  files: string[],
  fileExtension: typeof YAML_FILE_EXTENSION,
): Promise<string[]> {
  const filteredFiles = await Promise.all(
    files.map(async (filePath) => {
      const itemStat = await stat(filePath);
      return itemStat.isFile() && filePath.endsWith(`.${fileExtension}`)
        ? filePath
        : null;
    }),
  );

  return filteredFiles.filter(Boolean) as string[];
}
