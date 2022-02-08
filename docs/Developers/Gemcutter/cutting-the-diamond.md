---
sidebar_position: 4
title: 'Cutting the Diamond'
---

## Diamond's status

Before cutting your Diamond you can see the actual status of the Diamond running

```bash
$ npx hardhat diamond:status [--o <diamond-file>] [--address <diamond-address>]
```

It will compare the status of the local file with the deployed diamond, telling you which functionSelectors need to be cutted and which facets need to be deployed

#### *Example*

```bash
Diamonds:
        Add:  [
            { fn: 'local2Func12', facet: 'LocalFacet' },
            { fn: 'local2Func3', facet: 'LocalFacet' },
            { fn: 'local2Func7', facet: 'LocalFacet' }
        ]
        Remove:  []
        Replace:  [ 
            { fn: 'test1Func2', facet: 'LocalFacet' }
        ]

Contracts to deploy: [
        { name: 'LocalFacet' }
    ]
```

## Diamond Cut

After reviewing the cuts using diamond:status you can actually perform the cuts calling

```bash
$ npx hardhat diamond:cut [--o <diamond-file>] [--address <diamond-address>]
```

:::info
All the deployed facets are going to be verified using Sourcify
:::

#### *Example*

```bash
$ npx hardhat diamond:cut

Compiling 14 files with 0.8.4
Compilation finished successfully
Louping diamond...
[OK] Diamond louped
Deploying facets...
Starting verification process on Sourcify...
[OK] Deployed facets verified
Cutting Diamond\'s facets...
[OK] Completed diamond cut
```