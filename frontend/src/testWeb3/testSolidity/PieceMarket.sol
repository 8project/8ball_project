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
        notActive,
        Active
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

    mapping(uint => listPiece) public PieceNftList; 
    
    /*
    토큰 등록 
    */
    function listPieceTokenForSale(uint _tokenId, uint _price) public {
        address owner = Market2.ownerOf(_tokenId);
        Market2.transferFrom(owner,address(this),_tokenId);
        PieceNftList[_tokenId] = listPiece(pieceStatus.Active, msg.sender, _tokenId, _price);
    }

    /*
    토큰구매
    */
    function buyPieceToken(uint _tokenId) public payable {
        // require(PieceNftList[ _listingNum].status == pieceStatus.Active, "This NFT is not available");
        // require(msg.sender != PieceNftList[ _listingNum].seller, "Seller cannot buy");
        // require(msg.value >= PieceNftList[ _listingNum].price,"Insufficient payment");    
        //1. 돈받기
        msg.value;
        //2. nft주기
        Market2.transferFrom(address(this), msg.sender, PieceNftList[_tokenId].tokenId);
        //3. 돈 주기
        payable(PieceNftList[_tokenId].seller).transfer(PieceNftList[_tokenId].price); 

        PieceNftList[_tokenId].status == pieceStatus.notActive;
        delete PieceNftList[_tokenId];
        // emit MoneyReceived(msg.sender, msg.value);
    }
    


    /*
    nft 판매 취소 
    */
    function cancelSale(uint _tokenId) public {
        require(PieceNftList[_tokenId].seller == msg.sender, "Only seller can cancel list");
        require(PieceNftList[_tokenId].status == pieceStatus.Active, "This Piece NFT is not on sale");
        Market2.transferFrom(address(this), msg.sender, PieceNftList[_tokenId].tokenId);
        delete PieceNftList[_tokenId];
        // emit CancelSale(msg.sender, PieceNftList[_listingNum].tokenId);
    }
 
}