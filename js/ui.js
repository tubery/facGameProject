export default class UI {
	constructor(game) {
		this.game = game;
		this.fontSize = 30;
		this.fontFamily = "Georgia";
		this.heartImage = heart;
	}
	draw(context) {
		context.font = this.fontSize + "px " + this.fontFamily;
		context.textAlign = "left";
		context.fillStyle = this.game.fontColor;
		// Text
		context.fillText(`Score: ${this.game.score}`, 20, 50);
		context.fillText(`Difficulty: ${this.game.difficulty}`, 20, 120);
		// Hearts
		for (let i = 0; i < this.game.lives; i++) {
			context.drawImage(this.heartImage, 30 * i + 20, 65, 25, 25);
		}

		// Game over
		if (this.game.gameOver) {
			context.textAlign = "center";
			context.font = this.fontSize * 1.2 + "px " + this.fontFamily;
			if (this.game.score > this.game.winningScore) {
				context.fillText(
					`You Win`,
					this.game.width * 0.5,
					this.game.height * 0.4
				);
				context.fillText(
					`Press enter to restart`,
					this.game.width * 0.5,
					this.game.height * 0.55
				);
			} else {
				context.fillText(
					`You Lose`,
					this.game.width * 0.5,
					this.game.height * 0.4
				);
				context.fillText(
					`Press enter to restart`,
					this.game.width * 0.5,
					this.game.height * 0.55
				);
			}
		}
	}
}
