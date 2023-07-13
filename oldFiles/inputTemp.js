export default class InputHandler {
	constructor(game) {
		this.game = game;
		let keyArr = (this.keys = []);
		// Pressing down keys
		window.addEventListener("keydown", (e) => {
			const key = e.key;
			// Check for key press on these keys, push into arrow but only one instance of each key to keep track of keys
			if (
				(key === "ArrowUp" ||
					key === "ArrowRight" ||
					key === "ArrowDown" ||
					key === "ArrowLeft" ||
					key === " ") &&
				keyArr.indexOf(key) === -1
			) {
				keyArr.push(key);
			}
		});
		// Releasing keys
		window.addEventListener("keyup", (e) => {
			const key = e.key;
			// Same as above but removing key when released for responsive controls
			if (
				key === "ArrowUp" ||
				key === "ArrowRight" ||
				key === "ArrowDown" ||
				key === "ArrowLeft" ||
				key === " "
			) {
				keyArr.splice(keyArr.indexOf(key), 1);
			}
		});
	}
}
