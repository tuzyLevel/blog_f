import { atom } from "recoil";

export const modalStateSchema = atom({
  key: "modalState", // unique ID (with respect to other atoms/selectors)
  default: { isOpen: false }, // default value (aka initial value)
});
