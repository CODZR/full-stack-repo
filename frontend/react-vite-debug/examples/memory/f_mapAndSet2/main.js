let obj = {
	id: 1
};

let set = new WeakSet([obj]);
let map = new WeakMap([[obj, 'winter']]);

// 置空
obj = null;

// 没有报错，但obj的引用不在了
console.log(set);
console.log(map);
