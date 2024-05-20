const esbuild = require("esbuild");

esbuild
  .build({
    entryPoints: ["src/server.ts"],
    bundle: true,
    outfile: "dist/index.js",
    platform: "node",
    sourcemap: true,
    minify: true,
    loader: {
      ".tsx": "tsx",
      ".ts": "ts",
    },
  })
  .catch(() => process.exit(1));
