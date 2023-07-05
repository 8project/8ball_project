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
    
    // 판매자 정보 가져올 때 사용
    event LIST_FOR_SALE(string Sales, address seller); 

    // 펀딩완료시 distributePiece, FundingPriceToSeller 자동실행
    event FUNDING(string funding, uint OGNftList_index);

    /*
    판매등록
    */
    function listForSale(address _OGContractAddress, uint _OGTokenId, uint _price) public {
        //require(OG.ownerOf(_OGTokenId) == msg.sender);
        OG.transferFrom(tx.origin,address(this),_OGTokenId);

        (OGNftList[index].seller, OGNftList[index].OGContractAddress, OGNftList[index].OGTokenId, OGNftList[index].price) = (msg.sender, _OGContractAddress, _OGTokenId, _price);
        index++;

        emit LIST_FOR_SALE("Sales Registration Completed", msg.sender);
    }

    function OGListForSale_buyerList(uint _index) public view returns(address[] memory) {
        return OGNftList[_index].buyer;
    }

    function getOGNftList(uint _index) public view returns(address, address, uint, uint) {
        return (OGNftList[_index].seller, OGNftList[_index].OGContractAddress, OGNftList[_index].OGTokenId, OGNftList[_index].price);
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
        require(msg.value >= OGNftList[_index].price/20 + OGNftList[_index].price/200);  // 수수료와 함께 지불

        OGNftList[_index].buyer.push(msg.sender); 

        if (OGNftList[_index].buyer.length == 20) {
            emit FUNDING("Financing is complete", _index);
            distributePiece(_index);
            FundingPriceToSeller(_index);
            payable(msg.sender).transfer(OGNftList[_index].price/400); // 20번째 투자자에게 수수료의 일부분 지급
        }
    }
   
    /*
    EVENT
        > event확인 후 판매자에게 판매금액을 보낸다.
    */
    

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
        for (uint i=1; i<OGNftList[_index].buyer.length + 1; i++) {
            _mint(OGNftList[_index].buyer[i-1], i);
        }
        currentPolls[_index].OGNFT_index = _index;
    }

    function OGTokenURI(uint _index) public view returns(string memory) {
        // require(OG.ownerOf(_index) == msg.sender);
        return OG.tokenURI(_index);
    }
    
    function tokenURI(uint _tokenId) override public view returns(string memory) {
        // require(ownerOf(_tokenId) == msg.sender);
       // return string(abi.encodePacked(URI,'/',Strings.toString(_tokenId),'.json'));
    }


    /*EVENT*/
    event BEST_OFFER(address offer, uint bestPrice);
    event VOTING(string funding, uint OGNftList_index);
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

    function getOfferStatus(uint _index) public view returns(offerStatus) {
        return offerList[_index].Offer_Status;
    }

    function getOfferStatus_onGoing() public pure returns(offerStatus) {
        offerStatus a;
        a = offerStatus.onGoing;
        return a;
    }


    //가격 제안 
    function offering(uint _index) public payable {
        require(OGNftList[_index].buyer.length == 20 && currentPolls[_index].OGNFT_index != 0);

        offerList[_index].Offer_Status = offerStatus.onGoing;
        offerList[_index].OGNFT_index = _index;
        offerList[_index].account.push(msg.sender);
        offerList[_index].amount.push(msg.value);
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
        
        //emit이 실행되면 자동으로 투표시작할 수 있게끔
        emit BEST_OFFER(currentPolls[_index].by,currentPolls[_index].bestOfferPrice);
    } 

    function giveBackOfferAmount(uint _index) public {
        for(uint i=0; i<offerList[_index].account.length ; i++) {
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

    function setMarketApprovalForAll() public {
        _setApprovalForAll(_msgSender(), address(this), true);
    }

    function startVote(uint _index, bool _vote) public {
        require(isApprovedForAll(msg.sender, address(this)) == true);
        require(OGNftList[_index].buyer.length == 20, "Financing is complete."); // 펀딩이 완료된 상품만 투표 가능
        require(checkVoteAddressList(_index,msg.sender) == 0, "already voted"); //require() 투표를 하지 않았어야함
        require(currentPolls[_index].by != address(0)); // currentPoll.by 설정된 후에 시작할 수 있도록
        currentPolls[_index].votedAddressList.push(msg.sender);
        if(_vote == true) {
            currentPolls[_index].pros++;
        } else if(_vote == false) {
            currentPolls[_index].cons++;
        } else if(currentPolls[_index].pros > 10) {
            //voteResult 함수 실행 
            emit VOTING("Vote is completed", _index);
        }

        if ((currentPolls[_index].pros + currentPolls[_index].cons) == 20) {
            payable(msg.sender).transfer(OGNftList[_index].price/400); // 20번째 투표자에게 수수료의 일부분 지급
            
            emit VOTING("Voting is complete", _index);
        }
    }

    
    
    function voteResult(uint _index) public {
        //찬성되면 nft는 currentpoll의 by에게 전달되고 돈은 홀더들에게 전달
        if(currentPolls[_index].pros > 10) {

            OG.transferFrom(address(this), currentPolls[_index].by, OGNftList[_index].OGTokenId);
            // 홀더들에게 나눠주기
            for(uint i=1; i<21; i++){
                payable(ownerOf(i)).transfer((currentPolls[_index].bestOfferPrice)/20);
                delete currentPolls[_index];
                delete offerList[_index];
                _burn(i);
            } 
        } else {
            //_by에게 돈은 돌려주기 
            payable(currentPolls[_index].by).transfer(currentPolls[_index].bestOfferPrice);
            delete currentPolls[_index];
            delete offerList[_index];
            
            Offer_StatusOnGoing(_index); // Piece Market에서 거래할 수 있게 함.
        }
    }

    function Offer_StatusOnGoing(uint _index) public {
        offerList[_index].Offer_Status = offerStatus.onGoing;
    }
}