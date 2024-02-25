import { Stack } from 'expo-router';

export default function Layout() {
	return (
		<Stack>
			<Stack.Screen
				name="[id]"
				options={{
					// Hide the header for all other routes.
					headerShown: false,
					title: 'Расходы по категории',
				}}
			/>
		</Stack>
	);
}
