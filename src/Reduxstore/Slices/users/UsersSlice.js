import { createSlice, nanoid } from "@reduxjs/toolkit";
import { User } from "../../../data";

const initialState = User;

const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		createUser: {
			reducer(state, action) {
				const { id, name } = action.payload;
				localStorage.setItem("user", JSON.stringify({ id, name }));
				state.push(action.payload);
			},
			prepare(firstName, lastName, email, password, confirmPassword) {
				return {
					payload: {
						id: nanoid(),
						name: {
							firstName,
							lastName,
						},
						email: {
							primary: email,
						},
						password,
						confirmPassword,
					},
				};
			},
		},
		userProfilePicture(state, action) {
			const { userId, profileImage } = action.payload;
			const existingUser = state.find((user) => user.id === userId);
			if (existingUser) {
				existingUser.profileImage = profileImage;
			}
		},
		userPersonalInfoUpdated(state, action) {
			const { userId, firstName, lastName, location } = action.payload;
			const existingUser = state.find((user) => user.id === userId);
			if (existingUser) {
				existingUser.name.firstName =
					firstName !== "" ? firstName : existingUser.name.firstName;
				existingUser.name.LastName =
					lastName !== "" ? lastName : existingUser.name.LastName;
				existingUser.location =
					location !== "" ? location : existingUser.name.location;
			}
		},
		userPublicProfile(state, action) {
			const {
				userId,
				nickname,
				biography,
				secondaryEmail,
				phone,
				linkedIn,
				twitter,
				facebook,
				instagram,
				youTube,
				website,
			} = action.payload;
			const existingUser = state.find((user) => user.id === userId);
			if (existingUser) {
				existingUser.nickname =
					nickname !== "" ? nickname : existingUser.nickname;
				existingUser.bio = biography !== "" ? biography : existingUser.bio;

				existingUser.phonenumber =
					phone !== "" ? phone : existingUser.phonenumber;
				existingUser.socialLinks.linkedin =
					linkedIn !== "" ? linkedIn : existingUser.socialLinks.linkedin;
				existingUser.socialLinks.twitter =
					twitter !== "" ? twitter : existingUser.socialLinks.twitter;
				existingUser.socialLinks.facebook =
					facebook !== "" ? facebook : existingUser.socialLinks.facebook;
				existingUser.socialLinks.instagram =
					instagram !== "" ? instagram : existingUser.socialLinks.instagram;
				existingUser.socialLinks.youTube =
					youTube !== "" ? youTube : existingUser.socialLinks.youTube;
				existingUser.socialLinks.website =
					website !== "" ? website : existingUser.socialLinks.website;

				if (existingUser.email.secondary.includes(secondaryEmail)) {
					return;
				} else {
					existingUser.email.secondary.push(secondaryEmail);
				}
			}
		},
		userEmailUpdate(state, action) {
			const { userId, newEmail, getUserpassword } = action.payload;
			const existingUser = state.find((user) => user.id === userId);
			if (existingUser && existingUser.password === getUserpassword) {
				if (
					existingUser.email.secondary.includes(newEmail) ||
					newEmail === ""
				) {
					return;
				} else {
					existingUser.email.secondary.push(newEmail);
				}
			}
		},
		userEmailMakePrimary(state, action) {
			const { userId, primaryEmail, emailOfTheClickedButton } = action.payload;
			const existingUser = state.find((user) => user.id === userId);

			if (existingUser && existingUser.email.primary === primaryEmail) {
				const newlist = existingUser.email.secondary.indexOf(
					emailOfTheClickedButton
				);
				existingUser.email.primary = emailOfTheClickedButton;
				existingUser.email.secondary[newlist] = primaryEmail;
			}
		},
		userEmailRemoveSecondary(state, action) {
			const { userId, emailOfTheClickedButton } = action.payload;
			const existingUser = state.find((user) => user.id === userId);

			if (
				existingUser &&
				existingUser.email.secondary.includes(emailOfTheClickedButton)
			) {
				const newList = existingUser.email.secondary.filter(
					(item) => item !== emailOfTheClickedButton
				);
				existingUser.email.secondary = newList;
			}
		},
		changeUserPassword(state, action) {
			const { userId, currentPassword, password, confirmPassword } =
				action.payload;
			const existingUser = state.find((user) => user.id === userId);

			if (existingUser && existingUser.password === currentPassword) {
				existingUser.password = password;
				existingUser.confirmPassword = confirmPassword;
			}
		},
	},
});

export const {
	createUser,
	userProfilePicture,
	userPersonalInfoUpdated,
	userPublicProfile,
	userEmailUpdate,
	userEmailMakePrimary,
	userEmailRemoveSecondary,
	changeUserPassword,
} = usersSlice.actions;

export default usersSlice.reducer;
