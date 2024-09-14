import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: "",
    email: "",
    access_token: "",
    isLoggedIn: false,
    token: null,
    provider: null,
    isAdmin: false,
    userId: "",
    inOrder: false,
    address: "",
    phone: ""
}

export const userSlide = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateUser: (state, action) => {
            const { name, email, access_token, isAdmin, _id, address, phone } = action.payload
            state.name = name || email;
            state.email = email ? email : "";
            state.access_token = access_token;
            state.isAdmin = isAdmin;
            state.userId = _id;
            state.address = address ? address : "";
            state.phone = phone ? phone : "";
        },
        resetUser: (state) => {
            state.name = "";
            state.email = "";
            state.access_token = "";
            state.isLoggedIn = false;
            state.token = null;
            state.provider = null;
            state.isAdmin = false;
            state.userId = "";
            state.address = "";
            state.phone = "";
        },
        setUser: (state, action) => {
            const { token, provider } = action.payload
            state.isLoggedIn = token ? true : false;
            state.token = token ? token : null;
            state.provider = provider ? provider : null;
        },
        updateSetUser: (state, action) => {
            const { name, isAdmin } = action.payload
            state.name = name ? name : "";
            state.isAdmin = isAdmin;
        },
        updateInOrder: (state, action) => {
            const { inOrder } = action.payload
            state.inOrder = inOrder;
        }
    }
})

export const { updateUser, resetUser, setUser, updateSetUser, updateInOrder } = userSlide.actions

export default userSlide.reducer