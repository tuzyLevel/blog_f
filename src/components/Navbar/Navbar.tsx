import React, { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import Link from "next/link";

import styled from "styled-components";
import tw from "twin.macro";

import { useRecoilState } from "recoil";

import { removeCookie } from "@/util/cookies";

import HomeLogo from "./Homelogo/HomeLogo";
import Menu from "./Menu/Menu";
import Search from "./Search/Search";
import Portal from "../Portal/Portal";
import Modal from "../Modal/Modal";
import { modalStateSchema } from "@/states/modalState";
import { loginStateSchema } from "@/states/loginState";

import { customAxios, axiosWithAuth } from "@/util/customAxios";

// const menues = [""];

interface NavbarProps extends React.PropsWithChildren {}

const NavbarContainer = tw.nav`
sticky 
bg-white 
top-0 
h-14 
w-full 
border-b-4
flex 
justify-between 
items-center 
mx-auto px-4 
md:h-16 
z-10
`;

const MdMenuContainer = tw.div`
hidden 
md:flex
`;

const DefaultMenuContainer = tw.div`
flex
relative
md:hidden 
`;

const NavMenuBtn = styled.button`
  ${tw`w-24 border-2 border-gray-700 rounded-2xl p-2 m-1`}
  &:hover {
    ${tw`bg-gray-700 text-white`}
  }
`;

export default function Navbar(props: NavbarProps) {
  const currentPage = usePathname();
  const router = useRouter();
  const [menuToggle, setMenuToggle] = useState(true);
  const [modalState, setModalState] = useRecoilState(modalStateSchema);
  const [loginState, setLoginState] = useRecoilState(loginStateSchema);

  useEffect(() => {}, [modalState.isOpen]);

  const loginBtnHandler = () => {
    setModalState(() => {
      return { isOpen: true };
    });
  };

  const logoutBtnHandler = async () => {
    // const accessToken = localStorage.getItem("accessToken");
    // const refreshToken = localStorage.getItem("refreshToken");
    // const Authorization = `Bearer ${accessToken}`;
    // const res = await customAxios.post(
    //   "/api/user/logout",
    //   { refreshToken },
    //   { headers: { Authorization } }
    // );

    const res = await axiosWithAuth.post("/api/user/logout");

    const data = res.data;
    console.log(data);

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    setLoginState(() => {
      return { isLogin: false, loginCode: "logout" };
    });
  };

  function menuToggleHandler() {
    console.log("clicked menuToggleHandler");
    setMenuToggle((prev) => !prev);
  }

  return (
    <>
      <Portal selector="#portal_root">{modalState.isOpen && <Modal />}</Portal>
      <NavbarContainer>
        <HomeLogo />
        {/* <Search /> */}
        <MdMenuContainer>
          {!loginState.isLogin && (
            <NavMenuBtn onClick={loginBtnHandler}>로그인</NavMenuBtn>
          )}
          {loginState.isLogin && (
            <>
              {router.pathname !== "/admin" ? (
                <Link
                  className="text-center w-24 border-2 border-gray-700 hover:bg-gray-700 hover:text-white rounded-2xl p-2 m-1"
                  href="/admin"
                >
                  관리
                </Link>
              ) : (
                <Link
                  className="text-center w-24 border-2 border-gray-700 hover:bg-gray-700 hover:text-white rounded-2xl p-2 m-1"
                  href="/admin/posting/write"
                >
                  글쓰기
                </Link>
              )}

              <NavMenuBtn onClick={logoutBtnHandler}>로그아웃</NavMenuBtn>
            </>
          )}
        </MdMenuContainer>
        <DefaultMenuContainer>
          <button type="button" onClick={menuToggleHandler}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
          <div
            className={
              menuToggle ? `hidden` : "block" + ` absolute top-2 right-4`
            }
          >
            <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-200">
              Pricing
            </a>
            <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-200">
              Features
            </a>
          </div>
        </DefaultMenuContainer>
      </NavbarContainer>
    </>
  );
}
