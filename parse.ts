import { parse } from "https://deno.land/std@0.200.0/flags/mod.ts";

console.dir(
  parse(Deno.args, {
    boolean: ["help", "save"],
    string: ["name", "color"],
    alias: { help: "h" },
    default: { color: "blue" },
  }),
);

/**
 * ➜  poc-deno-cli git:(main) ✗ deno run parse.ts -a beep -b boop
 * { _: [], a: "beep", b: "boop" }
 * ➜  poc-deno-cli git:(main) ✗ deno run parse.ts run -a beep -b boop
 * { _: [ "run" ], a: "beep", b: "boop" }
 */
