// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract BALL8 is ERC721Enumerable {
    constructor(string memory name, string memory symbol) ERC721(name,symbol) {}
    //투표 상태 
    /*enum votingStatus {
        notVoted,
        pro,
        con
    }*/ 

    enum pollStatus {
        onGoing,
        passed,
        rejected
    }
    
    //투표 구조체 
    struct poll {
        address by;//투표를 만드는 주체
        uint bestOfferPrice; // 주체의 제안 가격 
        uint pros; //찬성 투표 수 
        uint cons; //반대 투표 수 
        address[] voteAddressList;
        // mapping(address => votingStatus) voted;
    }

    struct offer{
        address account;
        uint amount;
    }

    //pieceNFT owner
    address[] owners;
    
    poll currentPoll; //poll형 변수 currentPoll

    //3일동안 나온 제안을 모아두는 곳.
    offer[] offerList;
    
    //가격 제안 
    function offering(uint _amount) external payable {
        _amount = msg.value;
        offerList.push(offer(msg.sender, _amount));
    }

    //최고입찰가로 제안 뽑기
    function getBestOffer() public {
        for(uint i=0; i<offerList.length-1; i++){
            for(uint j=i+1; j<offerList.length; j++){
                if(offerList[i].amount < offerList[j].amount) {
                    (offerList[i].account, offerList[j].account) = (offerList[j].account, offerList[i].account);
                    (offerList[i].amount, offerList[j].amount) = (offerList[j].amount, offerList[i].amount);
                }
            }   
        }
        (currentPoll.by, currentPoll.bestOfferPrice) = (offerList[0].account, offerList[0].amount);
    } 


    function startVote(bool _vote) public {
        //require(오너여야함 )
        //require() 투표를 하지 않았어야함
        require(currentPoll.by != address(0)); // currentPoll.by 설정된 후에 시작할 수 있도록
        currentPoll.voteAddressList.push(msg.sender);
        if(_vote == true) {
            currentPoll.pros++;
           currentPoll.voteAddressList.push(msg.sender);
        } else if(_vote == false) {
            currentPoll.cons++;
            currentPoll.voteAddressList.push(msg.sender);
        }
    }
    
    function voteResult(uint _tokenId) public {
        //찬성되면 nft는 currentpoll의 by에게 전달되고 돈은 홀더들에게 전달됨 
        if(currentPoll.pros > 10) {
            // _by에게 돈을 받고 
            // nft를 건네주고
            transferFrom(address(this), currentPoll.by, _tokenId);
            // 홀더들에게 나눠주기
            for(uint i=0; i<21; i++){
                payable(owners[i]).transfer((currentPoll.bestOfferPrice)/20);
            } 
        } else {
            //_by에게 돈은 돌려주기 
            payable(currentPoll.by).transfer(currentPoll.bestOfferPrice);
        }
    }

}