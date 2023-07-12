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

		for (let i = 0; i < this.game.lives; i++) {
			context.drawImage(this.heartImage, 30 * i + 20, 65, 25, 25);
		}
	}
}
