import svelte from "rollup-plugin-svelte";
import resolve from "@rollup/plugin-node-resolve";
import livereload from "rollup-plugin-livereload";

const production = !process.env.ROLLUP_WATCH;

export default {
  input: "src/index.js",
  output: {
    format: "iife",
    name: "app",
    file: "public/build/bundle.js",
  },
  watch: {
    clearScreen: false,
  },
  plugins: [
    svelte({
      dev: !production,
      css: (css) => {
        css.write("bundle.css");
      },
    }),
    resolve(),
    !production && livereload("public"),
    !production && serve(),
  ],
};

function serve() {
  let started = false;
  return {
    writeBundle() {
      if (!started) {
        started = true;
        require("child_process").spawn("npm", ["run", "start", "--", "--dev"], {
          stdio: ["ignore", "inherit", "inherit"],
        });
      }
    },
  };
}
