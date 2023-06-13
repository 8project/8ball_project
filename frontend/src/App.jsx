import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import { Box } from "@chakra-ui/react";
import NotFound from "./pages/notFound";
import Main from "./pages/main";
import Market from "./pages/market";
import PieceMarket from "./pages/pieceMarket";
import Vote from "./pages/vote";
import MyPage from "./pages/mypage";
import Header from "./components/Header";
import SideInfo from "./components/SideInfo";
import Footer from "./components/Footer";

function App() {
    const [account, setAccount] = useState("");
    return (
        <Box className="flex justify-center">
            <SideInfo />
            <Box>
                <Header account={account} setAccount={setAccount} />
                <Box className="flex justify-center lg:min-w-[800px] lg:max-w-[800px] min-w-[460px] max-w-[460px] border-l-2 border-r-2 min-h-[800px]">
                    <Routes>
                        <Route path="/" element={<Main />} />
                        <Route path="*" element={<NotFound />} />
                        <Route path="/market" element={<Market />} />
                        <Route path="/pieceMarket" element={<PieceMarket />} />
                        <Route path="/vote" element={<Vote />} />
                        <Route path="/mypage" element={<MyPage />} />
                    </Routes>
                </Box>
                <Footer />
            </Box>
        </Box>
    );
}

export default App;
