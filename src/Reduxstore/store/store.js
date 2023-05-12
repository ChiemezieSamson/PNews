import { configureStore } from "@reduxjs/toolkit";
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

		[apiSlice.reducerPath]: apiSlice.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(apiSlice.middleware),
});

console.log(store.getState());

export default store;
