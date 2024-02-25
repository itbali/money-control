import { Category } from '@/store/entities/Category';
import { Button } from '@ui';
import { router } from 'expo-router';
import { Text, View, StyleSheet } from 'react-native';
import dayjs from 'dayjs';
import { selectCategoryExpensesSummByCategoryId } from '@/store/expensesSlice/selectors/selectCategoryExpensesSummByCategoryId';
import { useSelector } from 'react-redux';

export const CategoryButton = ({ month, category }: CategoryButtonProps) => {
	const categoryExpansesSumm = useSelector(
		selectCategoryExpensesSummByCategoryId(category._id, month.format('YYYY-MM')),
	);

	const handleOpenCategory = (_id: string) => {
		router.navigate({
			pathname: 'category/[id]',
			params: {
				id: _id,
				month: month.format('YYYY-MM'),
			},
		});
	};

	return (
		<Button onTap={() => handleOpenCategory(category._id)}>
			<View style={styles.categoryButton}>
				<Text>{category.name}</Text>
				<View style={styles.money}>
					<Text>{categoryExpansesSumm} €</Text>
				</View>
			</View>
		</Button>
	);
};

const styles = StyleSheet.create({
	categoryButton: {
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: -5,
	},
	money: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#e3c7f2',
		overflow: 'hidden',
		paddingHorizontal: 15,
		paddingVertical: 5,
		borderRadius: 5,
		borderColor: 'lightgray',
		borderWidth: 1,
	},
});

type CategoryButtonProps = {
	month: dayjs.Dayjs;
	category: Category;
};
