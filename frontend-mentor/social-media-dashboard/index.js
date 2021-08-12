const input = document.querySelector('input.checkbox');
const inputWrapper = document.querySelector('.inputWrapper');
const ball = document.querySelector('.inputWrapper label');
const body = document.querySelector('body');

inputWrapper.addEventListener('click', () => {
	if (input.checked) {
		ball.style.justifyContent = 'flex-start';
		body.classList.remove('light');
	} else {
		ball.style.justifyContent = 'flex-end';
		body.classList.add('light');
	}
});
