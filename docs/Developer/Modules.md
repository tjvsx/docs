---
sidebar_position: 4
title: 'Modules'
---

# Modules

Modules on Habitat must be deployed on Ethereum and must conform to an [interface](https://github.com/0xHabitat/habitat/blob/ca68c05614a7b74c48bfd5b5d2d7c11f7d21bf16/src/rollup/contracts/IModule.sol#L5) as well to a restricted set of EVM opcodes (no contract calls, events or storage).
At the moment, the interface only defines voting related functionality and will be extended in the future depending on need.

[Take a look on the standard modules](https://github.com/0xHabitat/habitat/tree/master/src/rollup/contracts/modules) to get an idea on how to make use of themodule functionality.


### Deployment

Modules need to be deployed on Ethereum as usual and then registered on the Habitat rollup.
The registration process involves a Ethereum Transaction that analyses the module's bytecode and [registration process](https://github.com/0xHabitat/habitat/blob/ca68c05614a7b74c48bfd5b5d2d7c11f7d21bf16/src/rollup/contracts/HabitatModule.sol#L120) into the rollup.

The bytecode analysis can fail if:
- The contracts wants to make us of [forbidden opcodes](https://github.com/0xHabitat/habitat/blob/ca68c05614a7b74c48bfd5b5d2d7c11f7d21bf16/src/rollup/contracts/HabitatModule.sol#L35)
  like XXXcall, sload, sstore, logX etc.
- Long strings used in the contract for e.g error messages may falsely trigger a violation. Use short error messages or codes.
- Appended metadata from the solidity compiler. Can be avoided by setting the compiler option
  ```
  metadata: {
    bytecodeHash: 'none',
  },
  ```

The registration step can be done in the [Habitat App](https://0xhabitat.org/app/#habitat-tools).


### Sequel

The Voting interface is restricted but still allows for a lot of custom decisions regarding treasury management.
We are always eager for any kind of feedback - let us know.