import { findYamlFiles } from "./find-yaml-files";
import { readYamlFile, type YamlFile } from "./read-yaml-file";

const DEFAULT_DIRECTORY: string = "./src/tasks" as const;

/**
 * Interface representing the result of reading a YAML file.
 */
export interface YamlFileResult {
  payload: YamlFile;
  meta: {
    path: string;
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
      yamlFiles.map(async (path) => {
        try {
          const payload = await readYamlFile(path);
          return { meta: { path }, payload } as YamlFileResult;
        } catch (readError) {
          console.error(
            `Error while reading YAML file ${path}: ${readError.message}`,
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
