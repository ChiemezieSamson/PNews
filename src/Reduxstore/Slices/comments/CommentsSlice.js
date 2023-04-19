import { createSlice, nanoid } from "@reduxjs/toolkit";
import { Comment } from "../../../data";

const initialState = Comment;

const commentsSlice = createSlice({
	name: "comments",
	initialState,
	reducers: {
		createComment: {
			reducer(state, action) {
				state.push(action.payload);
			},
			prepare(postId, author, content, email, website) {
				return {
					payload: {
						id: nanoid(),
						author,
						content,
						email,
						website,
						postId,
						reactions: {
							like: 0,
							support: 0,
							love: 0,
							funny: 0,
						},
						replies: [],
						time: "14 hours ago",
					},
				};
			},
		},
		updateComment(state, action) {
			const { commentId, replyAuthor, replyContent } = action.payload;
			const existingComment = state.find((comment) => comment.id === commentId);

			if (existingComment) {
				existingComment.author = replyAuthor;
				existingComment.content = replyContent;
			}
		},
		createReply(state, action) {
			const { commentId, replyAuthor, replyContent, replyTo } = action.payload;
			const existingComment = state.find((comment) => comment.id === commentId);

			if (existingComment) {
				existingComment.replies.push({
					id: nanoid(),
					name: replyAuthor,
					time: "11am",
					content: replyContent,
					reactions: {
						like: 0,
						support: 0,
						love: 0,
						funny: 0,
					},
					replyOfreply: replyTo !== null ? "@" + replyTo : "",
				});
			}
		},
		updateReply(state, action) {
			const { commentId, replyAuthor, replyContent, replyId } = action.payload;
			const existingComment = state.find((comment) => comment.id === commentId);

			const existingReply = existingComment.replies.find(
				(comment) => comment.id === replyId
			);

			if (existingReply) {
				existingReply.name = replyAuthor;
				existingReply.content = replyContent;
			}
		},
		reactionAddedComment(state, action) {
			const { commentId, reaction } = action.payload;
			const existingComment = state.find((post) => post.id === commentId);
			if (existingComment) {
				existingComment.reactions[reaction]++;
			}
		},
		reactionAddedReply(state, action) {
			const { commentId, replyId, reaction } = action.payload;
			const existingComment = state.find((post) => post.id === commentId);
			const existingReply = existingComment.replies.find(
				(comment) => comment.id === replyId
			);
			if (existingComment) {
				existingReply.reactions[reaction]++;
			}
		},
		deleteComment(state, action) {
			const { commentId } = action.payload;
			const existingComment = state.filter(
				(comment) => comment.id !== commentId
			);
			return existingComment;
		},
		deleteReply(state, action) {
			const { commentId, replyId } = action.payload;
			const existingComment = state.find((comment) => comment.id === commentId);
			const existingRely = existingComment.replies.filter(
				(reply) => reply.id !== replyId
			);
			existingComment.replies = existingRely;
		},
	},
});

export const selectAllComments = (state) => state.comments;

export const selectCommentById = (state, commentId) =>
	state.posts.find((comment) => comment.id === commentId);

export const {
	createComment,
	createReply,
	updateComment,
	updateReply,
	reactionAddedComment,
	reactionAddedReply,
	deleteComment,
	deleteReply,
} = commentsSlice.actions;
export default commentsSlice.reducer;
