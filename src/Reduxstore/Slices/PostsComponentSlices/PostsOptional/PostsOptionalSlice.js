import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const postOptionalSlice = createSlice({
	name: "postOptional",
	initialState,
	reducers: {
		optionalAdded: {
			reducer(state, action) {
				return action.payload;
			},
			prepare(shared, viewed, Trending) {
				return {
					payload: {
						shared,
						viewed,
						Trending,
					},
				};
			},
		},
		emptyOptional: {
			reducer(state, action) {
				return action.payload;
			},
			prepare() {
				return {
					payload: {
						shared: null,
						viewed: null,
						Trending: null,
					},
				};
			},
		},
	},
});

export const { optionalAdded, emptyOptional } = postOptionalSlice.actions;

export default postOptionalSlice.reducer;
