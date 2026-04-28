import readlineSync from "readline-sync";
import { runAgent } from "./src/agent.js";

async function main() {
  console.log("AI Location Agent - Bangalore Workshop Edition");
  console.log("Try: cafes in Indiranagar, gyms in Bangalore, parks in Bangalore, museums, malls");
  console.log('Type "exit" to quit.\n');

  while (true) {
    const input = readlineSync.question("Query: ").trim();

    if (!input) {
      continue;
    }

    if (input.toLowerCase() === "exit") break;

    try {
      const result = await runAgent(input);
      console.log("\n" + result + "\n");
    } catch (error) {
      console.log(
        "\nResult:\n",
        `Agent failed: ${error?.message || "Unknown error"}`
      );
    }
  }
}

main();