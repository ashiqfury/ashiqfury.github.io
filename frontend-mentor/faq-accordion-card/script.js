const headWrapper = document.querySelectorAll('.accordion__headWrapper');
const heading = document.querySelectorAll('.accordion__heading');
const arrow = document.querySelectorAll('.arrow');
const dropdown = document.querySelectorAll('.accordion__dropdown');

const array = [heading, arrow, dropdown];

for (let i = 0; i < headWrapper.length; i++) {
	headWrapper[i].addEventListener('click', () => {
		// const bool = headWrapper[i].classList.includes('active');
		const bool = headWrapper[i].className;
		for (let j = 0; j < headWrapper.length; j++) {
			headWrapper[j].classList.remove('active');
			dropdown[j].classList.remove('active');
		}

		if (bool.includes('active')) {
			return;
		}

		headWrapper[i].classList.add('active');
		dropdown[i].classList.add('active');
	});
}
