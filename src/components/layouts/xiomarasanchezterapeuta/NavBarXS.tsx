"use client";
import useWindowSize from "@/hooks/useWindowSize";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { MdHome } from "react-icons/md";
import { PiHandArrowUpBold } from "react-icons/pi";
import { GrContact } from "react-icons/gr";
import { IoWomanSharp, IoNavigate  } from "react-icons/io5";

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
                <IoNavigate   size={30} color="white" className="rotate-180" />
              )}
            </button>

            {/* Menú circular */}
            {openMenu && (
              <div className="absolute -top-[40px] -right-[60px] w-[250px] h-[250px] rounded-full bg-white shadow-xl z-40">
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
                        className={`absolute rounded-full text-sm font-semibold transition-all duration-300 hover:bg-verde-gris ${
                          isActive
                            ? "text-white bg-verde-oscuro  border-b-black border-1"
                        : "text-verde-oscuro border-1 border-verde-oscuro"
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
                         className={`flex items-center justify-center gap-1 w-full rounded-3xl font-semibold px-2 py-1 `}
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
        <nav className="flex justify-center items-center w-full h-[60px] px-6 bg-[#ffffff] shadow-md relative">
          <div className="absolute top-2 left-3 flex items-center bg-[#ffffff] w-28 h-28 z-10 rounded-full justify-center">
           <img src="/logo-xiomara-sanchez.webp" alt="xiomara sanchez terapeuta" className="h-24 w-24 object-cover" />
          </div>

          <div className="flex items-center justify-center gap-2">
            {[...menuItems]
              .sort((a, b) => a.order - b.order)
              .map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-2xl transition-all duration-100 hover:bg-verde-gris hover:text-verde-oscuro `}
                >
                  <button
                    className={`flex items-center justify-center gap-1 w-full rounded-3xl font-semibold px-2 py-1 ${
                      isActive(item)
                        ? "text-white bg-verde-oscuro  border-b-black border-1"
                        : "text-verde-oscuro border-1 border-verde-oscuro"
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
