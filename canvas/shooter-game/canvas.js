const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

// score card
const topScore = document.querySelector('.score')
const boardScore = document.querySelector('.board-score')
const scoreBoard = document.querySelector('.score-board')
const startBtn = document.querySelector('.board-start')

// high score card
const highScore = document.querySelector('.highScore')
const doneBtn = document.querySelector('.highscore-ok')
const highscoreBoard = document.querySelector('.highscore-board')
const highscoreScore = document.querySelector('.highscore-score')

canvas.width = innerWidth
canvas.height = innerHeight

const randomNumberFromRange = (min, max) => {
	return Math.random() * (max - min) + min
}

let score = 0
let highscore = localStorage.getItem('highscore') ? localStorage.getItem('highscore') : 0
highScore.innerHTML = highscore

class Player {
	constructor(x, y, radius, color) {
		this.x = x
		this.y = y
		this.radius = radius
		this.color = color
	}
	draw() {
		c.beginPath()
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
		c.fillStyle = this.color
		c.fill()
		c.closePath()
	}
}

class Projectile {
	constructor(x, y, radius, color, velocity) {
		this.x = x
		this.y = y
		this.radius = radius
		this.color = color
		this.velocity = velocity
	}
	draw() {
		c.beginPath()
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
		c.fillStyle = this.color
		c.fill()
		c.closePath()
	}
	update() {
		this.draw()

		this.x += this.velocity.x
		this.y += this.velocity.y
	}
}

class Enemy {
	constructor(x, y, radius, color, velocity) {
		this.x = x
		this.y = y
		this.radius = radius
		this.color = color
		this.velocity = velocity
	}
	draw() {
		c.beginPath()
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
		c.fillStyle = this.color
		c.fill()
		c.closePath()
	}
	update() {
		this.draw()

		this.x += this.velocity.x
		this.y += this.velocity.y
	}
}

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
		c.beginPath()
		c.globalAlpha = this.alpha
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

		this.x += this.velocity.x
		this.y += this.velocity.y

		this.alpha -= 0.01
	}
}

// create a player
let player = new Player(canvas.width / 2, canvas.height / 2, 15, 'white')
let projectiles = []
let enemies = []
let particles = []

const init = () => {
	player = new Player(canvas.width / 2, canvas.height / 2, 15, 'white')
	projectiles = []
	enemies = []
	particles = []
	// score = 0
	// topScore.innerHTML = score
	// boardScore.innerHTML = score
	topScore.innerHTML = boardScore.innerHTML = score = 0
}

// creating enemies
let timeout
const spawnEnemies = () => {
	timeout = setInterval(() => {
		let x, y
		const radius = randomNumberFromRange(5, 30)
		const color = `hsl(${Math.random() * 255}, 50%, 50%)`

		// spawning enemies from different angles from off the screen
		if (Math.random() < 0.5) {
			x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius
			y = Math.random() * canvas.height
		} else {
			x = Math.random() * canvas.width
			y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius
		}

		const angle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x)
		const velocity = {
			x: Math.cos(angle),
			y: Math.sin(angle),
		}
		enemies.push(new Enemy(x, y, radius, color, velocity))
	}, 1000)
}

let animationId
const animate = () => {
	animationId = requestAnimationFrame(animate)
	c.fillStyle = 'rgba(0, 0, 0, 0.1)'
	c.fillRect(0, 0, canvas.width, canvas.height)

	player.draw()

	// removing or updating particle
	particles.forEach((particle, index) => {
		if (particle.alpha <= 0) {
			particles.splice(index, 1)
		} else {
			particle.update()
		}
	})

	projectiles.forEach((projectile, index) => {
		projectile.update()

		// removing projectile when its off the screen
		if (
			projectile.x + projectile.radius < 0 ||
			projectile.x - projectile.radius > canvas.width ||
			projectile.y + projectile.radius < 0 ||
			projectile.y - projectile.radius > canvas.height
		) {
			setTimeout(() => {
				projectiles.splice(index, 1)
			}, 0)
		}
	})

	enemies.forEach((enemy, enemyIndex) => {
		enemy.update()

		// end game
		const distance = Math.hypot(player.x - enemy.x, player.y - enemy.y)
		if (distance - enemy.radius - player.radius < 0.1) {
			cancelAnimationFrame(animationId)
			clearInterval(timeout)
			scoreBoard.style.top = '50%'

			// modifing highscores when acheiving new highscore
			if (localStorage.getItem('highscore') < score) {
				highscore = score
				localStorage.setItem('highscore', highscore)
				highScore.innerHTML = highscore
				highscoreScore.innerHTML = highscore
				highscoreBoard.style.top = '50%'
			} else {
				highscore = localStorage.getItem('highscore')
			}
		}

		// when enemy touches projectile
		projectiles.forEach((projectile, projectileIndex) => {
			const distance = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y)

			if (distance - enemy.radius - projectile.radius < 1) {
				// creating particles when collision
				for (let i = 0; i < enemy.radius * 2; i++) {
					const power = Math.random() * 6
					particles.push(
						new Particle(projectile.x, projectile.y, Math.random() * 2, enemy.color, {
							x: (Math.random() - 0.5) * power,
							y: (Math.random() - 0.5) * power,
						})
					)
				}

				if (enemy.radius - 10 > 5) {
					gsap.to(enemy, {
						radius: enemy.radius - 10,
					})

					setTimeout(() => {
						projectiles.splice(projectileIndex, 1)
					}, 0)

					score += 100
					topScore.innerHTML = score
					boardScore.innerHTML = score
				} else {
					setTimeout(() => {
						enemies.splice(enemyIndex, 1)
						projectiles.splice(projectileIndex, 1)
					}, 0)
					score += 250
					topScore.innerHTML = score
					boardScore.innerHTML = score
				}
			}
		})
	})
}
// animate()
// spawnEnemies()

// create a new projectile
addEventListener('click', e => {
	const power = 5
	const angle = Math.atan2(e.clientY - canvas.height / 2, e.clientX - canvas.width / 2)
	const velocity = {
		x: Math.cos(angle) * power,
		y: Math.sin(angle) * power,
	}

	projectiles.push(new Projectile(canvas.width / 2, canvas.height / 2, 5, 'white', velocity))
})

addEventListener('resize', () => {
	canvas.width = innerWidth
	canvas.height = innerHeight
})

startBtn.addEventListener('click', () => {
	scoreBoard.style.top = '-100%'
	init()
	animate()
	spawnEnemies()
})

doneBtn.addEventListener('click', () => {
	highscoreBoard.style.top = '-100%'
})
