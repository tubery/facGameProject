import { FireSkull, Ghost } from "./enemies.js";
import { Nightmare } from "./enemiesLeft.js";
import InputHandler from "./input-2.js";
import Player from "./player.js";
import UI from "./ui.js";

window.addEventListener("load", () => {
	const canvas = document.getElementById("canvas");
	const ctx = canvas.getContext("2d");
	canvas.width = 960;
	canvas.height = 540;

	// Main game class
	// Game object will be passed to other files so they have access to properties via keyword "this"
	class Game {
		constructor(width, height) {
			// Base
			this.width = width;
			this.height = height;
			// Game speed
			this.speed = 0;
			this.maxSpeed = 4;
			// Background
			this.background = document.getElementById("background");
			this.groundMargin = 100;
			// Player
			this.player = new Player(this);
			this.input = new InputHandler(this);
			this.player.currentState = this.player.states[0];
			this.player.currentState.enter();
			// Enemies
			this.enemies = []; // Array to hold all enemies on screen
			this.enemyTimer = 0; // will be increased by delta time to spawn enemy
			this.enemyInterval = 2000; // enemy spawns in ms
			// UI
			this.ui = new UI(this);
			this.score = 0;
			this.fontColor = "white";
			this.lives = 3;
			this.floatingMessages = [];
			this.difficulty = 1;
			// Collision animations
			this.collisions = [];
			// GameOver
			this.gameOver = false;
			this.winningScore = 40;
		}
		// Updating drawn items
		update(deltaTime) {
			// Game difficulty changes
			if (this.score >= 10 && this.score < 20) {
				this.speed = 1;
				this.difficulty = 2;
			} else if (this.score >= 20 && this.score < 30) {
				this.speed = 2;
				this.difficulty = 3;
			} else if (this.score >= 30 && this.score < 40) {
				this.speed = 3;
				this.difficulty = 4;
			} else if (this.score < 10) {
				this.speed = 0;
				this.difficulty = 1;
			}
			// Enemeis
			if (this.enemyTimer > this.enemyInterval) {
				this.addEnemy();
				this.enemyTimer = 0;
			} else {
				this.enemyTimer += deltaTime;
			}
			this.enemies.forEach((enemy) => enemy.update(deltaTime));
			// Collision
			this.collisions.forEach((object) => {
				object.update(deltaTime);
			});
			// Player
			this.player.update(this.input.lastKey, deltaTime);

			// remove enemies
			this.enemies = this.enemies.filter(
				(enemy) => !enemy.markedForDeletion
			);
		}
		// Using this method we will draw all things and only use one call in the animate function
		draw(context) {
			this.enemies.forEach((enemy) => enemy.draw(context));
			this.collisions.forEach((collision) => collision.draw(context));
			this.player.draw(context);
			this.ui.draw(context);
		}
		addEnemy() {
			this.enemies.push(new FireSkull(this));
			if (this.score > 10) {
				this.enemies.push(new Ghost(this));
			}
			if (this.score > 20) {
				this.enemies.push(new Nightmare(this));
			}
		}
		restart() {
			this.player = new Player(this);
			this.enemies = [];
			this.score = 0;
			this.gameOver = false;
			this.lives = 3;
			animate(0);
		}
	}

	// Initilizing
	const game = new Game(canvas.width, canvas.height);
	let lastTime = 0;

	function animate(timeStamp) {
		// Tie game to certain speed to keep consistant across machines
		let deltaTime = timeStamp - lastTime;
		lastTime = timeStamp;
		// Clear frame on every draw
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.drawImage(game.background, 0, 0, canvas.width, canvas.height);
		// Draw onto canvas
		game.update(deltaTime);
		game.draw(ctx);

		// Call loop
		if (!game.gameOver) {
			requestAnimationFrame(animate);
		}
	}

	animate(0);
});
