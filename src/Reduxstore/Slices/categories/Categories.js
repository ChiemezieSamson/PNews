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
