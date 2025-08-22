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
import { IoSchoolSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const menuItems = [
  {
    label: "Capacitaciones",
    href: "/xios-academy/events/corporate-training",
    order: 5,
    icono: <FaPeopleCarry size={20} />,
  },
  {
    label: "Retiros",
    href: "/xios-academy/events/retreats",
    order: 4,
    icono: <FaPeopleCarry size={20} />,
  },
  {
    label: "Seminarios",
    href: "/xios-academy/events/seminars",
    order: 3,
    icono: <GrContact size={18} />,
  },
  {
    label: "Talleres",
    href: "/xios-academy/events/workshops",
    order: 2,
    icono: <PiHandArrowUpBold size={22} />,
  },
  {
    label: "Inicio",
    href: "/xios-academy",
    order: 1,
    icono: <MdHome size={22} />,
  },
];

const NavBarAcademy = () => {
  const user = useSelector((state: RootState) => state.auth?.user);
  const [openMenu, setOpenMenu] = useState(false);
  const pathname = usePathname();

  const width = useWindowSize();
  const isMobile = (width ?? 0) < 900;

  const isActive = (link: { href: string }) => pathname === link.href;

  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };

  const isStudent = user?.role === "student";

  return (
    <div className="w-full relative">
      {isMobile ? (
        <div
          className={`fixed top-2 left-0 w-full transition-transform duration-300 z-50
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

            {/* Portal de estudiantes */}
            {isStudent ? (
              <Link href="/xios-academy/student-portal">
                <button
                  className={`p-2 absolute right-4 top-4 z-50 
                bg-black rounded-full shadow-md ${
                  isActive({ href: "/xios-academy/student-portal" })
                    ? "bg-piel-claro"
                    : "bg-amber-400"
                }`}
                >
                  <IoSchoolSharp size={34} color="white" />
                </button>
              </Link>
            ) : (
              <Link href="/xios-academy/student-portal">
                <button
                  className={`p-2 absolute right-4 top-4 z-50 
                bg-black rounded-full shadow-md ${
                  isActive({ href: "/xios-academy/student-portal" })
                    ? "bg-piel-claro"
                    : "bg-amber-400"
                }`}
                >
                  Quiero ser estudiante!
                </button>
              </Link>
            )}
          </div>
        </div>
      ) : (
        <nav className="flex justify-between items-center w-full h-[60px] px-6 bg-white shadow-md">
          <div className="flex items-center">
            <h2 className="font-bold text-lg m-0 p-0">
              EcoCare <br />{" "}
              <span className="text-xs p-0 m-0">By Xiomara Sanchez</span>
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

          <div className="flex items-center justify-center gap-2">
            {isStudent ? (
              <Link
                href="/xios-academy/student-portal"
                className={`rounded-2xl bg-verde-oscuro transition-all duration-100 hover:bg-piel-claro hover:text-verde-oscuro text-sm`}
              >
                <button
                  className={` rounded-3xl font-semibold px-2 py-1 ${
                    isActive({ href: "/xios-academy/student-portal" })
                      ? "text-verde-oscuro bg-piel-blanco border-b-verde-oscuro border-1"
                      : "text-white"
                  }`}
                >
                  Portal Estudiante
                </button>
              </Link>
            ) : (
              <Link
                href="/xios-academy/student-portal"
                className={`rounded-2xl bg-verde-oscuro transition-all duration-100 hover:bg-piel-claro hover:text-verde-oscuro `}
              >
                <button
                  className={` rounded-3xl font-semibold px-2 py-1 ${
                    isActive({ href: "/xios-academy/workshops" })
                      ? "text-verde-oscuro bg-piel-blanco border-b-verde-oscuro border-1"
                      : "text-white"
                  }`}
                >
                  Quiero ser estudiante!
                </button>
              </Link>
            )}
          </div>
        </nav>
      )}
    </div>
  );
};

export default NavBarAcademy;
