//@ requireOptions("--useBBQJIT=1", "--useWasmLLInt=1")
// Copyright 2022 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Flags: --experimental-wasm-gc

load("wasm-module-builder.js");

(function TestLocalInvalidHeapType() {
  let builder = new WasmModuleBuilder();
  builder.addFunction('testEqLocal',
                    makeSig([], [kWasmAnyRef]))
  .addLocals(wasmRefNullType(123), 1) // 123 is not a valid type index
  .addBody([
    kExprRefNull, kNullRefCode,
    kExprLocalSet, 0,
  ]).exportFunc();
  assertThrows(() => builder.instantiate(), WebAssembly.CompileError);
})();
