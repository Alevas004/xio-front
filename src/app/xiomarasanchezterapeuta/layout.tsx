import NavBarXS from "@/components/layouts/xiomarasanchezterapeuta/NavBarXS";
import React from "react";

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
      <footer className="bg-gray-800 text-white p-4">
        <h2>Xiomara Sanchez Terapeuta FOOTER</h2>
      </footer>
    </div>
  );
};

export default XiomaraSanchezTerapeutaLayout;
