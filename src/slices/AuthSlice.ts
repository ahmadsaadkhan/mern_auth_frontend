import { createSlice } from '@reduxjs/toolkit';

const userInfoString = localStorage.getItem('userInfo');
const initialState = {
    userInfo: userInfoString
    ? JSON.parse(userInfoString)
    : null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.userInfo = null;
            localStorage.removeItem('userInfo');
        }
    }
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
export type RootState = ReturnType<typeof authSlice.reducer>;