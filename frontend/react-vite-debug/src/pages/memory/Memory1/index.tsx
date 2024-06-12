import { formatStorageSize } from '../utils';

let bigArr = [];
const Memory1 = () => {
	const [count, setCount] = useState(10000000);
	bigArr = new Array(count).fill(1);

	const handleAddClick = () => {
		// bigArr = null;
		setCount(count + 10000000);
	};

	return (
		<div>
			<p>Big array size: {formatStorageSize(bigArr.length * 4)}</p>
			<br />
			<button style={{ padding: '12px 36px', cursor: 'pointer' }} onClick={handleAddClick}>
				Add
			</button>
		</div>
	);
};

export default Memory1;
