const btn = document.querySelector('.header__menu');
const nav = document.querySelector('.nav-links');
const body = document.querySelector('body');
const main = document.querySelector('main');
btn.addEventListener('click', () => {
	
	btn.classList.toggle('active');
	nav.classList.toggle('active');
	body.classList.toggle('active');
	main.classList.toggle('active');
});
