import { ADD_LETTER, SELECT_MEMBER, NEW_MESSAGE } from "./action";

const initialState = {
  letterList: JSON.parse(localStorage.getItem("letterList")) || [],
  selectedMember: "",
};

const letterReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_LETTER:
    case NEW_MESSAGE:
      const updatedList = [action.payload, ...state.letterList];
      localStorage.setItem("letterList", JSON.stringify(updatedList));
      return {
        ...state,
        letterList: updatedList,
      };
    case SELECT_MEMBER:
      return {
        ...state,
        selectedMember: action.payload,
      };
    default:
      return state;
  }
};

export default letterReducer;
