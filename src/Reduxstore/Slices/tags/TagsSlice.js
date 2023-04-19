import { createSlice } from "@reduxjs/toolkit";
import { createParentTags } from "../../../data";

const initialState = createParentTags;

const tagsSlice = createSlice({
	name: "tags",
	initialState,
	reducers: {
		createTags: {
			reducer(state, action) {
				const { parent, addTag } = action.payload;

				let existingTgas = false;

				for (const tag in state) {
					if (state[tag].tags && state[tag].tags.includes(addTag)) {
						existingTgas = true;
						break;
					}
				}

				if (!existingTgas) {
					state[parent].tags.push(addTag);
				}
			},
			prepare(parent, addTag) {
				return {
					payload: {
						addTag,
						parent,
					},
				};
			},
		},
		deleteTag: {
			reducer(state, action) {
				const { uncheckedTag } = action.payload;

				if (uncheckedTag) {
					for (const tag in state) {
						if (state[tag].tags.includes(uncheckedTag.uncheckedTag)) {
							state[tag].tags = state[tag].tags.filter(
								(tag) => uncheckedTag.uncheckedTag !== tag
							);
						}
					}
				}
			},
			prepare(uncheckedTag) {
				return {
					payload: {
						uncheckedTag,
					},
				};
			},
		},
	},
});

export const selectAllTag = (state) => {
	let TagArray = [];
	let parentTag = [];
	for (const tag in state.tags) {
		parentTag.push(tag);
		if (state.tags[tag].tags) {
			for (const eachtag of state.tags[tag].tags) {
				TagArray.push(eachtag);
			}
		}
	}
	return { TagArray, parentTag };
};

export const selectTagById = (state, tagId) =>
	state.posts.find((tag) => tag.id === tagId);

export const { createTags, deleteTag } = tagsSlice.actions;

export default tagsSlice.reducer;
