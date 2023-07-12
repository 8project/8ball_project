import VoteNftModal from "./voteNftModal";

const VoteNftCard = ({
    v,
    i,
    bestOffer,
    selectedOption,
    isSubmitted,
    handleOptionClick,
    handleSubmit,
    handleConfirmation,
    isConfirmationOpen,
}) => {
    return (
        <div>
            <div>
                <div
                    key={i}
                    className={`lg:max-w-[800px] max-w-[460px] flex justify-center items-center mb-4 ${
                        isSubmitted ? "bg-gray-400" : "bg-gray-200"
                    } pb-12 pl-6`}
                >
                    <div className="m-2">
                        <img src={v.data.image} alt="pieceNft" className="w-10 h-10" />
                    </div>

                    <div className="m-2 p-1 text-center">
                        <div>Offer price</div>
                        <div className="text-blue-500">{bestOffer} ETH</div>
                    </div>

                    <div className="m-2 p-1 text-center">
                        <div className="">Duration</div>
                        <div>0618~0619</div> // {/*기간도 설정해줘야함 */}
                    </div>

                    <div className="mt-6 ml-4">
                        <div>Vote</div>
                        <div>
                            <div className="flex items-center">
                                <button
                                    className={`option-button ${
                                        selectedOption === "up" ? "selected" : ""
                                    }`}
                                    onClick={() => handleOptionClick("up")}
                                    disabled={isSubmitted}
                                ></button>
                                <div className="ml-2">Up</div>
                            </div>
                            <div className="flex items-center">
                                <button
                                    className={`option-button ${
                                        selectedOption === "down" ? "selected" : ""
                                    }`}
                                    onClick={() => handleOptionClick("down")}
                                    disabled={isSubmitted}
                                ></button>
                                <div className="ml-2">Down</div>
                            </div>
                        </div>
                    </div>

                    {!isSubmitted && (
                        <div className="self-end ml-2">
                            <button
                                className={`text-white m-1 p-1 rounded-md ${
                                    isSubmitted ? "disabled" : "bg-blue-500"
                                }`}
                                onClick={handleSubmit}
                                disabled={isSubmitted}
                            >
                                Submit
                            </button>
                        </div>
                    )}

                    {isSubmitted && <div className="self-end ml-2"></div>}
                </div>
            </div>
            <VoteNftModal
                isConfirmationOpen={isConfirmationOpen}
                handleConfirmation={handleConfirmation}
            />
        </div>
    );
};

export default VoteNftCard;
