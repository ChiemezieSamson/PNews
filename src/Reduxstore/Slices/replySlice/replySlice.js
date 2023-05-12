import { nanoid } from "@reduxjs/toolkit";
import { apiSlice } from "../ApiSlice/ApiSlice";

export const extendedRepliesApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		createNewReply: builder.mutation({
			query: (initialReply) => ({
				url: `replies/${initialReply.commentId}`,
				method: "POST",
				body: initialReply,
			}),
			invalidatesTags: ["AllComment"],
			async onQueryStarted(initialReply, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					apiSlice.util.updateQueryData(
						"getCommentsByPostId",
						initialReply.postId,
						(draft) => {
							const comments = draft.find(
								(comments) => comments._id === initialReply.commentId
							);
							if (comments) {
								comments.replies.push({
									_id: nanoid(),
									name: initialReply.author,
									content: initialReply.replyContent,
									replyOfreply: initialReply.replyTo,
									reactions: {
										like: 0,
										support: 0,
										love: 0,
										funny: 0,
									},
									reactePostActions: [
										{
											commentId: initialReply.commentId,
											replyId: "",
											userId: "",
											reationsMade: "",
										},
									],
								});
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

		updateExistingReply: builder.mutation({
			query: (initialReply) => ({
				url: `replies/${initialReply.commentId}`,
				method: "PUT",
				body: initialReply,
			}),
			invalidatesTags: ["AllComment"],
			async onQueryStarted(initialReply, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					apiSlice.util.updateQueryData(
						"getCommentsByPostId",
						initialReply.postId,
						(draft) => {
							const comments = draft.find(
								(comments) => comments._id === initialReply.commentId
							);
							if (comments) {
								const CommentReply = comments.replies.find(
									(reply) => reply._id === initialReply.replyId
								);
								if (CommentReply) {
									CommentReply.content = initialReply.content;
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

		updateReplyReaction: builder.mutation({
			query: (initialReply) => ({
				url: `replies/reactions/${initialReply.commentId}`,
				method: "PUT",
				body: initialReply,
			}),
			invalidatesTags: ["AllComment"],
			async onQueryStarted(initialReply, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					apiSlice.util.updateQueryData(
						"getCommentsByPostId",
						initialReply.postId,
						(draft) => {
							const comments = draft.find(
								(comments) => comments._id === initialReply.commentId
							);

							if (comments) {
								const CommentReply = comments.replies.find(
									(reply) => reply._id === initialReply.replyId
								);

								if (CommentReply) {
									const checkPreviousReacions =
										CommentReply.reactePostActions.find((item) => {
											let { commentId, replyId, userId, reationsMade } = item;

											let exist = false;

											if (
												commentId === initialReply.commentId &&
												replyId === initialReply.replyId &&
												userId === initialReply.authorId &&
												reationsMade === initialReply.reaction
											) {
												exist = true;
											}

											return exist;
										});

									if (!checkPreviousReacions) {
										CommentReply.reactions[initialReply.reaction]++;
										CommentReply.reactePostActions.push({
											commentId: initialReply.commentId,
											replyId: initialReply.replyId,
											userId: initialReply.authorId,
											reationsMade: initialReply.reaction,
											_id: nanoid(),
										});
									} else {
										CommentReply.reactions[initialReply.reaction]--;
										CommentReply.reactePostActions =
											CommentReply.reactePostActions.filter(
												(reply) => reply._id !== checkPreviousReacions._id
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

		deleteExistingReply: builder.mutation({
			query: (initialReply) => ({
				url: `replies/${initialReply.commentId}`,
				method: "DELETE",
				body: initialReply,
			}),
			invalidatesTags: ["AllComment"],
			async onQueryStarted(initialReply, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					apiSlice.util.updateQueryData(
						"getCommentsByPostId",
						initialReply.postId,
						(draft) => {
							const comments = draft.find(
								(comments) => comments._id === initialReply.commentId
							);
							if (comments) {
								comments.replies = comments.replies.filter(
									(reply) => reply._id !== initialReply.replyId
								);
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
	useCreateNewReplyMutation,
	useUpdateExistingReplyMutation,
	useUpdateReplyReactionMutation,
	useDeleteExistingReplyMutation,
} = extendedRepliesApiSlice;
