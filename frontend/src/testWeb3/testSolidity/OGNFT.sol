// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract OGNFT is ERC721Enumerable {

    string metadataUri;

    uint maxAMount;

    constructor(string memory _name, string memory _symbol, string memory _metadataUri, uint _maxAmount) ERC721(_name,_symbol) {
        metadataUri = _metadataUri;
        maxAMount = _maxAmount;
    } 

    function mintNFT() public {
        require(totalSupply() < maxAMount, "no more mint");
        uint tokenId = totalSupply() + 1;
        _mint(msg.sender, tokenId);

        // metadataUri[tokenId] = _metadataUri;
    }

    function tokenURI(uint _tokenId) public override view returns(string memory){
        return string(abi.encodePacked(metadataUri,'/',Strings.toString(_tokenId),'.json'));
    }

    function deposit() public payable {
    msg.value;
  }

  function getMyNftTokenId_OG(address _user) public view returns(uint[] memory) {
        uint OGNftNum = balanceOf(_user);
        uint[] memory MyOGNfts = new uint[](OGNftNum);
        uint count;
        for (uint i = 1; ; i++) {
            if(_user == _ownerOf(i)) {
            MyOGNfts[count] = i;
            count++;
            }
            if (count == OGNftNum) {
                return MyOGNfts;     
            }
        }
    }
}




