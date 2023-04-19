import { createSlice } from "@reduxjs/toolkit";
import { createParentCategories } from "../../../data";

const initialState = createParentCategories;

const categoriesSlice = createSlice({
	name: "categories",
	initialState,
	reducers: {
		createCategories: {
			reducer(state, action) {
				const { parent, category } = action.payload;

				let existingCategory = false;

				for (const cat in state) {
					if (
						state[cat].categories &&
						state[cat].categories.includes(category)
					) {
						existingCategory = true;
						break;
					}
				}

				if (!existingCategory) {
					state[parent].categories.push(category);
				}
			},
			prepare(parent, category) {
				return {
					payload: {
						category,
						parent,
					},
				};
			},
		},
		deleteCategoris: {
			reducer(state, action) {
				const { openCategoris } = action.payload;

				for (const cat in state) {
					if (state[cat].categories) {
						state[cat].categories = state[cat].categories.filter(
							(category) => !openCategoris.includes(category)
						);
					}
				}
			},
			prepare(openCategoris) {
				return {
					payload: {
						openCategoris,
					},
				};
			},
		},
	},
});

export const selectAllCategories = (state) => {
	let categories = [];
	let parentCategories = [];
	for (const cats in state.categories) {
		parentCategories.push(cats);
		if (state.categories[cats].categories) {
			for (const eachCat of state.categories[cats].categories) {
				categories.push(eachCat);
			}
		}
	}
	return { categories, parentCategories };
};

export const selectCategoriesById = (state, categoriesId) =>
	state.posts.find((categories) => categories.id === categoriesId);

export const { createCategories, deleteCategoris } = categoriesSlice.actions;

export default categoriesSlice.reducer;
