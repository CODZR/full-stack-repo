import {
	TypedUseSelectorHook,
	useDispatch as useReduxDispatch,
	useSelector as useReduxSelector
} from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
// import { deepClone } from '@/utils';
import reduxPromise from 'redux-promise';
import reduxThunk from 'redux-thunk';

import global from './global';
import task from './task';
import ui from './ui';

// create reducer
const reducer = combineReducers({
	// admin console
	global,
	task,
	ui
});

// redux middleWares
const middleWares = [reduxThunk, reduxPromise];

// store
export const store = configureStore({
	reducer: reducer,
	middleware: middleWares,
	devTools: true
});

type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// export const useSelector: TypedUseSelectorHook<RootState> = (args: any) => {
// 	const result = useReduxSelector(args);

// 	return cloneDeep(result);
// };
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
export const useDispatch = useReduxDispatch;
