import {
	AttackLeft,
	AttackLeft2,
	AttackLeft3,
	AttackRight,
	AttackRight2,
	AttackRight3,
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
} from "./playerStatesTemp.js";

export default class Player {
	constructor(game) {
		this.game = game;
		// Sprite width and height
		this.width = 160;
		this.height = 111;
		// Player position
		this.x = this.game.width / 2 - this.width;
		this.y = this.game.height - this.height;
		// Weight / Gravity
		this.vy = 0; // vy stands for velocity y axis
		this.weight = 2.5;
		// PNG sprite sheet / animations
		// this.image = playerIdle;
		this.image = playerIdle2;
		this.frameX = 0;
		this.frameY = 0;
		this.maxFrame = 8;
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
			new AttackRight2(this.game),
			new AttackRight3(this.game),
			new AttackLeft2(this.game),
			new AttackLeft3(this.game),
		];
		this.currentState = this.states[0];
		this.leftSide = false;
		this.frameXLeft;
		// Hitbox
		// Default
		this.hitboxWidth = 30;
		this.hitboxHeight = 60;
		this.hitboxX = this.x + this.width / 2 - this.hitboxWidth / 2;
		this.hitboxY = this.y + this.height / 2 - this.hitboxHeight / 6;
	}
	// Change hitbox for attacks
	updateHitbox() {
		this.hitboxWidth = 30;
		this.hitboxHeight = 60;
		this.hitboxX = this.x + this.width / 2 - this.hitboxWidth / 2;
		this.hitboxY = this.y + this.height / 2 - this.hitboxHeight / 6;
	}
	update(input, deltaTime) {
		this.checkCollision();
		this.updateHitbox();

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
		context.strokeRect(
			this.hitboxX,
			this.hitboxY,
			this.hitboxWidth,
			this.hitboxHeight
		);
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
				enemy.x < this.hitboxX + this.hitboxWidth &&
				enemy.x + enemy.width > this.hitboxX &&
				enemy.y < this.hitboxY + this.hitboxHeight &&
				enemy.y + enemy.height > this.hitboxY
			) {
				enemy.markedForDeletion = true;
				// Insert collision animation here
				// Player in attack animation increase points
				if (
					this.currentState === this.states[8] ||
					this.currentState === this.states[9] ||
					this.currentState === this.states[12] ||
					this.currentState === this.states[13] ||
					this.currentState === this.states[14] ||
					this.currentState === this.states[15]
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
