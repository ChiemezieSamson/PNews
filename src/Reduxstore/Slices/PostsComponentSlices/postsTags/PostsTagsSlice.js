import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const postTagsSlice = createSlice({
	name: "postTags",
	initialState,
	reducers: {
		tagAdded: {
			reducer(state, action) {
				const { checkedTag } = action.payload;
				const existingTags = state.includes(checkedTag);
				if (existingTags) {
					return state;
				} else {
					state.push(checkedTag);
				}
			},
		},
		tagUnchecked: {
			reducer(state, action) {
				const { uncheckedTag } = action.payload;
				if (uncheckedTag) {
					let filteredArray = state.filter((item) => item !== uncheckedTag);
					return filteredArray;
				}
			},
		},
		updateTag(state, action) {
			return action.payload;
		},
		emptyTag: {
			reducer(state, action) {
				state.length = action.payload.content;
			},
			prepare() {
				return {
					payload: {
						content: 0,
					},
				};
			},
		},
	},
});

export const { tagAdded, tagUnchecked, updateTag, emptyTag } =
	postTagsSlice.actions;

export default postTagsSlice.reducer;
