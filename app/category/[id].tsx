import { addExpense, removeExpense } from '@/store/expensesSlice/expensesSlice';
import { selectMonthExpenses } from '@/store/expensesSlice/selectors/selectMonthExpenses';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button, TextInput, TrashIcon } from '@ui';
import { selectCategoryExpensesSummByCategoryId } from '@/store/expensesSlice/selectors/selectCategoryExpensesSummByCategoryId';
import { Swipeable } from 'react-native-gesture-handler';
import dayjs from 'dayjs';

const ExpenseComponent = () => {
	const [expense, setExpense] = useState('');
	const [amount, setAmount] = useState<string>();
	const { id, month } = useLocalSearchParams<{ id: string; month: string }>();

	const categoryExpansesSumm = useSelector(selectCategoryExpensesSummByCategoryId(id, month));
	const expenses = useSelector(selectMonthExpenses(month));

	const dispatch = useDispatch();

	const replaceCommaWithDot = (text?: string) => {
		// replace comma with dot and remove all non-numeric characters
		return text ? parseFloat(text.replace(/,/g, '.').replace(/[^0-9.]/g, '')) : 0;
	};

	const handleAddExpense = () => {
		const numericAmount = replaceCommaWithDot(amount);
		if (numericAmount > 0) {
			dispatch(
				addExpense({
					_id: Math.random().toString(),
					amount: numericAmount,
					description: expense,
					date: new Date().toISOString(),
					currency: 'EUR',
					category: id as string,
				}),
			);
			setExpense('');
			setAmount(undefined);
			handleGoBack();
		}
	};

	const handleDeleteExpense = (id: string) => {
		dispatch(removeExpense(id));
	};

	const handleGoBack = () => {
		router.navigate('../');
	};

	return (
		<View style={styles.container}>
			<TextInput
				placeholder="Введите трату"
				value={expense}
				onChange={setExpense}
			/>
			<TextInput
				keyboardType="numeric"
				placeholder="Введите сумму"
				value={amount || ''}
				onChange={setAmount}
			/>
			<View style={styles.buttonsWrapper}>
				<Button
					onTap={handleAddExpense}
					width={'45%'}
				>
					<Text>Добавить трату</Text>
				</Button>
				<Button
					onTap={handleGoBack}
					width={'45%'}
				>
					<Text>Назад</Text>
				</Button>
			</View>
			<FlatList
				data={expenses}
				keyExtractor={(item) => item._id}
				style={styles.expensesContainer}
				ListHeaderComponent={<Text style={styles.expansesTitle}>Сумма: {categoryExpansesSumm} €</Text>}
				renderItem={({ item }) => (
					<Swipeable renderRightActions={() => <TrashIcon onTap={() => handleDeleteExpense(item._id)} />}>
						<View style={styles.expenseItem}>
							<Text>
								{dayjs(item.date).format('DD.MM')} - {item.description || 'без описания'}
							</Text>
							<Text>{item.amount}</Text>
						</View>
					</Swipeable>
				)}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	buttonsWrapper: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	expensesContainer: {
		flex: 1,
		padding: 20,
		marginTop: 20,
		backgroundColor: 'white',
		borderRadius: 10,
	},
	expansesTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	expenseItem: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderBottomWidth: 1,
		borderBottomColor: 'lightgray',
		paddingVertical: 10,
		marginRight: 10,
		backgroundColor: 'white',
	},
});

export default ExpenseComponent;
