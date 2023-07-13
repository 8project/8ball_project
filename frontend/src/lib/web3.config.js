import OGNftABI from "./OGNftABI.json";
import MarketABI from "./MarketABI.json";
import PieceMarketABI from "./PieceMarketABI.json";
import Web3 from "web3";

const web3 = new Web3(window.ethereum);

export const OGNFTContractAddress =
  "0x3FeBdaeEC52F97044DBdf1c1b3759d0AabC04E86";
export const MarketContractAddress =
  "0xC852ace30aB02c7fCD92D5a6CfC7BB7024f63778";
export const PieceMarketContractAddress =
  "0x4650Ff8E64F152A10Dd699f0A7787FC7cA35De21";

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
// BAYC 원본 : https://harlequin-melted-loon-875.mypinata.cloud/ipfs/QmaHB5QDmYJ3ArGH8rnuGqoxEtKStDJZyZQMWLsxymQu91
// BAYC 조각 메타데이터 : https://harlequin-melted-loon-875.mypinata.cloud/ipfs/QmNNwfj2zZc7z3XxGWTc9Hhpx85y1PTj2TZpUdG8ohaDAa

// Bored Ape Yacht Club
// BAYC
