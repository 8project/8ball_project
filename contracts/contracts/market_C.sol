// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "./BallMarket_B.sol";

contract BallmarketC is ERC721Enumerable {
// 이 컨트랙트에서는 펀딩이 완료될 경우 투자자들에게 조각NFT를 나눠주는 것이 주 목적이며, 
// 나눠준 NFT의 소유자들의 정보관리 및 Offer 금액에 판매되기 전까지 Piece Market에서 거래가 가능하게 해주는 것이 두번째 목적이다
    
// contract manager    
address private manager;

// 우리 회사가 이용할 IPFS 주소
string public URI;

BallmarketB Bcontract;

constructor (address _Bcontract) ERC721("8BallMarket", "8Ball") {
        manager = msg.sender;
        Bcontract = BallmarketB(_Bcontract);
    }

// Mapping from token ID to IPFS string
// 20조각의 matadata가 저장된 ipfs uri이다.
mapping(uint => string) _metadataURI; // tokenId의 URI는 뭐야?
mapping(uint => mapping(uint => string)) _numMetadataURI; // 펀딩 완료된 몇번째 NFT의 tokenId의 URI는 뭐야?

// tokenURI를 알려주는 함수, 완료된 NFT가 몇번째 등록되었는지가 _n이다.
function tokenURI(uint _n) override public view returns(string memory) {
        return _metadataURI[_n];
    }

// 회사가 조각난 NFT 이미지 올린 IPFS 주소 설정, baseUri 설정이라고 보면 된다.
function setURI(string memory _uri) public {
         URI = _uri;
    }

// C - 조각 구매 신청자 - 펀딩이 완료된 상태
// event확인 후 20조각 투자자에게 나눠주기 - 관리자가 해줘야 한다.
// ipfs에 조각난 이미지 올려야 하는데 자동화 방법이 있을까?? IPFS 서비스 해주는 사이트 - API키
function distributeMint(uint _n) public {
  require (manager == msg.sender && Bcontract.getbuyerNum(_n) == 20, "");
  for (uint i=1 ; i<21 ; i++) {
       _mint(Bcontract.getbuyer(_n,i-1),i);  // 뒤에 i는 랜덤으로 변경 - 민서강사님
       _metadataURI[i] = string(abi.encodePacked(URI,'/',Strings.toString(i),'.json'));
       _numMetadataURI[_n][i] = string(abi.encodePacked(URI,'/',Strings.toString(i),'.json'));
       }
 }

 // 이제 Piece Market을 이용할 수 있도록 코드를 짜야 한다. to be continue
}
