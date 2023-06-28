// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { createParentTags } from "../../../data";
// import axios from "axios";
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

// const initialState = {
// 	tags: createParentTags,
// 	status: "idle",
// 	error: null,
// };

// export const fetchTags = createAsyncThunk("tags/fetchTags", async () => {
// 	const response = await axios.get("/tags");
// 	return response.data;
// });

// export const addNewTags = createAsyncThunk(
// 	"tags/addNewTags",
// 	async (initialPost) => {
// 		const response = await axios.post("/tags", initialPost);
// 		return response.data;
// 	}
// );

// const tagsSlice = createSlice({
// 	name: "tags",
// 	initialState,
// 	reducers: {
// 		createTags: {
// 			reducer(state, action) {
// 				const { parent, addTag } = action.payload;

// 				let existingTgas = false;

// 				for (const tag in state.tags) {
// 					if (state.tags[tag].tags && state.tags[tag].tags.includes(addTag)) {
// 						existingTgas = true;
// 						break;
// 					}
// 				}

// 				if (!existingTgas) {
// 					state.tags[parent].tags.push(addTag);
// 				}
// 			},
// 			prepare(parent, addTag) {
// 				return {
// 					payload: {
// 						addTag,
// 						parent,
// 					},
// 				};
// 			},
// 		},
// 		deleteTag: {
// 			reducer(state, action) {
// 				const { uncheckedTag } = action.payload;

// 				if (uncheckedTag) {
// 					for (const tag in state.tags) {
// 						if (state.tags[tag].tags.includes(uncheckedTag.uncheckedTag)) {
// 							state.tags[tag].tags = state.tags[tag].tags.filter(
// 								(tag) => uncheckedTag.uncheckedTag !== tag
// 							);
// 						}
// 					}
// 				}
// 			},
// 			prepare(uncheckedTag) {
// 				return {
// 					payload: {
// 						uncheckedTag,
// 					},
// 				};
// 			},
// 		},
// 	},
// 	extraReducers(builder) {
// 		builder.addCase(fetchTags.fulfilled, (state, action) => {
// 			state.status = "succeeded";
// 			state.tags = state.tags.concat(action.payload);
// 		});

// 		builder.addCase(addNewTags.fulfilled, (state, action) => {
// 			state.tags.push(action.payload);
// 		});
// 	},
// });

// export const selectAllTag = (state) => {
// 	let newTags = Object.assign({}, state.tags.tags[0]);
// 	let TagArray = [];
// 	let parentTag = [];
// 	for (const tag in newTags) {
// 		parentTag.push(tag);
// 		if (newTags[tag].tags) {
// 			for (const eachtag of newTags[tag].tags) {
// 				TagArray.push(eachtag);
// 			}
// 		}
// 	}
// 	return { TagArray, parentTag };
// };

// export const selectTagById = (state, tagId) =>
// 	state.posts.find((tag) => tag.id === tagId);

// export const { createTags, deleteTag } = tagsSlice.actions;

// export default tagsSlice.reducer;
