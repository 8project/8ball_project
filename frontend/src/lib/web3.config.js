import OGNftABI from "./OGNftABI.json";
import MarketABI from "./MarketABI.json";
import PieceMarketABI from "./PieceMarketABI.json";
import Web3 from "web3";

const web3 = new Web3(window.ethereum);

export const OGNFTContractAddress =
  "0xa982C2DE5b801988721e6dB628762E144cC075fB";
export const MarketContractAddress =
  "0xBE4EFBf2208F2fbED1Fa936d75d6A8A0EA8124B3";
export const PieceMarketContractAddress =
  "0x53B1f7929fD81c1Fdc9d0681F4F2Da462B9Da018";

export const OGNFTContract = new web3.eth.Contract(
  OGNftABI,
  OGNFTContractAddress
);

export const MarketContract = new web3.eth.Contract(
  MarketABI,
  OGNFTContractAddress
);

export const PieceMarketContract = new web3.eth.Contract(
  PieceMarketABI,
  PieceMarketContractAddress
);

// 닷엔브 메타데이터 : https://olbm.mypinata.cloud/ipfs/QmU52T5t4bXtoUqQYStgx39DdXy3gLQq7KDuF1F9g3E9Qy
// 조각 메타데이터 : https://harlequin-melted-loon-875.mypinata.cloud/ipfs/QmUfUwne1AXTmPhrtQPghMzwLf2ZKbhqHGB1iBSdFxDuxr