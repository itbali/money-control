import { View, StyleSheet, Text } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { selectAllCategories, addCategory } from '@/store/categoriesSlice/categoriesSlice';
import { Button, TextInput } from '@/uiKit/index';

export default function ModalAddCategory() {
	const [category, setCategory] = useState('');
	const [error, setError] = useState('');

	const allCategories = useSelector(selectAllCategories);

	const disppath = useDispatch();

	const handleAddCategory = () => {
		if (!category) {
			setError('Введите название категории');
			return;
		}
		if (allCategories.find((c) => c.name === category)) {
			setError('Такая категория уже существует');
			return;
		}
		disppath(addCategory({ name: category, _id: Date.now().toString() }));
		router.navigate('../');
	};

	const handleSetCategory = (value: string) => {
		setCategory(value);
		setError('');
	};

	const isPresented = router.canGoBack();
	return (
		<View style={styles.container}>
			{/* {!isPresented && <Link href="../">Отмена</Link>} */}
			<StatusBar style="light" />
			<View style={styles.dialog}>
				<Text>Введите название категории</Text>
				<TextInput
					placeholder="Название категории"
					value={category}
					onChange={handleSetCategory}
				/>
				{error && <Text>{error}</Text>}
				<View style={styles.buttonsWrapper}>
					<Button
						onTap={handleAddCategory}
						width={'45%'}
					>
						<Text>Добавить</Text>
					</Button>
					<Button
						onTap={() => router.navigate('../')}
						width={'45%'}
					>
						<Text>Отмена</Text>
					</Button>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		width: '100%',
	},
	dialog: {
		marginTop: 20,
		alignSelf: 'stretch',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 20,
		padding: 20,
	},
	buttonsWrapper: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		gap: 5,
		alignItems: 'center',
		width: '100%',
	},
});
