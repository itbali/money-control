import { Stack } from 'expo-router';
import Providers from './providers';

export default function Layout() {
	return (
		<Providers>
			<Stack>
				<Stack.Screen
					name="index"
					options={{
						// Hide the header for all other routes.
						headerShown: false,
						title: 'Главная',
					}}
				/>
				<Stack.Screen
					name="modalAddCategory"
					options={{
						// Set the presentation mode to modal for our modal route.
						presentation: 'modal',
						title: 'Добавить категорию',
					}}
				/>
			</Stack>
		</Providers>
	);
}
