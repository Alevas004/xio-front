"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CgProfile } from "react-icons/cg";
import { IoMdCloseCircle } from "react-icons/io";
import { FiLogIn } from "react-icons/fi";
import { useState } from "react";
import useWindowSize from "@/hooks/useWindowSize";
import { LuCircleUser } from "react-icons/lu";
import { BsBuildingsFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { logout } from "@/redux/slices/authSlice";

const NavBarApps = () => {
  const [openMenuUser, setOpenMenuUser] = useState(false);
  const [openMenuCompanies, setOpenMenuCompanies] = useState(false);
  const user = useSelector((store: RootState) => store.auth.user);
  const dispatch = useDispatch();

  const pathname = usePathname();
  const width = useWindowSize();
  const isMobile = (width ?? 0) < 920;

  const handleOpenMenuUser = () => {
    setOpenMenuUser(!openMenuUser);
    setOpenMenuCompanies(false);
  };
  const handleOpenMenuCompanies = () => {
    setOpenMenuCompanies(!openMenuCompanies);
    setOpenMenuUser(false);
  };

  const isActive = (link: { href: string }) =>
    pathname === link.href || pathname.startsWith(link.href);

  const companies = [
    {
      label: "Xiomara Sanchez",
      href: "/xiomarasanchezterapeuta",
      order: 1,
      icono: <FiLogIn size={20} />,
    },
    {
      label: "EcoCare by Xio",
      href: "/byxio",
      order: 2,
      icono: <CgProfile size={20} />,
    },
    {
      label: "Xio's Academy",
      href: "/xios-academy",
      order: 3,
      icono: <CgProfile size={20} />,
    },
    {
      label: "Servicios SPA",
      href: "/xiomarasanchez-spa",
      order: 4,
      icono: <CgProfile size={20} />,
    },
  ];

  const menuUserItems = user
    ? [
        {
          label: "Perfil",
          href: "/xio-auth/users/my-profile",
          order: 1,
          icono: <CgProfile size={20} />,
        },
        {
          label: "Salir",
          href: "/xio-auth/users/login",
          logOut: () => dispatch(logout()),
          order: 2,
          icono: <IoMdCloseCircle size={20} />,
        },
      ]
    : [
        {
          label: "Login",
          href: "/xio-auth/users/login",
          order: 1,
          icono: <FiLogIn size={20} />,
        },
        {
          label: "Register",
          href: "/xio-auth/users/register",
          order: 2,
          icono: <CgProfile size={20} />,
        },
      ];

  return (
    <>
      {isMobile ? (
        <div className="fixed bottom-0 w-full transition-transform duration-300 z-100">
          <div className="relative ">
            {/* Botón de usuario */}
            <button
              className="bg-piel-claro p-2 absolute right-4 bottom-10 z-50
              bg-verde-oscuro rounded-full shadow-md "
              onClick={handleOpenMenuUser}
            >
              {openMenuUser ? (
                <IoMdCloseCircle size={44} color="var(--pielblanco)" />
              ) : (
                <LuCircleUser size={44} color="white" />
              )}
            </button>
            {openMenuUser && (
              <div className="absolute bottom-30 right-4 w-fit rounded-lg bg-gradient-2 z-40 shadow-lg">
                <div className="flex flex-col justify-center items-center gap-2">
                  {[...menuUserItems]
                    .sort((a, b) => a.order - b.order)
                    .map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`p-2 rounded-lg text-sm font-semibold w-[100px] transition-all duration-300 hover:bg-verde-claro hover:text-verde-oscuro ${
                          isActive(item)
                            ? "text-verde-oscuro bg-piel-claro"
                            : "text-piel-blanco"
                        }`}
                      >
                        <button
                          onClick={
                            item.label === "Salir" ? item.logOut : undefined
                          }
                          className={`flex flex-col items-center w-full justify-center gap-1  rounded-3xl font-semibold px-2 py-1 ${
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
              </div>
            )}
            {/* Botón de empresas */}
            <button
              className="bg-piel-claro p-2 absolute left-4 bottom-10 z-50 rounded-full shadow-md bg-verde-oscuro"
              onClick={handleOpenMenuCompanies}
            >
              {openMenuCompanies ? (
                <IoMdCloseCircle size={44} color="var(--pielblanco)" />
              ) : (
                <BsBuildingsFill size={44} color="white" />
              )}
            </button>
            {openMenuCompanies && (
              <div className="absolute bottom-30 left-4 w-fit rounded-lg bg-gradient-2 z-40 shadow-lg">
                <div className="flex flex-col justify-center items-center gap-2">
                  {[...companies]
                    .sort((a, b) => a.order - b.order)
                    .map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`p-2 rounded-lg text-sm font-semibold w-[100px] transition-all duration-300 hover:bg-verde-claro hover:text-verde-oscuro ${
                          isActive(item)
                            ? "text-verde-oscuro bg-piel-claro"
                            : "text-piel-blanco"
                        }`}
                      >
                        <button
                          className={`flex flex-col items-center w-full justify-center gap-1  rounded-3xl font-semibold px-2 py-1 ${
                            isActive(item)
                              ? "text-verde-oscuro bg-piel-blanco border-b-verde-oscuro border-1"
                              : "text-white"
                          }`}
                          onClick={() => setOpenMenuCompanies(false)}
                        >
                          {item.label}
                        </button>
                      </Link>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <nav className="flex items-center px-10 justify-between gap-4 bg-verde-oscuro text-white p-4 relative z-50">
          <div className="flex gap-4">
            {companies.map((item) => (
              <div key={item.href} className="">
                <Link
                  href={item.href}
                  className={`flex items-center justify-center gap-1 w-full rounded-3xl font-semibold px-2 py-1 ${
                    isActive(item)
                      ? "text-verde-oscuro bg-piel-blanco border-b-verde-oscuro border-1"
                      : "text-white"
                  }`}
                >
                  <button
                    className={`flex items-center justify-center gap-1 w-full rounded-3xl font-semibold px-2 py-1 `}
                  >
                    {item.label}
                  </button>
                </Link>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            {[...menuUserItems]
              .sort((a, b) => a.order - b.order)
              .map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-2xl bg-verde-oscuro transition-all duration-100 hover:bg-piel-claro hover:text-verde-oscuro `}
                >
                  <button
                    onClick={item.label === "Salir" ? item.logOut : undefined}
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
        </nav>
      )}
    </>
  );
};

export default NavBarApps;
