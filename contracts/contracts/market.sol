// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./OGNFT.sol";


contract Market is ERC721Enumerable {

    OGNFT public OG;

    // address private manager; 
    // string public URI; 

  constructor (/*address _manager, string memory _URI,*/ address _OGAddress) ERC721("Market", "MRK") {
        // manager = _manager;
        // URI = _URI;
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

    uint private index = 1; 
    
    /*
    판매등록
    */
    function listForSale(address _OGContractAddress, uint _OGTokenId, uint _price) public {
        //ownercheck 기능 
        OG.transferFrom(tx.origin,address(this),_OGTokenId);

        (OGNftList[index].seller, OGNftList[index].OGContractAddress, OGNftList[index].OGTokenId, OGNftList[index].price) = (msg.sender, _OGContractAddress, _OGTokenId, _price);
        index++;
    }

    function OGListForSale_buyerList(uint _index) public view returns(address[] memory) {
        return OGNftList[_index].buyer;
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
         emit FUNDING("Financing is complete", _index);
         //+ pieceNFT 배분
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
        for (uint i=0; i<OGNftList[_index].buyer.length; i++) {
            _mint(OGNftList[_index].buyer[i], i);
        }
        currentPolls[_index].OGNFT_index = _index;
    }
    
    function tokenURI(uint _tokenId) override public view returns(string memory) {
       // return string(abi.encodePacked(URI,'/',Strings.toString(_tokenId),'.json'));
    }


    /*
    투표 구조체 
    */
    struct poll {
        uint OGNFT_index;
        address by;//투표를 만드는 주체
        uint bestOfferPrice; // 주체의 제안 가격 
        uint pros; //찬성 투표 수 
        uint cons; //반대 투표 수 
        address[] votedAddressList;
    }

    enum offerStatus {
        onGoing,
        done
    }

    struct offer{
        offerStatus Offer_Status;
        uint OGNFT_index;
        address[] account;
        uint[] amount;
    }

    function getOffer_Address(uint _index) public view returns(address[] memory, uint[] memory ) {
        return (offerList[_index].account, offerList[_index].amount);
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

    function getOfferStatus(uint _index) public view returns(uint8) {
        return uint8(offerList[_index].Offer_Status);
    }

    //가격 제안 
    function offering(uint _index, uint _amount) public payable {
        require(OGNftList[_index].buyer.length == 20);
        require(_amount >= msg.value);
        offerList[_index].Offer_Status = offerStatus.onGoing;
        offerList[_index].OGNFT_index = _index;
        offerList[_index].account.push(msg.sender);
        offerList[_index].amount.push(_amount);
    }

    // 프론트에서 하기 - offer를 받은지 3일째가 되면 자동실행
    function Offer_Statusdone(uint _index) public {
        //require (manager == msg.sender);
        offerList[_index].Offer_Status = offerStatus.done;
    }

    //최고입찰가로 제안 뽑기
    function getBestOffer(uint _index) public {
        require (offerList[_index].Offer_Status == offerStatus.done); // 3일째가 되면 최고가 결정
        for(uint i=0; i<offerList[_index].account.length-1; i++){
            for(uint j=i+1; j<offerList[_index].account.length; j++){
                if(offerList[_index].amount[i] < offerList[_index].amount[j]) {
                    (offerList[_index].account[i], offerList[_index].account[j]) = (offerList[_index].account[j], offerList[_index].account[i]);
                    (offerList[_index].amount[i], offerList[_index].amount[j]) = (offerList[_index].amount[j], offerList[_index].amount[i]);
                }
            }   
        }
        (currentPolls[_index].by, currentPolls[_index].bestOfferPrice) = (offerList[_index].account[0], offerList[_index].amount[0]);
        giveBackOfferAmount(_index);
    } 

    function giveBackOfferAmount(uint _index) public {
        for(uint i=1; i<offerList[_index].account.length ; i++) {
            payable(offerList[_index].account[i]).transfer(offerList[_index].amount[i]);
        }
    }

    function checkVoteAddressList(uint _index, address _voter) public view returns(uint) {
        uint count;
        for (uint i=0; i<currentPolls[_index].votedAddressList.length ; i++)  {
            if(keccak256(abi.encodePacked(_voter)) == keccak256(abi.encodePacked(currentPolls[_index].votedAddressList[i]))) {
                count++;
            }
        }
        return count;
    }

    function startVote(uint _index, bool _vote) public {
        require(OGNftList[_index].buyer.length == 20, "Financing is complete."); // 펀딩이 완료된 상품만 투표 가능
        require(checkVoteAddressList(_index,msg.sender) == 0, "already voted"); //require() 투표를 하지 않았어야함
        require(currentPolls[_index].by != address(0)); // currentPoll.by 설정된 후에 시작할 수 있도록
        currentPolls[_index].votedAddressList.push(msg.sender);
        if(_vote == true) {
            currentPolls[_index].pros++;
        } else if(_vote == false) {
            currentPolls[_index].cons++;
        }
    }
    
    function voteResult(uint _index,uint _OGTokenId) public {
        //찬성되면 nft는 currentpoll의 by에게 전달되고 돈은 홀더들에게 전달
        if(currentPolls[_index].pros >= 10) {

            OG.transferFrom(address(this), currentPolls[_index].by, _OGTokenId);
            // 홀더들에게 나눠주기
            for(uint i=0; i<20; i++){
                payable(ownerOf(i)).transfer((currentPolls[_index].bestOfferPrice)/20);
                delete currentPolls[_index];
                delete offerList[_index];

            } 
        } else {
            //_by에게 돈은 돌려주기 
            payable(currentPolls[_index].by).transfer(currentPolls[_index].bestOfferPrice);
            delete currentPolls[_index];
            delete offerList[_index];
            
            Offer_StatusOnGoing(_index);
        }
    }

    function Offer_StatusOnGoing(uint _index) public {
        offerList[_index].Offer_Status = offerStatus.onGoing;
    }

    function TestMint(uint _tokenId) public {
        _mint(msg.sender, _tokenId);
    }

}