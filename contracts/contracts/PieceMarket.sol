// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "./Market.sol";

contract PieceMarket is ERC721Enumerable {
    Market Market2;

    constructor(address _MarketAddress) ERC721("PieceMarket","PMRK") {
        Market2 = Market(_MarketAddress);
    }

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
    event LISTTOKEN(address sender, uint tokenId, uint price);
    

    mapping(uint => listPiece) public listOfPiece; 
    
    function checkOfferList_index(uint _tokenId) public pure returns(uint) {
        uint A;
        uint Z;
        for(uint i=1; ; i++) {
            A = 20*i -19;
            Z = 20*i;
            if(A<=_tokenId && _tokenId <=Z) {
                return i;
            }
        }
        return 0; // 0은 없다는 뜻이다.
    }

    /*
    토큰 등록 
    */
    function listPieceToken(uint _tokenId, uint _price) public {
        // require(Market2.ownerOf(_tokenId) == msg.sender);
        uint j = checkOfferList_index(_tokenId);
        require(Market2.getOfferStatus(j) == Market2.getOfferStatus_onGoing()); // 투표가 시작되기 전까지만 거래할 수 있도록 제한함
        listOfPiece[_tokenId] = listPiece(pieceStatus.Active, msg.sender, _tokenId, _price);

        emit LISTTOKEN(msg.sender, _tokenId, _price);
    }

    /*
    토큰 판매 가격 수정
    */
    function changePieceTokenPrice(uint _tokenId, uint _price) public {
        listOfPiece[_tokenId].price = _price;
    }

    /*
    토큰구매
    */
    function buyPieceToken(uint _tokenId) public payable {
        // require(listOfPiece[ _tokenId].status == pieceStatus.Active, "This NFT is not available");
        // require(msg.sender != listOfPiece[ _tokenId].seller, "Seller cannot buy");
        // require(msg.value >= listOfPiece[ _tokenId].price,"Insufficient payment");    
     
        //1. nft주기
        Market2.transferFrom(listOfPiece[_tokenId].seller, msg.sender, listOfPiece[_tokenId].tokenId);
        //2. 돈 주기
        payable(listOfPiece[_tokenId].seller).transfer(listOfPiece[_tokenId].price);
     
        // listOfPiece[_tokenId].status == pieceStatus.Sold;
        delete listOfPiece[_tokenId];
    }
   
    /*
    nft 판매 취소 
    */
    function cancelOfSale(uint _tokenId) public {
        require(listOfPiece[_tokenId].seller == msg.sender, "Only seller can cancel list");
        require(listOfPiece[_tokenId].status == pieceStatus.Active, "This Piece NFT is not on sale");
        
        delete listOfPiece[_tokenId];
    }

}