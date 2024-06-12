import { formatStorageSize } from '../../../utils';

const BigComponent = () => {
	const [bigArr, setBigArr] = useState([]);

	const handleAddClick = () => {
		setBigArr(new Array((bigArr?.length || 0) + 10000000).fill(1));
	};

	useEffect(() => {
		// setBigArr(new Array(10000000).fill(1));

		return () => {
			setBigArr(null);
		};
	}, []);

	return (
		<div>
			<p>Big array size: {formatStorageSize((bigArr?.length || 0) * 4)}</p>
			<br />
			<button style={{ padding: '12px 36px', cursor: 'pointer' }} onClick={handleAddClick}>
				Add
			</button>
		</div>
	);
};

export default BigComponent;
