import { createSlice } from "@reduxjs/toolkit";




const storedUser = JSON.parse(localStorage.getItem('user'));
const storedToken = JSON.parse(localStorage.getItem('token'));

const initialState = {
  user: storedUser || null,
  token: storedToken || null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setLogin: (state, action) => {
      

      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      state.user = JSON.parse(localStorage.getItem("user"));
      state.token = JSON.parse(localStorage.getItem("token"));
    },
    setLogout: (state) => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      state.user = null;
      state.token = null;
    },
  },
});

export const { setLogin ,setLogout} = authSlice.actions;
export default authSlice.reducer;
