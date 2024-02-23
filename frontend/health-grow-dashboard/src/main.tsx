import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { store } from '@/models';

import '@/assets/styles/common.less';

import 'virtual:svg-icons-register';
import App from '@/App';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<App />
	</Provider>
);
