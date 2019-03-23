const fs = require("fs");
const compiled = new WebAssembly.Module(
  fs.readFileSync(__dirname + "/build/optimized.wasm")
);

const memory = new WebAssembly.Memory({ initial: 10000 });
var mem = new Uint32Array(memory.buffer);
mem[0] = 11;

const imports = {};
Object.defineProperty(module, "exports", {
  get: () =>
    console.log(new WebAssembly.Instance(compiled, imports).exports.add(1, 2))
});
