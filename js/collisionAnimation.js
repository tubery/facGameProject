export default class CollisionAnimation {
	constructor(game, x, y) {
		this.game = game;
		this.image = slashHit;
		this.spriteWidth = 41;
		this.spriteHeight = 36;
		this.sizeModifier = Math.random() + 2; // Vary each collision
		this.width = this.spriteWidth * this.sizeModifier;
		this.height = this.spriteHeight * this.sizeModifier;
		this.x = x - this.width * 0.5;
		this.y = y - this.height * 0.5;
		this.frameX = 0;
		this.frameY = 0;
		this.maxFrame = 3;
		this.markedForDeletion = false;
		this.fps = Math.random() * 10 + 5; // Vary length of amimation
		this.frameTimer = 0;
		this.frameInterval = 1000 / this.fps;
	}
	update(deltaTime) {
		this.x -= this.game.speed;
		if (this.frameTimer > this.frameInterval) {
			this.frameX++;
			this.frameTimer = 0;
		} else {
			this.frameTimer += deltaTime;
		}
		if (this.frameX > this.maxFrame) {
			this.markedForDeletion = true;
		}
	}
	draw(context) {
		context.drawImage(
			this.image,
			this.frameX * this.spriteWidth,
			this.frameY,
			this.spriteWidth,
			this.spriteHeight,
			this.x,
			this.y,
			this.width,
			this.height
		);
	}
}
