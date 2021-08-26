const btn = document.querySelector('.header__menu');
const hamburger = document.querySelector('.hamburger');
const close = document.querySelector('.close');
const nav = document.querySelector('.nav-links');
const body = document.querySelector('body');
const main = document.querySelector('main');
btn.addEventListener('click', () => {
	// hamburger.classList.toggle('active');
	btn.classList.toggle('active');
	nav.classList.toggle('active');
	body.classList.toggle('active');
	main.classList.toggle('active');
});
