// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract eBallmarket is ERC721 {
// B - 판매자(market)
    // 판매자 정보의 구조
    struct OGlisting {
    address seller; // 판매자 EOA
    uint price; // 판매 가격
    uint buyerNum; // 배열에 값 넣어 주려면 어쩔 수 없이 사용해야 하는 것 같습니다. 이게 맞나? (강사님 plz)
    address[20] buyer; // 구매자 목록
  }

// 판매자 정보 관리 - 여기서 uint는 판매자가 등록을 한 NFT의 순번이다.
mapping (uint => OGlisting) private OGlistings;

// 판매 목록 관리하기 위해서 만듦
// 투자자들이 펀딩을 했을경우 어떤 NFT를 샀는지 알아야 하기 때문이다.  
uint private _inOrder = 1; 

// NFT 등록 - NFT이미지는 프론트에서 사용자가 CA,tokenId를 입력하게 한다.
// 이후 web3.js or ethers.js를 이용해서 tokenURI 함수를 실행시켜서 IPFS 주소를 받아와서 띄운다.
function listForSale(uint _price) public {
    (OGlistings[_inOrder].seller, OGlistings[_inOrder].price, OGlistings[_inOrder].buyerNum) = (msg.sender, _price, 1);
    _inOrder++;
}


// C 시작부분
constructor (string memory name_, string memory symbol_) ERC721(name_,symbol_) {
        manager = msg.sender;
    }

// Contract manager
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
// _ownerOf(uint tokenId)  return _owners[tokenId] - 토큰을 누가 갖고 있는지
// _mint(address to, uint tokenId) _owners[tokenId] = to
// _burn(uint tokenId) delete _owners[tokenId] - 매핑된 주소를 0x0000000~~로 초기화
// _transfer(address from, address to, uint tokenId) _owners[tokenId] = to - 소유권 넘김

// Mapping owner address to token count
mapping(address => uint256) private _balances;
// balanceOf(address owner) return _balances[owner] - 해당 주소가 갖고 있는 토큰 몇개 갖고 있는지
// _mint(address to, uint tokenId) _balances[to] += 1  - 민팅할때마다 토큰 개수 1씩 증가
// _burn(uint tokenId) _balances[owner] -= 1 - 여기서 owner는 해당 토큰을 소유하고 있는 EOA이다
// _transfer(address from, address to, uint tokenId) _balances[from] -= 1, _balances[to] += 1

// Mapping from token ID to approved address
mapping(uint256 => address) private _tokenApprovals; 
// getApproved(uint tokenId) return _tokenApprovals[tokenId] - 토큰에 대한 허가권을 회사로 준 EOA
// _burn(uint tokenId) delete _tokenApprovals[tokenId] - 매핑된 주소를 0x0000000~~로 초기화
// _transfer(address from, address to, uint tokenId) delete _tokenApprovals[tokenId] - 매핑된 주소를 0x0000000~~로 초기화
// _approve(address to, uint tokenId) _tokenApprovals[tokenId] = to

// Mapping from owner to operator approvals
mapping(address => mapping(address => bool)) private _operatorApprovals;
// isApprovedForAll(address owner, address operator) return _operatorApprovals[owner][operator]
// _setApprovalForAll(address owner, address operatot, bool approved) _operatorApprovals[owner][operator] = approved

// Mapping from token ID to IPFS string
mapping(uint => string) _ipfs;

// tokenId
function _tokenURI(uint _tokenId, string memory _uri) public {
       _ipfs[_tokenId] = _uri;
    }

function tokenURI(uint _tokenId) public override view returns(string memory) {
        return string(abi.encodePacked(_ipfs[_tokenId],'/',Strings.toString(_tokenId),'.json'));
    }


// C - 조각 구매 신청자 - 프론트에서 몇번째 NFT를 구매하는지 컨트랙트로 알려줘야 한다.
function buyForPiece(uint _n) public payable {
    require(OGlistings[_n].buyerNum < 21, "Financing is complete."); //buyNum이 1부터 시작하기 때문이다.
    require(msg.value >= OGlistings[_n].price/20);
    OGlistings[_n].buyer[OGlistings[_n].buyerNum - 1] = msg.sender; // 구매했을 경우 구매자 EOA 저장
    OGlistings[_n].buyerNum++; // 구매된 횟수 증가
    if (OGlistings[_n].buyerNum == 20) { // 구매된 횟수가 20이면 펀딩 완료이다. 이제 20조각을 20개의 EOA에 나눠줘야 한다.
        emit FUNDING("Financing is complete", _n);
    }
}

// 몇번째 NFT가 펀딩이 완료되었는지 알려준다.
event FUNDING(string funding, uint Ordinal);

// C - event확인 후 20조각 투자자에게 나눠주기 - 관리자가 해줘야 한다.
// ipfs에 조각난 이미지 올려야 하는데 자동화 방법이 있을까?? IPFS 주소 올려주는 사이트 - API키
function distribute(uint _n) public {
  require (manager == msg.sender && OGlistings[_n].buyerNum == 20, "");
  for (uint i=1 ; i<21 ; i++) {
       _mint(OGlistings[_n].buyer[i-1],i);  // 뒤에 i는 랜덤으로 변경 - 민서강사님
       }
       // 여기에 더 추가할게 있음.
 }

 // tokenURI 정보, uri정보 저장하는 mapping 및 transfer로 approve 받기 및 63번 ~ 73번 이용할 함수 만들기
}