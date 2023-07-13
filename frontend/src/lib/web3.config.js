import OGNftABI from "./OGNftABI.json";
import MarketABI from "./MarketABI.json";
import PieceMarketABI from "./PieceMarketABI.json";
import Web3 from "web3";

const web3 = new Web3(window.ethereum);

export const OGNFTContractAddress =
  "0x6CF658f2526Adaba437cf39B3aC55C9F3e7fBC05";
export const MarketContractAddress =
  "0x839CBb9B96C45037adac70CB469662e35aC3831e";
export const PieceMarketContractAddress =
  "0xc1E222D89c3Fbd5a1EC99Aa75981f849237Cd742";

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
