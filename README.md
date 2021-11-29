# Final project - Memory Game with pay and mint function 

## Deployed version url:

XXXX

## How to run this project locally:

### Prerequisites

- Node.js >= v14
- Truffle and Ganache
- Yarn
- `git checkout master`

### Contracts

- Run `yarn install` in project root to install Truffle build and smart contract dependencies
- Run local testnet in port `7545` with an Ethereum client, e.g. Ganache
- `truffle migrate --network development`
- `truffle console --network development`
- Run tests in Truffle console: `test`
- `development` network id is 1337, remember to change it in Metamask as well!

### Frontend

- `cd client`
- `yarn install`
- `yarn start`
- Open `http://localhost:3000`

### How to populate locally deployed contract with listings


## Screencast link


## Public Ethereum wallet for certification:

`0x0`

## Project description


## Simple workflow

1. Enter website
2. Connect with Metamask
3. Pay fee to start game (gamefield will render again once fee is paid)
4. Match two tiles 
5. Metamasks opens automatically to ask player to mint their match
6. NFT is sent to player, players token count increases by one and the UI also displays what NFT the player minted.

## Scheduled workflow for future improvements (Not implemented)


## Directory structure

- `client`: Project's React frontend.
- `contracts`: Smart contracts that are deployed in the Ropsten testnet.
- `migrations`: Migration files for deploying contracts in `contracts` directory.
- `test`: Tests for smart contracts.

## Environment variables (not needed for running project locally)

```
ROPSTEN_INFURA_PROJECT_ID=
ROPSTEN_MNEMONIC=
```

## TODO features

