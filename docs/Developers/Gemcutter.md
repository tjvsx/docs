---
sidebar_position: 2
title: '💎 Gemcutter'
---

# 💎 Gemcutter

## A framework for diamonds

Our gemcutter framework provides a simple way for you to compose a diamond in your local development environment while managing your diamond's facets with simple hardhat tasks. 

## Getting Started

### Where to start

- Start from scratch: deploy your own diamond from your contracts folder -- ```npx hardhat diamond:deploy``` 
- Clone another diamond: import a diamond that is already onchain -- ```npx hardhat diamond:clone <diamond-address>``` and ```npx hardhat diamond:deploy```

### The diamond.json
- When you deploy a diamond or clone an existing diamond, by default it will add your diamond and it's facets into diamond.json, unless stated otherwise with the --o flag. 

### Available Tasks

<!-- USED TABLE GENERATOR: https://tablesgenerator.com/markdown_tables -->
| Task Command                       | Description                                                                               | Required Params                        | Optional Params                                               | Optional Flags                                                                                                                                                                                               |
|------------------------------------|-------------------------------------------------------------------------------------------|----------------------------------------|---------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ``` npx hardhat diamond:clone ```  | *Clones an existing diamond*                                                              | ```--address```: The diamond's address | ```--o```: The diamond file to deploy (default: diamond.json) |                                                                                                                                                                                                              |
| ``` npx hardhat diamond:deploy ``` | *updates address of the diamond on diamond.json*                                          |                                        | ```--o```: The diamond file to deploy (default: diamond.json) | ```-new```: Deploy a new Diamond <br/> ```-exclude-loupe```: Exclude loupe facet from default address as remote facet<br/>  ```-exclude-ownership```: Exclude cut facet from default address as remote facet |
| ``` npx hardhat diamond:status ``` | *Compares your local diamond.json with the on-chain diamond and displays any differences* | ```--address```: The diamond's address | ```--o```: The diamond file to deploy (default: diamond.json) |                                                                                                                                                                                                              |
| ``` npx hardhat diamond:add ```    | *adds a compatible remote facet to your diamond*                                          | ```--address```: The diamond's address | ```--o```: The diamond file to deploy (default: diamond.json) | ```-remote```: add remote facet<br/> ```-local```: ddd local facet"<br/> ```-skipFunctions```: only add contract                                                                                             |
| ``` npx hardhat diamond:cut ```    | *cuts the diamond changes listed in diamond:status*                                       | ```--address```: The diamond's address | ```--o```: The diamond file to deploy (default: diamond.json) |                                                                                                                                                                                                              |