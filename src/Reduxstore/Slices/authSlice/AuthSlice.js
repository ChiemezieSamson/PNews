import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
	name: "auth",
	initialState: { token: null },
	reducers: {
		setCredentials: (state, action) => {
			const { accessToken } = action.payload;
			state.token = accessToken;

			if (state.token === null) {
				state.token = localStorage.getItem("userToken")
					? localStorage.getItem("userToken")
					: null;
			}
		},
		logOut: (state, action) => {
			state.token = null;
		},
	},
});

export const { setCredentials, logOut } = authSlice.actions;

export const selectCurrentToken = (state) => state.auth.token;

export default authSlice.reducer;
