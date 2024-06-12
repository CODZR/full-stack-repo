function fn() {
	// test1
	test1 = new Array(10000000).fill('winter');

	// window
	console.log('this: ', this);
	this.test2 = new Array(10000000).fill('winter');
}

fn();
