import Footer from "../components/Footer";
import Medium from "../components/Medium";
import Top from "../components/Top";

function Main() {
    return (
        <div>
            <div className="flex flex-col h-screen justify-center items-center">
                <Top />
                <div className="flex-1 flex justify-center items-center">
                    <div className="text-center">
                        <Medium />
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}
export default Main;
