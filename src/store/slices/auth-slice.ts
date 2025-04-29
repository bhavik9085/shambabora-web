import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, User } from "../utils/store-types";


const initialState: AuthState = {
  isAuthenticated: false,
  accessToken: null,
//   refreshToken: null,
  userInfo: null,
  error: "",
  success: false,
};

const authSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<{ accessToken: string;}>) {
      state.isAuthenticated = true;
      state.accessToken = action.payload.accessToken;
    //   state.refreshToken = action.payload.refreshToken; 
      state.success = true;
    },
    loginError(state, action: PayloadAction<{ message: string }>) {
      state.error = action.payload.message;
      state.success = false;
    },
    setUserInfo(state, action: PayloadAction<User>) { 
      state.userInfo = action.payload;
    },
    logoutSuccess(state) {
      localStorage.removeItem('persist:root');
      state.isAuthenticated = false;
      state.accessToken = null;
    //   state.refreshToken = null;
      state.success = false;
      window.location.reload();
    }
  },
});

export const { loginSuccess, loginError, logoutSuccess, setUserInfo } = authSlice.actions;
export default authSlice.reducer;
