/**
 * Checks if the script is run with the npm start command.
 * @returns {boolean} - A boolean indicating whether the script is run with npm start.
 */
export function isNpmStartScript(): boolean {
  return process.env.npm_lifecycle_event === "start";
}
