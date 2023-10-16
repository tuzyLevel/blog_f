import { atom } from "recoil";

export const SearchKeywordStatSchema = atom({
  key: "SearchKeywordState", // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
});
