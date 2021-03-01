const { getVariables, replaceVariables } = require("./structs/Variable");
const error = require("./structs/Error");

module.exports = (code) => {
  let variables = getVariables(code).vars;
  let removedVariablesCode = getVariables(code).newCode;
  let newCode = replaceVariables(removedVariablesCode, variables);
  return newCode.split(";");
};
