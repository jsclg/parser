const { parseJSCLG } = require("../index.js");
const file = require("path").resolve(".", "./example/index.jsclg");
const data = require("fs").readFileSync(file).toString();
console.log(parseJSCLG(data));
