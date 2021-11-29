# Final project - Memory Game with pay and mint function 

## Deployed version url:

https://adoring-almeida-2dcdf6.netlify.app/

## How to run this project locally:


### Prerequisites

- Node.js >= v14
- Truffle and Ganache
- Npm install
- React


### Contracts

- Run `npm install` in project root to install Truffle build and smart contract dependencies
- Run local testnet in port `8545` with an Ethereum client, e.g. Ganache
- Run tests in Truffle console: `test`
    NOTE: Not all tests are passing yet, but more than 5 units pass their tests. 

### Frontend

- `cd rootfolder`
- `npm install`
- `npm run start`

## Screencast link


## Public Ethereum wallet for certification:

`0x0`

## Project description

A memory NFT game, that allows the player to mint an NFT with the picture from the cards they matched. 

Player needs to pay to play before being able to trigger the mint function. 


## Simple workflow

1. Enter website
2. Connect with Metamask
3. Pay fee to start game (cards will randomize once fee is paid)
4. Match two tiles 
5. Metamasks opens automatically to ask player to mint their match
6. NFT is sent to player, players token count increases by one and the UI also displays what NFT the player minted.

## Scheduled workflow for future improvements (Not implemented)
Make possible to insert other NFTs in gamefield. So that players can either mint an NFT or have the chance to get a pre-exisiting NFT. 


## Directory structure

- `src/components`: Project's React frontend.
- `src/contracts`: Smart contracts that are deployed in the Ropsten testnet.
- `migrations`: Migration files for deploying contracts in `src/contracts` directory.
- `test`: Tests for smart contracts.

## Environment variables (not needed for running project locally)

```
ROPSTEN_INFURA_PROJECT_ID=
ROPSTEN_MNEMONIC=
```


