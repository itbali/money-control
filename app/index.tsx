import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import extended from 'dayjs/plugin/advancedFormat';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useState } from 'react';
import { FlatList, StyleSheet, Text, View, TouchableWithoutFeedback, GestureResponderEvent } from 'react-native';
import { router } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { removeCategory, selectAllCategories } from '@/store/categoriesSlice/categoriesSlice';
import { Button, TrashIcon } from '@ui';
import { Swipeable } from 'react-native-gesture-handler';
import { CategoryButton } from '@/components/categoryButton';

dayjs.extend(extended);
dayjs.locale('ru');

export default function MainScreen() {
	const currentDate = dayjs();
	const categories = useSelector(selectAllCategories);
	const [month, setMonth] = useState(currentDate);

	const dispatch = useDispatch();

	const handleNextMonth = () => {
		setMonth(month.add(1, 'month'));
	};
	const handlePreviousMonth = () => {
		setMonth(month.subtract(1, 'month'));
	};

	const handleShowModal = () => {
		router.navigate('modalAddCategory');
	};

	const handleDeleteCategory = (id: string) => {
		dispatch(removeCategory(id));
	};

	return (
		<View style={styles.container}>
			<View style={styles.monthSelection}>
				<TouchableWithoutFeedback onPress={handlePreviousMonth}>
					<Text>
						<FontAwesome
							name="arrow-circle-left"
							size={30}
							color="black"
						/>
					</Text>
				</TouchableWithoutFeedback>
				<Text style={styles.month}>{month.format('MMMM - YY').toUpperCase()}</Text>
				<TouchableWithoutFeedback onPress={handleNextMonth}>
					<Text>
						<FontAwesome
							name="arrow-circle-right"
							size={30}
							color="black"
						/>
					</Text>
				</TouchableWithoutFeedback>
			</View>
			<FlatList
				data={categories}
				keyExtractor={(item) => item._id.toString()}
				style={styles.categoriesContainer}
				ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
				renderItem={({ item }) => (
					<Swipeable renderRightActions={() => <TrashIcon onTap={() => handleDeleteCategory(item._id)} />}>
						<CategoryButton
							month={month}
							category={item}
						/>
					</Swipeable>
				)}
			/>
			<Button onTap={handleShowModal}>
				<View style={styles.addCategory}>
					<Text>Добавить категорию</Text>
					<Text>
						<FontAwesome
							name="plus-circle"
							size={30}
							color="black"
						/>
					</Text>
				</View>
			</Button>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'stretch',
		gap: 20,
		padding: 20,
		marginTop: 40,
	},
	monthSelection: {
		marginTop: 20,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 20,
		gap: 20,
		width: '100%',
	},
	month: {
		fontSize: 24,
	},
	categoriesContainer: {
		display: 'flex',
		borderRadius: 10,
		gap: 20,
	},
	addCategory: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%',
		height: 50,
		marginTop: -7,
	},
});
