function func2() {
	let x = new Array(10000000).fill('winter');

	return function () {
		console.log(x);
		return x;
	};
}

let func2Child = func2();
func2Child();
