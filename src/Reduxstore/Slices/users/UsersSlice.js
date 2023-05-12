// import {
// 	createAsyncThunk,
// 	createEntityAdapter,
// 	createSelector,
// 	createSlice,
// 	nanoid,
// } from "@reduxjs/toolkit";
// import axios from "axios";
import { apiSlice } from "../ApiSlice/ApiSlice";

export const extendedUserApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getUser: builder.query({
			// The URL for the request is 'users'
			query: () => "users",
			providesTags: (result = [], error, arg) => [
				"User",
				...result.map(({ id }) => ({ type: "User", id })),
			],
		}),

		getUserById: builder.query({
			query: (userId) => `users/user/${userId}`,
			providesTags: (result, error, arg) => [{ type: "User", id: arg }],
		}),

		getUserByPostId: builder.query({
			query: (postId) => `users/${postId}`,
			providesTags: (result, error, arg) => [{ type: "User", id: arg }],
		}),

		createNewUser: builder.mutation({
			query: (initialUser) => ({
				url: "auth/register",
				method: "POST",
				body: initialUser,
			}),
			invalidatesTags: ["User"],
		}),

		updateExistingUser: builder.mutation({
			query: (User) => ({
				url: `users/${User.userId}`,
				method: "PUT",
				body: User,
			}),
			async onQueryStarted(User, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					extendedUserApiSlice.util.updateQueryData(
						"getUserById",
						User.userId,
						(draft) => {
							const users = draft;
							if (users) {
								users.name.firstname = User.name.firstname;
								users.name.lastname = User.name.lastname;
								users.location = User.location;
								users.profileImage = User.profileImage;
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

		updateExistingUserPublicProFile: builder.mutation({
			query: (User) => ({
				url: `users/public/${User.userId}`,
				method: "PUT",
				body: User,
			}),
			async onQueryStarted(User, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					extendedUserApiSlice.util.updateQueryData(
						"getUserById",
						User.userId,
						(draft) => {
							const users = draft;
							if (users) {
								users.username = User.nickname;
								users.bio = User.biography;
								users.phonenumber = User.phone;
								users.socialLinks.linkedin = User.linkedIn;
								users.socialLinks.twitter = User.twitter;
								users.socialLinks.facebook = User.facebook;
								users.socialLinks.instagram = User.instagram;
								users.socialLinks.youtube = User.youTube;
								users.socialLinks.website = User.website;

								if (users.email.secondary.includes(User.secondaryEmail)) {
									let emailIndex = users.email.secondary.indexOf(
										User.secondaryEmail
									);
									users.email.secondary[emailIndex] = User.secondaryEmail;
								} else {
									users.email.secondary.push(User.secondaryEmail);
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

		updateExistingUserMakePrimary: builder.mutation({
			query: (User) => ({
				url: `users/makePrimary/${User.userId}`,
				method: "PUT",
				body: User,
			}),
			async onQueryStarted(User, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					extendedUserApiSlice.util.updateQueryData(
						"getUserById",
						User.userId,
						(draft) => {
							const users = draft;
							if (users) {
								if (users.email.primary === User.primaryEmail) {
									let emailIndex = users.email.secondary.indexOf(
										User.emailOfTheClickedButton
									);
									users.email.secondary[emailIndex] = User.primaryEmail;
									users.email.primary = User.emailOfTheClickedButton;
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

		updateExistingUserSecondaryEmail: builder.mutation({
			query: (User) => ({
				url: `users/secondaryEmail/${User.userId}`,
				method: "PUT",
				body: User,
			}),
			async onQueryStarted(User, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					extendedUserApiSlice.util.updateQueryData(
						"getUserById",
						User.userId,
						(draft) => {
							const users = draft;
							if (users) {
								if (users.email.secondary.includes(User.newEmail)) {
									let emailIndex = users.email.secondary.indexOf(User.newEmail);
									users.email.secondary[emailIndex] = User.newEmail;
								} else {
									users.email.secondary.push(User.newEmail);
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

		updateExistingUserRemoveSecondary: builder.mutation({
			query: (User) => ({
				url: `users/removeSecondary/${User.userId}`,
				method: "PUT",
				body: User,
			}),
			async onQueryStarted(User, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					extendedUserApiSlice.util.updateQueryData(
						"getUserById",
						User.userId,
						(draft) => {
							const users = draft;
							if (users) {
								if (
									users.email.secondary.includes(User.emailOfTheClickedButton)
								) {
									users.email.secondary = users.email.secondary.filter(
										(item) => item !== User.emailOfTheClickedButton
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

		updateExistingUserPassword: builder.mutation({
			query: (User) => ({
				url: `users/password/${User.userId}`,
				method: "PUT",
				body: User,
			}),
			async onQueryStarted(User, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					extendedUserApiSlice.util.updateQueryData(
						"getUserById",
						User.userId,
						(draft) => {
							const users = draft;
							if (users) {
								users.password = User.password;
								users.confirmPassword = User.confirmPassword;
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

		deleteExistingUser: builder.mutation({
			query: (User) => ({
				url: `users/${User.userId}`,
				method: "DELETE",
				body: User,
			}),
			invalidatesTags: (result, error, arg) => [
				{ type: "User", id: arg._id },
				{ type: "Post" },
			],
		}),
	}),
});

export const {
	useGetUserQuery,
	useGetUserByIdQuery,
	useGetUserByPostIdQuery,
	useCreateNewUserMutation,
	useUpdateExistingUserMutation,
	useUpdateExistingUserPublicProFileMutation,
	useUpdateExistingUserMakePrimaryMutation,
	useUpdateExistingUserSecondaryEmailMutation,
	useUpdateExistingUserRemoveSecondaryMutation,
	useUpdateExistingUserPasswordMutation,
	useDeleteExistingUserMutation,
} = extendedUserApiSlice;

// export const selectUsersResult =
// 	extendedUserApiSlice.endpoints.getUsers.select();

// const emptyUsers = [];

// export const selectAllUsers = createSelector(
// 	selectUsersResult,
// 	(usersResult) => usersResult?.data ?? emptyUsers
// );

// export const selectUserById = createSelector(
// 	selectAllUsers,
// 	(state, userId) => userId,
// 	(users, userId) => users.find((user) => user.id === userId)
// );

// const usersAdapter = createEntityAdapter({
// 	// sortComparer: (a, b) => b.date.localeCompare(a.date)
// 	selectId: (e) => e._id,
// 	selectById: (e) => e._id,
// });

// const initialState = usersAdapter.getInitialState({
// 	status: "idle",
// 	error: null,
// });

// export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
// 	const response = await axios.get("/users");
// 	return response.data;
// });

// export const addNewUser = createAsyncThunk(
// 	"Users/addNewUser",
// 	async (initialPost) => {
// 		const response = await axios.post("/auth/register", initialPost);
// 		return response.data;
// 	}
// );

// const usersSlice = createSlice({
// 	name: "users",
// 	initialState,
// 	reducers: {
// 		createUser: {
// 			reducer(state, action) {
// 				const { id, name } = action.payload;
// 				localStorage.setItem("user", JSON.stringify({ id, name }));
// 				state.users.push(action.payload);
// 			},
// 			prepare(firstName, lastName, email, password, confirmPassword) {
// 				return {
// 					payload: {
// 						id: nanoid(),
// 						name: {
// 							firstName,
// 							lastName,
// 						},
// 						email: {
// 							primary: email,
// 						},
// 						password,
// 						confirmPassword,
// 					},
// 				};
// 			},
// 		},
// 		userProfilePicture(state, action) {
// 			const { userId, profileImage } = action.payload;
// 			const existingUser = state.entities[userId];
// 			// const existingUser = state.users.find((user) => user.id === userId);
// 			if (existingUser) {
// 				existingUser.profileImage = profileImage;
// 			}
// 		},
// 		userPersonalInfoUpdated(state, action) {
// 			const { userId, firstName, lastName, location } = action.payload;
// 			const existingUser = state.entities[userId];
// 			// const existingUser = state.users.find((user) => user.id === userId);
// 			if (existingUser) {
// 				existingUser.name.firstName =
// 					firstName !== "" ? firstName : existingUser.name.firstName;
// 				existingUser.name.LastName =
// 					lastName !== "" ? lastName : existingUser.name.LastName;
// 				existingUser.location =
// 					location !== "" ? location : existingUser.name.location;
// 			}
// 		},
// 		userPublicProfile(state, action) {
// 			const {
// 				userId,
// 				nickname,
// 				biography,
// 				secondaryEmail,
// 				phone,
// 				linkedIn,
// 				twitter,
// 				facebook,
// 				instagram,
// 				youTube,
// 				website,
// 			} = action.payload;
// 			// const existingUser = state.users.find((user) => user.id === userId);
// 			const existingUser = state.entities[userId];
// 			if (existingUser) {
// 				existingUser.nickname =
// 					nickname !== "" ? nickname : existingUser.nickname;
// 				existingUser.bio = biography !== "" ? biography : existingUser.bio;

// 				existingUser.phonenumber =
// 					phone !== "" ? phone : existingUser.phonenumber;
// 				existingUser.socialLinks.linkedin =
// 					linkedIn !== "" ? linkedIn : existingUser.socialLinks.linkedin;
// 				existingUser.socialLinks.twitter =
// 					twitter !== "" ? twitter : existingUser.socialLinks.twitter;
// 				existingUser.socialLinks.facebook =
// 					facebook !== "" ? facebook : existingUser.socialLinks.facebook;
// 				existingUser.socialLinks.instagram =
// 					instagram !== "" ? instagram : existingUser.socialLinks.instagram;
// 				existingUser.socialLinks.youTube =
// 					youTube !== "" ? youTube : existingUser.socialLinks.youTube;
// 				existingUser.socialLinks.website =
// 					website !== "" ? website : existingUser.socialLinks.website;

// 				if (existingUser.email.secondary.includes(secondaryEmail)) {
// 					return;
// 				} else {
// 					existingUser.email.secondary.push(secondaryEmail);
// 				}
// 			}
// 		},
// 		userEmailUpdate(state, action) {
// 			const { userId, newEmail, getUserpassword } = action.payload;
// 			// const existingUser = state.users.find((user) => user.id === userId);
// 			const existingUser = state.entities[userId];
// 			if (existingUser && existingUser.password === getUserpassword) {
// 				if (
// 					existingUser.email.secondary.includes(newEmail) ||
// 					newEmail === ""
// 				) {
// 					return;
// 				} else {
// 					existingUser.email.secondary.push(newEmail);
// 				}
// 			}
// 		},
// 		userEmailMakePrimary(state, action) {
// 			const { userId, primaryEmail, emailOfTheClickedButton } = action.payload;
// 			// const existingUser = state.users.find((user) => user.id === userId);
// 			const existingUser = state.entities[userId];

// 			if (existingUser && existingUser.email.primary === primaryEmail) {
// 				const newlist = existingUser.email.secondary.indexOf(
// 					emailOfTheClickedButton
// 				);
// 				existingUser.email.primary = emailOfTheClickedButton;
// 				existingUser.email.secondary[newlist] = primaryEmail;
// 			}
// 		},
// 		userEmailRemoveSecondary(state, action) {
// 			const { userId, emailOfTheClickedButton } = action.payload;
// 			// const existingUser = state.users.find((user) => user.id === userId);
// 			const existingUser = state.entities[userId];

// 			if (
// 				existingUser &&
// 				existingUser.email.secondary.includes(emailOfTheClickedButton)
// 			) {
// 				const newList = existingUser.email.secondary.filter(
// 					(item) => item !== emailOfTheClickedButton
// 				);
// 				existingUser.email.secondary = newList;
// 			}
// 		},
// 		changeUserPassword(state, action) {
// 			const { userId, currentPassword, password, confirmPassword } =
// 				action.payload;
// 			// const existingUser = state.users.find((user) => user.id === userId);
// 			const existingUser = state.entities[userId];

// 			if (existingUser && existingUser.password === currentPassword) {
// 				existingUser.password = password;
// 				existingUser.confirmPassword = confirmPassword;
// 			}
// 		},
// 	},
// 	extraReducers(builder) {
// 		builder
// 			.addCase(fetchUsers.pending, (state, action) => {
// 				state.status = "loading";
// 			})
// 			.addCase(fetchUsers.fulfilled, (state, action) => {
// 				state.status = "succeeded";
// 				// state.users = state.users.concat(action.payload);
// 				usersAdapter.upsertMany(state, action.payload);
// 			})
// 			.addCase(fetchUsers.rejected, (state, action) => {
// 				state.status = "failed";
// 				state.error = action.error.message;
// 			});

// 		builder.addCase(addNewUser.fulfilled, usersAdapter.addOne);
// 		// 	(state, action) => {
// 		// 	state.users.push(action.payload);
// 		// });
// 	},
// });

// // export const selectAllUsers = (state) => state.users.users;

// export const UserStatus = (state) => state.users.status;

// export const UserFetchError = (state) => state.users.error;

// // Export the customized selectors for this adapter using `getSelectors`
// export const {
// 	selectAll: selectAllUsers,
// 	selectById: selectUserById,
// 	selectIds: selectUserIds,
// 	// Pass in a selector that returns the posts slice of state
// } = usersAdapter.getSelectors((state) => state.users);

// // export const selectUserById = createSelector(
// // 	[selectAllUsers, (state, userId) => userId],
// // 	(Users, userId) => Users.find((user) => user._id === userId)
// // );

// export const {
// 	createUser,
// 	userProfilePicture,
// 	userPersonalInfoUpdated,
// 	userPublicProfile,
// 	userEmailUpdate,
// 	userEmailMakePrimary,
// 	userEmailRemoveSecondary,
// 	changeUserPassword,
// } = usersSlice.actions;

// export default usersSlice.reducer;
