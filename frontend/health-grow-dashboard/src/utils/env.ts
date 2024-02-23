const apiBaseUrlMap = {
	local: 'https://dev-api.vibe-beta.com/v1/',
	dev: 'https://dev-api.vibe-beta.com/v1/',
	beta: 'https://api.vibe-beta.com/v1/',
	prod: 'https://api.vibe.us/v1/'
};

const vibeOneUrl = Object.freeze({
	local: 'http://localhost:8000',
	dev: 'https://dev-one.vibe-beta.com',
	beta: 'https://one.vibe-beta.com',
	prod: 'https://one.vibe.us'
});

const accountUrlMap = Object.freeze({
	local: 'https://dev-account.vibe-beta.com/',
	dev: 'https://dev-account.vibe-beta.com/',
	beta: 'https://account.vibe-beta.com/',
	prod: 'https://account.vibe.us/'
});

const canvasWebUrlMap = Object.freeze({
	local: 'https://dev-app.vibe-beta.com/',
	dev: 'https://dev-app.vibe-beta.com/',
	beta: 'https://app.vibe-beta.com/',
	prod: 'https://app.vibe.us/'
});

const canvasWbeUrl = import.meta.env.VITE_CANVAS_WEB_URL;

export const getCanvasWebUrl = () => {
	if (canvasWbeUrl) return canvasWbeUrl;

	const env = getEnv() || 'prod';

	return canvasWebUrlMap[env];
};

export const getVibeOneUrl = () => {
	const env = getEnv();
	if (env) return vibeOneUrl[env];

	return location.origin;
};

const accountUrl = import.meta.env.VITE_ACCOUNT_URL;

export const getUniversalSignInUrl = () => {
	if (accountUrl) return accountUrl;

	const env = getEnv();

	return accountUrlMap[env];
};

const restBaseUrl = import.meta.env.VITE_REST_BASE_URL;

export const getAPIBaseUrl = () => {
	if (restBaseUrl) return restBaseUrl;

	const env = getEnv() || 'prod';

	return apiBaseUrlMap[env];
};

export const redirectToUniversalSignIn = ({ toLogin } = { toLogin: false }) => {
	const isAdminRoute = isAdminPage();
	const { pathname } = window.location;

	const signinVibeParams = `?signin-vibe=${isAdminRoute ? 'admin' : 'one'}`;
	const redirectToParams = `&redirect-to=${getVibeOneUrl() + pathname}`;
	const teamIdParams = getFocusTeamId() ? `&team_id=${getFocusTeamId()}` : '';
	const params = signinVibeParams + redirectToParams + teamIdParams;

	const loginRoute = toLogin ? 'login' : '';
	location.href = getUniversalSignInUrl() + loginRoute + params;
};

function getEnv() {
	const hostname = location.hostname;
	if (/localhost/.test(hostname)) {
		return 'local';
	} else if (/dev/.test(hostname)) {
		return 'dev';
	} else if (/vibe-beta.com/.test(hostname)) {
		return 'beta';
	} else if (/vibe.us/.test(hostname)) {
		return 'prod';
	}
	return '';
}
