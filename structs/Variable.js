const error = require("./Error");
const replaceVariables = (string, variables) => {
  for (variable of Object.keys(variables)) {
    string = string.replace(
      new RegExp(`{{(${variable})}}`, "g"),
      variables[variable]
    ); // Replacing the value in between all "{{}}"
  }
  return string;
};

const getVariables = (prevCode) => {
  let code = prevCode
    .replace(/(?:\\[rn]|[\r\n])/g, "") // Replacing all "\r" and "\n"
    .split(";") //  Splitting with ";"
    .filter((line) => line.length); // Filtering the "code" array so that there are no empty values

  let vars = {};
  let newCode = [];

  code.forEach((line) => {
    if (!line.startsWith("$")) {
      // Checking for variable line
      newCode.push(line);
      return;
    }

    if (!/\$[a-z _]+\:/.test(line.trim()))
      error(
        "Syntax",
        "Invalid type of variable initialization.",
        `[ Line ${code.indexOf(line) + 1} ]`
      );

    let name = line.substring(line.indexOf("$") + 1, line.indexOf(":")); // Fetching name of variable
    let value = line.split(":")[1]; // Fetching value of variables
    if (!value.length)
      error(
        "Syntax",
        "Invalid type of variable initialization.",
        `[ Line ${code.indexOf(line) + 1} ]`
      );
    vars[name] = replaceVariables(value, vars); // Making variables and pushing into "vars"
  });

  return { vars, newCode: newCode.join(";") };
};

module.exports = {
  getVariables: getVariables,
  replaceVariables: replaceVariables,
};
