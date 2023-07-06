import OGNftABI from "./OGNftABI.json";
import MarketABI from "./MarketABI.json";
import PieceMarketABI from "./PieceMarketABI.json";
import Web3 from "web3";

const web3 = new Web3(window.ethereum);

export const OGNFTContractAddress =
  "0x3c014e3626f17109aCB41391f8BfCB614bCC6Bb9";
export const MarketContractAddress =
  "0xB8ccB5Ab0dCc51be85C71A20eE99e060aBaF1c9B";
export const PieceMarketContractAddress =
  "0x68E5c8ce6c0F7001dc9C51390fc6EAa837819c62";

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
