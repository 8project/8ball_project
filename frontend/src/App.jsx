import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/notFound";
import Main from "./pages/main";
function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="*" elememt={<NotFound />} />
            </Routes>
        </div>
    );
}

export default App;
