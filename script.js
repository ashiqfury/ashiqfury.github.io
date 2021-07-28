const bill = document.querySelector('#billInput');
const people = document.querySelector('#peopleInput');
const tip = document.querySelector('.tipInput');
const tipAmount = document.querySelector('.perPerson span');
const totalAmount = document.querySelector('.totalPerson span');
const resetBtn = document.querySelector('.reset');
const radioInput = document.querySelector('.radioInput');

let billValue = bill.value;
let peopleValue = people.value;
let tipValue = tip.value;

bill.addEventListener('keyup', () => {
	billValue = bill.value;
});

var rad = document.myForm.radio;

tip.addEventListener('keyup', () => {
	tipValue = tip.value;
	for (var i = 0; i < rad.length; i++) {
		rad[i].checked = false;
	}
});

for (var i = 0; i < rad.length; i++) {
	rad[i].addEventListener('change', function () {
		tip.value = '';
		tipValue = this.value;
	});
}

let tipAmountPerPerson = 0;
let tipAmountTotal = 0;
const errorMsg = document.querySelector('.errorMsg');

people.addEventListener('keyup', () => {
	tipAmount.innerHTML = '$0.00';
	totalAmount.innerHTML = '$0.00';

	if (people.value < 0 || people.value == '-') {
		people.value = '';
	}
	if (people.value == 0) {
		errorMsg.classList.remove('hider');
	}
	if (people.value > 0 || people.value == '') {
		errorMsg.classList.add('hider');

		peopleValue = people.value;

		tipAmountPerPerson = (billValue * tipValue) / 100;
		tipAmountTotal = tipAmountPerPerson * peopleValue;

		console.log('Bill Value : ', billValue);
		console.log('Tip Value : ', tipValue);
		console.log('people Value : ', peopleValue);
		console.log('Per Person Tip : ', tipAmountPerPerson);
		console.log('Total Person Tip : ', tipAmountTotal);

		tipAmount.innerHTML = '$' + tipAmountPerPerson.toFixed(2);
		totalAmount.innerHTML = '$' + tipAmountTotal.toFixed(2);
	}
});

resetBtn.onclick = () => {
	bill.value = '';
	people.value = '';
	tip.value = '';
	tipAmount.innerHTML = '$0.00';
	totalAmount.innerHTML = '$0.00';
	for (var i = 0; i < rad.length; i++) {
		rad[i].checked = false;
	}
};
