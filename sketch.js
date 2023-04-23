let gravity = 0.981;
let trails = [];
let alpha = 0;
let xPosition = undefined;
let canvas = undefined;
const FPS = 60;

class BallA {
	constructor(mass, length) {
		this.mass = mass;
		this.length = length;
		this.angle = 200;
		this.xPosition = 0;
		this.yPosition = 0;
		this.angularVelocity = 0.01;
	}
	draw() {
		this.xPosition = this.length * sin(this.angle);
		this.yPosition = this.length * cos(this.angle);

		line(0, 0, this.xPosition, this.yPosition);
		ellipse(this.xPosition, this.yPosition, 10, 10);
	}
}

class BallB {
	constructor(mass, length) {
		this.mass = mass;
		this.length = length;

		this.angle = 200;
		this.xPosition = 0;
		this.yPosition = 0;
		this.angularVelocity = 0.02;
	}
	draw(ballAX, ballAY) {
		this.xPosition = ballAX + this.length * sin(this.angle);
		this.yPosition = ballAY + this.length * cos(this.angle);

		line(ballAX, ballAY, this.xPosition, this.yPosition);
		ellipse(this.xPosition, this.yPosition, 10, 10);
	}
}

function hexToRgb(hex) {
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
	return result
		? {
				r: parseInt(result[1], 16),
				g: parseInt(result[2], 16),
				b: parseInt(result[3], 16),
		  }
		: null
}

function drawTrails(color) {
	trails.push([ballB.xPosition, ballB.yPosition])
	for (let i = 0; i < trails.length; i++) {
		noStroke();
		fill(hexToRgb(color).r, hexToRgb(color).g, hexToRgb(color).b, alpha);
		ellipse(trails[i][0], trails[i][1], 10 / 2);
		alpha = 100;
	}
}

function computeAngularVelocity(ballA, ballB) {

	let angleA_numerator = -gravity * (2 * ballA.mass + ballB.mass) * sin(ballA.angle) - ballB.mass * gravity * sin(ballA.angle - 2 * ballB.angle) - 2 * sin(ballA.angle - ballB.angle) * ballB.mass * (ballB.angularVelocity * ballB.angularVelocity * ballB.length + ballA.angularVelocity * ballA.angularVelocity * ballA.length * cos(ballA.angle - ballB.angle));

	let angleA_denominator = ballA.length * (2 * ballA.mass + ballB.mass - ballB.mass * cos(2 * ballA.angle - 2 * ballB.angle));
	let angularAcceleration1 = angleA_numerator / angleA_denominator;

	// ANGULAR VELOCITY B
	let angle2_numerator = 2 * sin(ballA.angle - ballB.angle) * (ballA.angularVelocity * ballA.angularVelocity * ballA.length * (ballA.mass + ballB.mass) + gravity * (ballA.mass + ballB.mass) * cos(ballA.angle) + ballB.angularVelocity * ballB.angularVelocity * ballB.length * ballB.mass * cos(ballA.angle - ballB.angle));

	let angleB_denominator = ballB.length * (2 * ballA.mass + ballB.mass - ballB.mass * cos(2 * ballA.angle - 2 * ballB.angle));
	let angularAcceleration2 = angle2_numerator / angleB_denominator;

	ballA.angularVelocity += angularAcceleration1;
	ballA.angle += ballA.angularVelocity;

	ballB.angularVelocity += angularAcceleration2;
	ballB.angle += ballB.angularVelocity;
}

function updateValue(category, value, txtTarget, element) {
	$(`${category} ${txtTarget}`).html(value)
	if (category === "#ballA") {
		switch (element.id) {
			case "massA":
				ballA.mass = value;
				break;
			case "lengthA":
				ballA.length = value;
				break;
		}
	} else {
		switch (element.id) {
			case "massB":
				ballB.mass = value;
				break;
			case "lengthB":
				ballB.length = value;
				break;
		}
	}
	if (element.id === "gravity") {
		gravity = element.value;
	}
}

$(document).ready(function () {
	let sliderData = []
	$(document)
		.find("input")
		.each((index, element) => {
			sliderData.push(element.value);
		})
	$(document)
		.find("small")
		.each((index, element) => {
			element.innerHTML = sliderData[index];
		})
});

function setup() {
	canvas = createCanvas($("aside").width(), 800);
	canvas.parent("p5jsContainer");
	frameRate(FPS);
	pixelDensity(1);
}

var ballA = new BallA(10, 100);
var ballB = new BallB(15, 150);

function draw() {
	resizeCanvas($("aside").width(), windowHeight);
	background("#f1f1f1");

	const CENTER = { x: canvas.width / 2, y: canvas.height / 2 }
	translate(CENTER.x, CENTER.y);
	stroke(26);
	strokeWeight(6);

	// ORIGIN
	ellipse(0, 0, 10, 10);

	// DRAW BALL A AND B
	ballA.draw();
	ballB.draw(ballA.xPosition, ballA.yPosition);

	// TRAILS
	const isTrailEnabled = $("#trails").is(":checked");
	if (isTrailEnabled) drawTrails($("#trailColor").val());

	const isDampingEnabled = $("#damping").is(":checked")
	if (isDampingEnabled) {
		ballA.angularVelocity *= 0.9999;
		ballB.angularVelocity *= 0.9999;
	}

	computeAngularVelocity(ballA, ballB);
}
