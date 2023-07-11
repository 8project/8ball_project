import OGNftABI from "./OGNftABI.json";
import MarketABI from "./MarketABI.json";
import PieceMarketABI from "./PieceMarketABI.json";
import Web3 from "web3";

const web3 = new Web3(window.ethereum);

export const OGNFTContractAddress =
  "0xB72aE220CFa52A23a1d9E251f0DED33FE275179f";
export const MarketContractAddress =
  "0x32D44030fbE1aa965E9D5a2793e48613249F4463";
export const PieceMarketContractAddress =
  "0x8083fFD4B7bDC3d5B9E60951122CAAE8e3fA54A9";

export const OGNFTContract = new web3.eth.Contract(
  OGNftABI,
  OGNFTContractAddress
);

export const MarketContract = new web3.eth.Contract(
  MarketABI,
  MarketContractAddress
);

export const PieceMarketContract = new web3.eth.Contract(
  PieceMarketABI,
  PieceMarketContractAddress
);

// 닷엔브 메타데이터 : https://olbm.mypinata.cloud/ipfs/QmU52T5t4bXtoUqQYStgx39DdXy3gLQq7KDuF1F9g3E9Qy
// BAYC 원본 : https://harlequin-melted-loon-875.mypinata.cloud/ipfs/QmeLaCLNm647Sv5TotdEcSvP9qXhhXmZe22jjRTgT471X2
// BAYC 조각 메타데이터 : https://harlequin-melted-loon-875.mypinata.cloud/ipfs/QmUfUwne1AXTmPhrtQPghMzwLf2ZKbhqHGB1iBSdFxDuxr
