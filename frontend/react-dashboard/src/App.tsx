import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import enUS from 'antd/es/locale/en_US';

import Router from '@/routers/index';

const App = () => {
	return (
		<ConfigProvider locale={enUS} theme={{ hashed: false }}>
			<BrowserRouter>
				<Router />
			</BrowserRouter>
		</ConfigProvider>
	);
};

export default App;
