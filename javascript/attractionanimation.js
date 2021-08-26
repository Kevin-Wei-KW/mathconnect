"use strict";
var width = document.getElementById("banner2").offsetWidth;
var height = document.getElementById("banner2").offsetHeight;
var scrollpos = document.getElementById("big2").offsetTop;
var cl = [];
var mass = 100;
var genamount = 10;
var cmass = 5000000;
var lifeduration = 350;
var math = ["×", "+", "-", "%", "÷", "𝜽", "𝚺", "𝜱", "𝝅", "∫", "0", "42", "e", "∞", "f(x)", "x", "=", "γ", "√", "μ", "y", "( )", "!", "≠", "Δ", "⌊x⌋", "(f∘g)", "σ", "∴", "ε", "y'", "∮", "≥", "≈", "≤", "ℂ", "ℕ", "ℚ", "ℝ", "ℤ", "Γ", "λ", "[ ]", "{ }", "0"];
var Active = true;
var canvas = document.getElementById('orbit'),
    c2 = canvas.getContext('2d'),
    width = canvas.width = width,
    height = canvas.height = height;

window.addEventListener('resize', function(evt) {
    scrollpos = document.getElementById("big2").offsetTop;
    width = document.getElementById("banner2").offsetWidth;
    height = document.getElementById("banner2").offsetHeight;
    canvas.width = width,
        canvas.height = height;
    cpos = new Vector2D(canvas.width / 2, canvas.height / 2);

});
window.addEventListener("scroll", function(event) {
    var Y = window.scrollY;
    var biscrollpos = document.getElementById("big2").offsetTop;
    Active = ((Y >= biscrollpos - 500) && (Y <= biscrollpos + window.height + height));

});

class Vector2D {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(vect) {
        return (new Vector2D(this.x + vect.x, this.y + vect.y));
    }

    sub(vect) {
        return (new Vector2D(this.x - vect.x, this.y - vect.y));
    }
    mult(a) {
        return (new Vector2D(this.x * a, this.y * a));
    }
    dot(vect) {
        return this.x * vect.x + this.y * vect.y;
    }
    mag() {
        return Math.sqrt((this.x * this.x) + (this.y * this.y));
    }
    magsqr() {
        return (this.x * this.x) + (this.y * this.y);
    }
    normalize() {
        this.mag = Math.sqrt((this.x * this.x) + (this.y * this.y));
        return (new Vector2D((this.x / this.mag), (this.y / this.mag)))
    }
}
var cpos = new Vector2D(canvas.width / 2, canvas.height / 2);
class circle {
    constructor(list, s, l, pos, vel, mass, radius) {
        this.sym = s;
        this.life = l;
        this.list = list;
        this.list.push(this);
        this.pos = pos;
        this.vel = vel;
        this.mass = mass;
        this.radius = radius;
        this.prevpos = this.pos;
        this.force = new Vector2D(0, 0);
        this.c2 = canvas.getContext("2d");
    }

    velocity(v) {
        this.pos = this.pos.add(v);
    }

    accelerate(a) {
        this.vel = this.vel.add(a);
    }
    gravityinteract() {

        this.dx = this.pos.sub(cpos);
        this.dxmsqr = this.dx.magsqr();

        if (this.dxmsqr > (this.radius + 20) * (this.radius + 20)) {
            this.dxnorm = this.dx.normalize();
            this.a = this.dxnorm.mult(-0.001 * cmass / this.dxmsqr);
            this.acceleration = this.acceleration.add(this.a)
        }
        if (this.dxmsqr < 60 * 60) {
            this.vel = this.vel.mult(0.9);
            var index = this.list.indexOf(this);
            if (index > -1) {
                this.list.splice(index, 1);
            }
        }
    }

    updateCircle() {
        if (this.life > lifeduration) {
            var index = this.list.indexOf(this);
            if (index > -1) {
                this.list.splice(index, 1);
            }

        }
        this.life++;
        this.acceleration = new Vector2D(0, 0);
        this.gravityinteract();
        this.accelerate(this.acceleration);
        this.velocity(this.vel);

    }

    draw() {
        this.opacity = (lifeduration - this.life) / lifeduration;
        this.c2.fillStyle = "rgba(255,255,255," + this.opacity + ")";
        this.c2.strokeStyle = "rgba(255,255,255," + this.opacity + ")";
        this.c2.font = this.radius * 5 + "px Times New Roman";
        this.c2.fillText(this.sym, this.pos.x - this.radius * 2.5, this.pos.y + this.radius * 2.5);
    }

}

function clear2() {
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
}

function generate2() {
    if (Active) {
        if (cl.length < (height + width) / 100) {
            for (let i = 0; i < 2; i++) {
                let size = Math.random() * 10 + 5;
                let sign = Math.random() < 0.5 ? -1 : 1;
                let sign2 = Math.random() < 0.5 ? -1 : 1;
                let vell = new Vector2D(2 * sign * Math.random(), 2 * sign * Math.random());
                let s = math[Math.floor(Math.random() * math.length)]
                let pos = new Vector2D(canvas.width / 2 + sign * canvas.height / 2.5 * (Math.random() + 1), canvas.height / 2 + sign2 * canvas.height / 2.5 * (Math.random() + 1));
                new circle(cl, s, 0, pos, vell, mass, size);
            }
        }
    }
}
var gen = setInterval(generate2, 400);

function animate2() {
    if (Active) {
        clear2();
        for (var circ of cl) {
            circ.updateCircle();
            circ.draw();
        }
    }

    window.requestAnimationFrame(animate2);


}
window.requestAnimationFrame(animate2);