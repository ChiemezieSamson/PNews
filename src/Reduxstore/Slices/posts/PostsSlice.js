import { createSlice, nanoid } from "@reduxjs/toolkit";
import { Posts } from "../../../data";

const initialState = Posts;

const postsSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {
		postAdded: {
			reducer(state, action) {
				state.push(action.payload);
			},
			prepare(
				postAuthor,
				postTitle,
				postImage,
				postContent,
				postCategory,
				postTags,
				postOptional
			) {
				return {
					payload: {
						id: nanoid(),
						postAuthor,
						postTitle,
						postImage,
						postContent,
						postCategory,
						postTags,
						optional: postOptional,
					},
				};
			},
		},
		postUpdated(state, action) {
			const {
				postId,
				postAuthor,
				postTitle,
				postImage,
				postContent,
				postCategory,
				postTags,
				postOptional,
			} = action.payload;
			const existingUser = state.find((post) => post.id === postId);

			if (existingUser) {
				existingUser.postAuthor = postAuthor;
				existingUser.postTitle = postTitle;
				existingUser.postImage = postImage;
				existingUser.postContent = postContent;
				existingUser.postCategory = postCategory;
				existingUser.postTags = postTags;
				existingUser.optional = postOptional;
			}
		},
		postDeleted(state, action) {
			const { postId } = action.payload;
			const existingPost = state.filter((post) => post.id !== postId);
			return existingPost;
		},
	},
});

export const selectAllPosts = (state) => state.posts;

export const selectPostById = (state, postId) =>
	state.posts.find((post) => post.id === postId);

export const { postAdded, postUpdated, postDeleted } = postsSlice.actions;

export default postsSlice.reducer;
