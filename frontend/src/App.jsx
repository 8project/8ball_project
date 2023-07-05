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
import MyPieceNft from "./pages/myPage/myPieceNft";
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
            <Route path="/" element={<Main />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/market" element={<Market />} />
            <Route path="/pieceMarket" element={<PieceMarket />} />
            <Route path="/vote" element={<Vote />} />
            <Route path="/login" element={<Login account={account} />} />
            <Route path="/mypage" element={<MyPage account={account} />} />
            <Route path="/mypage/myNft" element={<MyNft />} />
            <Route path="/mypage/myPieceNft" element={<MyPieceNft />} />
            <Route path="/mypage/inProgress" element={<InProgress />} />
            <Route path="/mypage/onSale" element={<OnSale />} />
          </Routes>
        </Box>
        <BottomMenu />
      </Box>
    </Box>
  );
}

export default App;
