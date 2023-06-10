import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/notFound";
import Main from "./pages/main";
import Market from "./pages/market";
import OwnerMarket from "./pages/ownerMarket";
import Vote from "./pages/vote";
import MyPage from "./pages/mypage";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/market" element={<Market />} />
            <Route path="/ownermarket" element={<OwnerMarket />} />
            <Route path="/vote" element={<Vote />} />
            <Route path="/mypage" element={<MyPage />} />
        </Routes>
    );
}

export default App;
