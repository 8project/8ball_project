import OGNftABI from "./OGNftABI.json";
import MarketABI from "./MarketABI.json";
import PieceMarketABI from "./PieceMarketABI.json";
import Web3 from "web3";

const web3 = new Web3(window.ethereum);

export const OGNFTContractAddress =
  "0xC8A46a9f190E96A6c9424afEa2181340212bc7C9";
export const MarketContractAddress =
  "0x06d3970e9514D372a9c4E6F89E14c92891066d35";
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
