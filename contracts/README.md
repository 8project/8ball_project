# CONTRACTS FOLDER


++ web3.js 예약어 정리
<지갑 등록>
npm init 

npm install web3

var {Web3} = require('web3')
var web3 = new Web3('https://cloudflare-eth.com')

var pvk = '0x개인키'
var account = web3.eth.accounts.privateKeyToAccount(pvk)

account // 계정 정보 잘 나오는지 확인
web3.eth.accounts.wallet.add(account) // 해당 환경에 지갑 정보 추가
----------------------------------------------------------------------
<거래 일으키가>
var c_addr = '주소'
var abi = 컨트랙트 abi

var contract = new web3.eth.Contract(abi, c_addr)

contract.methods.'함수명'().call().then(console.log)

var tx = {from : account.address, to : c_addr, gas : 300000, gasPrice : 30000000, data : contract.methods'함수명(prams,params..)'.encodeABI()}

var signPromise = web3.eth.accounts.signTransaction(tx, account.privateKey)

signPromise.then((signedTx)=> {var sentTx = web3.eth.sendSignedTransaction(signedTx.raw || signedTx.rawTransaction); sentTx.on("receipt", receipt=> {console.log(receipt)})})
----------------------------------------------------------------------