const def = (code, string) => `\x1b[${code}m${string}\x1b[0m`;

module.exports.red = (string) => def("31", string);
module.exports.yellow = (string) => def("33", string);
