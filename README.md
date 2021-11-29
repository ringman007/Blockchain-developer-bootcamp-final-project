# Final project - Memory Game with pay and mint function 

## Deployed version url:

https://adoring-almeida-2dcdf6.netlify.app/

## How to run this project locally:


### Prerequisites

- Node.js >= v14
- Truffle and Ganache
- Npm install
- React

1. clone repository in empty directory 
2. run in console: `npm install` 
3. run `ganache-cli` in new terminal


### Contracts

- run `truffle test'
- Run local testnet in port `8545` with an Ethereum client, e.g. Ganache
- Run tests in Truffle console: `test`
    NOTE: Not all tests are passing yet, but more than 5 units pass their tests. 
          (new to coding and it's been quite a challange!)

### Frontend

- `npm run start`
- Open localhost:3000

## Screencast link


## Public Ethereum wallet for certification:

`0x42176A6f951bD9327eCC515138703eF006533986`

## Project description

A memory NFT game, that allows the player to mint an NFT with the picture from the cards they matched. 

Player needs to pay to play before being able to trigger the mint function. 


## Simple workflow

1. Enter website
2. Connect with Metamask
3. Pay fee to start game (cards will randomize once fee is paid)
4. Match two tiles NOTE: on ropsten hosted via netflify the flipcard function does not trigger at times - if that happens just click a couple more tiles (also happens in the screencast recording)
6. Metamasks opens automatically to ask player to mint their match
7. NFT is sent to player, players token count increases by one and the UI also displays what NFT the player minted.

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


