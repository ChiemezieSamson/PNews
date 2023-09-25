// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logOut, setCredentials } from "../authSlice/AuthSlice";
import { Mutex } from "async-mutex";

// Using async-mutex to prevent multiple calls to '/refreshToken' when multiple calls fail with 401 Unauthorized errors.
// create a new mutex
const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
	baseUrl: "https://newblog-api-pwju.onrender.com/api/",
	credentials: "include",
	prepareHeaders: (headers, { getState }) => {
		const token = getState().auth.token;

		if (token) {
			headers.set("authorization", `Bearer ${token}`);
		} else {
			headers.set(
				"authorization",
				`Bearer ${
					localStorage.getItem("userToken")
						? localStorage.getItem("userToken")
						: null
				}`
			);
		}

		return headers;
	},
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
	// wait until the mutex is available without locking it
	await mutex.waitForUnlock();

	let result = await baseQuery(args, api, extraOptions);

	if (result?.error?.originalStatus === 403) {
		// checking whether the mutex is locked
		if (!mutex.isLocked()) {
			const release = await mutex.acquire();

			try {
				// send refresh token to get new access token
				const refreshResult = await baseQuery("refresh", api, extraOptions);

				// check for data in the refresh
				if (refreshResult?.data) {
					// store the new token
					api.dispatch(
						setCredentials({ accessToken: refreshResult.data.accessToken })
					);

					localStorage.setItem("userToken", refreshResult.data.accessToken);
					localStorage.setItem("userId", refreshResult.data._id);

					// retry the original query with new access token
					result = await baseQuery(args, api, extraOptions);
				} else {
					if (
						refreshResult?.error?.originalStatus === 401 ||
						refreshResult?.error?.status === "PARSING_ERROR"
					) {
						console.error(refreshResult?.error?.data);

						localStorage.setItem("userToken", "");

						api.dispatch(logOut());

						await baseQuery("logout", api, extraOptions);
					}

					return refreshResult;
				}
			} finally {
				// release must be called once the mutex should be released again.
				release();
			}
		} else {
			// wait until the mutex is available without locking it
			await mutex.waitForUnlock();
			result = await baseQuery(args, api, extraOptions);
		}
	}

	return result;
};

// Define our single API slice object
export const apiSlice = createApi({
	// The cache reducer expects to be added at `state.api` (already default - this is optional)
	reducerPath: "api",

	// All of our requests will have URLs starting with '/fakeApi'
	baseQuery: baseQueryWithReauth,

	// automatic refreshing with cache invalidation
	tagTypes: [
		"Post",
		"ALLPOSTS",
		"User",
		"Comment",
		"Categories",
		"Tag",
		"AllComment",
	],

	// The "endpoints" represent operations and requests for this server
	endpoints: (builder) => ({}),
});
