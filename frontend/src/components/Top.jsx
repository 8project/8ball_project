import React from "react";

const top = () => {
  return (
    <div
      className="bg-black text-white flex justify-between items-center fixed top-0 "
      style={{ width: "800px" }}
    >
      <img src="/img/8ball.jpg" alt="8ball" className="w-10 h-10" />
      <div>8Ball Project</div>
      <div>wallet</div>
    </div>
  );
};

export default top;
