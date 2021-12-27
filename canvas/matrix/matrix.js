const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
	x: innerWidth / 2,
	y: innerHeight / 2,
}

// change to 'gradient' for radial gradient, and comment out actual gradient variable.
let radGradient = c.createRadialGradient(
	canvas.width / 2,
	canvas.height / 2,
	10,
	canvas.width / 2,
	canvas.height / 2,
	canvas.width / 2
)
let gradient = c.createLinearGradient(0, 0, canvas.width, canvas.height)
const gradientColor = value => {
	if (value) {
		gradient.addColorStop(0, '#2185C5')
		// gradient.addColorStop(0.1, '#3d5a80')
		gradient.addColorStop(0.2, '#7ECEFD')
		// gradient.addColorStop(0.3, '#98c1d9')
		gradient.addColorStop(0.4, '#FFF6E5')
		// gradient.addColorStop(0.5, '#e0fbfc')
		gradient.addColorStop(0.6, '#FF7F66')
		// gradient.addColorStop(0.7, '#d62828')
		gradient.addColorStop(0.8, '#81b29a')
		// gradient.addColorStop(0.9, '#d62828')
		gradient.addColorStop(1, '#3d405b')
	} else {
		gradient.addColorStop(0, 'red')
		gradient.addColorStop(0.2, 'yellow')
		gradient.addColorStop(0.4, 'green')
		gradient.addColorStop(0.6, 'cyan')
		gradient.addColorStop(0.8, 'blue')
		gradient.addColorStop(1, 'magenta')
	}
}
gradientColor(false)

addEventListener('resize', () => {
	canvas.width = innerWidth
	canvas.height = innerHeight
	effect.resize(canvas.width, canvas.height)
})

class Symbol {
	constructor(x, y, fontSize, canvasHeight) {
		// this.characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
		// this.characters = '❤️ASHIQFURY'
		this.characters =
			'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ♔♕♖♗♘♙CHESS♚♛♜♝♞♟☀☁❆WEATHER❅❄♪MUSIC♫'
		this.x = x
		this.y = y
		this.fontSize = fontSize
		this.text = ''
		this.canvasHeight = canvasHeight
	}
	draw(context) {
		this.text = this.characters.charAt(Math.floor(Math.random() * this.characters.length))
		context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize)
		if (this.y * this.fontSize > this.canvasHeight && Math.random() > 0.98) {
			this.y = 0
		} else {
			this.y += 1
		}
	}
}

class Effect {
	constructor(canvasWidth, canvasHeight) {
		this.canvasWidth = canvasWidth
		this.canvasHeight = canvasHeight
		this.fontSize = 20
		this.columns = this.canvasWidth / this.fontSize
		this.symbols = []
		this.#initialize()
	}
	#initialize() {
		for (let i = 0; i < this.columns; i++) {
			this.symbols[i] = new Symbol(i, 0, this.fontSize, this.canvasHeight)
		}
	}
	resize(width, height) {
		this.canvasWidth = width
		this.canvasHeight = height
		this.columns = this.canvasWidth / this.fontSize
		this.symbols = []
		this.#initialize()
	}
}

const effect = new Effect(canvas.width, canvas.height)

const fps = 30
let lastTime = 0
const nextFrame = 1000 / fps //1000ms
let timer = 0

function animate(timeStamp) {
	const deltaTime = timeStamp - lastTime
	lastTime = timeStamp

	if (timer > nextFrame) {
		c.fillStyle = 'rgba(0, 0, 0, 0.05)'
		c.textAlign = 'center'
		c.fillRect(0, 0, canvas.width, canvas.height)
		c.fillStyle = gradient //'#0aff0a'
		c.font = effect.fontSize + 'px monospace'
		effect.symbols.forEach(symbol => symbol.draw(c))

		timer = 0
	} else {
		timer += deltaTime
	}
	requestAnimationFrame(animate)
}

animate(0)
