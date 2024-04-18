import styles from './index.module.less';

interface Props {
	wenzi: UnknownObj;
}

const ZiCard = (props: Props) => {
	const { wenzi } = props;

	const getImgUrlArr = (str) => {
		// const serverPrefix = 'http://127.0.0.1:3011';
		const serverPrefix = 'https://dzrlab.top/';
		const prefix = '/public/img';
		const splitStr = str.split(prefix);
		splitStr.shift();

		return splitStr.map((item) => serverPrefix + prefix + item);
	};

	return (
		<div className={styles.ziWrapper}>
			<h2>{wenzi.zi}</h2>

			<h3>拼音</h3>
			<ul>{wenzi.pinyin}</ul>

			<h3>部首</h3>
			<p>{wenzi.bushou}</p>

			<h3>部首笔画</h3>
			<p>{wenzi.bushoubh}</p>

			<h3>总笔画</h3>
			<p>{wenzi.zbh}</p>

			<h3>康熙字典笔画</h3>
			<p>{wenzi.kxzdbh}</p>

			<h3>五笔86</h3>
			<p>{wenzi.wb86}</p>

			<h3>五笔98</h3>
			<p>{wenzi.wb96}</p>

			<h3>UniCode</h3>
			<p>{wenzi.unicode}</p>

			<h3>汉字五行</h3>
			<p>{wenzi.hzwx}</p>

			<h3>吉凶寓意</h3>
			<p>{wenzi.jxyy}</p>

			<h3>是否为常用字</h3>
			<p>{wenzi.cyz}</p>

			<h3>姓名学</h3>
			<p>{wenzi.xmx}</p>

			<h3>笔顺读写</h3>
			<p>{wenzi.bsdx}</p>

			<h3>基本解释</h3>
			<p>{wenzi.jbjs}</p>

			<h3>新华字典详细解释</h3>
			<p>{wenzi.xhzdxxjs}</p>

			<h3>汉语大字典解释</h3>
			<p>{wenzi.hydzdjs}</p>

			<h3>康熙字典解释</h3>
			<p>{wenzi.kxzdjs}</p>

			<h3>说文解字详解</h3>
			<p>{wenzi.swjzxj}</p>

			<h3>说文解字详解图片</h3>
			<div className="image-wrapper">
				{getImgUrlArr(wenzi.swjzxjpic).map((url, idx) => (
					<img alt={`说文解字详解图片${idx}`} key={idx} src={url} />
				))}
			</div>

			<h3>字源演变图片</h3>
			<div className="image-wrapper">
				{getImgUrlArr(wenzi.zyybpic).map((url, idx) => (
					<img alt={`字源演变图片${idx}`} key={idx} src={url} />
				))}
			</div>

			<h3>相关书法</h3>
			<p>{wenzi.xgsf}</p>

			<h3>相关词语</h3>
			<p>{wenzi.xgcy}</p>

			<h3>相关成语</h3>
			<p>{wenzi.xgchengyu}</p>

			<h3>相关诗词</h3>
			<p>{wenzi.xgsc}</p>

			<h3>康熙字典原图</h3>
			<div className={styles.imageWrapper}>
				{getImgUrlArr(wenzi.kxzdpic).map((url, idx) => (
					<img alt={`康熙字典原图${idx}`} key={idx} src={url} />
				))}
			</div>
		</div>
	);
};

export default ZiCard;
