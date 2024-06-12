import { formatStorageSize } from '../../../utils';

const BigComponent = () => {
	let bigArr = new Array(10000000).fill(1);
	const [render, setRender] = useState(false);

	const handleAddClick = () => {
		bigArr = new Array((bigArr?.length || 0) + 10000000).fill(1);
	};

	const handleRenderClick = () => {
		setRender(!render);
	};

	useEffect(() => {
		return () => {
			bigArr = null;
			console.log('bigArr: ', bigArr);
		};
	}, []);

	return (
		<div>
			<p>Big array size: {formatStorageSize((bigArr?.length || 0) * 4)}</p>
			<br />
			<button style={{ padding: '12px 36px', cursor: 'pointer' }} onClick={handleAddClick}>
				Add
			</button>
			<button style={{ padding: '12px 36px', cursor: 'pointer' }} onClick={handleRenderClick}>
				Render
			</button>
		</div>
	);
};

export default BigComponent;
