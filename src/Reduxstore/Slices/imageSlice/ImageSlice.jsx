import { apiSlice } from "../ApiSlice/ApiSlice";

export const extendedAuthApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		imageUpload: builder.mutation({
			query: (initial) => ({
				url: "image/upload",
				method: "POST",
				body: initial.data,
			}),
			invalidatesTags: ["ALLPOSTS"],
		}),
		imageDelete: builder.mutation({
			query: (initial) => ({
				url: `image/delete-image/${initial.profileImage}`,
				method: "DELETE",
			}),
			invalidatesTags: ["ALLPOSTS"],
		}),
	}),
});

export const { useImageUploadMutation, useImageDeleteMutation } =
	extendedAuthApiSlice;