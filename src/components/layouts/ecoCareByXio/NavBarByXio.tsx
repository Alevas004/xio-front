"use client";
import useWindowSize from "@/hooks/useWindowSize";
import Link from "next/link";
import React, { useState } from "react";
import { FaPeopleCarry } from "react-icons/fa";
import { GrContact } from "react-icons/gr";
import { PiHandArrowUpBold } from "react-icons/pi";
import { MdHome } from "react-icons/md";
import { usePathname } from "next/navigation";
import { IoMdCloseCircle } from "react-icons/io";
import { CgMenuGridR } from "react-icons/cg";
import { BsBagHeartFill } from "react-icons/bs";

const menuItems = [
  {
    label: "Acerca",
    href: "/almarabyxio/about-us",
    order: 4,
    icono: <FaPeopleCarry size={20} />,
  },
  {
    label: "Contáctanos",
    href: "/almarabyxio/contact",
    order: 3,
    icono: <GrContact size={18} />,
  },
  {
    label: "Productos",
    href: "/almarabyxio/products",
    order: 2,
    icono: <PiHandArrowUpBold size={22} />,
  },
  {
    label: "Inicio",
    href: "/almarabyxio",
    order: 1,
    icono: <MdHome size={22} />,
  },
];

const NavBarByXio = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openCart, setOpenCart] = useState(false);

  const pathname = usePathname();

  const width = useWindowSize();
  const isMobile = (width ?? 0) < 768;

  const isActive = (link: { href: string }) => pathname === link.href;

  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
    setOpenCart(false);
  };

  const handleOpenCart = () => {
    setOpenCart(!openCart);
    setOpenMenu(false);
  };

  return (
    <div className="w-full relative">
      {isMobile ? (
        <div
          className={`fixed top-2 left-0 w-full transition-transform duration-300 z-100
          }`}
        >
          <div className="w-full relative">
            {/* Botón de navegación */}
            <button
              className="p-2 absolute left-4 top-4 z-50 
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
              <div className="absolute -top-[40px] -left-[60px] w-[250px] h-[250px] rounded-full bg-gradient-2 shadow-xl z-40">
                {[...menuItems]
                  .sort((a, b) => b.order - a.order)
                  .map((item, index) => {
                    const startAngle = -40;
                    const endAngle = 120;
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
        <nav className="flex justify-between items-center w-full h-[60px] lg:px-50  md:px-30 bg-white shadow-md">
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

          <div className="flex items-center">
            <h2 className="font-bold text-lg m-0 p-0">
              EcoCare <br />{" "}
              <span className="text-xs p-0 m-0">By Xiomara Sanchez</span>
            </h2>
          </div>
        </nav>
      )}
      <div
        className={`fixed top-6 right-4 lg:top-20 lg:right-10 md:top-24 md:right-10  z-50`}
      >
        <button
          className=" p-2 rounded-full shadow-md bg-black"
          onClick={handleOpenCart}
        >
          {openCart ? (
            <IoMdCloseCircle size={34} color="white" />
          ) : (
            <BsBagHeartFill size={34} color="white" />
          )}
        </button>
        {openCart && (
          <div className="absolute top-14 right-4 w-[300px] bg-white/70 shadow-lg rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">Carrito de Compras</h3>
            <p>Aquí se mostrarán los productos del carrito.</p>
            {/* agregar la lógica para mostrar los productos del carrito */}
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBarByXio;
