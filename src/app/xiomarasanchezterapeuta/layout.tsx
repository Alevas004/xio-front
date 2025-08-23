import NavBarXS from "@/components/layouts/xiomarasanchezterapeuta/NavBarXS";
import React from "react";
import FooterXS from "./components/FooterXS";

const XiomaraSanchezTerapeutaLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-col flex-1">
        <header className=" w-full">
          <NavBarXS />
        </header>
        <main className="flex-1">{children}</main>
      </div>
      <footer className="bg-gradient-2">
        <FooterXS />
      </footer>
    </div>
  );
};

export default XiomaraSanchezTerapeutaLayout;
