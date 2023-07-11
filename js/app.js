// import InputHandler from "./input.js";
import InputHandler from "./input-2.js";
import Player from "./player.js";

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
			this.background;
			// Player
			this.player = new Player(this);
			this.input = new InputHandler();
			this.player.currentState = this.player.states[0];
			this.player.currentState.enter();
		}
		// Updating drawn items
		update(deltaTime) {
			this.player.update(this.input.lastKey, deltaTime);
		}
		// Using this method we will draw all things and only use one call in the animate function
		draw(context) {
			this.player.draw(context);
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
