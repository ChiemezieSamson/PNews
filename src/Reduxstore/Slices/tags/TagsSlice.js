import { apiSlice } from "../ApiSlice/ApiSlice";

export const extendedTagsApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getTags: builder.query({
			query: () => "tags",
			providesTags: (result = [], error, arg) => [
				"Tag",
				...result.map(({ id }) => ({ type: "Tag", id })),
			],
		}),

		createNewTags: builder.mutation({
			query: (tags) => ({
				url: "tags",
				method: "POST",
				body: tags,
			}),
			invalidatesTags: (result, error, arg) => [{ type: "Tag", id: arg._id }],
		}),

		updateExistingTag: builder.mutation({
			query: (tags) => ({
				url: `tags/${tags.tagId}`,
				method: "PUT",
				body: tags,
			}),
			invalidatesTags: ["Post", "Tag"],
			async onQueryStarted(tags, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					extendedTagsApiSlice.util.updateQueryData(
						"getTags",
						undefined,
						(draft) => {
							const Tags = draft.find((tag) => tag._id === tags.tagId);
							if (Tags) {
								let existingTag = false;

								for (const tag in Tags) {
									if (Tags[tag].tags) {
										Tags[tag].tags.includes(tags.tag)
											? (existingTag = true)
											: (existingTag = false);
										break;
									}
								}

								if (!existingTag) {
									Tags[tags.parent].tags.push(tags.tag); // find the parent category and put the category listed into the category array
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

		deleteExistingTag: builder.mutation({
			query: (tags) => ({
				url: `tags/delete/${tags.tagId}`,
				method: "PUT",
				body: tags,
			}),
			invalidatesTags: ["Post"],
			async onQueryStarted(tags, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					extendedTagsApiSlice.util.updateQueryData(
						"getTags",
						undefined,
						(draft) => {
							const Tags = draft.find((tag) => tag._id === tags.tagId);
							if (Tags) {
								for (const tag in Tags) {
									if (Tags[tag].tags) {
										if (Tags[tag].tags.includes(tags.uncheckedTag)) {
											Tags[tag].tags = Tags[tag].tags.filter(
												(tag) => tags.uncheckedTag !== tag
											);
										}
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
	useGetTagsQuery,
	useCreateNewTagsMutation,
	useUpdateExistingTagMutation,
	useDeleteExistingTagMutation,
} = extendedTagsApiSlice;
