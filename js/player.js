import {
	AttackLeft,
	AttackRight,
	FallingLeft,
	FallingRight,
	HurtLeft,
	HurtRight,
	IdleLeft,
	IdleRight,
	JumpLeft,
	JumpRight,
	RunningLeft,
	RunningRight,
} from "./playerStates-2.js";

export default class Player {
	constructor(game) {
		this.game = game;
		// Sprite width and height
		this.width = 38;
		this.height = 48;
		// Player position
		this.x = this.game.width / 2 - this.width;
		this.y = this.game.height - this.height;
		// Weight / Gravity
		this.vy = 0; // vy stands for velocity y axis
		this.weight = 2.5;
		// PNG sprite sheet / animations
		this.image = playerIdle;
		this.frameX = 0;
		this.frameY = 0;
		this.maxFrame;
		// Animation speed settings
		this.fps = 15;
		this.frameInterval = 1000 / this.fps;
		this.frameTimer = 0;
		// Movement speed
		this.speed = 0;
		this.maxSpeed = 10;
		// Player states
		this.states = [
			new IdleRight(this.game),
			new IdleLeft(this.game),
			new RunningRight(this.game),
			new RunningLeft(this.game),
			new JumpRight(this.game),
			new JumpLeft(this.game),
			new FallingRight(this.game),
			new FallingLeft(this.game),
			new AttackRight(this.game),
			new AttackLeft(this.game),
			new HurtRight(this.game),
			new HurtLeft(this.game),
		];
		this.currentState = this.states[0];
		this.leftSide = false;
		this.frameXLeft;
	}
	update(input, deltaTime) {
		this.checkCollision();

		// console.log(input);

		// Pass input to state
		this.currentState.handleInput(input);

		// Horizontal movement
		this.x += this.speed;

		// Check for boundry
		// Remove later possibly due to game size not finalized
		if (this.x < 0) {
			this.x = 0;
		}
		if (this.x > this.game.width - this.width) {
			this.x = this.game.width - this.width;
		}
		// Vertical movement
		this.y += this.vy;
		if (!this.onGround()) {
			this.vy += this.weight;
		} else {
			this.vy = 0;
		}

		// Sprite animation Idle
		// Using the delta time passed through from function animate we can tie animations to the time taken to serve frames as this is calculated per machine it it remains consistent

		// Increase the framer timer by delta time until it passes the interval telling the game its time to increase the frame for the sprite animation, if the animation is at the end restart the process
		if (this.frameTimer > this.frameInterval) {
			this.frameTimer = 0;
			// Account for left animations, go from right to left instead
			if (this.leftSide) {
				if (this.frameX > this.maxFrame) {
					this.frameX--;
				} else {
					this.frameX = this.frameXLeft;
				}
			} else {
				if (this.frameX < this.maxFrame) {
					this.frameX++;
				} else {
					this.frameX = 0;
				}
			}
		} else {
			this.frameTimer += deltaTime;
		}
	}
	draw(context) {
		// Hitbox
		context.strokeRect(this.x, this.y, this.width, this.height);
		context.drawImage(
			this.image, // Load image
			this.frameX * this.width, // X position on png file
			this.frameY, // Y position on png file
			this.width, // width we want to cut from file
			this.height, //height we want to cut from file
			this.x, // x position on canvas
			this.y, // y position on canvas
			this.width, // size of sprite, can scale if need
			this.height // size of sprite, can scale if need
		);
	}
	onGround() {
		return this.y >= this.game.height - this.height;
	}
	// Game speed may be redundant as back is not scrolling parallax
	setState(state, speed) {
		this.currentState = this.states[state];
		this.game.speed = this.game.maxSpeed * speed;
		this.currentState.enter();
	}
	// Collision
	checkCollision() {
		// Loop through all enemies and check for collision using algorithm
		this.game.enemies.forEach((enemy) => {
			if (
				enemy.x < this.x + this.width &&
				enemy.x + enemy.width > this.x &&
				enemy.y < this.y + this.height &&
				enemy.y + enemy.height > this.y
			) {
				enemy.markedForDeletion = true;
				// Insert collision animation here
				// Player in attack animation increase points
				if (
					this.currentState === this.states[8] ||
					this.currentState === this.states[9]
				) {
					this.game.score++;
					if (this.game.score % 10 === 0) {
						this.game.lives++;
					}
				} else {
					// Player gets hit reduce points
					this.setState(10, 0);
					this.game.lives--;
					this.game.score -= 3;
				}
			}
		});
	}
}
