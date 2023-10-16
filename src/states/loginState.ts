import { atom } from "recoil";

export const loginStateSchema = atom({
  key: "loginState", // unique ID (with respect to other atoms/selectors)
  default: { isLogin: false, loginCode: "logout" }, // default value (aka initial value)
});
