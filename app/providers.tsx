import { store, persistor } from '@/store/configureStore';
import { PropsWithChildren } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { Text } from 'react-native';

export default function Providers({ children }: PropsWithChildren) {
	return (
		<Provider store={store}>
			<PersistGate
				persistor={persistor}
				loading={<Text>Loading...</Text>}
			>
				<GestureHandlerRootView style={{ flex: 1 }}>{children}</GestureHandlerRootView>
			</PersistGate>
		</Provider>
	);
}
