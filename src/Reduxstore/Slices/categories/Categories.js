// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { createParentCategories } from "../../../data";
// import axios from "axios";
import { apiSlice } from "../ApiSlice/ApiSlice";

export const extendedCategoriesApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getCategories: builder.query({
			query: () => "categories",
			providesTags: (result = [], error, arg) => [
				"Categories",
				...result.map(({ id }) => ({ type: "Categories", id })),
			],
		}),

		createNewCategories: builder.mutation({
			query: (categories) => ({
				url: "categories",
				method: "POST",
				body: categories,
			}),
			invalidatesTags: ["Categories"],
		}),

		updateExistingCategories: builder.mutation({
			query: (categories) => ({
				url: `categories/${categories.categoryId}`,
				method: "PUT",
				body: categories,
			}),
			invalidatesTags: ["Post", "Categories"],
			async onQueryStarted(categories, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					extendedCategoriesApiSlice.util.updateQueryData(
						"getCategories",
						undefined,
						(draft) => {
							const Categories = draft.find(
								(category) => category._id === categories.categoryId
							);
							if (Categories) {
								let existingCategory = false;

								for (const cat in Categories) {
									if (Categories[cat].category) {
										Categories[cat].category.includes(categories.category)
											? (existingCategory = true)
											: (existingCategory = false);
										break;
									}
								}

								if (!existingCategory) {
									Categories[categories.parent].category.push(
										categories.category
									); // find the parent category and put the category listed into the category array
								}
							}
						}
					)
				);
				try {
					await queryFulfilled;
				} catch {
					patchResult.undo();
				}
			},
		}),

		deleteExistingCategories: builder.mutation({
			query: (categories) => ({
				url: `categories/delete/${categories.categoryId}`,
				method: "PUT",
				body: categories,
			}),
			invalidatesTags: ["Post"],
			async onQueryStarted(categories, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					extendedCategoriesApiSlice.util.updateQueryData(
						"getCategories",
						undefined,
						(draft) => {
							// The `draft` is Immer-wrapped and can be "mutated" like in createSlice
							const Categories = draft.find(
								(category) => category._id === categories.categoryId
							);
							if (Categories) {
								for (const cat in Categories) {
									if (Categories[cat].category) {
										Categories[cat].category = Categories[cat].category.filter(
											(category) => !categories.openCategoris.includes(category)
										);
									}
								}
							}
						}
					)
				);
				try {
					await queryFulfilled;
				} catch {
					patchResult.undo();
				}
			},
		}),
	}),
});

export const {
	useGetCategoriesQuery,
	useCreateNewCategoriesMutation,
	useUpdateExistingCategoriesMutation,
	useDeleteExistingCategoriesMutation,
} = extendedCategoriesApiSlice;

// const initialState = {
// 	categories: createParentCategories,
// 	status: "idle",
// 	error: null,
// };

// export const fetchCategories = createAsyncThunk(
// 	"categories/fetchCategories",
// 	async () => {
// 		const response = await axios.get("/categories");
// 		return response.data;
// 	}
// );

// export const addNewCategories = createAsyncThunk(
// 	"categories/addNewCategories",
// 	async (initialPost) => {
// 		const response = await axios.post("/categories", initialPost);
// 		return response.data;
// 	}
// );

// const categoriesSlice = createSlice({
// 	name: "categories",
// 	initialState,
// 	reducers: {
// 		createCategories: {
// 			reducer(state, action) {
// 				const { parent, category } = action.payload;

// 				let existingCategory = false;

// 				for (const cat in state.categories[0]) {
// 					if (
// 						state.categories[0][cat].categories &&
// 						state.categories[0][cat].categories.includes(category)
// 					) {
// 						existingCategory = true;
// 						break;
// 					}
// 				}

// 				if (!existingCategory) {
// 					state.categories[0][parent].categories.push(category);
// 				}
// 			},
// 			prepare(parent, category) {
// 				return {
// 					payload: {
// 						category,
// 						parent,
// 					},
// 				};
// 			},
// 		},
// 		deleteCategoris: {
// 			reducer(state, action) {
// 				const { openCategoris } = action.payload;

// 				for (const cat in state.categories[0]) {
// 					if (state.categories[0][cat].categories) {
// 						state.categories[0][cat].categories = state.categories[0][
// 							cat
// 						].categories.filter(
// 							(category) => !openCategoris.includes(category)
// 						);
// 					}
// 				}
// 			},
// 			prepare(openCategoris) {
// 				return {
// 					payload: {
// 						openCategoris,
// 					},
// 				};
// 			},
// 		},
// 	},
// 	extraReducers(builder) {
// 		builder.addCase(fetchCategories.fulfilled, (state, action) => {
// 			state.status = "succeeded";
// 			state.categories = state.categories.concat(action.payload);
// 		});

// 		builder.addCase(addNewCategories.fulfilled, (state, action) => {
// 			state.categories.push(action.payload);
// 		});
// 	},
// });

// export const selectAllCategories = (state) => {
// 	let newCategories = Object.assign({}, state.categories.categories[0]);

// 	let categories = [];
// 	let parentCategories = [];
// 	for (const cats in newCategories) {
// 		parentCategories.push(cats);
// 		if (newCategories[cats].categories) {
// 			for (const eachCat of newCategories[cats].categories) {
// 				categories.push(eachCat);
// 			}
// 		}
// 	}
// 	return { categories, parentCategories };
// };

// export const selectCategoriesById = (state, categoriesId) =>
// 	state.posts.find((categories) => categories.id === categoriesId);

// export const { createCategories, deleteCategoris } = categoriesSlice.actions;

// export default categoriesSlice.reducer;
