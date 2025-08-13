
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const { token, user} = Cookies.get() || {};
const parsedUser = user ? JSON.parse(user) : null;

const isAdmin = parsedUser?.role === "godness" ? true : false;

const initialState = {
    user: parsedUser,
    token: token ? token : null,
    isAuthenticated: !!token,
    isAdmin: isAdmin
};

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        login: (state, action) => {

            const copyState = { ...state };
            copyState.user = action.payload.user;
            copyState.token = action.payload.token;
            copyState.isAuthenticated = true;
            if (action.payload.user.role === "godness") {
                copyState.isAdmin = true;
            }
            console.log('copyState', copyState);
            return copyState;
        },
        logout: (state) => {
            const copyState = { ...state };
            Cookies.remove("token");
            Cookies.remove("user");
            copyState.user = null;
            copyState.token = null;
            copyState.isAuthenticated = false;
            copyState.isAdmin = false;
            return copyState;
        },
    },
})

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
