export default class UI {
	constructor(game) {
		this.game = game;
		this.fontSize = 30;
		this.fontFamily = "Georgia";
	}
	draw(context) {
		// Shadow effect on text for readability
		context.fillStyle = "black";
		context.fillText(`Score: ${this.game.score}`, 23, 53);
		context.fillText(`Lives: ${this.game.lives}`, 23, 88);
		context.fillText(`Difficulty: ${this.game.difficulty}`, 23, 123);
		context.fillText(`Controls: ArrowKeys and SpaceBar`, 473, 53);

		context.font = this.fontSize + "px " + this.fontFamily;
		context.textAlign = "left";
		context.fillStyle = this.game.fontColor;
		// Text
		context.fillText(`Score: ${this.game.score}`, 20, 50);
		context.fillText(`Lives: ${this.game.lives}`, 20, 85);
		context.fillText(`Difficulty: ${this.game.difficulty}`, 20, 120);
		context.fillText(`Controls: ArrowKeys and SpaceBar`, 470, 50);

		// Game over
		if (this.game.gameOver) {
			context.textAlign = "center";
			context.font = this.fontSize * 1.2 + "px " + this.fontFamily;
			if (this.game.score >= this.game.winningScore) {
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
