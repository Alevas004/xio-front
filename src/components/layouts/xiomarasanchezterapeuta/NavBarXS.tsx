"use client";
import useWindowSize from "@/hooks/useWindowSize";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { CgMenuGridR } from "react-icons/cg";
import { IoMdCloseCircle } from "react-icons/io";
import { MdHome } from "react-icons/md";
import { PiHandArrowUpBold } from "react-icons/pi";
import { GrContact } from "react-icons/gr";
import { IoWomanSharp } from "react-icons/io5";

const NavBarXS = () => {
  const [openMenu, setOpenMenu] = useState(false);
 const [showNav, setShowNav] = useState(true);
 
  const width = useWindowSize();
  const isMobile = (width ?? 0) < 768;
  const pathname = usePathname();

  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };

  const isActive = (link: { href: string }) => pathname === link.href;

  const menuItems = [
    {
      label: "Acerca",
      href: "/xiomarasanchezterapeuta/about-me",
      order: 4,
      icono: <IoWomanSharp size={20} />,
    },
    {
      label: "Contáctame",
      href: "/xiomarasanchezterapeuta/contact",
      order: 3,
      icono: <GrContact size={18} />,
    },
    {
      label: "Servicios",
      href: "/xiomarasanchezterapeuta/services-xs",
      order: 2,
      icono: <PiHandArrowUpBold size={22} />,
    },
    {
      label: "Inicio",
      href: "/xiomarasanchezterapeuta",
      order: 1,
      icono: <MdHome size={22} />,
    },
  ];

 
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY.current) {
        setShowNav(false); // hacia abajo
      } else {
        setShowNav(true); // hacia arriba
      }
      lastScrollY.current = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {isMobile ? (
        <div
          className={`fixed top-2 left-0 w-full transition-transform duration-300 z-100 ${
            showNav ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="w-full relative">
            {/* Botón de navegación */}
            <button
              className="p-2 absolute right-4 top-4 z-50 
              bg-black rounded-full shadow-md"
              onClick={handleOpenMenu}
            >
              {openMenu ? (
                <IoMdCloseCircle size={34} color="white" />
              ) : (
                <CgMenuGridR size={34} color="white" />
              )}
            </button>

            {/* Menú circular */}
            {openMenu && (
              <div className="absolute -top-[40px] -right-[60px] w-[250px] h-[250px] rounded-full bg-gradient-2 shadow-xl z-40">
                {[...menuItems]
                  .sort((a, b) => b.order - a.order)
                  .map((item, index) => {
                    const startAngle = 70;
                    const endAngle = 220;
                    const angleRange = endAngle - startAngle;
                    const angle =
                      startAngle +
                      (index * angleRange) / (menuItems.length - 1);

                    const radius = 65;
                    const x = radius * Math.cos((angle * Math.PI) / 180);
                    const y = radius * Math.sin((angle * Math.PI) / 180);

                    const isActive = pathname === item.href;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`absolute rounded-full text-sm font-semibold transition-all duration-300 hover:bg-piel-claro hover:text-verde-oscuro ${
                          isActive
                            ? "text-verde-oscuro bg-piel-claro"
                            : "text-piel-blanco"
                        }`}
                        style={{
                          left: `calc(50% + ${x}px)`,
                          top: `calc(50% + ${y}px)`,
                          transform: `translate(-50%, -50%) rotate(${
                            angle - 180
                          }deg)`,
                          transformOrigin: "center",
                        }}
                      >
                        <button
                          onClick={() => setOpenMenu(false)}
                          className={`flex flex-col items-center w-full justify-center gap-1  rounded-3xl font-semibold px-2 py-1 ${
                            isActive
                              ? "text-verde-oscuro bg-piel-blanco border-b-verde-oscuro border-1"
                              : "text-white"
                          }`}
                        >
                          {item.label}
                        </button>
                      </Link>
                    );
                  })}
              </div>
            )}
          </div>
        </div>
      ) : (
        <nav className="flex justify-between items-center w-full h-[60px] px-6 bg-white shadow-md">
          <div className="flex items-center">
            <h2 className="font-bold text-lg">
              XIOMARA <br /> SÁNCHEZ
            </h2>
          </div>

          <div className="flex items-center justify-center gap-2">
            {[...menuItems]
              .sort((a, b) => a.order - b.order)
              .map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-2xl bg-verde-oscuro transition-all duration-100 hover:bg-piel-claro hover:text-verde-oscuro `}
                >
                  <button
                    className={`flex items-center justify-center gap-1 w-full rounded-3xl font-semibold px-2 py-1 ${
                      isActive(item)
                        ? "text-verde-oscuro bg-piel-blanco border-b-verde-oscuro border-1"
                        : "text-white"
                    }`}
                  >
                    {item?.icono}
                    {item.label}
                  </button>
                </Link>
              ))}
          </div>

          <div className="flex items-center gap-2"></div>
        </nav>
      )}
    </>
  );
};

export default NavBarXS;
