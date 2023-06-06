import React from "react";

const Footer = () => {
  return (
    <div className="fixed bottom-0">
      <div
        className="bg-black text-white flex justify-between items-center "
        style={{ width: "800px" }}
      >
        <img src="/img/8ball.jpg" alt="8ball" className="w-10 h-10" />
        <div>8Ball Project</div>
        <div>wallet</div>
      </div>
    </div>
  );
};

export default Footer;
