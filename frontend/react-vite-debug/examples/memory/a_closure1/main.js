function func1() {
	let x = new Array(10000000).fill('winter');

	return function () {
		console.log('winter');
	};
}

let func1Child = func1();
func1Child();
