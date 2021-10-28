# JSCLG parser

The official JSCLG parser.

# What is JSCLG?

- It stands for 'Javascript Console Log'.
- This package parses code like this ↓

  ```
  let name = squik;
  import data.age from tests/export.test.js;
  My name is {{name}} and i am {{age}} years old;

  ```

  into an array like this ↓

  ```js
  ["My name is squik and i am 15 years old"];
  ```

# Sample Code

```js
const { parseJSCLG } = require("@jsclg/parser");
const file = process.argv.slice(2);
const code = require("fs").readFileSync(file[0], "utf-8");

parseJSCLG(code).forEach(console.log);
```
