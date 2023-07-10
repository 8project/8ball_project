import OGNftABI from "./OGNftABI.json";
import MarketABI from "./MarketABI.json";
import PieceMarketABI from "./PieceMarketABI.json";
import Web3 from "web3";

const web3 = new Web3(window.ethereum);

export const OGNFTContractAddress =
  "0x774FF6e157949085B5755b436F1fb20f18dd3DE8";
export const MarketContractAddress =
  "0x073200a4fab17EFD71f2aa178eDb55Ca6D64be09";
export const PieceMarketContractAddress =
  "0x53B1f7929fD81c1Fdc9d0681F4F2Da462B9Da018";

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
// 조각 메타데이터 : https://harlequin-melted-loon-875.mypinata.cloud/ipfs/QmUfUwne1AXTmPhrtQPghMzwLf2ZKbhqHGB1iBSdFxDuxr