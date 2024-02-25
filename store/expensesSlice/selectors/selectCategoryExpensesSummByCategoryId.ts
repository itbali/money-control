import { createSelector } from '@reduxjs/toolkit';
import { selectAllExpenses } from '../expensesSlice';
import { selectCategoryEntities } from '@/store/categoriesSlice/categoriesSlice';

export const selectCategoryExpensesSummByCategoryId = (categoryId: string, month: string) =>
	createSelector([selectAllExpenses, selectCategoryEntities], (expenses, categoriEntities) => {
		const categoryName = categoriEntities[categoryId].name;
		const categoryExpenses = expenses.filter((expense) => expense.category === categoryId);
		const categoryExpensesInMonth = categoryExpenses.filter((expense) => expense.date.startsWith(month));
		return categoryExpensesInMonth.reduce((acc, expense) => acc + expense.amount, 0);
	});
