// import InputHandler from "./input.js";
import { FireSkull, Ghost } from "./enemies.js";
import InputHandler from "./input-2.js";
import Player from "./player.js";
import UI from "./ui.js";

window.addEventListener("load", () => {
	const canvas = document.getElementById("canvas");
	const ctx = canvas.getContext("2d");
	// canvas.width = 960;
	// canvas.height = 540;
	canvas.width = 800;
	canvas.height = 400;

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
			// Player
			this.player = new Player(this);
			this.input = new InputHandler();
			this.player.currentState = this.player.states[0];
			this.player.currentState.enter();
			// Enemies
			this.enemies = []; // Array to hold all enemies on screen
			this.enemyTimer = 0; // will be increased by delta time to spawn enemy
			this.enemyInterval = 2000; // enemy spawns in ms
			// UI
			this.ui = new UI(this);
			this.score = 0;
			this.fontColor = "black";
			this.lives = 3;
			this.floatingMessages = [];
		}
		// Updating drawn items
		update(deltaTime) {
			// Enemeis
			if (this.enemyTimer > this.enemyInterval) {
				this.addEnemy();
				this.enemyTimer = 0;
			} else {
				this.enemyTimer += deltaTime;
			}
			this.enemies.forEach((enemy) => enemy.update(deltaTime));
			this.enemies = this.enemies.filter(
				(enemy) => !enemy.markedForDeletion
			); // remove enemies
			// Player
			this.player.update(this.input.lastKey, deltaTime);
		}
		// Using this method we will draw all things and only use one call in the animate function
		draw(context) {
			this.enemies.forEach((enemy) => enemy.draw(context));
			this.player.draw(context);
			this.ui.draw(context);
		}
		addEnemy() {
			this.enemies.push(new FireSkull(this));
			if (this.score > 5) {
				this.enemies.push(new Ghost(this));
			}
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
		// Draw onto canvas
		game.update(deltaTime);
		game.draw(ctx);

		// Call loop
		requestAnimationFrame(animate);
	}

	animate(0);
});
