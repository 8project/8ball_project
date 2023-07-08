import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import { Box } from "@chakra-ui/react";
import NotFound from "./pages/notFound";
import Main from "./pages/main/main";
import Market from "./pages/market/market";
import PieceMarket from "./pages/pieceMarket/pieceMarket";
import Vote from "./pages/vote/vote";
import MyPage from "./pages/myPage/mypage";
import Header from "./components/Header";
import SideInfo from "./components/SideInfo";
import BottomMenu from "./components/BottomMenu";
import MyNft from "./pages/myPage/myNft/myNft";
import MyPieceNft from "./pages/myPage/myPieceNft/myPieceNft";
import InProgress from "./pages/myPage/inProgress";
import OnSale from "./pages/myPage/onSale";
import Login from "./pages/myPage/login";

function App() {
  const [account, setAccount] = useState("");

  return (
    <Box className="flex justify-center bg-gray-200 min-h-screen">
      <Box className="relative xl:w-[500px]">
        <SideInfo />
      </Box>
      <Box className="relative">
        <Header account={account} setAccount={setAccount} />
        <Box className="flex justify-center lg:min-w-[800px] lg:max-w-[800px] min-w-[460px] max-w-[460px]  min-h-screen bg-white">
          <Routes>
            <Route path="/" element={<Main account={account}/>} />
            <Route path="*" element={<NotFound account={account}/>} />
            <Route path="/market" element={<Market account={account}/>} />
            <Route path="/pieceMarket" element={<PieceMarket account={account}/>} />
            <Route path="/vote" element={<Vote account={account}/>} />
            <Route path="/login" element={<Login account={account} />} />
            <Route path="/mypage" element={<MyPage account={account} />} />
            <Route path="/mypage/myNft" element={<MyNft account={account} />} />
            <Route path="/mypage/myPieceNft" element={<MyPieceNft account={account}/>} />
            <Route path="/mypage/inProgress" element={<InProgress account={account}/>} />
            <Route path="/mypage/onSale" element={<OnSale account={account}/>} />
          </Routes>
        </Box>
        <BottomMenu />
      </Box>
    </Box>
  );
}

export default App;
