require('babel-register');
require('babel-polyfill');
require("dotenv").config();


const HDWalletProvider = require("@truffle/hdwallet-provider");





module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",  // Localhost
      port: 8545,         // Standard Ethereum port 
      network_id: "*"     // Match any network id
    },

    ropsten: {
      provider: function() {
        return new HDWalletProvider(process.env.MNEMONIC,
                `https://ropsten.infura.io/v3/${process.env.INFURA_API_KEY}`)
      },
      network_id: 3,
      gas: 4000000      //make sure this gas allocation isn't over 4M, which is the max
    }
    //ropsten: {
    //   provider: 
    //     new HDWalletProvider(
    //       process.env.MNEMONIC,
    //       `https://ropsten.infura.io/v3/${process.env.INFURA_API_KEY}`
    //     ),
    //   network_id: 3, // Ropsten's id
    //    gas: 5500000, // Ropsten has a lower block limit than mainnet
    //   confirmations: 2, // # of confs to wait between deployments. (default: 0)
    //   timeoutBlocks: 200, // # of blocks before a deployment times out  (minimum/default: 50)
    //   skipDryRun: true // Skip dry run before migrations? (default: false for public nets )
    // }
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}
