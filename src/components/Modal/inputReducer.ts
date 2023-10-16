export type ReducerAction = {
  type: string;
};

type ReducerState = {
  // value: string;
  isValid: boolean;
  step: string;
};

//step 1. Empty 2.Invalid data 3.Valid Data
const reducer = (state: ReducerState, action: ReducerAction) => {
  switch (action.type) {
    case "EMPTY":
      return { isValid: true, step: "EMPTY" };
    case "INVALID":
      return { isValid: false, step: "INVALID" };
    case "VALID":
      return { isValid: true, step: "VALID" };
    default:
      return { isValid: true, step: "EMPTY" };
  }
};

export default reducer;
