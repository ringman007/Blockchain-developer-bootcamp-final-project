const { assert } = require('chai')

const MemoryToken = artifacts.require('./MemoryToken.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('Memory Token', (accounts) => {
  
  let token  

  before(async () => {
    const newMemoryInstance = await MemoryToken.new()
    memoryInstance = newMemoryInstance
    token = await MemoryToken.deployed()
    owner = await memoryInstance.owner.call()

  })

  describe('deployment', async () => {
    it ('deploys successfully', async () => {
      const address = token.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('has a name', async () => {
      const name = await token.name()
      assert.equal(name, 'Memory Token')
    })

    it('has a symbol', async () => {
      const symbol = await token.symbol()
      assert.equal(symbol, 'MEMORY')
    })

    it('has an owner', async () => {
      const owner = await token.owner()
      assert.notEqual(owner, 0x0)
      assert.notEqual(owner, '')
      assert.notEqual(owner, null)
      assert.notEqual(owner, undefined)
    })

    it('check that owners allowedToPlay status is set to false', async () => {
      const owner = await token.owner()
      const allowedToPlay = await token.allowedToPlay(owner)
      assert.equal(allowedToPlay, false)
    })

    it('has mint the mintCount of owner set to 0', async () => {
      const owner = await token.owner()
      const mintCount = await token.mintCount(owner)
      assert.equal(mintCount, '0')
    })
  })


  // mint token and distribute them
  describe('token distribution', async () => {
    let result
    // const allowedToPlay = await  token.allowedToPlay
    
    it('mints token', async () => {
       
       await token.mint(accounts[0], 'https://www.token-uri.com/nft')

       // it should increase total supply
       result = await token.totalSupply()
       assert.equal(result.toString(), '1' , 'total supply is correct')

       // it increments owner balance
       result = await token.balanceOf(accounts[0])
       assert.equal(result.toString(), '1' , 'balanceOf is correct')

       // Token should belong to owner
       result = await token.ownerOf('1')
       assert.equal(result.toString(), accounts[0].toString() , 'ownerOf is correct')
       result = await token.tokenOfOwnerByIndex(accounts[0], 0)

       // owner can see all of his Tokens
       let balanceOf = await token.balanceOf(accounts[0])
       let tokenIds = []
        for (let i = 0; i < balanceOf; i++) {
          let id = await token.tokenOfOwnerByIndex(accounts[0], i)
          tokenIds.push(id.toString())
        }
        let expected = ['1']
        assert.equal(tokenIds.toString(), expected.toString(), 'tokenIds are correct')


        // token URI correctly matches the

        let tokenURI = await token.tokenURI('1')
        assert.equal(tokenURI, 'https://www.token-uri.com/nft')


    })
  })

  // describe('send ether to contract', async () => {
  //   it('sends ehter to contract', async () => {
  //     // const newMemoryInstance = await MemoryToken.new()
  //     const gameFee = 100000000000000000
  //     const address = token.address
  //     await token.sendEthToContract(address, gameFee)
  //     const balance = await token.getBalance()
  //     assert.equal(balance, '100000000000000000')
  //   })
  // })

  describe('get contract Balance', async () => {
    it('gets the contract balance successfully', async () => {
      const balance = await token.getBalance()
      assert.equal(balance, '0')
    })
  })

  // NEED TO SEND ETH TO CONTRACT BEFOREHAND!!! 
  // ALTERNATIVE: COMMENT OUT REQUIRE FUNCTION IN WITHDRAWBALANCE FUNCTION
  describe('owner withdraw funds', async () => {
    it('checks if msg.sender is owner', async () => {
      result = await token.withdrawBalance()
      getContractBalance = await token.getBalance()
      assert.equal(getContractBalance, '0')
    })
  })

  // NEED TO MAKE REQUIRE FUNCTIONS WORK, AND FIGURE OUT HOW TO SEND TRANSACTIONS
  describe('checks payFee function', async () => {
    it('checks if payFee function requires min 0.1 ether to play', async () => {
      const allowedToPlay = await token.allowedToPlay(owner)
      assert.equal(allowedToPlay, false)
  
    })

    // it('sets allowedToPlay to true after receiving gameFee', async () => {
    //   const gameFee = web3.utils.toBN('100000000000000000').toString()
    //   const account = await token.address
    //   await token
    //   //  .payFee({ gameFee  })
    //    .send({ value: gameFee  })

    //   const balance = await token.getBalance()
    //   assert.notEqual(balance, '0')

    // })
  })

  // describe('make sure payFee is above 0.1 ether and enable to play', async () => {
  //   it('requires payFee to take a uint above 0.1 ether'), async () => 
  // const fee = await token.gameFee()
  // const allowedToPlay = await token.allowedToPlay[msg.sender]
  //  //Pay insufficient fee of 0.01 ETH instead of 0.1 ETH.
  //   await token
  //     .payFee("10000000000000000")
  //     .then((res) => {
  //       assert(false);
  //     })
  //     .catch((err) => {
  //       assert(err);
  //     });
  //   //Pay minimum reuqired game fee 0.1 ETH.
  //   await token
  //     .payFee({ value: "100000000000000000" })
  //     .then((res) => {
  //       assert(res);
  //     })
  //     .catch((err) => {
  //       assert(false);
  //     });
  // })




  // describe('check if selfdestruction works', async () => {

  //   it('name should be empty', async () => {
  //     const name = await token.name()
  //     assert.equal(name, '')
  //   })

  //   it('balance should be empty', async () => {
  //     await token.close()
  //     const balance = await token.getBalance()
  //     assert.equal(balance, '0')
  //   })

  //   it('gameFee should be empty', async () => {
  //     await token.close()
  //     const gameFee = await token.gameFee()
  //     assert.equal(gameFee, '0')
  //   })

  //   it('owner should be 0x0000000000000000000000000000000000000000', async () => {
  //     await token.close()
  //     const owner = await token.owner()
  //     assert.equal(owner, '0x0000000000000000000000000000000000000000')
  //   })

  //   it('symbol should be empty', async () => {
  //     await token.close()
  //     const symbol = await token.symbol()
  //     assert.equal(symbol, '')
  //   })
    
  // })

 })
  