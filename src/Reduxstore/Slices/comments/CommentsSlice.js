// import {
// 	createAsyncThunk,
// 	createEntityAdapter,
// 	createSelector,
// 	createSlice,
// } from "@reduxjs/toolkit";
// import axios from "axios";
import { nanoid } from "@reduxjs/toolkit";
import { apiSlice } from "../ApiSlice/ApiSlice";

export const extendedCommentsApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getComments: builder.query({
			query: () => "comments",
			providesTags: (result = [], error, arg) => [
				"Comment",
				...result.map(({ id }) => ({ type: "Comment", id })),
				"AllComment",
			],
		}),

		getCommentsByPostId: builder.query({
			query: (postId) => `comments/${postId}`,
			providesTags: (result, error, arg) => [{ type: "Comment", id: arg }],
		}),

		createNewComment: builder.mutation({
			query: (initialPost) => ({
				url: "comments",
				method: "POST",
				body: initialPost,
			}),
			invalidatesTags: ["Comment"],
		}),

		updateExistingComment: builder.mutation({
			query: (comment) => ({
				url: `comments/${comment.commentId}`,
				method: "PUT",
				body: comment,
			}),
			invalidatesTags: ["AllComment"],
			async onQueryStarted(comment, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					extendedCommentsApiSlice.util.updateQueryData(
						"getCommentsByPostId",
						comment.postId,
						(draft) => {
							const comments = draft.find(
								(comments) => comments._id === comment.commentId
							);
							if (comments) {
								comments.content = comment.content;
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

		updateCommentReaction: builder.mutation({
			query: (comment) => ({
				url: `comments/reactions/${comment.commentId}`,
				method: "PUT",
				body: comment,
			}),
			invalidatesTags: ["AllComment"],
			async onQueryStarted(comment, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					extendedCommentsApiSlice.util.updateQueryData(
						"getCommentsByPostId",
						comment.postId,
						(draft) => {
							const comments = draft.find(
								(comments) => comments._id === comment.commentId
							);

							if (comments) {
								const checkPreviousReacions = comments.reactePostActions.find(
									(item) => {
										let { commentId, userId, reationsMade } = item;

										let exist = false;

										if (
											commentId === comment.commentId &&
											userId === comment.authorId &&
											reationsMade === comment.reaction
										) {
											exist = true;
										}

										return exist;
									}
								);

								if (!checkPreviousReacions) {
									comments.reactions[comment.reaction]++;
									comments.reactePostActions.push({
										commentId: comment.commentId,
										replyId: comment.replyId,
										userId: comment.authorId,
										reationsMade: comment.reaction,
										_id: nanoid(),
									});
								} else {
									comments.reactions[comment.reaction]--;
									comments.reactePostActions =
										comments.reactePostActions.filter(
											(reply) => reply._id !== checkPreviousReacions._id
										);
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

		deleteExistingComment: builder.mutation({
			query: (comment) => ({
				url: `comments/${comment.commentId}`,
				method: "DELETE",
				body: comment,
			}),
			invalidatesTags: (result, error, arg) => [
				{ type: "Comment", id: arg._id },
			],
		}),
	}),
});

export const {
	useGetCommentsQuery,
	useGetCommentsByPostIdQuery,
	useCreateNewCommentMutation,
	useUpdateExistingCommentMutation,
	useUpdateCommentReactionMutation,
	useDeleteExistingCommentMutation,
} = extendedCommentsApiSlice;

// const commentsAdapter = createEntityAdapter({
// 	sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt),
// 	selectId: (e) => e._id,
// 	selectById: (e) => e._id,
// });

// const initialState = commentsAdapter.getInitialState({
// 	status: "idle",
// 	error: null,
// });

// export const fetchComments = createAsyncThunk(
// 	"/comments/fetchComments",
// 	async () => {
// 		const response = await axios.get("/comments", { mode: "no-cors" });
// 		return response.data;
// 	}
// );

// export const addNewComments = createAsyncThunk(
// 	"comments/addNewComments",
// 	async (initialPost) => {
// 		const response = await axios.post("/comments", initialPost);
// 		return response.data;
// 	}
// );

// const commentsSlice = createSlice({
// 	name: "comments",
// 	initialState,
// 	reducers: {
// 		// createComment: {
// 		// 	reducer(state, action) {
// 		// 		state.comments.push(action.payload);
// 		// 	},
// 		// 	prepare(postId, author, content, email, website) {
// 		// 		return {
// 		// 			payload: {
// 		// 				id: nanoid(),
// 		// 				author,
// 		// 				content,
// 		// 				email,
// 		// 				website,
// 		// 				postId,
// 		// 				reactions: {
// 		// 					like: 0,
// 		// 					support: 0,
// 		// 					love: 0,
// 		// 					funny: 0,
// 		// 				},
// 		// 				replies: [],
// 		// 				time: "14 hours ago",
// 		// 			},
// 		// 		};
// 		// 	},
// 		// },
// 		// updateComment(state, action) {
// 		// 	const { commentId, replyAuthor, replyContent } = action.payload;
// 		// 	const existingComment = state.entities[commentId];
// 		// 	// const existingComment = state.comments.find(
// 		// 	// 	(comment) => comment.id === commentId
// 		// 	// );

// 		// 	if (existingComment) {
// 		// 		existingComment.author = replyAuthor;
// 		// 		existingComment.content = replyContent;
// 		// 	}
// 		// },
// 		// createReply(state, action) {
// 		// 	const { commentId, replyAuthor, replyContent, replyTo } = action.payload;
// 		// 	const existingComment = state.entities[commentId];
// 		// 	// const existingComment = state.comments.find(
// 		// 	// 	(comment) => comment.id === commentId
// 		// 	// );

// 		// 	if (existingComment) {
// 		// 		existingComment.replies.push({
// 		// 			id: nanoid(),
// 		// 			name: replyAuthor,
// 		// 			time: "11am",
// 		// 			content: replyContent,
// 		// 			reactions: {
// 		// 				like: 0,
// 		// 				support: 0,
// 		// 				love: 0,
// 		// 				funny: 0,
// 		// 			},
// 		// 			replyOfreply: replyTo !== null ? "@" + replyTo : "",
// 		// 		});
// 		// 	}
// 		// },
// 		// updateReply(state, action) {
// 		// 	const { commentId, replyAuthor, replyContent, replyId } = action.payload;
// 		// 	const existingComment = state.entities[commentId];
// 		// 	// const existingComment = state.comments.find(
// 		// 	// 	(comment) => comment.id === commentId
// 		// 	// );

// 		// 	const existingReply = existingComment.replies.find(
// 		// 		(comment) => comment.id === replyId
// 		// 	);

// 		// 	if (existingReply) {
// 		// 		existingReply.name = replyAuthor;
// 		// 		existingReply.content = replyContent;
// 		// 	}
// 		// },
// 		reactionAddedComment(state, action) {
// 			const { commentId, reaction } = action.payload;

// 			const existingComment = state.entities[commentId];
// 			// const existingComment = state.comments.find(
// 			// 	(post) => post.id === commentId
// 			// );
// 			if (existingComment) {
// 				existingComment.reactions[reaction]++;
// 			}
// 		},
// 		reactionAddedReply(state, action) {
// 			const { commentId, replyId, reaction } = action.payload;
// 			const existingComment = state.entities[commentId];
// 			// const existingComment = state.comments.find(
// 			// 	(post) => post.id === commentId
// 			// );
// 			const existingReply = existingComment.replies.find(
// 				(comment) => comment.id === replyId
// 			);

// 			if (existingComment) {
// 				existingReply.reactions[reaction]++;
// 			}
// 		},
// 		// deleteComment(state, action) {
// 		// 	const { commentId } = action.payload;
// 		// 	// const existingComment = state.entities[commentId];
// 		// 	const existingComment = state.comments.filter(
// 		// 		(comment) => comment.id !== commentId
// 		// 	);
// 		// 	return existingComment;
// 		// },
// 		// deleteReply(state, action) {
// 		// 	const { commentId, replyId } = action.payload;
// 		// 	const existingComment = state.entities[commentId];
// 		// 	// const existingComment = state.comments.find(
// 		// 	// 	(comment) => comment.id === commentId
// 		// 	// );
// 		// 	const existingRely = existingComment.replies.filter(
// 		// 		(reply) => reply.id !== replyId
// 		// 	);
// 		// 	existingComment.replies = existingRely;
// 		// },
// 	},
// 	extraReducers(builder) {
// 		builder
// 			.addCase(fetchComments.pending, (state, action) => {
// 				state.status = "loading";
// 			})
// 			.addCase(fetchComments.fulfilled, (state, action) => {
// 				state.status = "succeeded";
// 				// Add any fetched comments to the array
// 				// state.comments = state.comments.concat(action.payload);
// 				commentsAdapter.upsertMany(state, action.payload);
// 			})
// 			.addCase(fetchComments.rejected, (state, action) => {
// 				state.status = "failed";
// 				state.error = action.error.message;
// 			});

// 		builder.addCase(addNewComments.fulfilled, commentsAdapter.addOne);
// 		// (state, action) => {
// 		// 	state.comments.push(action.payload);
// 		// });
// 	},
// });

// // export const selectAllComments = (state) => state.comments.comments;

// export const CommentsStatus = (state) => state.comments.status;

// export const CommentsFetchError = (state) => state.comments.error;

// // Export the customized selectors for this adapter using `getSelectors`
// export const {
// 	selectAll: selectAllComments,
// 	selectById: selectCommentById,
// 	selectIds: selectCommentIds,
// 	// Pass in a selector that returns the Comments slice of state
// } = commentsAdapter.getSelectors((state) => state.comments);

// export const filterCommentsByPostId = createSelector(
// 	[selectAllComments, (state, postId) => postId],
// 	(Comment, postId) => Comment.filter((comment) => comment.postId === postId)
// );

// // export const selectCommentById = createSelector(
// // 	[selectAllComments, (state, commentId) => commentId],
// // 	(Comment, commentId) => Comment.find((comment) => comment._id === commentId)
// // );

// export const {
// 	createComment,
// 	createReply,
// 	updateComment,
// 	updateReply,
// 	reactionAddedComment,
// 	reactionAddedReply,
// 	deleteComment,
// 	deleteReply,
// } = commentsSlice.actions;
// export default commentsSlice.reducer;
