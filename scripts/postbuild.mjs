import { cp, mkdir, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const outDir = path.join(root, "out");
const commerceSource = path.join(root, "commerce-copilot");
const commerceTarget = path.join(outDir, "commerce-copilot");
const commercePublicSource = path.join(commerceSource, "public");
const commerceIndexSource = path.join(commerceSource, "index.html");
const commercePublicTarget = path.join(commerceTarget, "public");

async function main() {
  if (!existsSync(outDir)) {
    throw new Error("Next.js export output was not found.");
  }

  if (existsSync(commerceSource)) {
    await rm(commerceTarget, { recursive: true, force: true });
    await mkdir(commerceTarget, { recursive: true });
    await cp(commerceIndexSource, path.join(commerceTarget, "index.html"), {
      force: true
    });
    await cp(commercePublicSource, commercePublicTarget, {
      recursive: true,
      force: true
    });
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
