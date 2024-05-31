import React from "react";
const Header = () => {
  return (
    <div className="fixed z-10 top-0 left-0 w-full flex justify-center items-center">
      <div className="w-full h-full flex justify-between items-center">
        <a className="m-3 ms-7 flex justify-center items-center gap-2" href="/">
          <img src="/assets/logo/DailyKesLogo.png" className="w-6 h-7"/>
          <h1 className="text-2xl font-bold text-[var(--text-color)]">
            Daily Kes.
          </h1>
        </a>
      </div>
    </div>
  );
};

export default Header;
