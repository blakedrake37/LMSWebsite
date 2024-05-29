import React, { useEffect, useState } from "react";
import Logo from "../../assets/logo.png";
import { FaCartShopping } from "react-icons/fa6";
import DarkMode from "./DarkMode";
import { FaCaretDown } from "react-icons/fa";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useLocation, useNavigate } from "react-router-dom";
import AuthModel from "../Auth/AuthModel";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getUser, logout } from "../../State/Auth/Action";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";

const Menu = [
  {
    id: 1,
    name: "Home",
    link: "/",
  }
];

const DropdownLinks = [
  {
    name: "Profile",
    link: "/#",
  },
  {
    name: "Cart",
    link: "/cart",
  },{
    name: "Order tracking",
    link: "/order",
  },
  {
    name: "Log out",
    link: "/#",
  },
];

const Navbar = () => {
  const navigator = useNavigate();
  const [openAuthModel, setOpenAuthModel] = useState(false);
  const { auth } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");
  const dispatch = useDispatch();
  const location = useLocation();
  const Account = null;
  const handleClose = () => {
    setOpenAuthModel(false);
  };
  const handleOpen = () => {
    setOpenAuthModel(true);
  };
  const handleLogout = () => {
    dispatch(logout());
    handleClose();
  };
  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [jwt, auth.jwt]);
  useEffect(() => {
    if (auth.user) {
      // console.log("username", auth.user);
      handleClose();
    }
    if (location.pathname === "/login" || location.pathname === "/register") {
      navigator(-1);
    }
  }, [auth.account]);
  return (
    <>
      <div className="shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200">
        <div className="container py-3 sm:py-0">
          <div className="flex justify-between items-center">
            <div>
              <a href="/" className="font-bold text-2xl sm:text-3xl flex gap-2">
                <img src={Logo} alt="Logo" className="w-10" />
                Library
              </a>
            </div>
            <div className="flex justify-between items-center gap-4">
              <div>
                <DarkMode />
              </div>
              {/* <div className="flex lg:ml-6">
                  <a href="#" className="inline-block py-4 px-4 hover:text-primary duration-200">
                    <span className="sr-only">Search</span>
                    <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                  </a>
                </div> */}

              <ul className="hidden sm:flex items-center gap-4">
                {Menu.map((menu) => (
                  <li key={menu.id}>
                    <a
                      href={menu.link}
                      className="inline-block py-4 px-4 hover:text-primary duration-200"
                    >
                      {menu.name}
                    </a>
                  </li>
                ))}
                {/* Simple Dropdown and Links */}
                {
                  auth.user?.role === 0 ? (
                    <li>
                      <a
                        href="/admin"
                        className="inline-block py-4 px-4 hover:text-primary duration-200"
                      >
                        Admin
                      </a>
                    </li>
                  ) : ""
                }
                {auth.user?.username ? (
                  <li className="group relative cursor-pointer">
                    <a
                      href="/"
                      className="flex h-[72px] items-center gap-[2px]"
                    >
                      <Avatar sx={{ bgcolor: deepOrange[500] }}>
                        {auth.user?.username[0].toUpperCase()}
                      </Avatar>
                      <span>
                        <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
                      </span>
                    </a>
                    <div className="absolute -left-9 z-[9999] hidden w-[150px] rounded-md bg-white p-2 text-black group-hover:block  ">
                      <ul className="space-y-3">
                        {DropdownLinks.map((data) => (
                          <li key={data.name}>
                            {data.name === "Log out" ? (
                              <Button
                                className="inline-block w-full rounded-md p-2 hover:bg-primary/20"
                                onClick={handleLogout}
                              >
                                {data.name}
                              </Button>
                            ) : (
                              <a
                                className="inline-block w-full rounded-md p-2 hover:bg-primary/20"
                                href={data.link}
                              >
                                {data.name}
                              </a>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ) : (
                  <div className="ml-auto flex items-center">
                    <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                      <Button
                        onClick={handleOpen}
                        className="inline-block py-4 px-4 hover:text-primary duration-200"
                      >
                        Sign in
                      </Button>
                    </div>
                  </div>
                )}
              </ul>
            </div>
          </div>
        </div>
        <AuthModel handleClose={{ handleClose }} open={openAuthModel} />
      </div>
    </>
  );
};

export default Navbar;
