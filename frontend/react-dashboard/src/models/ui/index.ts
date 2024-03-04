import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UIState } from './type';

const uiState: UIState = {
	collapsed: false,
	curTab: [],
	reloadPath: 'null'
};

const uiSlice = createSlice({
	name: 'ui',
	initialState: uiState,
	reducers: {
		setCollapsed: (state, { payload }: PayloadAction<boolean>) => {
			state.collapsed = payload;
		},
		setTabs: (state, { payload }: PayloadAction<any[]>) => {
			state.curTab = payload;
		},
		setCurrentTab: (state, { payload }) => {
			state.currentTab = payload;
		},
		setReloadPath: (state, { payload }) => {
			state.reloadPath = payload;
		},
		blur() {
			return {
				collapsed: false,
				curTab: [],
				reloadPath: 'null'
			};
		}
	}
});

export default uiSlice.reducer;
export const { setCurrentTab, setTabs, setReloadPath, setCollapsed } = uiSlice.actions;

export * from './constant';
export * from './type';
