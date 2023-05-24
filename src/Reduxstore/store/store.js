import { configureStore } from "@reduxjs/toolkit";
import authreducer from "../Slices/authSlice/AuthSlice";
import { apiSlice } from "../Slices/ApiSlice/ApiSlice";
import postCategoriesReducer from "../Slices/PostsComponentSlices/postcategory/PostcategoriesSlice";
import postTagsReducer from "../Slices/PostsComponentSlices/postsTags/PostsTagsSlice";
import postOptionalReducer from "../Slices/PostsComponentSlices/PostsOptional/PostsOptionalSlice";

const store = configureStore({
	reducer: {
		// PostChildren gotten from different component and sent to CreatePostComponents.jsx component for composing a post.
		postCat: postCategoriesReducer,
		postTags: postTagsReducer,
		postOptional: postOptionalReducer,
		auth: authreducer,

		[apiSlice.reducerPath]: apiSlice.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
