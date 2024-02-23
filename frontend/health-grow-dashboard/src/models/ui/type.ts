/* GlobalState */
export interface UIState {
	collapsed: boolean;
	curTab: any[];
	currentTab?: string | undefined;
	status?: 'idle' | 'loading';
	reloadPath: string;
}
