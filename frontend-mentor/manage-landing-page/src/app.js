const nav = document.querySelector('nav')
const btn = document.querySelector('.menu')

btn.addEventListener('click', () => {
	btn.classList.toggle('active')
	nav.classList.toggle('top-24')
	nav.classList.toggle('-top-full')
	document.body.classList.toggle('active')
	document.body.classList.toggle('max-h-screen')
	document.body.classList.toggle('overflow-hidden')
})

// navigation toggler hamburger menu
// for (toggler of togglers)
// 	toggler.addEventListener('click', () => {
// 		nav.classList.toggle('top-24') //
// 		nav.classList.toggle('-top-full') //
// 		document.body.classList.toggle('max-h-screen') //
// 		document.body.classList.toggle('overflow-hidden') //
// 		document.body.classList.toggle('active') //
// 		for (toggler of togglers) toggler.classList.toggle('hidden') //
// 	})

// email validation
const email = document.querySelector('.emailInput')
const submit = document.querySelector('.submitBtn')
const error = document.querySelector('.errorMsg')

submit.addEventListener('click', e => {
	e.preventDefault()
	if (!email.value.match(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/)) {
		error.classList.remove('hidden')
	} else {
		error.classList.add('hidden')
	}
})

// slider animation
const slider = document.querySelector('.slider')
const sliderBtns = document.querySelectorAll('.sliderBtn')

const handleSlider = index => {
	slider.style.transform = `translateX(-${100 * index}vw)`
	for (i = 0; i < sliderBtns.length; i++) sliderBtns[i].classList.remove('bg-primary-red')
	sliderBtns[index].classList.add('bg-primary-red')
}

// Gsap Animations

TweenMax.from('.logo', 1, {
	opacity: 0,
	delay: 1,
	y: 20,
	ease: Expo.easeInOut,
})

TweenMax.from('.menu-links ul', 1, {
	opacity: 0,
	delay: 1.2,
	y: 20,
	ease: Power3.easeInOut,
})

TweenMax.from('header button', 1, {
	opacity: 0,
	delay: 1.5,
	y: 20,
	ease: Power3.easeInOut,
})

TweenMax.from('main h1', 1, {
	opacity: 0,
	delay: 1.7,
	y: 20,
	ease: Power3.easeInOut,
})
TweenMax.from('main p', 1, {
	opacity: 0,
	delay: 1.9,
	y: 20,
	ease: Power3.easeInOut,
})
TweenMax.from('main button', 1, {
	opacity: 0,
	delay: 2,
	y: 20,
	ease: Power3.easeInOut,
})
TweenMax.from('main img', 1, {
	opacity: 0,
	delay: 2.2,
	x: 20,
	ease: Power3.easeInOut,
})
TweenMax.from('.pattern', 1, {
	opacity: 0,
	delay: 1.5,
	ease: Power3.easeInOut,
})

TweenMax.to('.first', 1.5, {
	delay: 0.5,
	top: '-100%',
	ease: Expo.easeInOut,
})
TweenMax.to('.second', 1.5, {
	delay: 0.7,
	top: '-100%',
	ease: Expo.easeInOut,
})
TweenMax.to('.third', 1.5, {
	delay: 0.9,
	top: '-100%',
	ease: Expo.easeInOut,
})
