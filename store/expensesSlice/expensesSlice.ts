import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Expense } from '../entities/Expense';
import { RootState } from '../configureStore';
import { Slices } from '../constants';

const expensesAdapter = createEntityAdapter({
	selectId: (expense: Expense) => expense._id,
	sortComparer: (a, b) => a.date.localeCompare(b.date),
});
const initialState = expensesAdapter.getInitialState();

const expensesSlice = createSlice({
	name: Slices.expenses,
	initialState,
	reducers: {
		addExpense: expensesAdapter.upsertOne,
		removeExpense: expensesAdapter.removeOne,
	},
});

export const { addExpense, removeExpense } = expensesSlice.actions;

export const {
	selectById: selectExpenseById,
	selectIds: selectExpenseIds,
	selectEntities: selectExpenseEntities,
	selectAll: selectAllExpenses,
	selectTotal: selectTotalExpenses,
} = expensesAdapter.getSelectors((state: RootState) => state.expenses);

export default expensesSlice;
