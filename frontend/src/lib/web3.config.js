import OGNftABI from "./OGNftABI.json";
import MarketABI from "./MarketABI.json";
import PieceMarketABI from "./PieceMarketABI.json";
import Web3 from "web3";

const web3 = new Web3(window.ethereum);

export const OGNFTContractAddress =
  "0x3F206801963c396508CaF50D04EEe724d5fB2183";
export const MarketContractAddress =
  "0xCadd9175D5d9b3997619f8206dd847729AC6Faa3";
export const PieceMarketContractAddress =
  "0xd861f1914ECDb8fEFA2CadFaE9dE722171EbCEe7";

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
