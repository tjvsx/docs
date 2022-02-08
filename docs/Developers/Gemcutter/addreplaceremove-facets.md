---
sidebar_position: 3
title: 'Add/Replace/Remove facets'
---

## Edit manually or running tasks
You can edit manually the **.diamond.json** file or using convenient tasks.

## Add

You can add remote or local facets

### Remote add

```bash
$ npx hardhat diamond:add --remote --address <facet-address> [--o <diamond-file>]
```
You can add an already deployed facet, adding all its functions to the functionSelectors in the **.diamond.json**. **The facet must be verified on Sourcify.**

:::info
When you add a remote facet, Gemcutter fetches the ABI from Sourcify getting the facet and its function names.
:::

#### *Example*

```bash
$ npx hardhat diamond:add --remote --address 0x5D7a8f4e0B41cB1A5870E0c6670A27503d873218
```
*automatically edit the **diamond.json** file as shown below*
```json
{
    "functionSelectors": {
        /* ...all the existing function selectors... */
        "test1Func1": "Test1Facet",
        "test1Func10": "Test1Facet",
        "test1Func2": "Test1Facet"
    },
    "contracts": {
        /* ...all the existing facets... */
        "Test1Facet": {
          "name": "Test1Facet",
          "address": "0x5D7a8f4e0B41cB1A5870E0c6670A27503d873218",
          "type": "remote"
        }
    }
}
```

### Local add

```bash
$ npx hardhat diamond:add --local --name <facet-name> [--o <diamond-file>]
```

Adds a facet in your *contracts/* folders into the **.diamond.json** file, adding all its functions to the functionSelectors.

#### *Example*

```bash
$ npx hardhat diamond:add --local --name Test1Facet
```
*automatically edit the **diamond.json** file as shown below*
```json
{
    "functionSelectors": {
        /* ...all the existing function selectors... */
        "test1Func1": "Test1Facet",
        "test1Func10": "Test1Facet",
        "test1Func2": "Test1Facet"
    },
    "contracts": {
        /* ...all the existing facets... */
        "Test1Facet": {
          "name": "Test1Facet",
          "type": "local"
        }
    }
}
```

## Replace

You can replace functionSelectors with remote or local facets.

### Remote replace

```bash
$ npx hardhat diamond:replace --remote --address <facet-address> --functions=<functions-list> [--o <diamond-file>]
```
You can replace functionSelectors with an already deployed facet, replacing all the selected functions in the functionSelectors of the **.diamond.json**. **The facet must be verified on Sourcify.**

:::info
When you replace a remote facet, Gemcutter fetches the ABI from Sourcify getting the facet and its function names.
:::

#### *Example*

```bash
$ npx hardhat diamond:replace --remote --address 0x5D7a8f4e0B41cB1A5870E0c6670A27503d873218 --functions="test1Func1,test1Func2,test1Func3"
```


### Local replace

```bash
$ npx hardhat diamond:replace --local --name <facet-name> --functions=<functions-list> [--o <diamond-file>]
```

Adds a facet in your *contracts/* folders into the **.diamond.json** file, replacing the selected functions in the functionSelectors.

#### *Example*

```bash
$ npx hardhat diamond:replace --local --name Test1Facet --functions="test1Func1,test1Func2,test1Func3"
```

## Remove

```bash
$ npx hardhat diamond:remove --functions=<functions-list> [--o <diamond-file>]
```

Remove the selected functions from the functionSelector, if a contract remains without any reference in the functionSelectors it gets removed.

#### *Example*

```bash
$ npx hardhat diamond:remove --functions="test1Func1"
```