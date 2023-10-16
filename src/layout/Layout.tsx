import React, { useEffect } from "react";

import { useSetRecoilState } from "recoil";

import { loginStateSchema } from "@/states/loginState";

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

interface LayoutProps extends React.PropsWithChildren {}

export default function Layout(props: LayoutProps) {
  const setLoginState = useSetRecoilState(loginStateSchema);

  //when page Initialized

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (accessToken && refreshToken)
      setLoginState({ isLogin: true, loginCode: "success" });
  }, [setLoginState]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {props.children}
      <Footer />
    </div>
  );
}
