const canvas = document.querySelector('canvas')

canvas.width = innerWidth
canvas.height = innerHeight

const ctx = canvas.getContext('2d')

const mouse = {
	x: undefined,
	y: undefined,
}
let particleArray = []
let hue = 1
let light = 50

addEventListener('mousemove', e => {
	mouse.x = e.x
	mouse.y = e.y
	for (let i = 0; i < 5; i++) {
		particleArray.push(new Particle())
	}
})

addEventListener('resize', () => {
	canvas.width = innerWidth
	canvas.height = innerHeight
})

class Particle {
	constructor() {
		this.x = mouse.x
		this.y = mouse.y
		this.dx = Math.random() * 5 - 2.5
		this.dy = Math.random() * 5 - 2.5
		this.size = Math.random() * 10 + 1
		this.color = `hsl(${hue}, 50%, 50%)`
	}

	draw() {
		ctx.beginPath()
		ctx.fillStyle = this.color
		ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
		ctx.fill()
		ctx.closePath()
	}

	update() {
		this.x += this.dx
		this.y += this.dy

		if (this.size > 0.2) this.size -= 0.1
		this.draw()
	}
}

const handleAnimate = () => {
	for (let i = 0; i < particleArray.length; i++) {
		particleArray[i].update()

		for (let j = i; j < particleArray.length; j++) {
			let xDis = particleArray[i].x - particleArray[j].x
			let yDis = particleArray[i].y - particleArray[j].y
			let distance = Math.sqrt(xDis ** 2 + yDis ** 2)
			if (distance < 100) {
				ctx.beginPath()
				ctx.strokeStyle = particleArray[i].color
				ctx.lineWidth = 0.2
				ctx.moveTo(particleArray[i].x, particleArray[i].y)
				ctx.lineTo(particleArray[j].x, particleArray[j].y)
				ctx.stroke()
				ctx.closePath()
			}
		}
		// hue += 0.5
		if (particleArray[i].size <= 0.3) {
			particleArray.splice(i, 1)
			i--
		}
	}
}

const animate = () => {
	// ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
	ctx.fillRect(0, 0, canvas.width, canvas.height)
	hue += 1
	handleAnimate()
	requestAnimationFrame(animate)
}

animate()
