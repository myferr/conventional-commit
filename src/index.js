#!/usr/bin/env node

import { GeminiModel } from "./utils/model.js";
import { getArgument } from "./utils/args.js";
import { execSync } from "child_process";
import chalk from "chalk";
import { GEMINI_API_KEY } from "./key.js";

let gitdiff = "";

try {
  gitdiff = execSync("git diff", { encoding: "utf8" }).toString().trim();
} catch (e) {
  gitdiff = "Could not get git diff.";
}

const commitMessagePrompt = `Here is the output of my 'git diff' command:\n\n${gitdiff}\n\nBased on this diff, generate a specific and complete conventional commit message. Do not provide a template, expanded description, expanded message, expanded body, footer, or ask for more information. Only provide the conventional commit header. Example: feat: improve user experience`;

const instance = new GeminiModel(GEMINI_API_KEY);

const generate = async (prompt) => {
  try {
    const result = await instance.response(prompt);
    return result;
  } catch (error) {
    return "Couldn't generate result.";
  }
};

let commitMessage = "commit";

commitMessage = await generate(commitMessagePrompt);

if (getArgument(1) == "--print") {
  console.log(commitMessage);
}
if (getArgument(1) == "--commit") {
  try {
    const status = execSync("git status --porcelain", {
      encoding: "utf8",
    }).trim();
    if (!status) {
      console.log(
        `${chalk.red(
          `Nothing to commit. ${chalk.underline("Working tree is clean")}`
        )}`
      );
    } else {
      execSync(`git add .`, { stdio: "inherit" });
      execSync(`git add .`, { stdio: "inherit" });
      const sanitizedMessage = commitMessage
        .replace(/"/g, '\\"')
        .replace(/[\r\n]+/g, " ");
      execSync(`git commit -m "${sanitizedMessage}"`, {
        stdio: "inherit",
      });
      execSync(`git push`, { stdio: "inherit" });
      execSync(`git pull`, { stdio: "inherit" });
    }
  } catch (e) {
    console.error("Error during git operations:", e.message);
  } finally {
    if (commitMessage && commitMessage !== "commit") {
      console.log(`${chalk.bgYellow(commitMessage)} · Attempted commit.`);
      process.exit(0);
    } else {
      console.log(
        chalk.bgRed("No commit message was generated or commit failed.")
      );
    }
  }
  console.log(`${chalk.bgGreen(commitMessage)} · Successful commit.`);
}
