import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const postCategoriesSlice = createSlice({
	name: "postCategories",
	initialState,
	reducers: {
		catAdded: {
			reducer(state, action) {
				const { checkedCategory } = action.payload;
				const existingCategory = state.includes(checkedCategory);
				if (existingCategory) {
					return state;
				} else {
					state.push(checkedCategory);
				}
			},
		},
		catUnchecked: {
			reducer(state, action) {
				const { uncheckedCategory } = action.payload;
				if (uncheckedCategory) {
					for (let i = 0; i < state.length; i++) {
						if (state[i] === uncheckedCategory) {
							let filteredArray = state.filter(
								(item) => item !== uncheckedCategory
							);
							return filteredArray;
						}
					}
				}
			},
		},
		updateCategories(state, action) {
			return action.payload;
		},
		emptyCategories: {
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

export const selectAllPostCat = (state) => state.postCat;

export const { catAdded, catUnchecked, updateCategories, emptyCategories } =
	postCategoriesSlice.actions;

export default postCategoriesSlice.reducer;
