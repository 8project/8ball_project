// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
/*
추가 목록 : emit ierc21에서 가져오는법
*/

contract buyPiece {


  enum pieceStatus {
    Active,
    Sold,
    Cancelled
  }

  struct listPiece {
    pieceStatus status;
    address seller;
    address token; //token contract
    uint tokenId;
    uint price;
  }

  mapping(uint => listPiece) listOfPiece;

  uint private listingId = 0; //아이디가 증가하기만하는데 팔리면 그 번호에 다음 번호가 담기게할 수 있나

  function listPieceToken(address token, uint tokenId, uint price) external {
    
    //(transfer nft) import는 했는데 아직 함수 가져와서 쓰는법을 모름 < 인스턴스 화 시켜서 사용해야함, 컨트랙트 주소가 필요한 이유 찾기 
    // transferFrom(msg.sender, address(this),tokenId);

    listPiece memory listingPiece = listPiece(pieceStatus.Active, msg.sender, token, tokenId, price);

    listOfPiece[listingId] = listingPiece;

    listingId++;
  }

  function buyPieceToken(uint listingId) external payable {
    require(listOfPiece[listingId].status != pieceStatus.Sold, "This NFT is already sold");
    listPiece storage listingPiece = listOfPiece[listingId];

    require(msg.sender != listingPiece.seller, "Seller cannot buy");
    require(listingPiece.status == pieceStatus.Active, "Invalid list of NFT");
    require(msg.value >= listingPiece.price,"Insufficient payment");


    payable(listingPiece.seller).transfer(listingPiece.price);
     //(transfer nft)
     listingPiece.status == pieceStatus.Sold; 
  }
  
  function cancelOfSale(uint listingId) public {
    listPiece storage listingPiece = listOfPiece[listingId];

    require(listingPiece.status != pieceStatus.Active, "This Piece NFT is not on sale");
    require(listingPiece.status == pieceStatus.Active, "Only seller can cancel list");

    listingPiece.status = pieceStatus.Cancelled;

    // IERC721(listing.token).transferFrom(address(this), msg.sender, listing.tokenId); 
    
  }
}