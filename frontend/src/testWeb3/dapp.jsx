import { useState } from "react";
import ABI from "./OGNftABI.json";
import MarketABI from "./MarketABI.json";
import PieceMarketABI from "./PieceMarketABI.json";
import Web3 from "web3";
import axios from "axios";

function App() {
  const [account, setAccount] = useState();
  const [CAName, setCAName] = useState();
  const [tokenImage, setTokenImage] = useState();

  const web3 = new Web3(window.ethereum);
  // const web3_2 = new Web3("wss://sepolia.infura.io/ws/v3/b5c932ae0d1547bebdf43f18f5155ed4");

  const OGNFTContractAddress = "0x35a4842CbA5338e457635f7ed2a92E9690485eCd";
  const MarketContractAddress = "0xf0bF4d3DD5E81b203bcF8C6B9390e4a5EBE368e6";
  const PieceMarketContractAddress =
    "0xC3f8b451b7BD8402F8f7987472f66caf7145afAf";

  const OGNFTContract = new web3.eth.Contract(ABI, OGNFTContractAddress);
  const MarketContract = new web3.eth.Contract(
    MarketABI,
    MarketContractAddress
  );
  const PieceMarketContract = new web3.eth.Contract(
    PieceMarketABI,
    PieceMarketContractAddress
  );

  const onClickLogIn = async () => {
    try {
      const account = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setAccount(account[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const onClickContract = async () => {
    try {
      const CAName = await OGNFTContract.methods.name().call();
      setCAName(CAName);
    } catch (error) {
      console.error(error);
    }
  };

  const onClickMint = async () => {
    try {
      const mintResponse = await OGNFTContract.methods
        .mintNFT()
        .send({ from: account });

      console.log(mintResponse);
    } catch (error) {
      console.error(error);
    }
  };

  const onClickBalanceOf = async () => {
    try {
      const response = await OGNFTContract.methods.balanceOf(account).call();

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const onClickTokenURI = async () => {
    try {
      const response = await OGNFTContract.methods.tokenURI(1).call();

      const metadataResponse = await axios.get(`${response}`); //attribute
      console.log(metadataResponse);
      setTokenImage(metadataResponse.data.image);
    } catch (error) {
      console.error(error);
    }
  };

  const onClickApprove = async () => {
    try {
      // console.log(account);
      const response = await OGNFTContract.methods
        .approve(MarketContractAddress, 3)
        .send({ from: account });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  /*
  input값 수정부분
  고쳐야 될 문제 : 10^18을 하면 int오류가남
  내가 쓰고싶은건 web3.utils.toWei("10","ether");을 쓰고싶음 
  */

  const onSubmitListForSale = async (e) => {
    e.preventDefault();

    const data = new FormData(e.target);

    let OGtokenId = web3.utils.numberToHex(Number(data.get("OG_TokenId")));
    let price = web3.utils.numberToHex(Number(data.get("Listprice")));
    try {
      const response = await MarketContract.methods
        .listForSale(OGNFTContractAddress, OGtokenId, price)
        .send({ from: account });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  /*
  value 부분이 OG NFT의 1/20가격이 하드코딩되어야함
  */
  const onSubmitOGFunding = async (e) => {
    e.preventDefault();

    const data = new FormData(e.target);

    let OGListIndex = web3.utils.numberToHex(Number(data.get("IndexList")));
    try {
      const response = await MarketContract.methods
        .OGFunding(OGListIndex)
        .send({ from: account, value: web3.utils.toWei("0.000055", "ether") });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  /*
  돈 받는건 돈받는애가 누르게 하자 
  자기 my page에서 누르게끔 
  */
  const onSubmitPriceToSeller = async (e) => {
    e.preventDefault();

    const data = new FormData(e.target);

    let OGListIndex = web3.utils.numberToHex(Number(data.get("IndexList")));
    try {
      const response = await MarketContract.methods
        .PriceToSeller(OGListIndex)
        .send({ from: account });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const onClickOGListForSale_buyerList = async () => {
    try {
      const response = await MarketContract.methods
        .OGListForSale_buyerList(1)
        .call();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  /*
  우석님이 적은 코드중에 마지막에 누른사람한테는 많이나가는 가스비만큼 돌려주기.<의견물어보기
  아니면 받는것도 개인이 직접 받는걸로?
  */
  const onSubmitDistributePiece = async (e) => {
    e.preventDefault();

    const data = new FormData(e.target);

    let OGListIndex = web3.utils.numberToHex(Number(data.get("IndexList")));
    try {
      const response = await MarketContract.methods
        .distributePiece(OGListIndex)
        .send({ from: account });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const onClickOverDuration = async () => {
    try {
      const response = await MarketContract.methods
        .overDuration(1)
        .send({ from: account });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  /*
  offering
  */
  const onSubmitOffering = async (e) => {
    e.preventDefault();

    const data = new FormData(e.target);

    let OGListIndex = web3.utils.numberToHex(Number(data.get("IndexList")));
    let _value = web3.utils.numberToHex(Number(data.get("price")));
    try {
      const response = await MarketContract.methods
        .offering(OGListIndex)
        .send({ from: account, value: _value });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const onClickGetBestOffer = async () => {
    try {
      const response = await MarketContract.methods.getBestOffer(1).send();
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const onClickstartVote = async () => {
    try {
      const response = await MarketContract.methods.startVote(1, true).send();
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const onClickvoteResult = async () => {
    try {
      const response = await MarketContract.methods.voteResult(1).send();
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const onClickListPieceTokenForSale = async () => {
    try {
      const response = await PieceMarketContract.methods
        .listPieceTokenForSale(1, web3.utils.toWei("0.001", "ether"))
        .send({ from: account });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const onClickBuyPieceToken = async () => {
    try {
      const response = await PieceMarketContract.methods
        .buyPieceToken(1)
        .send({ from: account, value: web3.utils.toWei("0.000055", "ether") });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const onClickCancelSale = async () => {
    try {
      const response = await PieceMarketContract.methods
        .cancelSale(1)
        .send({ from: account });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="bg-red-100">
        <div className="flex justify-center text-5xl font-bold">OGNFT</div>
        <div onClick={onClickLogIn}>account : {account}</div>
        <div onClick={onClickContract}>contract name : {CAName} </div>
        <div onClick={onClickMint}>Minting</div>
        <div onClick={onClickBalanceOf}>BalanceOf</div>
        <div onClick={onClickTokenURI}>TokenURI</div>
        <img src={tokenImage} alt="NFTIMAGE"></img>
        <div onClick={onClickApprove}>Approve</div>
      </div>
      <div className="bg-blue-100">
        <div className="flex justify-center text-5xl font-bold">Market</div>
        {/* <div onClick={onClickListForSale}>List For Sale</div> */}
        <form onSubmit={onSubmitListForSale}>
          <input className="mr-2" type="text" name="OG_TokenId"></input>
          <input className="mr-2" type="text" name="Listprice"></input>
          <button>List For Sale</button>
        </form>
        <div className="bg-blue-300">
          <form onSubmit={onSubmitOGFunding}>
            <input className="mt-2" type="text" name="ListIndex"></input>
            <button>OG Funding</button>
            <div>Price : 하드코딩될부분</div>
          </form>
        </div>
        {/* <div onClick={onClickPriceToSeller}>모인 금액 og판매자에게 넘겨주기</div> */}
        <form onSubmit={onSubmitPriceToSeller}>
          <input className="mt-2" type="text" name="ListIndex"></input>
          <button>withdraw : 판매금액 회수</button>
        </form>
        <div onClick={onClickOGListForSale_buyerList}>투자자 리스트</div>

        <form onSubmit={onSubmitDistributePiece}>
          <input className="mt-2" type="text" name="ListIndex"></input>
          <button>조각NFT 받기</button>
        </form>
        <div onClick={onClickOverDuration}>기간만료된 경우</div>
      </div>
      <div className="bg-purple-100">
        <div className="flex justify-center text-5xl font-bold">Vote</div>
        {/* <div onClick={onClickOffering}>offer :가격제안</div> */}
        <form onSubmit={onSubmitOffering}>
          <input className="mt-2 mr-2" type="text" name="ListIndex"></input>
          <input className="mt-2 mr-2" type="text" name="price"></input>
          <button>가격제안, 제안금액</button>
        </form>
        <div onClick={onClickGetBestOffer}>최고가격뽑기</div>
        <div onClick={onClickstartVote}>투표시작하기</div>
        <div onClick={onClickvoteResult}>투표 결과</div>
      </div>
      <div className="bg-orange-100">
        <div className="flex justify-center text-5xl font-bold">
          Piece Market
        </div>
        <div onClick={onClickListPieceTokenForSale}>조각 NFT 등록 </div>
        <div onClick={onClickBuyPieceToken}>조각 구매 </div>
        <div onClick={onClickCancelSale}>조각 판매 취소 </div>
      </div>
    </div>
  );
}
export default App;
