// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

/// @title MemoryGame
/// @author ringman007
/// @dev Most function calls are made through the front end.
/// @dev There is a withdrawBalance, getBalance and selfdestruct function that are not linked to the frontend. 
import "./ERC721Full.sol";

// Design pattern 1: Inheritance
contract MemoryToken is ERC721Full {

    mapping(address => bool) public allowedToPlay;
    mapping (address => uint) public mintCount; 
    uint public gameFee = 10**17 wei; 
    address payable public  owner; 
    // uint public NFT_PRICE = 0.1 ether;

    //@dev Record the contract owner's address, set allowedToPlay to false and mintCount to 0 
    constructor() ERC721Full("Memory Token", "MEMORY") public {
        owner = msg.sender;
        allowedToPlay[msg.sender] = false;
        mintCount[msg.sender] = 0; 
    } 

    //@dev Design pattern 2: Restricting access
    //@dev Check if function caller is contract owner
    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    
    function sendEthToContract(address payable _to, uint _amount) public payable {
      
    }

    //@notice For contract owner to withdraw funds from smart contract, not callable from UI.
    //@dev Safety feature: Mitigates Denial of Service with Failed Call (SWC-113).
    function withdrawBalance() public onlyOwner returns(bool) {
        //@notice Ensures contract Blanace is not empty before withdrawing.
        require(address(this).balance > 0);
        //@notice Transfer the whole contract balance to contract owner.
        owner.transfer(address(this).balance);
        return true; 
    }

    //@notice View the contracts balance, not callable from UI.
    function getBalance() public view returns(uint) {
        return address(this).balance;
    }
    
    //@param uint takes 10**17 wei from gameFee. 
    function payFee(uint) public payable returns(bool) {
        //@notice Ensures gameFee is met to play the game.
        require(msg.value >= gameFee, "Minimum game fee is not met.");
         if (msg.value >= gameFee) {
             //@notice Setting allowedToPlay to true to activate mint function.
                allowedToPlay[msg.sender] = true;
                return true;
            } else {
                return false;
            }
    }

    //@param _to is the player address.
    //@param _tokenURI refers to the token URI of the mint. 
    function mint(address _to, string memory _tokenURI) public returns(bool) {
        //@notice Ensures player has payed before being able to mint.
        require(allowedToPlay[msg.sender] == true, "Please pay to game.");
        //@notice Mint an NFT
        require(allowedToPlay[msg.sender] == true, "Please pay to game.");
        uint _tokenId = totalSupply().add(1);
        _mint(_to, _tokenId);
        _setTokenURI(_tokenId, _tokenURI);
        //@notice Restricting mint ability again after mint. 
        allowedToPlay[msg.sender] = false;
        //@notice Keeping track of mintCount
        mintCount[msg.sender] += 1;
        return true;
    }

    //@notice Just to see what happens after a contract is destroyed, not callable from UI
    function close() public onlyOwner { 
        selfdestruct(owner); 
    }
    
   
    // For future use - implement the ability to add already preminted nfts to the game when you match them
    // do i need a seperate Contract for that?? 
    
    //function withdrawNFT() public {
    // }

}
