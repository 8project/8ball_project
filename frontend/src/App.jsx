import { Routes, Route } from "react-dom";
import NotFound from "./pages/notFound";
import Main from "./pages/main";

function App() {
    return (
        <Routes>
            <Routes path="*" elemtent={<NotFound />} />
            <Route path="/" elemtent={<Main />} />
        </Routes>
    );
}

export default App;
