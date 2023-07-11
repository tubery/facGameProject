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
		this.game.player.image = playerIdle; // Change sprite sheets
		this.game.player.frameX = 0;
		this.game.player.maxFrame = 3; // 4 frames starting from count 0
	}
	// Possible change states from this currently
	handleInput(input) {
		if (input.includes("ArrowLeft")) {
			this.game.player.setState(states.IDLE_LEFT, 1);
		}
	}
}
export class IdleLeft extends State {
	constructor(game) {
		super("IDLE_LEFT");
		this.game = game;
	}
	enter() {
		this.game.player.image = playerIdleLeft; // Change sprite sheets
		this.game.player.frameX = 0;
		this.game.player.maxFrame = 3; // 4 frames starting from count 0
	}
	// Possible change states from this currently
	handleInput(input) {
		if (input.includes("ArrowRight")) {
			this.game.player.setState(states.IDLE_RIGHT, 1);
		}
	}
}
