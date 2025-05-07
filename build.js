const esbuild = require("esbuild");
const fs = require("fs");
const path = require("path");

const copyPublicFiles = () => {
  const srcDir = "./public";
  const destDir = "./docs";
  fs.mkdirSync(destDir, { recursive: true });

  for (const file of fs.readdirSync(srcDir)) {
    fs.copyFileSync(path.join(srcDir, file), path.join(destDir, file));
  }
};

esbuild
  .build({
    entryPoints: ["./src/app.js", "./src/sw.js"],
    outdir: "docs",
    minify: true,
    bundle: false,
    format: "esm",
  })
  .then(() => {
    copyPublicFiles();
    console.log("Build completo...");
  })
  .catch(() => process.exit(1));
