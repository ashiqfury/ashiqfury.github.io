const canvas = document.querySelector('canvas');

canvas.width = innerWidth;
canvas.height = innerHeight;

const c = canvas.getContext('2d');

// const colors = ['#3d5a80', '#98c1d9', '#e0fbfc', '#ee6c4d', '#293241'];
// const colors = ['#003049', '#d62828', '#f77f00', '#fcbf49', '#eae2b7'];
const colors = ['#e07a5f', '#3d405b', '#81b29a'];

const mouse = {
	x: undefined,
	y: undefined,
};

window.addEventListener('resize', () => {
	canvas.width = innerWidth;
	canvas.height = innerHeight;
	init();
});

window.addEventListener('mousemove', (event) => {
	mouse.x = event.x;
	mouse.y = event.y;
});

const getDistance = (x1, y1, x2, y2) => {
	const xDistance = x2 - x1;
	const yDistance = y2 - y1;

	return Math.sqrt(xDistance ** 2 + yDistance ** 2);
};

const randomIntFromRange = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

/**
 * Rotates coordinate system for velocities
 *
 * Takes velocities and alters them as if the coordinate system they're on was rotated
 *
 * @param  Object | velocity | The velocity of an individual particle
 * @param  Float  | angle    | The angle of collision between two objects in radians
 * @return Object | The altered x and y velocities after the coordinate system has been rotated
 */

const rotate = (velocity, angle) => {
	const rotatedVelocities = {
		x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
		y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle),
	};

	return rotatedVelocities;
};

/**
 * Swaps out two colliding particles' x and y velocities after running through
 * an elastic collision reaction equation
 *
 * @param  Object | particle      | A particle object with x and y coordinates, plus velocity
 * @param  Object | otherParticle | A particle object with x and y coordinates, plus velocity
 * @return Null | Does not return a value
 */

const resolveCollision = (particle, otherParticle) => {
	const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
	const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

	const xDist = otherParticle.x - particle.x;
	const yDist = otherParticle.y - particle.y;

	// Prevent accidental overlap of particles
	if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
		// Grab angle between the two colliding particles
		const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

		// Store mass in var for better readability in collision equation
		const m1 = particle.mass;
		const m2 = otherParticle.mass;

		// Velocity before equation
		const u1 = rotate(particle.velocity, angle);
		const u2 = rotate(otherParticle.velocity, angle);

		// Velocity after 1d collision equation
		const v1 = { x: (u1.x * (m1 - m2)) / (m1 + m2) + (u2.x * 2 * m2) / (m1 + m2), y: u1.y };
		const v2 = { x: (u2.x * (m1 - m2)) / (m1 + m2) + (u1.x * 2 * m2) / (m1 + m2), y: u2.y };

		// Final velocity after rotating axis back to original location
		const vFinal1 = rotate(v1, -angle);
		const vFinal2 = rotate(v2, -angle);

		// Swap particle velocities for realistic bounce effect
		particle.velocity.x = vFinal1.x;
		particle.velocity.y = vFinal1.y;

		otherParticle.velocity.x = vFinal2.x;
		otherParticle.velocity.y = vFinal2.y;
	}
};

function Particle(x, y, radius, color) {
	this.x = x;
	this.y = y;
	this.velocity = {
		x: (Math.random() - 0.5) * 8,
		y: (Math.random() - 0.5) * 8,
	};
	this.radius = radius;
	this.color = color;
	this.mass = 1;
	this.opacity = 0;

	this.draw = () => {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		c.save();
		c.globalAlpha = this.opacity;
		c.fillStyle = this.color;
		c.fill();
		c.restore();
		c.strokeStyle = this.color;
		c.stroke();
		c.closePath();
	};

	this.update = (particles) => {
		// Detecting collaided.
		for (let i = 0; i < particles.length; i++) {
			if (this === particles[i]) continue;
			if (getDistance(this.x, this.y, particles[i].x, particles[i].y) - this.radius * 2 < 0) {
				resolveCollision(this, particles[i]);
			}
		}

		// Bounce back from edges
		if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
			this.velocity.x = -this.velocity.x;
		}
		if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
			this.velocity.y = -this.velocity.y;
		}

		// Mouse interactivity
		if (getDistance(mouse.x, mouse.y, this.x, this.y) < 120 && this.opacity < 0.2) {
			this.opacity += 0.02;
		} else if (this.opacity > 0) {
			this.opacity -= 0.02;
			this.opacity = Math.max(0, this.opacity);
		}

		this.x += this.velocity.x;
		this.y += this.velocity.y;

		this.draw();
	};
}

let particles = [];

const init = () => {
	particles = [];

	for (let i = 0; i < 200; i++) {
		let radius = 20;
		let x = randomIntFromRange(radius, canvas.width - radius);
		let y = randomIntFromRange(radius, canvas.height - radius);
		let color = colors[Math.floor(Math.random() * colors.length)];

		// Recreating particles if its created with collaiding
		if (i !== 0) {
			for (let j = 0; j < particles.length; j++) {
				if (getDistance(x, y, particles[j].x, particles[j].y) - radius * 2 < 0) {
					x = randomIntFromRange(radius, canvas.width - radius);
					y = randomIntFromRange(radius, canvas.height - radius);
					j = -1;
				}
			}
		}

		particles.push(new Particle(x, y, radius, color));
	}
};

const animate = () => {
	requestAnimationFrame(animate);
	c.clearRect(0, 0, canvas.width, canvas.height);

	for (let i = 0; i < particles.length; i++) {
		particles[i].update(particles);
	}
};

init();
animate();
