import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  letterList: JSON.parse(localStorage.getItem("letterList")) || [],
  selectedMember: "",
  isLoading: false,
  isError: false,
  error: null,
};

export const __getTodos = createAsyncThunk(
  "getTodos",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:5000/letterList");
      console.log(response);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);
// 수정 액션
export const updateMessage = createAsyncThunk(
  "updateMessage",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/letterList/${payload.id}`,
        payload
      );

      console.log(response);
      // Local storage 업데이트
      const updatedList = JSON.parse(localStorage.getItem("letterList")).map(
        (item) => {
          if (item.id === payload.id) {
            return { ...item, ...payload };
          }
          return item;
        }
      );
      console.log(updatedList);
      localStorage.setItem("letterList", JSON.stringify(updatedList));
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);
// 삭제 액션
export const deleteMessage = createAsyncThunk(
  "deleteMessage",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`http://localhost:5000/letterList/${id}`);
      // Local storage 업데이트
      const updatedList = JSON.parse(localStorage.getItem("letterList")).filter(
        (item) => item.id !== id
      );
      localStorage.setItem("letterList", JSON.stringify(updatedList));
      return id;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);
const letterReducer = createSlice({
  name: "letter",
  initialState,
  reducers: {
    newMessage: (state, action) => {
      const updatedList = [action.payload, ...state.letterList];
      localStorage.setItem("letterList", JSON.stringify(updatedList));
      state.letterList = updatedList; // 상태 직접 변경
    },
    selectMember: (state, action) => {
      state.selectedMember = action.payload;
    },
    // 수정 액션 리듀서 처리
    updateMessageSuccess: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      // 수정된 메시지 업데이트
      state.letterList = state.letterList.map((message) =>
        message.id === action.payload.id ? action.payload : message
      );
    },
    // 삭제 액션 리듀서 처리
    deleteMessageSuccess: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      // 삭제된 메시지 제거
      state.letterList = state.letterList.filter(
        (message) => message.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(__getTodos.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(__getTodos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.letterList = action.payload;
      })
      .addCase(__getTodos.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      })
      .addCase(updateMessage.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(updateMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        // 수정 액션 성공 시 리듀서 호출
        letterReducer.caseReducers.updateMessageSuccess(state, action);
      })
      .addCase(updateMessage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      })
      .addCase(deleteMessage.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(deleteMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        // 삭제 액션 성공 시 리듀서 호출
        letterReducer.caseReducers.deleteMessageSuccess(state, action);
      })
      .addCase(deleteMessage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      });
  },
});

export const {
  newMessage,
  selectMember,
  updateMessageSuccess,
  deleteMessageSuccess,
} = letterReducer.actions;
export default letterReducer.reducer;
