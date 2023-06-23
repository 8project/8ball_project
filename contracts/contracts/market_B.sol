// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

// 상품을 등록하기전에 approve를 먼저 받는다. - B - approve, transferFrom 실행해서 NFT를 회사로 보내야함 - 완료
// 상품을 등록한다. - B - 등록했을때 정보관리 할 수 있게 함 - 완료
// 펀딩을 받는다 (EOA 20개) - C - 완료
// 펀딩이 완료된다. 이후 펀딩금액을 판매자에게 준다. - C - 완료
// 이제 판매금액 오퍼를 받는다. - 3일이 지나기전에 piece market에서 거래가능 - A, D,E
// 판매하기로 결정이 되었으면 판매를 한다. - F
// 판매금액을 투자자들에게 나눠 준다. - C

contract BallmarketB is ERC721Enumerable {
// 이 컨트랙트에서는 민팅을 하지 않는다. 상품등록과 상품등록에 따른 정보관리 및 펀딩완료된 금액을 판매자에게 주는 것이 전부이다.
address private manager;

constructor (address _manager) ERC721("8BallMarket", "8Ball") {
  manager = _manager;
    }

// B - 판매자(market)
    // 판매자 정보의 구조 - 등록기간은 프론트에서 처리한다.
    struct OGNft {
    address seller; // 판매자 EOA
    uint price; // 판매 가격
    uint buyerNum; // 배열에 값 넣어 주려면 어쩔 수 없이 사용해야 하는 것 같습니다. 이게 맞나? (강사님 plz)
    address[20] buyer; // 구매자 목록
  }

 // 판매자 정보 관리 - 여기서 uint는 판매자가 등록을 한 NFT의 순번이다.
 mapping (uint => OGNft) private OGNfts;

// mapping이 private이라서 볼 수 있도록 함
 function getSeller(uint _n) public view returns(address) {
   return OGNfts[_n].seller;
 }
 function getprice(uint _n) public view returns(uint) {
   return OGNfts[_n].price;
 }
 function getbuyerNum(uint _n) public view returns(uint) {
   return OGNfts[_n].buyerNum;
 }
 function getbuyer(uint _n, uint _nn) public view returns(address) {
   return OGNfts[_n].buyer[_nn];
 }

 // 판매 목록 관리하기 위해서 만듦
 // 투자자들이 펀딩을 했을경우 어떤 NFT를 샀는지 알아야 하기 때문이다.  
 uint private _inOrder = 1; 

 // NFT 등록 - NFT이미지는 프론트에서 사용자가 CA,tokenId를 입력하게 한다.
 // 이후 web3.js or ethers.js를 이용해서 tokenURI 함수를 실행시켜서 IPFS 주소를 받아와서 띄운다.
 function listForSale(uint _price) public {
    (OGNfts[_inOrder].seller, OGNfts[_inOrder].price, OGNfts[_inOrder].buyerNum) = (msg.sender, _price, 1);
    _inOrder++;
 }

 // C - 조각 구매 신청자 - 펀딩 완료 전, 프론트에서 몇번째 NFT를 구매하는지 컨트랙트로 알려줘야 한다.
 function buyForPiece(uint _n) public payable {
    require(OGNfts[_n].buyerNum < 21, "Financing is complete."); //buyNum이 1부터 시작하기 때문이다.
    require(msg.value >= OGNfts[_n].price/20);
    OGNfts[_n].buyer[OGNfts[_n].buyerNum - 1] = msg.sender; // 구매했을 경우 구매자 EOA 저장
    OGNfts[_n].buyerNum++; // 구매된 횟수 증가
    if (OGNfts[_n].buyerNum == 20) { // 구매된 횟수가 20이면 펀딩 완료이다. 이제 20조각을 20개의 EOA에 나눠줘야 한다.
        emit FUNDING("Financing is complete", _n);
    }
}

// 몇번째 NFT가 펀딩이 완료되었는지 알려준다.
event FUNDING(string funding, uint Ordinal);

// 완료된 NFT가 몇번째인지 알려준다.
//  event확인 후 판매자에게 판매금액을 보낸다.
// 프론트에서 받기 라는 버튼을 만들어서 판매자가 수수료 지불하게 한다. 너무한가... ㅋㅋㅋㅋ
function amountToSeller(uint _n) public {
  require (manager == msg.sender, "You are not the manager");
  payable(OGNfts[_n].seller).transfer(OGNfts[_n].price);
}
}