---
isBlog: true
---

## 数组洗牌，概率相等 (费雪耶兹算法)

### 只置乱
```javascript
function shuffle(arr) {
	for (let len = arr.length, i = len - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}

	return arr;
}

console.log(shuffle([1, 2, 3, 4, 5])); // 每次生成结果不一样
```

### 取出前k个
```javascript
function shuffleK(arr, k) {
	const res = [...arr];

	for (let i = 0, len = arr.length; i < k; i++) {
		const j = i + Math.floor(Math.random() * (len - i));
		[res[i], res[j]] = [res[j], res[i]];
	}

	return res.slice(0, k);
}

console.log(shuffleK([1, 2, 3, 4, 5], 3)); // 每次生成结果不一样
```

## 手写原生js方法(Array)
### Array._filter
```javascript
Array.prototype._filter = function (Fn) {
	// 异常处理
	if (typeof Fn !== 'function') {
		throw new TypeError(Fn + ' is not a function');
	}
	const len = this.length >>> 0; // 自然数
	const res = new Array(len); // 不改变原数组, 预分配空间
	for (let i = 0; i < len; i++) {
		if (i in this) {
			// 兼容稀疏数组，与原生逻辑保持一致
			const shouldContain = Fn.call(this, this[i], i, this);
			if (shouldContain) {
				res.push(this[i]);
			}
		}
	}
	return res;
};
```

### Array._map
```javascript
// filter和map的逻辑差不多，只是把push改成
// res[i] = Fn.call(this, this[i], i, this);
```
### Array._reduce
```javascript
Array.prototype._reduce = function (Fn, initialVal) {
	// 异常处理
	if (typeof Fn !== 'function') {
		throw new TypeError(Fn + ' is not a function.');
	}

	const len = this.length >>> 0; // 自然数
	let acc = initialVal;
	let startIdx = 0;

	if (arguments.length < 2) {
		acc = this[0];
		startIdx = 1;
		if (len === 0) {
			throw new TypeError('Reduce function with empty array and no initial value.');
		}
	}

	for (let i = startIdx; i < len; i++) {
		if (i in this) {
			// 兼容稀疏数组，与原生逻辑保持一致
			acc = Fn.call(this, acc, this[i], i, this);
		}
	}

	return acc;
};
console.log(
	'[1, 2].reduce((acc, cur) => acc + cur): ',
	[1, 2].reduce((acc, cur) => acc + cur, 5) // 有默认值
); // 8
console.log(
	'[1, 2].reduce((acc, cur) => acc + cur): ',
	[1, 2].reduce((acc, cur) => acc + cur) // 无默认值
); // 3
```
### Array._filter
```javascript

```

## 手写原生js方法(Promise)

## 函数
### 函数柯里化
```javascript
// 指定参数个数
function curry(Fn) {
	if (typeof Fn !== 'function') {
		throw new TypeError(Fn + ' is not a function');
	}

	return function curried(...args) {
		if (args.length >= Fn.length) {
			return Fn(...args);
		}

		return function (...nextArgs) {
			return curried(...args, ...nextArgs);
		};
	};
}

function addThree(a, b, c) {
	return a + b + c;
}

const curriedAddThree = curry(addThree);
console.log(curriedAddThree(1, 2)(3)); // 6

// 不指定参数个数
function infiniteCurry(Fn) {
	if (typeof Fn !== 'function') {
		throw new TypeError(Fn + ' is not a function');
	}

	return function curried(...args) {
		if (args.length === 0) {
			throw new Error('Need at least one argument.');
		}

		return function (...nextArgs) {
			if (nextArgs.length === 0) {
				return args.reduce((prev, cur) => Fn(prev, cur));
			}

			return curried(...args, ...nextArgs);
		};
	};
}

function add(a, b) {
	return a + b;
}
const infiniteAdd = infiniteCurry(add);
console.log(infiniteAdd(1)(2, 3)(4)()); // 10
```