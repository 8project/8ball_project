// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract eBallMarket {
// B - 판매자(market)

    // 판매자 및 NFT 관리
    // Mapping from token ID to owner address
    mapping(uint256 => address) private _owners;

    // Mapping owner address to token count
    mapping(address => uint256) private _balances;

    // Mapping from token ID to approved address
    mapping(uint256 => address) private _tokenApprovals;

    // Mapping from owner to operator approvals
    mapping(address => mapping(address => bool)) private _operatorApprovals;

    // setapporvals 랑 mapping에 정보 저장 함수 만들어야함

  // funding or offer 둘 중에 가능한 것이 무엇인지 알아야 하기 때문에 상태 표시를 해준다.
  enum ListingStatus {
        Funding,
        Offer,
        Cancelled
  }

  // 판매 목록 - List for sale (CA를 적은 이유는 어느 컨트랙트에서 발행했는지 알기 위함이다.)
  struct Listing {
    ListingStatus Status;
    address seller;
    address CA;
    uint tokenId;
    uint price;
    uint buyTimes;
  }

  uint private _listingId = 0; // _listings 매핑에 index 순서대로 저장
  mapping(uint => Listing) private _listings; // listing 목록을 mapping으로 관리

    // NFT 등록 - 판매자가 NFT를 발행한 컨트랙트 주소, 토큰번호, 판매가격을 적어서 submit
    // 판매를 등록하게 되면 기본적인 상태는 Funding 상태이다.
  function listToken(address _CA, uint _tokenId, uint _price, uint _buyTimes) public {
    Listing memory listing = Listing(ListingStatus.Funding, msg.sender, _CA, _tokenId, _price, _buyTimes); // mapping에 저장할 값 변수에 넣기
    _listingId++;
    _listings[_listingId] = listing;  //mapping에 판매 목록 저장
  }

  // 조각가격은 20으로 나눈 것이다. - Funding 중임
  function buyPieceToken(uint _listingNum) external payable {
    require(_listings[_listingNum].Status == ListingStatus.Funding, "You don't buy, not Funding"); // 구매할 수 있는 상태여야 함
    uint piecePrice;
    piecePrice = _listings[_listingNum].price/20;
    require(msg.value == piecePrice); // 컨트랙트에 조각금액에 맞게 입금 되게 함
    _listings[_listingNum].buyTimes++;
    if(_listings[_listingNum].buyTimes++ == 20) {
      _listings[_listingNum].Status = ListingStatus.Offer;
    }
  }

  // 상속받은 컨트랙트에서 사용가능하도록 함
  function getListings(uint _listingNum) internal view returns(Listing memory) {
    return _listings[_listingNum];
  }
}

contract MarketCustomer is eBallMarket, ERC721{
// C - 조각 구매 신청자(market) 
receive() external payable{}

  // uri 입력(20조각으로 나눈 그림 올라가 있는 주소)
  string public baseUri;
  uint public totalNft;

   // 투자자 정보 
  // struct Investor {
    
  // }

  constructor(string memory _tokenURI, uint _totalNft) ERC721("8Ball", "Infinity") {
      baseUri = _tokenURI;
      totalNft = _totalNft;
  }

  // 20조각 투자자에게 나눠주기 - Funding 완료
  function mintNFT(uint _listingNum) public {
      require(eBallMarket.getListings(_listingNum).Status == eBallMarket.ListingStatus.Offer , "Status is not the Offer");
      for (uint i=1; i<=20 ; i++) {
        _mint(msg.sender, i);
        }
    }
}

  // A - 오퍼(market)
  // D - 조각 판매자(piece market)
  // E - 조각 구매자(piece market)
  // F - 투표
