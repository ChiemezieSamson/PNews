import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const postAuthorsSlice = createSlice({
	name: "postAuthors",
	initialState,
	reducers: {
		AuthorAdded: {
			reducer(state, action) {
				return action.payload.author;
			},
			prepare(author) {
				return {
					payload: {
						author,
					},
				};
			},
		},
		emptyAuthor: {
			reducer(state, action) {
				return action.payload.content;
			},
			prepare() {
				return {
					payload: {
						content: "",
					},
				};
			},
		},
	},
});

export const { AuthorAdded, emptyAuthor } = postAuthorsSlice.actions;

export default postAuthorsSlice.reducer;
