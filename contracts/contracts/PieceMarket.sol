// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

//내가 쓴 transferFrom이 맞는지 확인 필요.
contract buyPiece is ERC721 {
    constructor(string memory name, string memory symbol) ERC721(name,symbol) {}

    enum pieceStatus {
        Active,
        Sold,
        Cancelled
    }

  struct listPiece {
    pieceStatus status;
    address seller;
    uint tokenId;
    uint price;
  }
  /*
  EVENT
  */
  event ListToken(address sender, uint tokenId);
  event MoneyReceived(address sender, uint amount);
  event CancelSale(address sender, uint tokenId);

  mapping(uint => listPiece) public listOfPiece; // uint = tokenId 

  uint private listingId = 0; 
    /*
    토큰 등록 
    */
  function listPieceToken(/*address _tokenContract,*/ uint _tokenId, uint _price) external {
      //require(token주인인지)
      transferFrom(msg.sender, address(this), _tokenId);
      listOfPiece[listingId] = listPiece(pieceStatus.Active, msg.sender, _tokenId, _price);
      listingId++;
      emit ListToken(msg.sender, _tokenId);
    }

    /*
    토큰구매
    */
  function buyPieceToken(uint  _listingNum) external payable {
      require(listOfPiece[ _listingNum].status == pieceStatus.Active, "This NFT is not available");
      require(msg.sender != listOfPiece[ _listingNum].seller, "Seller cannot buy");
      require(msg.value >= listOfPiece[ _listingNum].price,"Insufficient payment");    
      //1. 돈받기
      msg.value;
    
      //2. nft주기
      transferFrom(address(this), msg.sender,listOfPiece[ _listingNum].tokenId);

      listOfPiece[ _listingNum].status == pieceStatus.Sold;
      emit MoneyReceived(msg.sender, msg.value);
    }

    /*
    nft 판매 취소 
    */
function cancelOfSale(uint _listingNum) public {
    require(listOfPiece[_listingNum].seller == msg.sender, "Only seller can cancel list");
    require(listOfPiece[_listingNum].status != pieceStatus.Active, "This Piece NFT is not on sale");
    
    listOfPiece[_listingNum].status = pieceStatus.Cancelled;

    transferFrom(address(this), msg.sender, listOfPiece[_listingNum].tokenId);
    emit CancelSale(msg.sender, listOfPiece[_listingNum].tokenId);
  }
}