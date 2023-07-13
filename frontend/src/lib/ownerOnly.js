import abi from "./MarketABI.json";

// setInterval(() => {
const { Web3 } = require("web3");
const web3 = new Web3(
  "https://sepolia.infura.io/v3/bd4f14b4116f4974b5d08009d9b368f0"
);

const privateKey = "";
const account = web3.eth.accounts.privateKeyToAccount(privateKey);

web3.eth.accounts.wallet.add(account);
web3.eth.defaultAccount = account.address;

const c_address = "";
const contract = new web3.eth.Contract(abi, c_address);

// const tx = {from : account.address, to : c_address , gas : 300000, gasPrice : 3000000, data : contract.methods.getBestOffer(_index).encodeABI()}
// const signPromise = web3.eth.accounts.signTransaction(tx, account.privateKey)

// const tx = {from : account.address, to : c_address , gas : 300000, gasPrice : 3000000, data : contract.methods.voteResult(_index).encodeABI()}
// const signPromise = web3.eth.accounts.signTransaction(tx, account.privateKey)

signPromise.then((signedTx) => {
  var sentTx = web3.eth.sendSignedTransaction(
    signedTx.raw || signedTx.rawTransaction
  );
  sentTx.on("receipt", (receipt) => {
    console.log(receipt);
  });
});
// }, 5000);
