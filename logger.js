const LOG_API_URL = "http://4.224.186.213/evaluation-service/logs";

const validStacks = ["frontend", "backend"];

const validLevels = [
  "debug",
  "info",
  "warn",
  "error",
  "fatal"
];

const validFrontendPackages = [
  "api",
  "component",
  "hook",
  "page",
  "style",
  "auth",
  "config",
  "middleware",
  "utils"
];

export async function Log(stack, level, packageName, message) {
  if (!validStacks.includes(stack)) {
    throw new Error(`Invalid stack: ${stack}`);
  }

  if (!validLevels.includes(level)) {
    throw new Error(`Invalid level: ${level}`);
  }

  if (!validFrontendPackages.includes(packageName)) {
    throw new Error(`Invalid package: ${packageName}`);
  }

  const token = localStorage.getItem("accessToken");

  if (!token) {
    console.error("Access token not found");
    return;
  }

  try {
    const response = await fetch(LOG_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        stack,
        level,
        package: packageName,
        message
      })
    });

    const data = await response.json();

    console.log("Log created:", data);

    return data;
  } catch (error) {
    console.error("Failed to send log:", error);
  }
}