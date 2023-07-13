// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./OGNFT.sol";


contract Market is ERC721Enumerable {

    ERC721 public OG;

    // address private manager; 
    string public URI;  

  constructor (/*address _manager,*/ string memory _URI, address _OGAddress) ERC721("Market", "MRK") {
        // manager = _manager;
        URI = _URI;
        OG = OGNFT(_OGAddress);
    }

    struct OGNft {
        address seller;
        address OGContractAddress;
        uint OGTokenId;
        uint price;
        address[] buyer; 
    }

    mapping (uint => OGNft) public OGNftList;

    uint private OGIndex = 1; 
    
    /*
    판매등록
    */
    // event GETPRICE(uint price);
    
    function listForSale(address _OGContractAddress, uint _OGTokenId, uint _price) public {
        //ownercheck 기능 
       OG.transferFrom(tx.origin,address(this),_OGTokenId);

        (OGNftList[OGIndex].seller, OGNftList[OGIndex].OGContractAddress, OGNftList[OGIndex].OGTokenId, OGNftList[OGIndex].price) = (msg.sender, _OGContractAddress, _OGTokenId, _price);
        OGIndex++;
    }

    function OGListForSale_buyerList(uint _index) public view returns(address[] memory) {
        return OGNftList[_index].buyer;
    }

    function getOGNftList_price(uint _index) public view returns(uint){
        return OGNftList[_index].price;
    }

    /*
    기간만료
    (나누기 실패)
    */
    function overDuration(uint _index) public { //_index은 OGNFT의 등록순번이다.
        for (uint i; i<OGNftList[_index].buyer.length ; i++) {
            payable(OGNftList[_index].buyer[i]).transfer(OGNftList[_index].price);
        }

        OG.transferFrom(address(this),OGNftList[_index].seller, OGNftList[_index].OGTokenId);
        delete OGNftList[_index];
    }

    /*
    Funding
    */
    function OGFunding(uint _index) public payable { 
         require(OGNftList[_index].buyer.length < 20, "Financing is complete."); 
         require(msg.value >= OGNftList[_index].price/20);
        
         OGNftList[_index].buyer.push(msg.sender); 

         if (OGNftList[_index].buyer.length == 20) {
            distributePiece(_index);
            FundingPriceToSeller(_index);

        }
    }

    function OGBatchFunding(uint _index) public payable { 
         require(OGNftList[_index].buyer.length < 20, "Financing is complete."); 
         require(msg.value >= OGNftList[_index].price - 1);
        for(uint i=0; i<19; i++){
            OGNftList[_index].buyer.push(msg.sender); 
        }

       if (OGNftList[_index].buyer.length == 20) {
            distributePiece(_index);
            FundingPriceToSeller(_index);
        
        }
    }
   
    /*
    EVENT
        > event확인 후 판매자에게 판매금액을 보낸다.
    */
    event FUNDING(string funding, uint OGNftList_index);

    /*
    모집금액 seller에게 전달
    */
    function FundingPriceToSeller(uint _index) public { 
        // require (manager == msg.sender, "You are not the manager");
        payable(OGNftList[_index].seller).transfer(OGNftList[_index].price);
    }

    /*
    조각 buyer에게 전달
    */
    function distributePiece(uint _index) public { 
        //  require (manager == msg.sender,"Invalid");
        uint _tokenId = OGNftList[_index].OGTokenId;
        uint j;
        for (uint i=20*_tokenId-19; i<=20*_tokenId; i++) {
            _mint(OGNftList[_index].buyer[j], i);
            j++;
        }
        currentPolls[_tokenId].OGNft_tokenId = _tokenId;//인풋으로 인덱스가 아니라 list tokenId를 넣어줘야ㅕ함 
    }
    
    function tokenURI(uint _tokenId) override public view returns(string memory) {
         return string(abi.encodePacked(URI,'/',Strings.toString(_tokenId),'.json'));
    }

    enum pollStatus {
        onGoing,
        passed,
        rejected
    }
    
    /*
    투표 구조체  
    */
    struct poll {
        uint OGNft_tokenId;//OGNft_tokenId = 3
        address by;//투표를 만드는 주체
        uint bestOfferPrice; // 주체의 제안 가격 
        uint pros; //찬성 투표 수 
        uint cons; //반대 투표 수 
        address[] votedAddressList;
    }

    struct offer{
        uint OGNft_tokenId;
        address[] account;
        uint[] amount;
    }

    function getOfferAccount(uint _index) public view returns(address[] memory ) {
        return (offerList[_index].account);
    }
    function getOfferAmount(uint _index) public view returns(uint[] memory ) {
        return (offerList[_index].amount);
    }

    /*
    pieceNFT owner
    */
    mapping(uint => poll) public currentPolls;

    function getVotedAddressList(uint _index) public view returns(address[] memory) {
        return currentPolls[_index].votedAddressList;
    }

    /*
    3일동안 나온 제안을 모아두는 곳.
    */
     mapping(uint => offer) public offerList;

    function CheckOutPieceOwner(uint _tokenId, address _owner) public view returns(bool) {
        for (uint i=20*_tokenId-19; i<=20*_tokenId; i++) {
            if(ownerOf(i) == _owner) {
                return true;
            }
        }
        return false;
    }
    

    //가격 제안 
    function offering(uint _index) public payable {
        offerList[_index].OGNft_tokenId = currentPolls[_index].OGNft_tokenId;
        offerList[_index].account.push(msg.sender);
        offerList[_index].amount.push(msg.value);
    }

    // 오퍼된 금액들 중 최고가 추적
    function trackingBestOffer(uint _index) public returns(uint) {
        for(uint i=0; i<offerList[_index].account.length-1; i++){
            for(uint j=i+1; j<offerList[_index].account.length; j++){
                if(offerList[_index].amount[i] < offerList[_index].amount[j]) {
                    (offerList[_index].account[i], offerList[_index].account[j]) = (offerList[_index].account[j], offerList[_index].account[i]);
                    (offerList[_index].amount[i], offerList[_index].amount[j]) = (offerList[_index].amount[j], offerList[_index].amount[i]);
                }
            }   
        }
        return offerList[_index].amount[0];
    }

    //최고입찰가로 제안 뽑기
    function getBestOffer(uint _index) public {
        for(uint i=0; i<offerList[_index].account.length-1; i++){
            for(uint j=i+1; j<offerList[_index].account.length; j++){
                if(offerList[_index].amount[i] < offerList[_index].amount[j]) {
                    (offerList[_index].account[i], offerList[_index].account[j]) = (offerList[_index].account[j], offerList[_index].account[i]);
                    (offerList[_index].amount[i], offerList[_index].amount[j]) = (offerList[_index].amount[j], offerList[_index].amount[i]);
                }
            }   
        }
        uint _tokenId = OGNftList[_index].OGTokenId;
        (currentPolls[_tokenId].by, currentPolls[_tokenId].bestOfferPrice) = (offerList[_index].account[0], offerList[_index].amount[0]);
    } 


    function userNumberOfCanVote(uint _tokenId) public view returns(uint) {
        uint count;
        for (uint i=20*_tokenId-19; i<=20*_tokenId; i++) {
            if(ownerOf(i) == msg.sender) {
                count++;
            }
        }
        return count;
    }

    function startVote(uint _tokenId, bool _vote) public {
        //require(오너여야함)
        //pros + cons  <21
        require(currentPolls[_tokenId].by != address(0)); // currentPoll.by 설정된 후에 시작할 수 있도록
        currentPolls[_tokenId].votedAddressList.push(msg.sender);
        if(_vote == true) {
            currentPolls[_tokenId].pros++;
           currentPolls[_tokenId].votedAddressList.push(msg.sender);
        } else if(_vote == false) {
            currentPolls[_tokenId].cons++;
            currentPolls[_tokenId].votedAddressList.push(msg.sender);
        }
    }

    function startBatchVote(uint _tokenId, bool _vote, uint _number) public {
        //require(오너여야함)
        //pros + cons  <21
        require(currentPolls[_tokenId].by != address(0)); // currentPoll.by 설정된 후에 시작할 수 있도록
        currentPolls[_tokenId].votedAddressList.push(msg.sender);
        if(_vote == true) {
            currentPolls[_tokenId].pros = currentPolls[_tokenId].pros + _number;
            for(uint i; i<_number ; i++) {
                 currentPolls[_tokenId].votedAddressList.push(msg.sender);
            }
        } else if(_vote == false) {
            currentPolls[_tokenId].cons = currentPolls[_tokenId].cons + _number;
            for(uint i; i<_number ; i++) {
            currentPolls[_tokenId].votedAddressList.push(msg.sender);
            }
        }
    }
    
    function voteResult(uint _tokenId) public {
        //찬성되면 nft는 currentpoll의 by에게 전달되고 돈은 홀더들에게 전달
        if(currentPolls[_tokenId].pros > 10) {
            OG.safeTransferFrom(address(this), currentPolls[_tokenId].by, _tokenId);
            //홀더들에게 나눠주기 
        } else {
            //_by에게 돈은 돌려주기 
            payable(currentPolls[_tokenId].by).transfer(currentPolls[_tokenId].bestOfferPrice);
        }
    }

    function changePieceToEth(uint _tokenId) public {
        payable(ownerOf(_tokenId)).transfer((currentPolls[_tokenId].bestOfferPrice)/20); 
        _burn(_tokenId);
    }
    function TESTburnNFT(uint _tokenId) public {
        require(msg.sender == ownerOf(_tokenId), "Caller is not token owner.");

        _burn(_tokenId);
    }

    function getMyNftTokenId_Piece(address _user) public view returns(uint[] memory) {
        uint pieceNftNum = balanceOf(_user);
        uint[] memory MyNPieceNfts = new uint[](pieceNftNum);
        uint count;
        for (uint i = 1; ; i++) {
            if(_user == _ownerOf(i)) {
            MyNPieceNfts[count] = i;
            count++;
            }
            if (count == pieceNftNum) {
                return MyNPieceNfts;     
            }
        }
    }
    function TESTMint(uint _tokenId) public {
        _mint(msg.sender, _tokenId);
    }

    function aaa() public payable {
        msg.value;
    }
}