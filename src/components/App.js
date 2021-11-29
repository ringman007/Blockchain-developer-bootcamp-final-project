import React, { Component } from 'react'; 
import Web3 from 'web3';
import './App.css';
import MemoryToken from '../abis/MemoryToken.json';



const CARD_ARRAY = [
  {
    name: 'fries',
    img: '/images/fries.png'
  },
  {
    name: 'cheeseburger',
    img: '/images/cheeseburger.png'
  },
  {
    name: 'ice-cream',
    img: '/images/ice-cream.png'
  },
  {
    name: 'pizza',
    img: '/images/pizza.png'
  },
  {
    name: 'milkshake',
    img: '/images/milkshake.png'
  },
  {
    name: 'hotdog',
    img: '/images/hotdog.png'
  },
  {
    name: 'fries',
    img: '/images/fries.png'
  },
  {
    name: 'cheeseburger',
    img: '/images/cheeseburger.png'
  },
  {
    name: 'ice-cream',
    img: '/images/ice-cream.png'
  },
  {
    name: 'pizza',
    img: '/images/pizza.png'
  },
  {
    name: 'milkshake',
    img: '/images/milkshake.png'
  },
  {
    name: 'hotdog',
    img: '/images/hotdog.png'
  }
]


class App extends Component {

  // componentWillMount from React is executed before rendering 
  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchaindata()
    
