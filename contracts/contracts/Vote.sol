// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

//
contract BALL8 {
    //투표 상태 
    enum votingStatus {
        notVoted,
        pro,
        con
        }

    enum pollStatus {
        onGoing,
        passed,
        rejected
    }
    
    //투표 구조체 
    struct poll {
        address by;//투표를 만드는 주체
        uint bestOfferPrice; // 주체의 제안 가격 
        uint pro; //찬성 투표 수 
        uint con; //반대 투표 수 
        uint notVoted; // 무투표 수 
        address[] voteAddressList;
        pollStatus status;
    }

    struct offer{
        address account;
        uint amount;
    }

    //pieceNFT owner
    address[] owners;
    

    mapping(address => poll) public polls; // uint offer

    //3일동안 나온 제안을 모아두는 곳.
    offer[] offerList;

    //최고 가격 제안 
    offer BestOffer;
    
    //가격 제안 
    function offering(uint _amount) external payable {
        _amount = msg.value;
        offerList.push(offer(msg.sender, _amount));
    }

    //최고입찰가로 제안 뽑기
    function getBestOffer() public returns(offer memory){
        for(uint i=0; i<offerList.length-1; i++){
            for(uint j=i+1; j<offerList.length; j++){
                if(offerList[i].amount < offerList[j].amount) {
                    (offerList[i].account, offerList[j].account) = (offerList[j].account, offerList[i].account);
                    (offerList[i].amount, offerList[j].amount) = (offerList[j].amount, offerList[i].amount);

                }
            }   
        }
        return offerList[0] = BestOffer;
    } 


    // function startVote(address _by, bool _vote) public {
    //     //require(오너여야함 )
    //     //require() 투표를 하지 않았어야함 
    //     if(_vote == true) {
    //         polls[_by].pro++;
            
    //     } else if(_vote == false)
    // }
}

/*bool = false 

// * 투표하는 기능 - 특정 안건에 대하여 투표하는 기능, 안건은 제목으로 검색, 이미 투표한 건에 대해서는 재투표 불가능
    function vote(uint number, string memory _title, bool _vote) public {
        require(Users[number].voted[_title]==votingStatus.notVoted); //투표자가 해당 안건에 대해서 투표를 안했어야 함
        // 찬성이냐, 반대이냐
        if(_vote==true) {
            polls[_title].pros++;
            Users[number].voted[_title] = votingStatus.pro;
        } else {
            polls[_title].cons++;
            Users[number].voted[_title] = votingStatus.con;
        }
    }
*/