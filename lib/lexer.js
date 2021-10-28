class Lexer {
  constructor(code) {
    this.code = code.split(" ");
    this.index = 0;
  }

  advance() {
    this.index++;
  }

  getCurrentWord() {
    return this.code[this.index];
  }

  tokenise(string) {
    const tokens = {
      import: "IMPORT",
      from: "FROM",
      let: "LET",
      "=": "EQUALITY",
    };

    return string in tokens ? tokens[string] : "STRING";
  }

  lex() {
    let lexedCode = new Array();

    while (this.index < this.code.length) {
      let word = this.getCurrentWord();
      lexedCode.push(this.tokenise(word));
      this.advance();
    }

    return lexedCode;
  }
}

module.exports = { Lexer };
