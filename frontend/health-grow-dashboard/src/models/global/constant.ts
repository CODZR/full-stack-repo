export const AuthResult = {
	Idle: 'idle',
	Done: 'done',
	Denied: 'denied',
	Failed: 'failed'
};

export const ROLE_MAP = {
	editor: 1,
	admin: 2,
	owner: 3
};

export enum GLOBAL_MODAL_KEY {
	NONE = 'none',
	SIGN_OUT = 'sign_out'
}

export enum GLOBAL_ACTION {
	REMOVE_TEAM = 'global/removeTeam',
	SAVE_FOCUS_TEAM = 'global/saveFocusTeam',
	SET_TEAM_LIST = 'global/setTeamList',
	SET_PORTAL_PROFILE = 'global/setPortalProfile',
	SET_BILLING_INFO = 'global/setBillingInfo',
	SET_GUEST_ID = 'global/setGuestId',
	SET_AUTH_RESULT = 'global/setAuthResult',
	SET_DEFAULT_POLICY = 'global/setDefaultPolicy',
	SET_CURRENT_USER = 'global/setCurrentUser',
	BLUR_NOT_LOADING = 'global/blurNotLoading'
}

export enum ROUTE_PATH_MAP {
	HOME = '/logistic/task',
	// logistic
	LOGISTIC = '/logistic',
	ORDER = '/logistic/order',
	TASK = '/logistic/task',
	PENDING_TASK = '/logistic/pending-task',
	FREIGHT = '/logistic/freight',
	PACKAGE = '/logistic/package',
	// tools
	TOOL = '/tool',
	EASY_QUOTE = '/tool/easy-quote',
	SUPPLY = '/tool/supply'
}

export enum ROUTE_KEY_MAP {
	HOME = 'task',
	// logistic
	LOGISTIC = 'logistic',
	ORDER = 'order',
	TASK = 'task',
	PENDING_TASK = 'pending-task',
	FREIGHT = 'freight',
	PACKAGE = 'package',
	// tools
	TOOL = 'tool',
	EASY_QUOTE = 'easy-quote',
	SUPPLY = 'supply'
}
