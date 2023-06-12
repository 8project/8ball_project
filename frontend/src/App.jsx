import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/notFound";
import Main from "./pages/main";
import Market from "./pages/market";
import OwnerMarket from "./pages/ownerMarket";
import Vote from "./pages/vote";
import MyPage from "./pages/mypage";
import { useState } from "react";

function App() {
  const [account, setAccount] = useState("");
  return (
    <Routes>
      <Route
        path="/"
        element={<Main account={account} setAccount={setAccount} />}
      />
      <Route path="*" element={<NotFound />} />
      <Route path="/market" element={<Market />} />
      <Route path="/ownermarket" element={<OwnerMarket />} />
      <Route path="/vote" element={<Vote />} />
      <Route path="/mypage" element={<MyPage />} />
    </Routes>
  );
}

export default App;
