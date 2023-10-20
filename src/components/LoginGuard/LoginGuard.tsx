import React, { useEffect } from "react";

import { useRecoilState } from "recoil";

import { useRouter } from "next/navigation";

import { loginStateSchema } from "@/states/loginState";

const LoginGuard = (props: React.PropsWithChildren) => {
  const [loginState, setLoginState] = useRecoilState(loginStateSchema);

  const router = useRouter();

  useEffect(() => {
    if (!loginState.isLogin) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      router.replace("/");
      window.alert("Need Login");
    }
  }, [loginState, router]);

  return <>{props.children}</>;
};

export default LoginGuard;
