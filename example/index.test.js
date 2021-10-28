const parse = require("../index.js");
const file = require("path").resolve(".", "./tests/index.jsclg");
const data = require("fs").readFileSync(file).toString();
console.log(parse(data));
