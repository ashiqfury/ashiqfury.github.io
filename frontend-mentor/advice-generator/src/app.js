const btn = document.querySelector('.btn')
const id = document.querySelector('.id')
const advice = document.querySelector('.advice')

const getAdvice = async () => {
	fetch('https://api.adviceslip.com/advice')
		.then(response => response.json())
		.then(data => {
			id.innerHTML = data.slip.id
			advice.innerHTML = `"${data.slip.advice}"`
		})
}

getAdvice()

btn.addEventListener('click', () => getAdvice())
