
const print = console.log;
var w = document.getElementById("banner").offsetWidth;
var h = document.getElementById("banner").offsetHeight;
var math = ["×", "+", "-", "%", "÷", "𝜽", "𝚺", "𝜱", "𝝅", "∫", "0", "42", "e", "∞", "f(x)", "x", "=", "γ", "√", "μ", "y", "( )", "!","≠","Δ","⌊x⌋","(f∘g)","σ","∴","ε","y'","∮","≥","≈","≤","ℂ","ℕ","ℚ","ℝ","ℤ","Γ","λ","[ ]","{ }","0"];
var particlelist = [];
var can = document.getElementById('background'),
	c = can.getContext('2d'),
	width = can.width = w,
	height = can.height = h;
var lastCalledTime;
var fps;
var prevfps = 100;
var maxlength = (w + h) * 15;
var repulse = (w + h) * 10;
var active = true;
window.addEventListener('resize', function (event) {
	w = document.getElementById("banner").offsetWidth;
	h = document.getElementById("banner").offsetHeight;
	width = can.width = w,
	height = can.height = h;
	maxlength = (w + h) * 15;
	repulse = (w + h) * 10;
});
window.addEventListener("scroll", function (event) {
	var y = window.scrollY;
	active = (y <= h);

});
var particle = {
	x: null,
	y: null,
	vx: null,
	vy: null,
	type: null
}

function getMousePos(c, evt) {
	var rect = can.getBoundingClientRect();
	return {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top
	};
}
var mousepos = { x: null, y: null }
can.addEventListener("mousemove", function (evt) {
	mousepos = getMousePos(can, evt);
}, false);

can.addEventListener("mousedown", function (evt) {
	let  sign = Math.random() < 0.5 ? -1 : 1;
	let sign2 = Math.random() < 0.5 ? -1 : 1;
	let p = Object.create(particle);
	p.x = mousepos.x
	p.y = mousepos.y;
	p.vx = Math.random() * 0.8 * sign;
	p.vy = Math.random() * 0.8 * sign2;
	p.type = math[Math.floor(Math.random() * math.length)];
	particlelist.push(p)
	

}, false);


function requestAnimFrame() {

	if (!lastCalledTime) {
		lastCalledTime = Date.now();
		fps = 0;
		return;
	}
	let delta = (Date.now() - lastCalledTime) / 1000;
	lastCalledTime = Date.now();
	fps = 1 / delta;
}

function generate() {
	let sign = Math.random() < 0.5 ? -1 : 1;
	let sign2 = Math.random() < 0.5 ? -1 : 1;
	let p = Object.create(particle);
	p.x = width * Math.random();
	p.y = height * Math.random();
	p.vx = Math.random() * 1.2 * sign;
	p.vy = Math.random() * 1.2 * sign2;
	p.type = math[Math.floor(Math.random() * math.length)];
	particlelist.push(p)
}
for (let i = 0; i < Math.round((w + h) * 0.03); i++) {
	generate();
}
requestAnimFrame();


function animate() {
	c.font = "30px Times New Roman";
c.fillStyle = "rgba(255,255,255,0.85)";
	if (active) {
		requestAnimFrame();
		can.getContext("2d").clearRect(0, 0, can.width, can.height);
		for (var p of particlelist) {
			var posdiffx = mousepos.x - p.x;
			var posdiffy = mousepos.y - p.y;
			var mag = posdiffx * posdiffx + posdiffy * posdiffy
			if (mag < repulse) {
				p.x = p.x + p.vx / Math.abs(p.vx) * 15 * (repulse - mag) / repulse;
				p.y = p.y - p.vy / Math.abs(p.vy) * 15 * (repulse - mag) / repulse;
			}
			p.x = p.x + p.vx;
			p.y = p.y + p.vy;

			if (p.x >= can.width) {
				p.x = can.width;
				p.vx = p.vx * -1;
			} if (p.x <= 0) {
				p.x = 0;
				p.vx = p.vx * -1;
			} if (p.y >= can.height) {
				p.y = can.height;
				p.vy = p.vy * -1;
			} if (p.y <= 0) {
				p.y = 0;
				p.vy = p.vy * -1;
			}

			for (var p1 of particlelist) {
				if (p1 != p) {
					var length = ((p1.y - p.y) * (p1.y - p.y) + (p1.x - p.x) * (p1.x - p.x))
					if (length < maxlength) {
						let color = "rgba(255,255,255," + (maxlength - length) / maxlength * 0.5 + ")";
						c.strokeStyle = color;
						c.lineWidth = (maxlength - length) / maxlength;
						c.beginPath();
						c.moveTo(p.x, p.y);
						c.lineTo(p1.x, p1.y);
						c.stroke();
					}
				}
			}

			c.fillText(p.type, p.x - 10, p.y + 10);
		}
		if (fps < 16 && prevfps < 16) {
			particlelist.shift();
		}
		prevfps = fps;
	}
	window.requestAnimationFrame(animate);
}
window.requestAnimationFrame(animate);




