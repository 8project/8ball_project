// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract OGNFT is ERC721Enumerable {
    //https://olbm.mypinata.cloud/ipfs/QmU52T5t4bXtoUqQYStgx39DdXy3gLQq7KDuF1F9g3E9Qy 강사님 피나타 주소로 배포할 것 
    string public URI;

    uint maxAMount;

    constructor(string memory _name, string memory _symbol, string memory _URI, uint _maxAmount) ERC721(_name,_symbol) {
        URI = _URI;
        maxAMount = _maxAmount;
    }

    function mintNFT() public {
        require(totalSupply() < maxAMount, "no more mint");
        uint tokenId = totalSupply() + 1;
        _mint(msg.sender, tokenId);

        // metadataUri[tokenId] = _metadataUri;
    }

    function tokenURI(uint _tokenID) public override view returns(string memory) {
        return string(abi.encodePacked(URI,'/', Strings.toString(_tokenID), '.json'));
    } 

    function deposit() public payable {
    msg.value;
  }
}