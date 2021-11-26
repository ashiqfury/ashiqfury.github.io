const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = {
	x: undefined,
	y: undefined,
};
const maxRadius = 40;
const colors = ['#3d5a80', '#98c1d9', '#e0fbfc', '#ee6c4d', '#293241'];

window.addEventListener('mousemove', (event) => {
	mouse.x = event.x;
	mouse.y = event.y;
});

window.addEventListener('resize', () => {
	canvas.width = innerWidth;
	canvas.height = innerHeight;

	init();
});

function Circle(x, y, dx, dy, radius, color) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.minRadius = radius;
	this.color = color;
	this.draw = function () {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		c.fillStyle = this.color;
		c.fill();
	};
	this.update = function () {
		// circles bounce back when hit the edge of the screen
		if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
			this.dx = -this.dx;
		}
		if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
			this.dy = -this.dy;
		}

		this.x += this.dx;
		this.y += this.dy;

		// Interactivity
		if (
			this.x - mouse.x < 50 &&
			this.x - mouse.x > -50 &&
			this.y - mouse.y < 50 &&
			this.y - mouse.y > -50
		) {
			if (this.radius < maxRadius) {
				this.radius += 1;
			}
		} else {
			if (this.radius > this.minRadius) {
				this.radius -= 1;
			}
		}

		this.draw();
	};
}

let circleArray = [];

function init() {
	circleArray = [];

	// creating circles
	for (let i = 0; i < 1000; i++) {
		let radius = Math.random() * 4 + 1;
		let x = Math.random() * (innerWidth - radius * 2) + radius;
		let y = Math.random() * (innerHeight - radius * 2) + radius;
		let dx = (Math.random() - 0.5) * 2;
		let dy = (Math.random() - 0.5) * 2;
		let color = colors[Math.floor(Math.random() * colors.length)];

		circleArray.push(new Circle(x, y, dx, dy, radius, color));
	}
}

function animate() {
	requestAnimationFrame(animate);
	// c.clearRect(0, 0, innerWidth, innerHeight);
	c.fillStyle = 'rgba(0, 0, 0, 0.3)';
	c.fillRect(0, 0, innerWidth, innerHeight);
	for (let i = 0; i < circleArray.length; i++) {
		circleArray[i].update();
	}
}

init();
animate();
