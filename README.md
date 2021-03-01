# JSCLG parser

The official JSCLG parser.

# What is JSCLG?

- It stands for 'Javascript Console Log'.
- This package parses code like this ↓

  ```
  $greeting:hello everyone;
  {{greeting}}
  ```

  into an array like this ↓

  ```js
  ["hello everyone"];
  ```

# Sample Code

```js
const parse = require("@jsclg/parser");
const file = process.argv.slice(2);
const code = require("fs").readFileSync(file[0], "utf-8");

parse(code).forEach((line) => {
  console.log(line);
});
```
