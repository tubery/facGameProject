export default class InputHandler {
	constructor(game) {
		this.game = game;
		this.lastKey = "";
		window.addEventListener("keydown", (e) => {
			switch (e.key) {
				case "ArrowLeft":
					this.lastKey = "PRESS left";
					break;
				case "ArrowUp":
					this.lastKey = "PRESS up";
					break;
				case "ArrowRight":
					this.lastKey = "PRESS right";
					break;
				case "ArrowDown":
					this.lastKey = "PRESS down";
					break;
				case " ":
					this.lastKey = "PRESS space";
				case "Enter":
					if (this.game.gameOver) {
						this.game.restart();
					}
					break;
			}
		});
		window.addEventListener("keyup", (e) => {
			switch (e.key) {
				case "ArrowLeft":
					this.lastKey = "RELEASE left";
					break;
				case "ArrowUp":
					this.lastKey = "RELEASE up";
					break;
				case "ArrowRight":
					this.lastKey = "RELEASE right";
					break;
				case "ArrowDown":
					this.lastKey = "RELEASE down";
					break;
				case " ":
					this.lastKey = "RELEASE space";
					break;
			}
		});
	}
}
