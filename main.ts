import type { Args } from "https://deno.land/std@0.200.0/flags/mod.ts";
import { parse } from "https://deno.land/std@0.200.0/flags/mod.ts";
import greetings from "./greetings.json" with { type: "json" };

/**
 * Main logic of CLI.
 */

async function main(inputArgs: string[]): Promise<void> {
  const args = parseArguments(inputArgs);

  // If help flag is enabled, pring help.
  if (args.help) {
    printHelp();
    Deno.exit(0);
  }

  let name: string | null = args.name;
  let color: string | null = args.color;
  let save: boolean = args.save;

  const kv = await Deno.openKv("/tmp/kv.db");
  if (args.forget) {
    console.log("Forget everything");
    await kv.delete(["color"]);
    await kv.delete(["name"]);
  }

  let askToSave = false;

  if (!name) {
    name = (await kv.get(["name"])).value as string;
    if (!name) {
      name = prompt("What is your name?");
      askToSave = true;
    }
  }

  if (!color) {
    color = (await kv.get(["color"])).value as string;
    if (!color) {
      color = prompt("What is your favorite color?");
      askToSave = true;
    }
  }

  if (!save && askToSave) {
    const savePrompt: string | null = prompt(
      "Do you want to save these settings? Y/n",
    );
    if (savePrompt?.toUpperCase() === "Y") save = true;
  }

  if (save) {
    await kv.set(["name"], name);
    await kv.set(["color"], color);
  }

  console.log(
    `%c${
      greetings[Math.floor(Math.random() * greetings.length) - 1]
    }, ${name}!`,
    `color: ${color}; font-weight: bold`,
  );
}

/**
 * Run CLI - `deno run main.ts`
 */

main(Deno.args);

export function parseArguments(args: string[]): Args {
  // All boolean arguments
  const booleanArgs = ["help", "save", "forget"];

  // All string arguments
  const stringArgs = ["name", "color"];

  // A list of aliases
  const alias = {
    help: "h",
    save: "s",
    forget: "f",
    name: "n",
    color: "c",
  };

  return parse(args, {
    alias,
    boolean: booleanArgs,
    string: stringArgs,
    stopEarly: false,
    "--": true,
  });
}

function printHelp(): void {
  console.log(`Usage: greetme [OPTIONS...]`);
  console.log("\nOptional flags:");
  console.log(" . -h, --help   Display this help and exit");
  console.log(" . -s, --save   Save settings for future greetings");
  console.log(" . -f, --forget Delete saved settings");
  console.log(" . -n, --name   Set your name for the greetings");
  console.log(" . -c, --color  Set the color of the greetings");
}
