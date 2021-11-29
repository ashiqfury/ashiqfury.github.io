const canvas = document.querySelector('canvas');

canvas.width = innerWidth;
canvas.height = innerHeight;

const c = canvas.getContext('2d');

const gravity = 1;
const friction = 0.9; // max: 0.99
const colors = ['#3d5a80', '#98c1d9', '#e0fbfc', '#ee6c4d', '#293241'];

window.addEventListener('resize', () => {
	canvas.width = innerWidth;
	canvas.height = innerHeight;
	init();
});

window.addEventListener('click', () => {
	init();
});

function Ball(x, y, dx, dy, radius, color) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.color = color;

	this.draw = function () {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		c.fillStyle = this.color;
		c.fill();
		c.closePath();
	};

	this.update = function () {
		// ball bounce
		if (this.y + this.radius + this.dy > canvas.height) {
			this.dy = -this.dy * friction;
		} else {
			this.dy += gravity;
		}

		if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
			this.dx = -this.dx;
		}

		this.x += this.dx;
		this.y += this.dy;
		this.draw();
	};
}

let ballsArray = [];

function init() {
	ballsArray = [];
	for (let i = 0; i < 500; i++) {
		let radius = Math.random() * 30;
		let x = Math.random() * (innerWidth - radius * 2) + radius;
		let y = Math.random() * (innerHeight - radius * 2) + radius;
		let dx = (Math.random() - 0.5) * 8;
		let dy = (Math.random() - 0.5) * 8;
		let color = colors[Math.floor(Math.random() * colors.length)];
		ballsArray.push(new Ball(x, y, dx, dy, radius, color));
	}
}

function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0, 0, innerWidth, innerHeight);

	for (let i = 0; i < ballsArray.length; i++) {
		ballsArray[i].update();
	}
}

init();
animate();
