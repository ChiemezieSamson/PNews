import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../Slices/posts/PostsSlice";
import categoriesReducer from "../Slices/categories/Categories";
import commentsReducer from "../Slices/comments/CommentsSlice";
import tagsReducer from "../Slices/tags/TagsSlice";
import usersReducer from "../Slices/users/UsersSlice";

import postCategoriesReducer from "../Slices/PostsComponentSlices/postcategory/PostcategoriesSlice";
import postTagsReducer from "../Slices/PostsComponentSlices/postsTags/PostsTagsSlice";
import postOptionalReducer from "../Slices/PostsComponentSlices/PostsOptional/PostsOptionalSlice";

const store = configureStore({
	reducer: {
		posts: postsReducer, // main post state, set up at CreatePostComponents.jsx component

		// PostChildren gotten from different component and sent to CreatePostComponents.jsx component for composing a post.
		postCat: postCategoriesReducer,
		postTags: postTagsReducer,
		postOptional: postOptionalReducer,

		categories: categoriesReducer, // main categories state, set up a the Category.jsx component

		tags: tagsReducer, // main tag state, set up a the Tag.jsx component

		users: usersReducer, // main users state

		comments: commentsReducer, // main comment state
	},
});

console.log(store.getState());

export default store;
