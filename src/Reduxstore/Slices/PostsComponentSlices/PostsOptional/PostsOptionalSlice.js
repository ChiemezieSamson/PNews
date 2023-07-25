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
			prepare(shared, viewed, trending, favourite) {
				return {
					payload: {
						shared,
						viewed,
						trending,
						favourite,
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
						shared: 0,
						viewed: 0,
						Trending: false,
					},
				};
			},
		},
	},
});

export const selectAllPostOptionals = (state) => state.postOptional;

export const { optionalAdded, emptyOptional } = postOptionalSlice.actions;

export default postOptionalSlice.reducer;
