import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";

process.env.ROLLUP = true;

// List of extensions that can be automatically resolved
const RESOLVABLE_EXTS = [".ts", ".tsx", ".js"];

const pkg = require("./package.json");

const externalDependencies = Object.keys(pkg.dependencies).concat(
  Object.keys(pkg.peerDependencies)
);

const input = {
  index: "./src/index.ts",
};

export default {
  external(id) {
    return externalDependencies.some((dep) => id.startsWith(dep));
  },
  input,
  output: [
    {
      dir: "esm/",
      format: "esm",
      entryFileNames: "[name].js",
      sourcemap: true,
    },
  ],
  plugins: [
    resolve({ extensions: RESOLVABLE_EXTS }),
    commonjs(),
    babel({
      babelHelpers: "runtime",
      // We add the .svg extension so babel considers our transformed svg files
      extensions: [...RESOLVABLE_EXTS, ".svg"],
    }),
  ],
};
