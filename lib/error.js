const { red, yellow } = require("chalk");

module.exports.JSCLGError = class {
  constructor(name, message, extra) {
    console.log(
      `${red(name + " error")} :- ${yellow(message)}${
        typeof extra === "string" ? ` ${extra}` : ""
      }`
    );
    process.exit(1);
  }
};
