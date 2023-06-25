// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

// 등록할 NFT를 회사 컨트랙트로 보낸다.
// 상품을 등록 - lisForSale
// 상품을 등록한다. - 등록했을때 정보관리 할 수 있게 함 
// 펀딩을 받는다 (EOA 20개) 
// 펀딩이 완료된다. 이후 펀딩금액을 판매자에게 준다. 
// 이제 판매금액 오퍼를 받는다. - 3일이 지나기전에 piece market에서 거래가능
// 판매하기로 결정이 되었으면 판매를 한다.
// 판매금액을 투자자들에게 나눠 준다.

contract BallmarketB is ERC721Enumerable {

  address private manager; // 관리자(고정)
  string public URI; // IPFS 주소(고정) ex) uri/~~~~ 이런식으로 이미지 주소 설정됨

  constructor (address _manager, string memory _URI) ERC721("8BallMarket", "8Ball") {
    manager = _manager;
    URI = _URI;
  }

// B - 판매자(market)
    // 판매자 정보의 구조 - 등록기간(duration)은 프론트에서 처리한다.
    struct OGNft {
    address seller; // 판매자 EOA
    address CA;
    uint OGtokenId;
    uint price; // 판매 가격
    address[] buyer; // 구매자 목록
  }

  // 판매자 정보 관리 - 여기서 uint는 판매자가 등록을 한 NFT의 순번이다.
  mapping (uint => OGNft) private OGNfts;

  // 판매 목록 관리하기 위해서 만듦
  // 투자자들이 펀딩을 했을경우 어떤 NFT를 샀는지 알아야 하기 때문이다.  
  uint private _inOrder = 1; 

  // OG_NFT 판매등록 - NFT이미지는 프론트에서 사용자가 CA,tokenId, price를 입력하게 한다.
  // 이후 web3.js or ethers.js를 이용해서 tokenURI 함수를 실행시켜서 IPFS 주소를 받아와서 띄운다.
  function listForSale(address _CA, uint _OGtokenId, uint _price) public {
    // 민팅한 컨트랙트.approve(address(this), _tokenId); 민팅한 컨트랙트(NFT를 가져올 컨트랙트)
    // 민팅한 컨트랙트.transferFrom(from, address(this), _tokenId); // from은 소유자, 민팅한 컨트랙트(NFT를 가져올 컨트랙트), _tokenId(민팅한 컨트랙트에서의 tokenId)
    (OGNfts[_inOrder].seller, OGNfts[_inOrder].CA, OGNfts[_inOrder].OGtokenId, OGNfts[_inOrder].price) = (msg.sender, _CA, _OGtokenId, _price);
    _inOrder++;
  }

  // 펀딩완료되기전(판매등록기간 만료 전도 포함)에 취소할 경우이다 프론트에서 취소버튼 만들기
  function cancelListForSale(uint _n) public { // _n은 OGNFT의 등록순번이다.
    for (uint i; i<OGNfts[_n].buyer.length ; i++) {
      // 민팅한 컨트랙트.transferFrom(address(this), OGNfts[_n].seller, _tokenId); // from은 소유자, NFT를 가져올 컨트랙트(민팅한 컨트랙트), _tokenId(민팅한 컨트랙트에서의 tokenId)
      payable(OGNfts[_n].buyer[i]).transfer(OGNfts[_n].price);
      delete OGNfts[_n];
    }
  }

// C - 조각 구매 신청자
  // 펀딩 완료 전, 프론트에서 몇번째 NFT를 구매하는지 컨트랙트로 알려줘야 한다.
  function OGFunding(uint _n) public payable { // _n은 OGNFT의 등록순번이다.
    require(OGNfts[_n].buyer.length <= 20, "Financing is complete."); //buyNum이 1부터 시작하기 때문이다.
    require(msg.value >= OGNfts[_n].price/20);
    OGNfts[_n].buyer.push(msg.sender); // 구매했을 경우 구매자 EOA 저장
    if (OGNfts[_n].buyer.length == 20) { // 구매된 횟수가 20이면 펀딩 완료이다. 이제 20조각을 20개의 EOA에 나눠줘야 한다.
      emit FUNDING("Financing is complete", _n);
    }
  }

  // 몇번째 NFT가 펀딩이 완료되었는지 알려준다.
  event FUNDING(string funding, uint Ordinal);

  //  event확인 후 판매자에게 판매금액을 보낸다.
  // 프론트에서 받기 라는 버튼을 만들어서 판매자가 수수료 지불하게 한다. 너무한가... ㅋㅋㅋㅋ
  function amountToSeller(uint _n) public { // _n은 OGNFT의 등록순번이다.
    require (manager == msg.sender, "You are not the manager");
    payable(OGNfts[_n].seller).transfer(OGNfts[_n].price);
  }

// C - 조각 구매 신청자 - 펀딩이 완료된 상태
  // event확인 후 20조각 투자자에게 나눠주기 - 관리자가 해줘야 한다.
  // ipfs에 조각난 이미지 올려야 하는데 자동화 방법이 있을까?? IPFS 서비스 해주는 사이트 - API키
  function Piece_Mint(uint _n) public { // _n은 OGNFT의 등록순번이다.
    require (manager == msg.sender && OGNfts[_n].buyer.length == 20, "Invalid");
    for(uint i=20*_n - 19 ; i<20*_n ; i++) { // 범위의 단위 20이다.
        _mint(OGNfts[_n].buyer[i-1],i);  // 뒤에 i는 랜덤으로 변경 - 박민서강사님
      }
  }
 
  function tokenURI(uint _tokenId) override public view returns(string memory) {
      return string(abi.encodePacked(URI,'/',Strings.toString(_tokenId),'.json'));
  }

// 성윤님이 짜주신 코드 참고해서 작성해봤습니다
// h강사님이 piecemarket의 컨트랙트 따로 만드는게 낫다고 하셨는데 저는 하나로 합치는게 좋은 것 같습니다.
// 오후에 말씀드렸다시피 컨트랙트에는 민팅한 NFT에 대한 정보가 저장이 되기때문에 결국 NFT발행 했던 컨트랙트에서 정보를 가지고 와야하기 때문입니다. 
// 물론 강사님이 이걸 모르고 얘기하시진 않았다는 것을 압니다.
// 컨트랙트 분리에 대한 수정은 할 수 있습니다. 읽어 주셔서 감사합니다.
// D, E - Piece_Market(조각거래소) - 조각 NFT를 나눠준지 3일째에는 거래하지 못하게 프론트에서 막아야 함
  struct pieceNft {
    address pieceSeller;
    uint pieceTokenId;
    uint piecePrice;
  }

  // - 조각난 NFT 관리
  mapping (uint => pieceNft) private pieceNfts;

  // 판매 - 조각난 NFT
  function ListforPieceToken(uint _pieceTokenId, uint _piecePrice) public { //_pieceTokenId는 조각난 NFT 토큰아이디이다. 위에서 _mint할때 pieceTokenId 결정 됨
    require(msg.sender == _ownerOf(_pieceTokenId), "You are not Owner");
    pieceNfts[_pieceTokenId] = pieceNft(msg.sender, _pieceTokenId, _piecePrice);
  }

  // 구매 - 조각난 NFT
  function buyPieceToken(uint _pieceTokenId) public {
    transferFrom(pieceNfts[_pieceTokenId].pieceSeller, msg.sender, _pieceTokenId);
  }

  // 취소 - 조각난 NFT
  function cancelPieceToken(uint _pieceTokenId) public {
    require(msg.sender == _ownerOf(_pieceTokenId), "You are not Owner");
    delete pieceNfts[_pieceTokenId];
  }

// F - Vote - 생각 하는 중

  // 판매하기로 결정 되었으면 조각난 20개 NFT를 없애야 한다 
  function burn20Piece(uint _n)  public { // _n은 OGNFT의 등록순번이다.
    for(uint i=20*_n - 19 ; i<20*_n ; i++) {
      _burn(_n);
    }
  }
}