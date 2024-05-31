import { betaEnv, commonEnv, devEnv, prodEnv } from '../../env';

export function getEnvSettingsByMode(mode: string) {
	let envSettings = commonEnv;
	if (mode === 'development') {
		envSettings = Object.assign(commonEnv, devEnv);
	} else if (mode === 'beta') {
		envSettings = Object.assign(commonEnv, betaEnv);
	} else if (mode === 'production') {
		envSettings = Object.assign(commonEnv, prodEnv);
	}
	return envSettings;
}
