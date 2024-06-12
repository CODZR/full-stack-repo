function getDate() {
	return { data: 1 };
}

// 假设获取数据
let data = getDate();

// setInterval
setInterval(() => {
	const node = document.getElementById('node');

	// 添加数据
	node.innerHTML = JSON.stringify(data);
}, 1000);
