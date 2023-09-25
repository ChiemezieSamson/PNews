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
