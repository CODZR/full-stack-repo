let obj = {
	id: 1
};

let user = { info: obj };

let set = new Set([obj]);
let map = new Map([[obj, 'winter']]);

// 置空
obj = null;

// 引用还在
console.log(user.info); // {id: 1}
console.log(set);
console.log(map);
