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
			query: (userId) => ({
				url: `users/user/${userId}`,
				method: "GET",
				extraOptions: { maxRetries: 1 },
			}),
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

		updateExistingUserImage: builder.mutation({
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
				extraOptions: { maxRetries: 1 },
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
	useUpdateExistingUserImageMutation,
	useUpdateExistingUserPublicProFileMutation,
	useUpdateExistingUserMakePrimaryMutation,
	useUpdateExistingUserSecondaryEmailMutation,
	useUpdateExistingUserRemoveSecondaryMutation,
	useUpdateExistingUserPasswordMutation,
	useDeleteExistingUserMutation,
} = extendedUserApiSlice;
