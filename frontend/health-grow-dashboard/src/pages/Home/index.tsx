import LoadingView from '@/layouts/components/FullscreenLoading';

import { ROUTE_PATH_MAP } from '@/models/global';

const HomePage = () => {
	const navigate = useStableNavigate();
	console.log(123);
	useEffect(() => {
		navigate(ROUTE_PATH_MAP.HOME);
	}, [navigate]);

	return <LoadingView />;
};

export default HomePage;
