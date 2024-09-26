import React from "react";
import logo from "../manavis.png";

const Header = () => {
  return (
    <div className="flex justify-between items-center p-4 text-white">
      <div className="text-4xl font-bold text-blue-400">
        <img src={logo} className="" />
        <div className="text-lg text-black py-2">Video Analytics</div>
      </div>
      <div className="bg-white text-black p-2 rounded-md text-2xl font-semibold">
        Event : MICE INNOVATION
      </div>
    </div>
  );
};

export default Header;
