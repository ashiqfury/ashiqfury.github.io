const canvas = document.querySelector('canvas')
canvas.width = innerWidth
canvas.height = innerHeight

const c = canvas.getContext('2d')
const mouse = {
	x: undefined,
	y: undefined,
}

document.body.style.cursor = 'pointer'

addEventListener('resize', () => {
	canvas.width = innerWidth
	canvas.height = innerHeight

	init()
})

const gravity = 0.02 // 0.005
const friction = 0.99

class Particle {
	constructor(x, y, radius, color, velocity) {
		this.x = x
		this.y = y
		this.radius = radius
		this.color = color
		this.velocity = velocity
		this.alpha = 1
	}
	draw() {
		c.save()
		c.globalAlpha = this.alpha
		c.beginPath()
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
		c.fillStyle = this.color
		c.fill()
		c.closePath()
		c.restore()
	}
	update() {
		this.draw()

		this.velocity.x *= friction
		this.velocity.y *= friction
		this.velocity.y += gravity

		this.x += this.velocity.x
		this.y += this.velocity.y

		// this.alpha -= 0.005
		this.alpha -= Math.random() * 0.008
	}
}

let particles = []
const init = () => {
	particles = []
}

const animate = () => {
	requestAnimationFrame(animate)
	c.fillStyle = 'rgba(0, 0, 0, 0.05)'
	c.fillRect(0, 0, canvas.width, canvas.height)

	particles.forEach((particle, index) => {
		if (particle.alpha > 0) {
			particle.update()
		} else {
			particles.splice(index, 1)
		}
	})
}

init()
animate()

addEventListener('click', event => {
	mouse.x = event.clientX
	mouse.y = event.clientY

	const particleCount = 400
	const angleIncrement = (Math.PI * 2) / particleCount
	const power = 8

	for (let i = 0; i < particleCount; i++) {
		let x = mouse.x
		let y = mouse.y
		let radius = Math.random() * 2 + 1
		// let radius = 3
		let velocity = {
			// x: Math.random() * 3 - 1.5,
			// y: Math.random() * 3 - 1.5,
			x: Math.cos(angleIncrement * i) * Math.random() * power,
			y: Math.sin(angleIncrement * i) * Math.random() * power,
		}
		let color = `hsl(${Math.random() * 255}, 50%, 50%)`

		particles.push(new Particle(x, y, radius, color, velocity))
	}
})
