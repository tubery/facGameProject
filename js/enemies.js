class Enemy {
	constructor() {
		this.frameX = 0;
		this.maxFrame = 0;
		this.frameY = 0;
		this.fps = 15;
		this.frameInterval = 10000 / this.fps;
		this.frameTimer = 0;
		this.markedForDeletion = false;
	}
	update(deltaTime) {
		// this.x -= this.speedX + this.game.speed;
		this.x -= this.speedX;
		this.y -= this.speedY;
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
		if (this.x + this.width < 0) {
			this.markedForDeletion = true;
		}
	}
	draw(context) {
		// Hitboxes
		context.strokeRect(this.x, this.y, this.width, this.height);
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

export class FireSkull extends Enemy {
	constructor(game) {
		super();
		this.game = game;
		this.width = 96;
		this.height = 112;
		this.x = this.game.width;
		this.y = this.game.height * 0.6;
		this.speedX = Math.random() * 3 + 1;
		this.speedY = 0;
		this.maxFrame = 7;
		this.image = enemyFireSkull;
		this.angle = 0;
		// this.va = Math.random() * 0.1 + 0.1; // Velocity angle
		this.va = 0.05; // Velocity angle
		this.curve = Math.random() * 4;
	}
	update(deltaTime) {
		super.update(deltaTime);
		this.y += Math.sin(this.angle) * this.curve; // Sin wave movement
		this.angle += this.va; // Moves the chracter along sin wave
	}
}

export class Ghost extends Enemy {
	constructor(game) {
		super();
		this.game = game;
		this.width = 64;
		this.height = 80;
		this.x = Math.random() * this.game.width;
		this.y = Math.random() * this.game.height * 0.1;
		this.image = enemyGhost;
		this.speedX = 0;
		this.speedY = Math.random > 0.5 ? 1 : -1;
		this.maxFrame = 3;
	}
	update(deltaTime) {
		super.update(deltaTime);
		if (this.y > this.game.height - this.height) {
			this.speedY *= -1;
		}
		if (this.y < -this.height) {
			this.markedForDeletion = true;
		}
	}
}
