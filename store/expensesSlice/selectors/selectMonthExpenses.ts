import dayjs from 'dayjs';
import { createSelector } from '@reduxjs/toolkit';
import { selectAllExpenses } from '../expensesSlice';

export const selectMonthExpenses = (monthAndYear: string) =>
	createSelector(selectAllExpenses, (expenses) => {
		return expenses.filter((expense) => dayjs(expense.date).format('YYYY-MM') === monthAndYear);
	});
