import { combineReducers, configureStore } from '@reduxjs/toolkit';
import expensesSlice from './expensesSlice/expensesSlice';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import categoriesSlice from './categoriesSlice/categoriesSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Slices } from './constants';

const rootReducer = combineReducers({
	expenses: expensesSlice.reducer,
	categories: categoriesSlice.reducer,
});

const persistConfig = {
	key: 'root',
	storage: AsyncStorage,
	whitelist: [Slices.categories, Slices.expenses],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat(),
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
