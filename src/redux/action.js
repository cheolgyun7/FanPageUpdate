//액션 유형 정의
export const ADD_LETTER = "ADD_LETTER";
export const SELECT_MEMBER = "SELECT_MEMBER";
export const NEW_MESSAGE = "NEW_MESSAGE";

//액션 생성자
export const addLetter = (letter) => ({
  type: ADD_LETTER,
  payload: letter,
});

export const selectMember = (memberName) => ({
  type: SELECT_MEMBER,
  payload: memberName,
});

export const newMessage = (message) => ({
  type: NEW_MESSAGE,
  payload: message,
});
