// import {
// 	createAsyncThunk,
// 	createEntityAdapter,
// 	createSelector,
// 	createSlice,
// 	nanoid,
// } from "@reduxjs/toolkit";
// import axios from "axios";

import { apiSlice } from "../ApiSlice/ApiSlice";

export const extendedPostsApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getPosts: builder.query({
			query: () => "posts",
			providesTags: (result = [], error, arg) => [
				"Post",
				...result.map(({ id }) => ({ type: "Post", id })),
				"ALLPOSTS",
			],
		}),

		getPostById: builder.query({
			query: (postId) => `posts/${postId}`,
			providesTags: (result, error, arg) => [{ type: "Post", id: arg }],
		}),

		getPostByUserId: builder.query({
			query: (userId) => `posts/user/${userId}`,
			providesTags: (result, error, arg) => [{ type: "Post", id: arg }],
		}),

		getPostsByQuery: builder.query({
			query: (search) => "posts/query/search" + search,
			providesTags: (result = [], error, arg) => [
				"Post",
				...result?.posts?.map(({ id }) => ({ type: "Post", id })),
			],
		}),

		getPostsByPagination: builder.query({
			query: (page) => "posts/pagination/page" + page,
			providesTags: (result = [], error, arg) => [
				"Post",
				...result?.Posts?.map(({ id }) => ({ type: "Post", id })),
			],
		}),

		getPostsByPaginationTwo: builder.query({
			query: (page) => "posts/paginationroute/page" + page,
			providesTags: (result = [], error, arg) => [
				"Post",
				...result?.Posts?.map(({ id }) => ({ type: "Post", id })),
			],
		}),

		createNewPost: builder.mutation({
			query: (initialPost) => ({
				url: "posts",
				method: "POST",
				// Include the entire post obeject as the body of the request
				body: initialPost,
			}),
			invalidatesTags: ["Post"],
		}),

		updateExistingPost: builder.mutation({
			query: (initialPost) => ({
				url: `posts/${initialPost.postId}`,
				method: "PUT",
				body: initialPost,
			}),
			invalidatesTags: ["ALLPOSTS"],
			async onQueryStarted(initialPost, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					extendedPostsApiSlice.util.updateQueryData(
						"getPostById",
						initialPost.postId,
						(draft) => {
							if (draft) {
								draft.postTitle = initialPost.postTitle;
								draft.postContent = initialPost.postContent;
								draft.postAuthor = initialPost.postAuthor;
								draft.postImage = initialPost.postImage;
								draft.postCategory = initialPost.postCategory;
								draft.postTags = initialPost.postTags;
								draft._id = initialPost.postId;
								draft.optional.viewed = initialPost?.optional?.viewed;
								draft.optional.shared = initialPost?.optional?.shared;
								draft.optional.trending = initialPost?.optional?.trending;
								draft.optional.favourite = initialPost?.optional?.favourite;
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

		MarkPostFavouriteStatus: builder.mutation({
			query: (initialPost) => ({
				url: `posts/favourite/${initialPost.postId}`,
				method: "PUT",
				body: initialPost,
			}),
			invalidatesTags: (result, error, arg) => [{ id: arg._id }],
			async onQueryStarted(initialPost, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					extendedPostsApiSlice.util.updateQueryData(
						"getPostById",
						initialPost.postId,
						(draft) => {
							if (draft) {
								draft.optional.favourite = initialPost?.favourite;
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

		upDateSharedPosts: builder.mutation({
			query: (initialPost) => ({
				url: `posts/share_count/${initialPost.postId}`,
				method: "PUT",
				body: initialPost,
			}),
			invalidatesTags: (result, error, arg) => [{ id: arg._id }],
			async onQueryStarted(initialPost, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					extendedPostsApiSlice.util.updateQueryData(
						"getPosts",
						undefined,
						(draft) => {
							const post = draft.find(
								(post) => post._id === initialPost.postId
							);

							if (post) {
								post.optional.socialmediashare[initialPost?.social]++;
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

		deleteExistingPost: builder.mutation({
			query: (initialPost) => ({
				url: `posts/${initialPost.postId}`,
				method: "DELETE",
				body: initialPost,
			}),
			invalidatesTags: ["Post"],
		}),
	}),
});

export const {
	useGetPostsQuery,
	useGetPostByIdQuery,
	useGetPostByUserIdQuery,
	useGetPostsByQueryQuery,
	useGetPostsByPaginationQuery,
	useGetPostsByPaginationTwoQuery,
	useCreateNewPostMutation,
	useUpdateExistingPostMutation,
	useMarkPostFavouriteStatusMutation,
	useUpDateSharedPostsMutation,
	useDeleteExistingPostMutation,
} = extendedPostsApiSlice;

// const initialState = {
// 	posts: [],
// 	status: "idle",
// 	error: null,
// };

// const postsAdapter = createEntityAdapter({
// 	sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt),
// 	selectId: (e) => e._id,
// 	selectById: (e) => e._id,
// });

// const initialState = postsAdapter.getInitialState({
// 	status: "idle",
// 	error: null,
// });

// export const fetchPosts = createAsyncThunk("/posts/fetchPosts", async () => {
// 	const response = await axios.get("/posts", { mode: "no-cors" });
// 	return response.data;
// });

// export const addNewPost = createAsyncThunk(
// 	"posts/addNewPost",
// 	async (initialPost) => {
// 		const response = await axios.post("/posts", initialPost);
// 		return response.data;
// 	}
// );

// const postsSlice = createSlice({
// 	name: "posts",
// 	initialState,
// 	reducers: {
// postAdded: {
// 	reducer(state, action) {
// 		state.posts.push(action.payload);
// 	},
// 	prepare(
// 		postAuthor,
// 		postTitle,
// 		postImage,
// 		postContent,
// 		postCategory,
// 		postTags,
// 		optional
// 	) {
// 		return {
// 			payload: {
// 				id: nanoid(),
// 				postAuthor,
// 				postTitle,
// 				postImage,
// 				postContent,
// 				postCategory,
// 				postTags,
// 				optional,
// 			},
// 		};
// 	},
// },
// postUpdated(state, action) {
// 	const {
// 		postId,
// 		postAuthor,
// 		postTitle,
// 		postImage,
// 		postContent,
// 		postCategory,
// 		postTags,
// 		optional,
// 	} = action.payload;
// 	const existingUser = state.entities[postId];
// 	// state.posts.find((post) => post.id === postId);

// 	if (existingUser) {
// 		existingUser.postAuthor = postAuthor;
// 		existingUser.postTitle = postTitle;
// 		existingUser.postImage = postImage;
// 		existingUser.postContent = postContent;
// 		existingUser.postCategory = postCategory;
// 		existingUser.postTags = postTags;
// 		existingUser.optional = optional;
// 	}
// },
// postDeleted(state, action) {
// 	const { postId } = action.payload;
// 	const existingPost = state.posts.filter((post) => post.id !== postId);
// 	return existingPost;
// },
// },
// extraReducers(builder) {
// 	builder
// 		.addCase(fetchPosts.pending, (state, action) => {
// 			state.status = "loading";
// 		})
// 		.addCase(fetchPosts.fulfilled, (state, action) => {
// 			state.status = "succeeded";
// 			// Add any fetched posts to the array
// 			postsAdapter.upsertMany(state, action.payload);
// 			// state.posts = state.posts.concat(action.payload);
// 		})
// 		.addCase(fetchPosts.rejected, (state, action) => {
// 			state.status = "failed";
// 			state.error = action.error.message;
// 		});

// 	builder.addCase(addNewPost.fulfilled, postsAdapter.addOne);
// 	// 	(state, action) => {
// 	// 	state.posts.push(action.payload);
// 	// });
// },
// });

// export const selectAllPosts = (state) => state.posts.posts;

// export const postStatus = (state) => state.posts.status;

// Export the customized selectors for this adapter using `getSelectors`
// export const {
// 	selectAll: selectAllPosts,
// 	selectById: selectPostById,
// 	selectIds: selectPostIds,
// 	// Pass in a selector that returns the posts slice of state
// } = postsAdapter.getSelectors((state) => state.posts);

// export const selectPostById = createSelector(
// 	[selectAllPosts, (state, postId) => postId],
// 	(posts, postId) => posts.find((post) => post._id === postId)
// );

// export const selectPostsByUser = createSelector(
// 	[selectAllPosts, (state, userId) => userId],
// 	(posts, userId) => posts.filter((post) => post.user === userId)
// );

// export const postFetchError = (state) => state.posts.error;

// export const { postAdded, postUpdated, postDeleted } = postsSlice.actions;

// export default postsSlice.reducer;
