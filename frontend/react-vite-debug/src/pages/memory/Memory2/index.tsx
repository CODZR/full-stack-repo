import { formatStorageSize } from '../utils';
import BigComponent from './components/BigComponent';

const Memory2 = () => {
	const [show, setShow] = useState(false);

	const handleShowClick = () => {
		setShow(!show);
	};

	return (
		<div>
			<button style={{ padding: '12px 36px', cursor: 'pointer' }} onClick={handleShowClick}>
				{show ? 'Hide' : 'Show'}
			</button>
			<br />
			<br />
			{show && <BigComponent />}
		</div>
	);
};

export default Memory2;
