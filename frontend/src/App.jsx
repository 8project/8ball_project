import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/notFound";
import Main from "./pages/main";
import Market from "./pages/market";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="*" elememt={<NotFound />} />
            <Route path="/market" elememt={<Market />} />
        </Routes>
    );
}

export default App;
