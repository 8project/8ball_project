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

    uint private listingId = 1; 
    
    /*
    토큰 등록 
    */
    function listPieceTokenForSale(uint _tokenId, uint _price) public {
        PieceNftList[listingId] = listPiece(pieceStatus.Active, msg.sender, _tokenId, _price);
        listingId++;
    }

    /*
    토큰구매
    */
    function buyPieceToken(uint _index) public payable {
        // require(PieceNftList[ _listingNum].status == pieceStatus.Active, "This NFT is not available");
        // require(msg.sender != PieceNftList[ _listingNum].seller, "Seller cannot buy");
        // require(msg.value >= PieceNftList[ _listingNum].price,"Insufficient payment");    
        //1. 돈받기
        msg.value;
        //2. nft주기
        Market2.transferFrom(PieceNftList[_index].seller, msg.sender, PieceNftList[_index].tokenId);
        //3. 돈 주기
        payable(PieceNftList[_index].seller).transfer(PieceNftList[_index].price); 
     
        // PieceNftList[_index].status == pieceStatus.Sold;
        // emit MoneyReceived(msg.sender, msg.value);
    }
    


    /*
    nft 판매 취소 
    */
    function cancelSale(uint _index) public {
        require(PieceNftList[_index].seller == msg.sender, "Only seller can cancel list");
        require(PieceNftList[_index].status == pieceStatus.Active, "This Piece NFT is not on sale");
        
        delete PieceNftList[_index];
        // emit CancelSale(msg.sender, PieceNftList[_listingNum].tokenId);
    }

    
}