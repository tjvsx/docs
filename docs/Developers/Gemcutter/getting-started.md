---
sidebar_position: 2
title: 'Getting Started'
---

:::tip DO NOT BE LAZY
Please read the [About](/Developers/Gemcutter/About) section before continuing here, otherwise you will encounter problems.
:::


## Installation

```bash
$ npm install gemcutter
or
$ yarn add gemcutter
```

And add the following statement to your hardhat.config.js:

```javascript
require('gemcutter');
```

## Getting started

### From scratch
In order to work with Gemcutter you must have a Diamond deployed. Deploying a basic Diamond is simple, just run:

```bash
$ npx hardhat diamond:deploy --new
```

It will create a **diamond.json** file containing DiamondInit, DiamondCutFacet, DiamondLoupeFacet, OwnershipFacet. And deploy that Diamond to the specified chain (see hardhat docs to understand how to specify networks).

### Clone a Diamond

:::info
The cloned Diamond must provide a loupe function and all the facets **MUST** be verified on Sourcify.
:::

If you already have a diamond or you want to clone one, run:
```bash
$ npx hardhat diamond:clone --address <diamond-address>
```

