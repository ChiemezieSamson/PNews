import { apiSlice } from "../ApiSlice/ApiSlice";
import { logOut, setCredentials } from "./AuthSlice";

export const extendedAuthApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (credentials) => ({
				url: "auth/login",
				method: "POST",
				body: { ...credentials },
			}),
			invalidatesTags: ["User", "Post", "Categories", "Tag", "AllComment"],
		}),
		sendLogout: builder.mutation({
			query: () => ({
				url: "logout",
				method: "DELETE",
			}),
			invalidatesTags: ["User", "Post", "Categories", "Tag", "AllComment"],
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled;
					dispatch(logOut());
				} catch (err) {
					console.log(err);
				}
			},
		}),
		refresh: builder.query({
			query: () => "refresh",
			invalidatesTags: ["User"],
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					const { accessToken } = data;
					dispatch(setCredentials({ accessToken }));
					localStorage.setItem("userToken", data.accessToken);
				} catch (err) {
					console.log(err);
				}
			},
		}),
	}),
});

export const { useLoginMutation, useRefreshQuery, useSendLogoutMutation } =
	extendedAuthApiSlice;