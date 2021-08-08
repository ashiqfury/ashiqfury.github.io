const menu = document.querySelector('.menu');
const hamburger = document.querySelector('.hamburger');
const close = document.querySelector('.close');
const mobileNav = document.querySelector('.mobileNav');

menu.onclick = () => {
	console.log('clicked');
	hamburger.classList.toggle('display');
	close.classList.toggle('display');
	mobileNav.classList.toggle('slideToggler');
};
