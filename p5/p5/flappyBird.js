//let wartosc = 0;
//function buttonPress(){
//	x++;
//	document.getElementById('pog').innerHTML = x;
//	
//}

let player;
let pipes = [];
let dead;
let points;
let timer;
let afterDeathTimer;



function buttonPress() {
	if(!dead){
		player.move();
	}
}


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function keyPressed() {
  if (keyCode === 82) {
    setup();
  } else if(keyCode === 32) {
	  buttonPress();
  }
}

function setup(){
	createCanvas(600, 400);
	player = new Square();
	pipes = [];
	noStroke();
	textSize(width / 8);
	textAlign(CENTER, CENTER);
	points = 0;
	document.getElementById('points').innerHTML = "points: " + points;
	timer = 80;
	afterDeathTimer = 0;
	dead = false;
	
}

function draw() {
	
	if(dead) {
		if(afterDeathTimer > 90) {
			fill('rgba(0, 0, 0, 0.075)');
			rect(0, 0, width, height);
			fill(200);
			text("GAME OVER", width/2, height/2);
		} else {
			afterDeathTimer++;
			background(200);
			player.draw();
			player.update();
		}
		
	} else {
		background(200);
		player.draw();
		player.update();
	}
	
	
	
	
	
	for(let i = 0; i < pipes.length; i++) {
		pipes[i].draw();
		pipes[i].update();
	}
	
	if(!dead){
		
		timer += 1;
	
		if(timer > 75) {
			pipes.push(new Pipe(getRandomInt(0, 300*400/height), getRandomInt(150*400/height, 150*400/height), getRandomInt(0, 300*400/height)));
			timer = 0;
		}
	}
	
	
	
	//wartosc = player.x;
	//document.getElementById('pog').innerHTML = wartosc;
	//document.getElementById('pog').innerHTML = Math.floor(millis()/1000);
}

class Square {
	constructor(){
		this.x = 100;
		this.y = height/2;
		this.v = 0;
		this.a = 0.15;
		this.size = 25;
	}
	
	move() {
		this.v = -3;
	}
	
	update() {
		this.y += this.v;
		this.v += this.a;
		if(this.y > height-this.size) {
			this.y = height-this.size;
			this.v = 0;
		}
		
		if(this.y < 0) {
			this.y = 0;
			this.v = 0;
		}
	}
	
	draw() {
		fill(255, 0, 0);
		rect(this.x, this.y, this.size, this.size);
	}
	
	
	
}

class Pipe {
	constructor(y, empty, size){
		this.y = y;
		this.empty = empty
		this.x = width+25;
		this.size = size;
		this.passed = false;
		this.hasCollided = false;
	}
	
	isColliding(player) {
		if(player.x >= this.x && player.x <= this.x+30) {
			if((player.y <= this.size && player.y >= this.empty) || (player.y + player.size >= this.size+this.empty && player.y + player.size <= 400)) {
				return true;
			}
		}
	}
	
	addPoint() {
		points++;
		document.getElementById('points').innerHTML = "points: " + points;
	}
	
	update() {
		this.x -= 5;
		if(this.isColliding(player)) {
			this.hasCollided = true;
			dead = true;
			player.v = 0;	
		}
		
		if(!dead && this.x < 100 && !this.passed) {
			this.addPoint();
			this.passed = true;
		}
	}
	
	draw() {
		if(!this.hasCollided) {
			fill(0, 255, 0);
		} else {
			fill(200, 70, 70);
		}
		rect(this.x, 0, 30, this.size);
		rect(this.x, this.size+this.empty, 30, 400-(this.size+this.empty));
	}
	
	destroy() {
		for(let i = 0; i < pipes.length; i++) {
			//pipes[i] = pipes[i+1];
			pipes.shift();
		}

	}
	
}