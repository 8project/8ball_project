// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract market is ERC721 {

// Token name
string private _name;

// Token symbol
string private _symbol;

// NFT마다 name을 설정해야 하기 때문에 constructor로 설정하지 않는다.
function setName(string name_) public {
    _name = name_; // name 설정
    name(); // name 확인
}

// name 확인
function name() override public view returns(string memory _name) {}

// NFT마다 symbol이 있기 때문에 constructor로 설정하지 않는다.
function setSymbol(string symbol_) public {
    _symbol = symbol_; // symbol 설정
    symbol(); // symbol 확인
}

// symbol 확인
function symbol() override public view returns(string memory _symbol) {}

// Mapping from token ID to owner address
mapping(uint256 => address) private _owners;

// Mapping owner address to token count
mapping(address => uint256) private _balances;

// Mapping from token ID to approved address
mapping(uint256 => address) private _tokenApprovals;

// Mapping from owner to operator approvals
mapping(address => mapping(address => bool)) private _operatorApprovals;


// B - 판매자(market)
    // 판매자 정보의 구조
    struct OGlisting {
    address seller; // 구매자 EOA
    uint price; // 판매 가격
  }

// 판매자 정보 관리
mapping (address => OGlisting) OGlistings;

// 판매 목록 관리 - 판매자가 등록을 한 NFT가 몇번째 등록했는지 알려준다. 
// 투자자들이 펀딩을 했을경우 어떤 NFT를 샀는지 알아야 하기 때문이다.
mapping (address => uint) inOder; 

event Bid(address bidder); // web3.js or ethers.js를 이용해서 로그정보로 투자자 정보 받아온다.

// NFT 등록 - NFT이미지는 프론트에서 사용자가 CA,tokenId를 입력하게 한다.
// 이후 web3.js or ethers.js를 이용해서 tokenURI 함수를 실행시켜서 IPFS 주소를 받아와서 띄운다.
function listForSale(uint _price) public {
    OGlistings[msg.sender] = OGlisting(msg.sender, _price);
} 

// C - 조각 구매 신청자
function bidForPiece() public payable {
 // require(msg.value == 특정금액);
     address _bidder = msg.sender;
     emit Bid(_bidder);

// if ()
    }

uint bidCount = 0;
// C - 20조각 투자자에게 나눠주기
function distribute() public {
    // if(bidCount == 20) {
    //     _mint(신청자들주소, 토큰아이디)  // 랜덤 - 민서강사님
    // }
}
}

// 처음 uint는 tokenId, 두번째는 조각난 NFT중 1개 소유자 EOA
mapping(uint => mapping(address => bool)) // 검증 갖고 있는지
// 초기에는 1번을 A가 소유
// Offer에서 제안 받은 금액에 팔지 결정되지 않은 상태(3일 경과 전)
// piece 마켓에서 서로 거래 가능
// 이때 A가 Z에게 팔음(소유자를 변경해주는 함수)
// offer 받은 금액에 팔지 말지 투표해야함(3일 경과 후 최고금액에 팔지 투표해야 함)
