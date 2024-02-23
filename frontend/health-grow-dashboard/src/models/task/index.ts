import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { TASK_MODAL_KEY } from './constant';
import { TaskState, WarehouseTask } from './type';

const taskState: TaskState = {
	taskFetchLoading: false,
	taskList: [] as WarehouseTask[],
	taskModal: { modalKey: TASK_MODAL_KEY.NONE }
};

const taskSlice = createSlice({
	name: 'task',
	initialState: taskState,
	reducers: {
		setTaskModal(state, { payload }: PayloadAction<ModalState<TASK_MODAL_KEY>>) {
			state.taskModal = payload;
		},
		setTaskList(state, { payload }: PayloadAction<WarehouseTask[]>) {
			state.taskList = payload;
		},
		setTaskFetchLoading(state, { payload }: PayloadAction<boolean>) {
			state.taskFetchLoading = payload;
		},
		blur(state: TaskState) {
			return {
				...state,
				taskFetchLoading: false,

				taskList: [] as WarehouseTask[],
				taskModal: { modalKey: TASK_MODAL_KEY.NONE }
			};
		}
	}
});

export default taskSlice.reducer;

export const { setTaskList, setTaskModal, setTaskFetchLoading, blur } = taskSlice.actions;

// export const fetchTaskList = createAsyncThunk(
// 	'member/fetchTaskList',
// 	// 传递过来两个参数, 派发这个异步action时, 如果有传递参数, 会放在extraInfo里面. 第二个为store
// 	async (payload, { dispatch }) => {
// 		dispatch(blur());
// 		dispatch(setTaskFetchLoading(true));
// 		await fetchAndHandleTaskData(dispatch);
// 		dispatch(setTaskFetchLoading(false));
// 	}
// );

// export const fetchTaskListNotBlurLoading = createAsyncThunk(
// 	'device/fetchTaskListNotBlurLoading',
// 	async (payload, { dispatch }) => {
// 		await fetchAndHandleTaskData(dispatch);
// 	}
// );

// export const fetchAndHandleTaskData = async (dispatch) => {
// 	try {
// 		const taskResp: { items: TaskRes[] } = await fetchTasksAPI();
// 		if (taskResp) {
// 			let { tasks } = taskResp;
// 			if (tasks?.length) {
// 				dispatch(setTaskList(tasks));
// 			} else {
// 				dispatch(setTaskList([]));
// 			}
// 		}
// 	} catch (error) {
// 		console.log('error: ', error);
// 	}
// };

export * from './constant';
export * from './type';
