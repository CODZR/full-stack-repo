function func2() {
	let x = new Array(1000).fill('winter');

	return function () {
		console.log(x);
		return x;
	};
}

let func2Child = func2();
func2Child();
// 将引用关系质空
func2Child = null;
