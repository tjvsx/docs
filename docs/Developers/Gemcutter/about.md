---
sidebar_position: 1
title: 'About'
slug: /Developers/Gemcutter
---

# 💎 Gemcutter

:::danger
The framework is just a proof of concept, this documentation contains more features than the actual repository.
:::

### Useful things

* [Repository](https://github.com/0xHabitat/gemcutter)
* cite marcocastignoli#2857 or tjvs#7114 on the [official diamond discord](https://discord.com/invite/kQewPw2)

## EIP-2535 Diamonds simplified

Gemcutter is a set of hardhat tasks built to provide a simple way to develop and deploy EIP-2535 Diamonds. It uses a file to sync the local changes to the blockchain.


## Sourcify verification
Gemcutter works with Sourcify, all the deployed facets are going to be verified on Sourcify.

## The Diamond file

Gemcutter uses **.diamond.json** files to keep track of the status of the diamond.
It is composed by:
* **address**: the address of the diamond
* **chainId**: the chainId of the diamond (check Sourcify chainId)
* **functionSelectors**: a mapping (function_name: facet_name)
* **contracts**: all the facets in the diamond

You can have multiple **.diamond.json** files into a single project. When calling the Gemcutter's hardhat tasks pass the **--o** argument to specify the **.diamond.json**.

### Contracts type: remote vs local

Contracts type can be:
* **remote**: already deployed contracts verified on Sourcify
* **local**: contracts that are going to be deployed

*Example of diamond.json*
```json
{
  "address": "0x1be50e2EAe43e6452b03eE0ab7AFb34b24008512",
  "chaindId": 4,
  "functionSelectors": {
    "diamondCut": "DiamondCutFacet",
    "facetAddress": "DiamondLoupeFacet",
    "facetAddresses": "DiamondLoupeFacet",
    "facetFunctionSelectors": "DiamondLoupeFacet",
    "facets": "DiamondLoupeFacet",
    "supportsInterface": "DiamondLoupeFacet",
    "owner": "OwnershipFacet",
    "transferOwnership": "OwnershipFacet"
  },
  "contracts": {
    "DiamondInit": {
      "name": "DiamondInit",
      "address": "0x158fA028deAEcf68Ea9bC496B7a65C72fB96233a",
      "type": "remote"
    },
    "DiamondCutFacet": {
      "name": "DiamondCutFacet",
      "address": "0x143f2464404F2C18eECbDC31374222BB7fb7013D",
      "type": "remote"
    },
    "DiamondLoupeFacet": {
      "name": "DiamondLoupeFacet",
      "address": "0xCb4392d595825a46D5e07A961FB4A27bd35bC3d4",
      "type": "remote"
    },
    "OwnershipFacet": {
      "name": "OwnershipFacet",
      "address": "0x6e9B27a77eC19b2aF5A2da28AcD1434b3de4D6EE",
      "type": "remote"
    },
    "LocalFacet": {
      "name": "LocalFacet",
      "type": "local"
    }
  }
}
```