import { useEffect, useState } from "react";
import ABI from "./lib/OGNftABI.json";
import MarketABI from "./lib/MarketABI.json";
import PieceMarketABI from "./lib/PieceMarketABI.json";
import Web3 from "web3";
import axios from "axios";


function App() {
  const [account, setAccount] = useState();
  const [tokenMetadata, setTokenMetadata] = useState(0);
  const [listPrice, setListPrice] = useState();
  const [tokenId, setTokenId] = useState(0);
  const [index,setIndex] = useState();
  const [offerPrice, setOfferPrice] = useState();
  const [price, setPrice] = useState(0);
  const [voteIndex, setVoteIndex] = useState();
  const [bools, setBools] =useState(true);


  const web3 = new Web3(window.ethereum);
  // const web3_2 = new Web3("wss://sepolia.infura.io/ws/v3/bd4f14b4116f4974b5d08009d9b368f0");

  const OGNFTContractAddress = "0xF41Fd91c1D2f6b0D63941c034681dbc14C645337";
  const MarketContractAddress = "0x2ffd5D7487C097803371cFbaf3e9DC29B692093A";
  const PieceMarketContractAddress = "0x739D55D23F46A8dF8d5A88AFD499b3cB6B5A7667";

  const OGNFTContract = new web3.eth.Contract(ABI, OGNFTContractAddress);
  const MarketContract = new web3.eth.Contract(MarketABI, MarketContractAddress);
  const PieceMarketContract = new web3.eth.Contract(PieceMarketABI, PieceMarketContractAddress);
  

  // const PINATA_URL = "https://olbm.mypinata.cloud/ipfs/QmU52T5t4bXtoUqQYStgx39DdXy3gLQq7KDuF1F9g3E9Qy";

  
  //완료
  const onClickLogIn = async () => {
    try {
      const account = await window.ethereum.request({
        method : "eth_requestAccounts",
      });

      setAccount(account[0]);
    } catch (error) {
        console.error(error);
    }
  };

  //완료
  const onClickMint = async () => {
    try {
      const mintResponse = await OGNFTContract.methods.mintNFT().send({from : account});
      
      console.log(mintResponse);
    } catch (error) {
      console.error(error);
    }
  };
  //완료
  const onClickBalanceOf = async () => {
    try {
      const response = await OGNFTContract.methods.balanceOf(account).call();
      
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  //완료
  const onSubmitTokenURI = async(e) => {
    e.preventDefault();
    

    let OGIndex = Number(tokenId);
    try {
      const response = await MarketContract.methods.OGNftList(OGIndex).call();
      console.log(response);
      setPrice(web3.utils.fromWei(Number(response.price),"ether"));
      const tokenId = Number(response.OGTokenId);

      const response2 = await OGNFTContract.methods.tokenURI(tokenId).call();
      const metadataResponse = await axios.get(response2); //attribute
      console.log(metadataResponse);
      setTokenMetadata(metadataResponse);
      console.log(setTokenMetadata);
      // setPrice
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() =>{console.log("tokenId" ,tokenId)},[tokenId]);
  //useEffect(() => {console.log("price",price)},[price]);
  //완료
  const onSubmitApprove = async(e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    
    let tokenId = web3.utils.numberToHex(Number(data.get("TokenId")));
    try {
      // console.log(account);
      const response = await OGNFTContract.methods.approve(MarketContractAddress,tokenId).send({from : account})
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  //완료
  const onSubmitListForSale = async (e) => {
    e.preventDefault();

    let OGtokenId = Number(tokenId);

    let price = web3.utils.toWei(listPrice, "ether");
    try {
      const response = await MarketContract.methods.listForSale(OGNFTContractAddress, OGtokenId, price).send({from : account});
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  //완료
  const onClickgetPrice = async() => {
    try {
      let price = await MarketContract.methods.getOGNftList_price().call()
      // console.log(web3.utils.fromWei(price, "ether"));
      setPrice(Number(web3.utils.fromWei(price, "ether")));
      // console.log(Number(price));
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {console.log("price",price)},[price]);
  //완료
  const onSubmitOGFunding = async (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    let OGListIndex = Number(data.get("ListIndex"));
    console.log(OGListIndex);
    
    let priceNumber =(price)*10**18;
    console.log("priceNumber", priceNumber);

    // const price =  web3.utils.fromWei(onClickgetPrice(OGListIndex),"ether");
    
    try {
      const response = await MarketContract.methods.OGFunding(OGListIndex).send({from : account, value : priceNumber});
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
  
  /*
  돈 받는건 돈받는애가 누르게 하자 
  자기 my page에서 누르게끔 
  */
 //완료
  const onSubmitPriceToSeller = async(e) => {
    e.preventDefault();

    const data = new FormData(e.target);

    let OGListIndex =Number(data.get("ListIndex"));
    try {
      const response = await MarketContract.methods.FundingPriceToSeller(OGListIndex).send({from : account });
      console.log(response);
    } catch (error) {
      console.error(error);
    }    
  }
  /*
  history부분에다가 useEffect써서 붙이기 
  */
 //함수실행 : 완료
  const onSubmintOGListForSale_buyerList = async (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    console.log(data);
    try {
      const response = await MarketContract.methods.OGListForSale_buyerList(Number(data.get("ListIndex"))).call();
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

    let OGListIndex =  web3.utils.numberToHex(Number(data.get("ListIndex")));
    try {
      const response = await MarketContract.methods.distributePiece(OGListIndex).send({ from: account });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  //나중에
  const onClickOverDuration = async () => {
    try {
      const response = await MarketContract.methods.overDuration(1).send({ from: account });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  /*
  offering
  */
 //완료
  const onSubmitOffering = async(e) => {
    e.preventDefault();


    let OGListIndex =  Number(index);
    let _value =  web3.utils.toWei(offerPrice,"ether");
    console.log(_value);
    try {
      const response = await MarketContract.methods.offering(OGListIndex).send({from :account, value : _value});
      console.log(response);
    } catch(error) {
      console.error(error);
    }
  }
  /*
  이건 따로 매니저 지갑에서 눌러줘야함 event emit필요 
  */
  //완료
  const GetBestOffer = async(e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    let currentPollsIndex = Number(data.get("CurrentPollsIndex"));
    try {
      const response = await MarketContract.methods.getBestOffer(currentPollsIndex).send({from: account});
      console.log(response);
    } catch(error) {
      console.error(error);
    }
  }
  /*
  front에서 막아주기 
  */
  const onSubmitStartVote = async(e) => {
    try {
      e.preventDefault();
      let index = Number(voteIndex); 

      const response = await MarketContract.methods.startVote(index, bools).send({from : account});
      console.log(response);
    } catch(error) {
      console.error(error);
    }
  }
  
  const onClickButton = () => {
    setBools(true);
  }
  const onClickButton2 = () => {
    setBools(false);
  }

  console.log(bools);
  /*
  프론트에서 막아주기
  */
  const voteResult = async(e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    let index = Number(data.get("ListIndex"));
    try {
      const response = await MarketContract.methods.voteResult(index, index).send({from :account});
      console.log(response);
    } catch(error) {
      console.error(error);
    }
  }
  /*
  
  */
  const onSubmitListPieceTokenForSale = async(e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    
    let PieceListIndex =  web3.utils.numberToHex(Number(data.get("PieceIndexList")));
    let price =  web3.utils.numberToHex(Number(data.get("price")));
    try {
      const response = await PieceMarketContract.methods.listPieceTokenForSale(PieceListIndex, web3.utils.toWei(price, "ether")).send({from : account });
      console.log(response);
    } catch (error) {
      console.error(error);
    }    
  }
  /*
  value값을 PieceNftList에서 가져오기 
  */
  const onClickBuyPieceToken = async() => {
    try {
      const response = await PieceMarketContract.methods.buyPieceToken(1).send({from : account, value : web3.utils.toWei("0.000055","ether")});
      console.log(response);
    } catch (error) {
      console.error(error);
    } 
  }

  const onClickCancelSale = async() => {
    try {
      const response = await PieceMarketContract.methods.cancelSale(1).send({from : account});
      console.log(response);
    } catch (error) {
      console.error(error);
    } 
  }

  

  return (
    <div>
      <div className="bg-red-100">
        <div className="flex justify-center text-5xl font-bold">OGNFT</div>
        <div onClick={onClickLogIn}>account : {account}</div>
        <div onClick={onClickMint}>Minting</div>
        <div onClick={onClickBalanceOf}>BalanceOf</div>
        <form onSubmit={onSubmitTokenURI}>
          <input type="text" value={tokenId} onChange={(e)=> setTokenId(e.target.value)}></input>
          <button>Get Token URI</button>
          <div className="bg-green-200">price : {price} ETH</div>
          {/* //프론트님들 이거 가격 설정안되면 안됐다고 설정해주세요 */}
        </form>
          <img src={tokenMetadata.data?.image} alt="NFTIMAGE"></img>
          <div>{tokenMetadata.data?.description}</div>
          <ul>
            {tokenMetadata.data?.attributes?.map((v,i)=> {
              return <div key={i}>{v.trait_type} {v.value}</div> 
            })} 
          </ul> 
        <form onSubmit={onSubmitApprove}>
          <input className=" mt-2" type="text" name ="TokenId"></input>
          <button>Approve NFT</button>
        </form>

      </div>
      <div className="bg-blue-100">
        <div className="flex justify-center text-5xl font-bold">Market</div>
          
        <form onSubmit={onSubmitListForSale}>
          <input className="mr-2" type ="text" value ={tokenId} onChange={(e) => setTokenId(e.target.value)}></input>
          <input className="mr-2" type ="text" value ={listPrice} onChange={(e) => setListPrice(e.target.value)}></input>
          <button>List For Sale</button>
        </form>

        <div onClick={onClickgetPrice}>getPrice</div>

        <div className="bg-blue-300">
        <form onSubmit={onSubmitOGFunding}>
        <input className="mt-2" type="text" name = "ListIndex"></input>
          <button>OG Funding</button>
          <div>Price : 하드코딩될부분</div>
        </form>
        </div>
        {/* <div onClick={onClickPriceToSeller}>모인 금액 og판매자에게 넘겨주기</div> */}
        <form onSubmit={onSubmitPriceToSeller}>
          <input className="mt-2" type="text" name = "ListIndex"></input>
          <button>withdraw : 판매금액 회수</button>
        </form>
        <form onSubmit={onSubmintOGListForSale_buyerList}>
          <input className="mt-2"type="text" name = "ListIndex"></input>
          <button>펀딩 참여자 모음</button>
        </form>
        
        
        <form onSubmit={onSubmitDistributePiece}>
          <input className="mt-2" type="text" name = "ListIndex"></input>
          <button>조각NFT 받기</button>
        </form>
        <div onClick={onClickOverDuration}>기간만료된 경우</div>
      </div>
      <div className="bg-purple-100">
        <div className="flex justify-center text-5xl font-bold">Vote</div>
        {/* <div onClick={onClickOffering}>offer :가격제안</div> */}



        <form onSubmit={onSubmitOffering}>
          <input className="mt-2 mr-2" type="text" value={index} onChange={(e) => setIndex(e.target.value)}></input>
          <input className="mt-2 mr-2" type="text" value={offerPrice} onChange={(e) => setOfferPrice(e.target.value)}></input>
          
          <button>가격제안, 제안금액</button>
        </form>
        
        <form onSubmit={GetBestOffer}>
          <input className="mt-2" type="text" name="CurrentPollsIndex"></input>
            <button>get Best Offer</button>
        </form>
        {/* //투표 */}
        <form onSubmit={onSubmitStartVote}>
          <div className="flex bg-purple-300">
            <div>true</div>
            <div className="ml-2 ">false</div>
          </div>
          <div className="bg-purple-300">
            <input type="text" value={voteIndex} onChange={(e) => setVoteIndex(e.target.value)}></input>
            <input onClick={onClickButton} type="checkbox"></input>
            <input onClick={onClickButton2} type="checkbox"></input>
            <button>  : 투표하기</button>
          </div>
        </form>

        <form onSubmit={voteResult}>
          <input className="mt-2" type="text" name ="ListIndex"></input>
          <button>투표결과</button>
        </form>
        
      </div>
      <div className="bg-orange-100">
        <div className="flex justify-center text-5xl font-bold">Piece Market</div>
        {/* <div onClick={onSubmitListPieceTokenForSale}>조각 NFT 등록 </div> */}
        <form onSubmit={onSubmitListPieceTokenForSale}>
        <input className="mt-2 mr-2" type="text" name = "PieceIndexList"></input>
          <input className="mt-2 mr-2" type="text" name = "price"></input>
        </form>
        <div onClick={onClickBuyPieceToken}>조각 구매 </div>
        {/* 347은 nft카드에 붙이면 됨 */}
        <div onClick={onClickCancelSale}>조각 판매 취소 </div>
        
      </div>
    </div>
  );
}
export default App;