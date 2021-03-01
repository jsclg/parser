const { red, yellow } = require("./Color");
module.exports = (name, message, extra) => {
  console.log(
    `${red(name + " error")} :- ${yellow(message)}${
      typeof extra === "string" ? ` ${extra}` : ""
    }`
  );
  process.exit(1);
};
