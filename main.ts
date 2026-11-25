import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// My own invention: one Wi-Fi name, 24 characters, that tells a whole
// story at a glance in a phone's network list.
const wifiName = "ThisIsTheReasonWeBrokeUp";

function validateName(name: string): void {
  const lines = name.split("\n");
  if (lines.length !== 1) {
    throw new Error("Wi-Fi name must be exactly one line");
  }
  if (name.trim().length === 0) {
    throw new Error("Wi-Fi name must not be blank");
  }
  if (name.length < 1 || name.length > 32) {
    throw new Error(
      `Wi-Fi name must be 1-32 characters, got ${name.length}`,
    );
  }
}

validateName(wifiName);

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), wifiName + "\n", "utf8");
console.log(`Wrote Wi-Fi name (${wifiName.length} chars): ${wifiName}`);
