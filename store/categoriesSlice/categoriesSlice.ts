import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category } from '../entities/Category';
import { RootState } from '../configureStore';
import { Slices } from '../constants';

const categoriesAdapter = createEntityAdapter({
	selectId: (category: Category) => category._id,
	sortComparer: (a, b) => a.name.localeCompare(b.name),
});
const initialState = categoriesAdapter.getInitialState();

const categoriesSlice = createSlice({
	name: Slices.categories,
	initialState,
	reducers: {
		addCategory: categoriesAdapter.upsertOne,
		removeCategory: categoriesAdapter.removeOne,
	},
});

export const { addCategory, removeCategory } = categoriesSlice.actions;
export const {
	selectById: selectCategoryById,
	selectIds: selectCategoryIds,
	selectEntities: selectCategoryEntities,
	selectAll: selectAllCategories,
	selectTotal: selectTotalCategories,
} = categoriesAdapter.getSelectors((state: RootState) => state.categories);

export default categoriesSlice;
