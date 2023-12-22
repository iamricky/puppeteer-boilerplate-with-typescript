import select from "@inquirer/select";
import { isNpmStartScript } from "@/utils/is-npm-start-script";
import { findAndReadYamlFiles } from "@/utils/handle-yaml";
import { TaskSchema, type Task } from "./task.schema";

// Replace with @inquirer types
interface Choice extends Omit<Task, "functions"> {
  value: string;
}

async function getOptionsForTaskPrompt(): Promise<Choice[]> {
  return (async function () {
    try {
      const yamlFiles = await findAndReadYamlFiles();
      return yamlFiles
        .filter(({ payload }) => {
          const parseResults = TaskSchema.safeParse(payload);
          const hasErrors = !parseResults.success;
          if (hasErrors && !isNpmStartScript()) {
            // display error logs
          }
          return parseResults.success;
        })
        .map((task) => {
          const { payload } = task;

          const results: Choice = {
            name: payload.name,
            value: JSON.stringify(task),
          };

          if (payload.description) {
            results.description = payload.description;
          }

          return results;
        });
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }

    return [];
  })();
}

export async function selectTaskPrompt(): Promise<string> {
  const choices = await getOptionsForTaskPrompt();

  if (choices.length === 0) {
    console.log("No Tasks found.");
    return null;
  }

  const userSelection = await select({
    message: "Select a Task",
    choices,
  });

  return userSelection;
}
