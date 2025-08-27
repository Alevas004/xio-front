"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CgProfile } from "react-icons/cg";
import { IoMdCloseCircle } from "react-icons/io";
import { FiLogIn } from "react-icons/fi";
import { useState } from "react";
import useWindowSize from "@/hooks/useWindowSize";
import { LuCircleUser } from "react-icons/lu";
import { IoStorefront } from "react-icons/io5";
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
      href: "/almarabyxio",
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
              className=" p-2 absolute right-4 bottom-10 z-50
              bg-black rounded-full shadow-md "
              onClick={handleOpenMenuUser}
            >
              {openMenuUser ? (
                <IoMdCloseCircle size={40} color="var(--white)" />
              ) : (
                <LuCircleUser size={40} color="white" />
              )}
            </button>
            {openMenuUser && (
              <div className="absolute bottom-30 right-4 w-fit rounded-lg bg-white p-2 z-40 shadow-lg">
                <div className="flex flex-col justify-center items-center gap-2">
                  {[...menuUserItems]
                    .sort((a, b) => a.order - b.order)
                    .map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center w-[100px] justify-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                          isActive(item)
                            ? "bg-verde-oscuro border-verde-oscuro text-white shadow-md"
                            : "text-verde-oscuro hover:text-piel-blanco hover:bg-verde-oscuro border border-verde-oscuro hover:border-verde-claro"
                        }`}
                      >
                        <button
                          onClick={
                            item.label === "Salir" ? item.logOut : undefined
                          }
                          className={`flex flex-col items-center w-full justify-center gap-1  rounded-3xl font-semibold px-2 py-1`}
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
              className=" p-2 absolute left-4 bottom-10 z-50 rounded-full shadow-md bg-black"
              onClick={handleOpenMenuCompanies}
            >
              {openMenuCompanies ? (
                <IoMdCloseCircle size={40} color="var(--white)" />
              ) : (
                <IoStorefront size={40} color="white" />
              )}
            </button>
            {openMenuCompanies && (
              <div className="absolute bottom-30 left-4 w-fit rounded-lg bg-white z-40 shadow-lg">
                <div className="flex flex-col justify-center items-center gap-2 p-2">
                  {[...companies]
                    .sort((a, b) => a.order - b.order)
                    .map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center w-[100px] justify-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                          isActive(item)
                            ? "bg-verde-oscuro border-verde-oscuro text-white shadow-md"
                            : "text-verde-oscuro hover:text-piel-blanco hover:bg-verde-oscuro border border-verde-oscuro hover:border-verde-claro"
                        }`}
                      >
                        <button
                          className={`flex flex-col items-center w-full justify-center gap-1  rounded-3xl font-semibold px-2 py-1`}
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
        <nav className="flex items-center px-8 justify-between gap-6 bg-white py-4 relative z-50">
          {/* Logo/Brand Section */}
          <div className="flex items-center">
            <Link
              href="/"
              className="text-3xl font-bold  bg-verde-oscuro px-2 py-1 rounded-lg"
            >
              <h1 className="text-white">XIO&apos;S</h1>
            </Link>
          </div>

          {/* Companies Navigation */}
          <div className="flex gap-2">
            {companies.map((item) => (
              <div key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
                    isActive(item)
                      ? "bg-gradient-2 text-white shadow-md"
                      : "text-verde-oscuro hover:bg-verde-gris hover:text-verde-oscuro"
                  }`}
                >
                  {item.label}
                </Link>
              </div>
            ))}
          </div>

          {/* User Menu */}
          <div className="flex gap-3">
            {[...menuUserItems]
              .sort((a, b) => a.order - b.order)
              .map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                    item.label === "Salir" || item.label === "Login"
                      ? "bg-gradient-2 text-white hover:text-piel-blanco shadow-md hover:shadow-lg"
                      : isActive(item)
                      ? "bg-white border-verde-oscuro border-1 text-verde-oscuro shadow-md"
                      : "text-verde-oscuro hover:text-white hover:bg-verde-oscuro border border-verde-oscuro hover:border-verde-claro"
                  }`}
                >
                  <button
                    onClick={item.label === "Salir" ? item.logOut : undefined}
                    className="flex items-center justify-center gap-2 w-full"
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
