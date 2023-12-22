import { type Task } from "@/cli";
import { findYamlFiles } from "./find-yaml-files";
import { readYamlFile } from "./read-yaml-file";

const DEFAULT_DIRECTORY: string = "./src/tasks" as const;

/**
 * Interface representing the result of reading a YAML file.
 */
export interface YamlFileResult {
  payload: Task;
  meta: {
    filePath: string;
  };
}

/**
 * Finds and reads YAML files in the specified directory.
 * @param {string} directory - The directory to search for YAML files.
 * @returns {Promise<YamlFileResult[]>} - A promise that resolves to an array of YAML file results.
 */
export async function findAndReadYamlFiles(
  directory: string = DEFAULT_DIRECTORY,
): Promise<YamlFileResult[]> {
  try {
    const yamlFiles = await findYamlFiles(directory);
    const fileContents = await Promise.all(
      yamlFiles.map(async (filePath) => {
        try {
          const payload = await readYamlFile(filePath);
          return { meta: { filePath }, payload } as YamlFileResult;
        } catch (readError) {
          console.error(
            `Error while reading YAML file ${filePath}: ${readError.message}`,
          );
          return null;
        }
      }),
    );

    return fileContents.filter(Boolean) as YamlFileResult[];
  } catch (error) {
    console.error(
      `Error while finding and reading YAML files: ${error.message}`,
    );
    throw error;
  }
}
