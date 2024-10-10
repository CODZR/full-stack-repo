module.exports = {
	apps: [
		{
			name: 'next-client',
			script: 'npm',
			args: 'start',
			interpreter: 'none',
			env: {
				NODE_ENV: 'production'
			},
			env_production: {
				NODE_ENV: 'production'
			}
		}
	]
};
