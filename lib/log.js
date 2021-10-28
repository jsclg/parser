const { Lexer } = require("./lexer");
const { JSCLGError } = require("./error");
const { resolve } = require("path");

const parseVariableDeclaration = (line, lexedLine, lineNumber) => {
  if (
    lexedLine.length < 4 ||
    JSON.stringify(lexedLine.slice(0, 4)) !==
      JSON.stringify(["LET", "STRING", "EQUALITY", "STRING"])
  )
    new JSCLGError(
      "Syntax",
      "Invalid type of variable initialization.",
      `[ Line ${lineNumber + 1} ]`
    );

  return { name: line[1], value: line.slice(3).join(" ") };
};

const parseImportLine = (line, lexedLine, lineNumber) => {
  if (
    lexedLine.length < 4 ||
    JSON.stringify(lexedLine) !==
      JSON.stringify(["IMPORT", "STRING", "FROM", "STRING"])
  )
    new JSCLGError(
      "Syntax",
      "Invalid type of import.",
      `[ Line ${lineNumber + 1} ]`
    );

  return { property: line[1], file: line[3] };
};

const importFromFile = (file, property) => {
  file = resolve(".", file);
  let fileData = require(file);
  let variableData = { name: "", value: "" };
  if (typeof fileData === "string")
    variableData = { name: property, value: fileData };
  else if (typeof fileData === "object" && !Array.isArray(fileData)) {
    let existingData = fileData;
    let properties = property.split(".");

    for (let prop of properties) {
      existingData = existingData[prop];
    }

    variableData = { name: properties.at(-1), value: existingData };
  } else
    new JSCLGError(
      "Import",
      `No property named ${property}, neither is export a string in ${file}`
    );

  return variableData;
};

const replaceVariables = (string, variables) => {
  for (let variable of Object.keys(variables)) {
    string = string.replace(
      new RegExp(`{{(${variable})}}`, "g"),
      variables[variable]
    ); // Replacing the value in between all "{{?}}"
  }
  return string;
};

const createLog = (_code) => {
  let code = _code
    .replace(/(?:\\[rn]|[\r\n])/g, "") // Removing all "\r" and "\n"
    .split(";") //  Splitting with ";"
    .filter((line) => line.length); // Filtering the "code" array so that there are no empty values

  let vars = { newline: "\n" };
  let log = [];
  let lineNumber = 0;

  for (let _line of code) {
    let line = replaceVariables(_line, vars);
    let lexedLine = new Lexer(line).lex();
    if (lexedLine[0] === "LET") {
      let variable = parseVariableDeclaration(
        line.split(" "),
        lexedLine,
        lineNumber
      );

      vars[variable.name] = variable.value;
    } else if (lexedLine[0] === "IMPORT") {
      let parsedLine = parseImportLine(line.split(" "), lexedLine, lineNumber);
      let importedData = importFromFile(parsedLine.file, parsedLine.property);

      vars[importedData.name] = importedData.value;
    } else {
      log.push(line);
    }
    lineNumber++;
  }

  return log;
};

module.exports = { createLog };
