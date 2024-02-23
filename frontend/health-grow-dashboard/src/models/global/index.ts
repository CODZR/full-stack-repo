import { createSlice } from '@reduxjs/toolkit';

import { GlobalState } from './type';

const globalState: GlobalState = {
	warehouseList: [],
	tab: {}
};

const globalSlice = createSlice({
	name: 'global',
	initialState: globalState,
	reducers: {
		setWarehouseList(state, { payload }) {
			state.warehouseList = payload;
		},
		blur() {
			return {
				warehouseList: [],
				tab: {}
			};
		}
	}
});

export default globalSlice.reducer;
export const { setWarehouseList } = globalSlice.actions;

// export const fetchPortalProfile = createAsyncThunk(
// 	'global/fetchPortalProfile',
// 	// 传递过来两个参数, 派发这个异步action时, 如果有传递参数, 会放在extraInfo里面. 第二个为store
// 	async (payload, { dispatch }) => {
// 		const response = await getWorkspaceProfileAPI();
// 		if (response) {
// 			dispatch({
// 				type: GLOBAL_ACTION.SET_PORTAL_PROFILE,
// 				payload: response
// 			});
// 		}
// 	}
// );

export * from './constant';
export * from './type';
