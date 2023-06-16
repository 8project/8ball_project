import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import { Box } from "@chakra-ui/react";
import NotFound from "./pages/notFound";
import Main from "./pages/main";
import Market from "./pages/market/market";
import PieceMarket from "./pages/pieceMarket";
import Vote from "./pages/vote";
import MyPage from "./pages/mypage";
import Header from "./components/Header";
import SideInfo from "./components/SideInfo";
import Footer from "./components/Footer";
import myNft from "./pages/myNft";
import myPieceNft from "./pages/myPieceNft";
import inProgress from "./pages/inProgress";
import onSale from "./pages/onSale";
import Login from "./pages/login";

function App() {
  const [account, setAccount] = useState("");
  return (
    <Box className="flex justify-center bg-gray-200 min-h-screen">
      <SideInfo />
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
            <Route path="/mypage/myNft" element={<myNft />} />
            <Route path="/mypage/myPieceNft" element={<myPieceNft />} />
            <Route path="/mypage/inProgress" element={<inProgress />} />
            <Route path="/mypage/onSale" element={<onSale />} />
          </Routes>
        </Box>
        <Footer />
      </Box>
    </Box>
  );
}

export default App;
