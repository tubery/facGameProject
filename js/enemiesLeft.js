class Enemy {
	constructor() {
		this.frameX = 0;
		this.maxFrame = 0;
		this.frameY = 0;
		this.fps = 30;
		this.frameInterval = 10000 / this.fps;
		this.frameTimer = 0;
		this.markedForDeletion = false;
	}
	update(deltaTime) {
		this.x += this.speedX + this.game.speed;
		// Sprite animation
		if (this.frameTimer > this.frameInterval) {
			this.frameTimer = 0;
			if (this.frameX < this.maxFrame) {
				this.frameX++;
			} else {
				this.frameX = 0;
			}
		} else {
			this.frameTimer += deltaTime;
		}
		// Check if enemies off screen then mark for deletion
		if (this.x > this.game.width - this.width) {
			this.markedForDeletion = true;
		}
	}
	draw(context) {
		// Hitboxes
		// context.strokeRect(this.x, this.y, this.width, this.height);
		// Draw enemy
		context.drawImage(
			this.image,
			this.frameX * this.width,
			this.frameY,
			this.width,
			this.height,
			this.x,
			this.y,
			this.width,
			this.height
		);
	}
}

export class Nightmare extends Enemy {
	constructor(game) {
		super();
		this.game = game;
		this.width = 144;
		this.height = 96;
		this.x = -this.game.width;
		this.y = this.game.height - this.height - this.game.groundMargin;
		this.speedX = Math.random() * 3 + 1;
		this.speedY = 0;
		this.frameX = 0;
		this.maxFrame = 3;
		this.image = enemyNightmare;
	}
	update(deltaTime) {
		super.update(deltaTime);
	}
}
