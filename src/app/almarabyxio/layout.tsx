import NavBarByXio from "@/components/layouts/ecoCareByXio/NavBarByXio";
import ProviderCart from "@/redux/ProviderCart";
import React from "react";

const ByXioLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProviderCart>
      <div className="flex flex-col h-screen">
        <div className="flex flex-col flex-1">
          <header className=" w-full">
            <NavBarByXio />
          </header>
          <main className="flex-1">{children}</main>
        </div>
        <footer className="bg-gray-800 text-white p-4">
          <h2>Xiomara Sanchez Terapeuta FOOTER</h2>
        </footer>
      </div>
    </ProviderCart>
  );
};

export default ByXioLayout;
