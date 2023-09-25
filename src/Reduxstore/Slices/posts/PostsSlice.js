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
			invalidatesTags: (result, error, arg) => [{ id: arg._id }, "ALLPOSTS"],
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
			invalidatesTags: (result, error, arg) => [{ id: arg._id }, "ALLPOSTS"],
			async onQueryStarted(initialPost, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					extendedPostsApiSlice.util.updateQueryData(
						"getPostById",
						initialPost.postId,
						(draft) => {
							const post = draft;
							console.log(post);

							if (post) {
								post.optional.socialmediashare[initialPost?.social]++;
								post.optional.shared++;
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

		upDateViewedPosts: builder.mutation({
			query: (initialPost) => ({
				url: `posts/viewed/${initialPost.postId}`,
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
							const post = draft;

							if (post) {
								post.optional.viewed++;
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
	useUpDateViewedPostsMutation,
	useDeleteExistingPostMutation,
} = extendedPostsApiSlice;
