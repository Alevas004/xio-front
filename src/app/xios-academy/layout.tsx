import NavBarAcademy from "@/components/layouts/xiosAcademy/NavBarAcademy";
import FooterAcademy from "@/components/xios-academy/FooterAcademy";
import React from "react";

const ByXioLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-col flex-1">
        <header className=" w-full">
          <NavBarAcademy />
        </header>
        <main className="flex-1 bg-[#fdf4ee]">{children}</main>
      </div>
      <footer className="bg-gray-800 text-white p-4">
       <FooterAcademy />
      </footer>
    </div>
  );
};

export default ByXioLayout;
