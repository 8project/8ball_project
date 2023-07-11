import OGNftABI from "./OGNftABI.json";
import MarketABI from "./MarketABI.json";
import PieceMarketABI from "./PieceMarketABI.json";
import Web3 from "web3";

const web3 = new Web3(window.ethereum);

export const OGNFTContractAddress =
  "0xa031F0366E1995FA6DcEE80A9D341294787a9D80";
export const MarketContractAddress =
  "0xf8Ef21E972483c79dfC5605C8ed8739F1aFBD212";
export const PieceMarketContractAddress =
  "0x0689a897a994b32Ff6227cBb4e3859c7683e9e9c";

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