  //Note to myself - Show picture or open cards instead. 
    this.setState({ cardArray: CARD_ARRAY })
  }

  // Detects the presence of MetaMask (1/5)
  // Connects to the current account (2/5)
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
      

    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }
  
  async loadBlockchaindata() {
      const web3 = window.web3
      const accounts = await web3.eth.getAccounts()
      this.setState({account : accounts[0] })
      const networkId = await web3.eth.net.getId()
      const networkData = MemoryToken.networks[networkId];
      
      // if(networkData == null) {
      //   alert("I am null");
      //   alert("network id is =" + networkId);
      // }
      // alert(networkData.toString());
      // try {
      //   const networkData = MemoryToken.networks[networkId];
      //   
      // }catch(Exception e) {
      //   Logger.error(e.message);
      // }


    if(networkData) {
      const abi = MemoryToken.abi
      const address = networkData.address
      const token = new web3.eth.Contract(abi, address)
      const memoryToken = new web3.eth.Contract(abi,address)
      this.setState({ memoryToken: memoryToken })
      console.log(this.state.memoryToken)
      this.setState({ token: token })
      const totalSupply = await token.methods.totalSupply().call()
      this.setState({ totalSupply: totalSupply })
      const transactions = await token.getPastEvents('Transfer', { fromBlock: 0, toBlock: 'latest', filter: { from: this.state.account } })
      this.setState({ transactions: transactions })
      const balance = await token.methods.balanceOf(this.state.account).call()
      this.setState({ balance: web3.utils.fromWei(balance.toString(), 'Ether') })  
      // const allowedToPlay = await this.state.memoryToken.methods.allowedToPlay(address).call()
      // this.setState({ allowedToPlay: allowedToPlay })
      // const mintCount = await this.state.memoryToken.methods.mintCount(address).call()
      // this.setState({ mintCount: mintCount})
    
      // Load Tokens
      let balanceOf = await token.methods.balanceOf(accounts[0]).call()
      for (let i = 0; i < balanceOf; i++) {
        let id = await token.methods.tokenOfOwnerByIndex(accounts[0], i).call()
        let tokenURI = await token.methods.tokenURI(id).call()
        this.setState({
          tokenURIs: [...this.state.tokenURIs, tokenURI]
        })
      }
    } else {
      alert('Smart contract not deployed to dected network')
    }
  }
  async startGame() {
    const gameFee = await this.state.memoryToken.methods.gameFee().call()
    this.setState({ cardArray: CARD_ARRAY.sort(() => 0.5 - Math.random()) })
    this.setState({ gameFee: gameFee })
    this.state.memoryToken.methods.payFee(gameFee).send({ from: this.state.account, value: gameFee  })
    // this.setState({ cardArray: CARD_ARRAY.sort(() => 0.5 - Math.random()) })
    this.setState({ cardArray: CARD_ARRAY })
  }

  

  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      token: null,
      totalSupply: 0,
      tokenURIs: [],
      frontPic: [], 
      cardArray: [],
      cardsChosen: [],
      cardsChosenId: [],
      cardsWon: [],
      transactions:[],
      balance: 0,
      allowedToPlay: false,
      mintCount: 0,
      contract: '',
      memoryToken: null,

    }
    this.startGame = this.startGame.bind(this)
    
  }

  chooseImage = (cardId) => {
    cardId = cardId.toString()
    if (this.state.cardsWon.includes(cardId)) {
      return window.location.origin + '/images/white.png'
    } else if (this.state.cardsChosenId.includes(cardId)) {
      return CARD_ARRAY[cardId].img
    } else {
      return window.location.origin + '/images/blank.png'
    }
  }

  flipCard = async (cardId) => {
    let alreadyChosen = this.state.cardsChosen.length
    this.setState({ 
      cardsChosen: [...this.state.cardsChosen, this.state.cardArray[cardId].name],
      cardsChosenId: [...this.state.cardsChosenId, cardId]
    })

    if (alreadyChosen === 1) {
      setTimeout(this.checkForMatch, 100)
    }
  }

  checkForMatch = async () => {
    const optionOneId = this.state.cardsChosenId[0]
    const optionTwoId = this.state.cardsChosenId[1]

    if(optionOneId === optionTwoId) {
      alert('you have clicked the same image')
    } else if (this.state.cardsChosen[0] === this.state.cardsChosen[1]) {
      alert('You founnd a match!')
      this.state.token.methods.mint(
        this.state.account,
        window.location.origin + CARD_ARRAY[optionOneId].img.toString()
      )
      .send({ from: this.state.account })
      .on('transactionHash', (hash) => {
        this.setState({ 
          cardsWon: [...this.state.cardsWon, optionOneId, optionTwoId],
          tokenURIs: [...this.state.tokenURIs, CARD_ARRAY[optionOneId].img]
        })
      })
    } else {
        alert('try again')
      }
      this.setState({ 
        cardsChosen: [],
        cardsChosenId: []
      })
      if (this.state.cardsWon.length === CARD_ARRAY.length){
        alert('congratulations u matched all')
      }
  }

  
  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="http://www.url.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
          
          &nbsp; NFT Memory Game - Match and mint your own NFT
          </a>
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
              
              {/* Displays information from your smart contract (3/5)  */}
              <small className="text-muted"><span id="account">{this.state.account}</span></small>
            </li>
          </ul>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <h1 className="d-4">Press button to start the game</h1>

                <span><div >
                {/* Allows a user to submit a transaction to update smart contract state (4/5) */}
                  <button 
                        onClick = {this.startGame}>  Start Game  
                  </button>
                </div></span>

                <div className="grid mb-4" >

                  {/* Allows a user to submit a transaction to update smart contract state (4/5) */}
                  { this.state.cardArray.map((card, key) => {
                    return(
                      <img 
                        alt ="something"
                        key = {key}
                        src = {this.chooseImage(key)}
                        data-id = {key}
                        onClick={(event) => {
                          let cardId = event.target.getAttribute('data-id')
                          if(!this.state.cardsWon.includes(cardId.toString())) {
                            this.flipCard(cardId)
                          }
                        }}
                      />  
                    )
                  })}
                </div>

                <div>

                  {/* Updates the frontend if the transaction is successful or not (5/5) */}
                  <h5> Number of Tokens Collected: <span id="result">&nbsp;{this.state.tokenURIs.length}</span></h5> 

                  <div className="grid mb-4" >

                    {this.state.tokenURIs.map((tokenURI, key) => {
                      return(
                        <img 
                          alt = " something 2"
                          key ={key} 
                          src = {tokenURI} 
                        />
                      )
                    })}

                  </div>

                </div>

              </div>

            </main>
          </div>
        </div>
        
      </div>

      
    );
  }
}

export default App;
