export async function taskA1(browser = null) {
  console.log("running task A-1!");
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return null;
}

export async function taskA2(browser = null) {
  console.log("running task A-2!");
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return null;
}
