// All possible states
const states = {
	IDLE_RIGHT: 0,
	IDLE_LEFT: 1,
	RUNNING_RIGHT: 2,
	RUNNING_LEFT: 3,
	JUMP_RIGHT: 4,
	JUMP_LEFT: 5,
	FALL_RIGHT: 6,
	FALL_LEFT: 7,
	ATTACK_RIGHT: 8,
	ATTACK_LEFT: 9,
	HURT_RIGHT: 10,
	HURT_LEFT: 11,
	JUMP_ATTACK_RIGHT: 12,
	JUMP_ATTACK_LEFT: 13,
};

class State {
	// Assigning state using enum
	constructor(state, game) {
		this.state = state;
		this.game = game;
	}
}

export class IdleRight extends State {
	constructor(game) {
		super("IDLE_RIGHT");
		this.game = game;
	}
	enter() {
		this.game.player.width = 38; // Sprite width
		this.game.player.height = 48; // Sprite height
		this.game.player.image = playerIdle; // Change sprite sheets
		this.game.player.frameX = 0;
		this.game.player.maxFrame = 3; // 4 frames starting from count 0
		this.game.player.speed = 0;
	}
	// Possible change states from this currently
	handleInput(input) {
		if (input === "PRESS right") {
			this.game.player.setState(states.RUNNING_RIGHT, 2);
		} else if (input === "PRESS left") {
			this.game.player.setState(states.RUNNING_LEFT, 2);
		} else if (input === "PRESS up") {
			this.game.player.setState(states.JUMP_RIGHT, 2);
		}
	}
}
export class IdleLeft extends State {
	constructor(game) {
		super("IDLE_LEFT");
		this.game = game;
	}
	enter() {
		this.game.player.width = 38;
		this.game.player.height = 48;
		this.game.player.image = playerIdleLeft;
		this.game.player.frameX = 0;
		this.game.player.maxFrame = 3;
		this.game.player.speed = 0;
	}
	handleInput(input) {
		if (input === "PRESS right") {
			this.game.player.setState(states.RUNNING_RIGHT, 2);
		} else if (input === "PRESS left") {
			this.game.player.setState(states.RUNNING_LEFT, 2);
		} else if (input === "PRESS up") {
			this.game.player.setState(states.JUMP_LEFT, 2);
		}
	}
}
export class RunningRight extends State {
	constructor(game) {
		super("RUNNING_RIGHT");
		this.game = game;
	}
	enter() {
		this.game.player.width = 66;
		this.game.player.height = 48;
		this.game.player.image = playerRun;
		this.game.player.frameX = 0;
		this.game.player.maxFrame = 10;
		this.game.player.speed = this.game.player.maxSpeed;
	}
	handleInput(input) {
		if (input === "RELEASE right") {
			this.game.player.setState(states.IDLE_RIGHT, 0);
		} else if (input === "PRESS left") {
			this.game.player.setState(states.RUNNING_LEFT, 2);
		} else if (input === "PRESS up") {
			this.game.player.setState(states.JUMP_RIGHT, 2);
		}
	}
}
export class RunningLeft extends State {
	constructor(game) {
		super("RUNNING_LEFT");
		this.game = game;
	}
	enter() {
		this.game.player.width = 66;
		this.game.player.height = 48;
		this.game.player.image = playerRunLeft;
		this.game.player.frameX = 0;
		this.game.player.maxFrame = 10;
		this.game.player.speed = -this.game.player.maxSpeed;
	}
	handleInput(input) {
		if (input === "RELEASE left") {
			this.game.player.setState(states.IDLE_LEFT, 0);
		} else if (input === "PRESS right") {
			this.game.player.setState(states.RUNNING_RIGHT, 2);
		} else if (input === "PRESS up") {
			this.game.player.setState(states.JUMP_LEFT, 2);
		}
	}
}
export class JumpRight extends State {
	constructor(game) {
		super("JUMP_RIGHT");
		this.game = game;
	}
	enter() {
		this.game.player.width = 61;
		this.game.player.height = 77;
		this.game.player.image = document.getElementById("playerJump");
		this.game.player.frameX = 0;
		this.game.player.maxFrame = 0;
		if (this.game.player.onGround()) {
			this.game.player.vy -= 30;
		}
		this.game.player.speed = this.game.player.maxSpeed * 0.8; // slow air movement
	}
	handleInput(input) {
		// if (input === "PRESS left") {
		// 	this.game.player.setState(states.JUMP_LEFT, 0);
		// } else if (input === "PRESS right") {
		// 	this.game.player.setState(states.RUNNING_RIGHT, 2);
		// }
		// After peak of jump switch to falling right
		if (this.game.player.vy > 0) {
			this.game.player.setState(states.FALL_RIGHT, 2);
		}
	}
}
export class JumpLeft extends State {
	constructor(game) {
		super("JUMP_LEFT");
		this.game = game;
	}
	enter() {
		this.game.player.width = 61;
		this.game.player.height = 77;
		this.game.player.image = playerJumpLeft;
		this.game.player.frameX = 0;
		this.game.player.maxFrame = 0;
		if (this.game.player.onGround()) {
			this.game.player.vy -= 30;
		}
		this.game.player.speed = -this.game.player.maxSpeed * 0.8; // slow air movement
	}
	handleInput(input) {
		// if (input === "PRESS left") {
		// 	this.game.player.setState(states.JUMP_LEFT, 0);
		// } else if (input === "PRESS right") {
		// 	this.game.player.setState(states.RUNNING_RIGHT, 2);
		// }
		if (this.game.player.vy > 0) {
			this.game.player.setState(states.FALL_LEFT, 2);
		}
	}
}
export class FallingRight extends State {
	constructor(game) {
		super("FALL_RIGHT");
		this.game = game;
	}
	enter() {
		this.game.player.width = 61;
		this.game.player.height = 77;
		this.game.player.image = playerJump;
		this.game.player.frameX = 0;
		this.game.player.maxFrame = 0;
	}
	handleInput(input) {
		// if (input === "PRESS left") {
		// 	this.game.player.setState(states.JUMP_LEFT, 0);
		// } else if (input === "PRESS right") {
		// 	this.game.player.setState(states.RUNNING_RIGHT, 2);
		// }
		if (this.game.player.onGround() && input === "PRESS right") {
			this.game.player.setState(states.RUNNING_RIGHT, 2);
		} else if (this.game.player.onGround()) {
			this.game.player.setState(states.IDLE_RIGHT, 2);
		}
	}
}
export class FallingLeft extends State {
	constructor(game) {
		super("FALL_LEFT");
		this.game = game;
	}
	enter() {
		this.game.player.width = 61;
		this.game.player.height = 77;
		this.game.player.image = playerJumpLeft;
		this.game.player.frameX = 0;
		this.game.player.maxFrame = 0;
	}
	handleInput(input) {
		// if (input === "PRESS left") {
		// 	this.game.player.setState(states.JUMP_LEFT, 0);
		// } else if (input === "PRESS right") {
		// 	this.game.player.setState(states.RUNNING_RIGHT, 2);
		// }
		if (this.game.player.onGround() && input === "PRESS left") {
			this.game.player.setState(states.RUNNING_LEFT, 2);
		} else if (this.game.player.onGround()) {
			this.game.player.setState(states.IDLE_LEFT, 2);
		}
	}
}
