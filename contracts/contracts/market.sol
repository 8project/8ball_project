// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract eBallmarket is ERC721 {
// B - 판매자(market)
    // 판매자 정보의 구조
    struct OGlisting {
    address seller; // 구매자 EOA
    uint price; // 판매 가격
    uint buyerNum; // 배열에 값 넣어 주려면 어쩔 수 없이 사용해야 하는 것 같습니다. 이게 맞나? (강사님 plz)
    address[20] buyer; // 구매자 목록
  }

// 판매자 정보 관리 - 여기서 uint는 판매자가 등록을 한 NFT의 순번이다.
mapping (uint => OGlisting) OGlistings;

// 판매 목록 관리하기 위해서 만듦
// 투자자들이 펀딩을 했을경우 어떤 NFT를 샀는지 알아야 하기 때문이다.  
uint private _inOrder = 1; 

// NFT 등록 - NFT이미지는 프론트에서 사용자가 CA,tokenId를 입력하게 한다.
// 이후 web3.js or ethers.js를 이용해서 tokenURI 함수를 실행시켜서 IPFS 주소를 받아와서 띄운다.
function listForSale(uint _price) public {
    (OGlistings[_inOrder].seller, OGlistings[_inOrder].price, OGlistings[_inOrder].buyerNum) = (msg.sender, _price, 1);
    _inOrder++;
}

constructor (address _manager, string memory name_, string memory symbol_) ERC721(name_,symbol_) {
    }

address private manager;

// Token name
string private _name;

// Token symbol
string private _symbol;

// NFT마다 name을 설정해야 하기 때문에 constructor로 설정하지 않는다.
function setName(string memory name_) public {
    _name = name_; // name 설정
    name(); // name 확인
}

// name 확인
function name() override public view returns(string memory) {
    return _name;
}

// NFT마다 symbol이 있기 때문에 constructor로 설정하지 않는다.
function setSymbol(string memory symbol_) public {
    _symbol = symbol_; // symbol 설정
    symbol(); // symbol 확인
}

// symbol 확인
function symbol() override public view returns(string memory) {
    return _symbol;
}

// Mapping from token ID to owner address
mapping(uint256 => address) private _owners;

// Mapping owner address to token count
mapping(address => uint256) private _balances;

// Mapping from token ID to approved address
mapping(uint256 => address) private _tokenApprovals;

// Mapping from owner to operator approvals
mapping(address => mapping(address => bool)) private _operatorApprovals;

// C - 조각 구매 신청자 - 프론트에서 몇번째 NFT를 구매하는지 컨트랙트로 알려줘야 한다.
function buyForPiece(uint _n) public payable {
    require(OGlistings[_n].buyerNum < 21, "Financing is complete."); //buyNum이 1부터 시작하기 때문이다.
    uint price20;
    price20 = OGlistings[_n].price/20;
    require(msg.value >= price20);
    OGlistings[_n].buyer[OGlistings[_n].buyerNum - 1] = msg.sender;
    OGlistings[_n].buyerNum++;
    if (OGlistings[_n].buyerNum == 20) {
        emit FUNDING("Financing is complete", _n);
    }
}

// 몇번째 NFT가 펀딩이 완료되었는지 알려준다.
event FUNDING(string funding, uint Ordinal);

// C - event확인 후 20조각 투자자에게 나눠주기
// ipfs에 조각난 이미지 올려야 하는데 자동화 방법이 있을까??
function distribute(uint _n) public {
  require (manager == msg.sender && OGlistings[_n].buyerNum == 20, "");
  for (uint i=1 ; i<21 ; i++) {
       _mint(OGlistings[_n].buyer[i-1],i);  // 뒤에 i는 랜덤으로 변경 - 민서강사님
       }
       // 여기에 더 추가할게 있음.
 }

 // tokenURI 정보, uri정보 저장하는 mapping 및 transfer로 approve 받기 및 63번 ~ 73번 이용할 함수 만들기
}