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
	ATTACK_RIGHT_2: 12,
	ATTACK_RIGHT_3: 13,
	ATTACK_LEFT_2: 14,
	ATTACK_LEFT_3: 15,
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
		this.game.player.leftSide = false;
		this.game.player.width = 160; // Sprite width
		this.game.player.height = 111; // Sprite height
		this.game.player.image = playerIdle2; // Change sprite sheets
		this.game.player.speed = 0;
		this.game.player.frameX = 0;
		this.game.player.maxFrame = 7; // 4 frames starting from count 0
	}
	// Possible change states from this currently
	handleInput(input) {
		if (input === "PRESS right") {
			this.game.player.setState(states.RUNNING_RIGHT, 2);
		} else if (input === "PRESS left") {
			this.game.player.setState(states.RUNNING_LEFT, 2);
		} else if (input === "PRESS up") {
			this.game.player.setState(states.JUMP_RIGHT, 2);
		} else if (input === "PRESS space") {
			this.game.player.setState(states.ATTACK_RIGHT, 2);
		}
	}
}
export class IdleLeft extends State {
	constructor(game) {
		super("IDLE_LEFT");
		this.game = game;
	}
	enter() {
		this.game.player.leftSide = true;
		this.game.player.width = 160;
		this.game.player.height = 111;
		this.game.player.image = playerIdle2Left;
		this.game.player.speed = 0;
		this.game.player.frameX = 7;
		this.game.player.maxFrame = 0;
		this.game.player.frameXLeft = 7;
	}
	handleInput(input) {
		if (input === "PRESS right") {
			this.game.player.setState(states.RUNNING_RIGHT, 2);
		} else if (input === "PRESS left") {
			this.game.player.setState(states.RUNNING_LEFT, 2);
		} else if (input === "PRESS up") {
			this.game.player.setState(states.JUMP_LEFT, 2);
		} else if (input === "PRESS space") {
			this.game.player.setState(states.ATTACK_LEFT, 2);
		}
	}
}
export class RunningRight extends State {
	constructor(game) {
		super("RUNNING_RIGHT");
		this.game = game;
	}
	enter() {
		this.game.player.leftSide = false;
		this.game.player.width = 160;
		this.game.player.height = 111;
		this.game.player.image = playerRun2;
		this.game.player.speed = this.game.player.maxSpeed;
		this.game.player.frameX = 0;
		this.game.player.maxFrame = 7;
	}
	handleInput(input) {
		if (input === "RELEASE right") {
			this.game.player.setState(states.IDLE_RIGHT, 0);
		} else if (input === "PRESS left") {
			this.game.player.setState(states.RUNNING_LEFT, 2);
		} else if (input === "PRESS up") {
			this.game.player.setState(states.JUMP_RIGHT, 2);
		} else if (input === "PRESS space") {
			this.game.player.setState(states.ATTACK_RIGHT, 2);
		}
	}
}
export class RunningLeft extends State {
	constructor(game) {
		super("RUNNING_LEFT");
		this.game = game;
	}
	enter() {
		this.game.player.leftSide = true;
		this.game.player.width = 160;
		this.game.player.height = 111;
		this.game.player.image = playerRun2Left;
		this.game.player.speed = -this.game.player.maxSpeed;
		this.game.player.frameX = 7;
		this.game.player.maxFrame = 0;
		this.game.player.frameXLeft = 7;
	}
	handleInput(input) {
		if (input === "RELEASE left") {
			this.game.player.setState(states.IDLE_LEFT, 0);
		} else if (input === "PRESS right") {
			this.game.player.setState(states.RUNNING_RIGHT, 2);
		} else if (input === "PRESS up") {
			this.game.player.setState(states.JUMP_LEFT, 2);
		} else if (input === "PRESS space") {
			this.game.player.setState(states.ATTACK_LEFT, 2);
		}
	}
}
export class JumpRight extends State {
	constructor(game) {
		super("JUMP_RIGHT");
		this.game = game;
	}
	enter() {
		this.game.player.leftSide = false;
		this.game.player.width = 160;
		this.game.player.height = 111;
		this.game.player.image = playerJump2;
		this.game.player.frameX = 0;
		this.game.player.maxFrame = 1;
		if (this.game.player.onGround()) {
			this.game.player.vy -= 30;
		}
		this.game.player.speed = this.game.player.maxSpeed * 0.5; // slow air movement
	}
	handleInput(input) {
		// After peak of jump switch to falling right
		if (this.game.player.vy > 0) {
			this.game.player.setState(states.FALL_RIGHT, 2);
		} else if (input === "PRESS left") {
			this.game.player.setState(states.JUMP_LEFT, 2);
		} else if (input === "PRESS space") {
			this.game.player.setState(states.ATTACK_RIGHT_3, 2);
		}
	}
}
export class JumpLeft extends State {
	constructor(game) {
		super("JUMP_LEFT");
		this.game = game;
	}
	enter() {
		this.game.player.leftSide = true;
		this.game.player.width = 160;
		this.game.player.height = 111;
		this.game.player.image = playerJump2Left;
		this.game.player.frameX = 1;
		this.game.player.maxFrame = 0;
		this.game.player.frameXLeft = 1;
		if (this.game.player.onGround()) {
			this.game.player.vy -= 30;
		}
		this.game.player.speed = -this.game.player.maxSpeed * 0.5; // slow air movement
	}
	handleInput(input) {
		if (this.game.player.vy > 0) {
			this.game.player.setState(states.FALL_LEFT, 2);
		} else if (input === "PRESS right") {
			this.game.player.setState(states.JUMP_RIGHT, 2);
		} else if (input === "PRESS space") {
			this.game.player.setState(states.ATTACK_LEFT_3, 2);
		}
	}
}
export class FallingRight extends State {
	constructor(game) {
		super("FALL_RIGHT");
		this.game = game;
	}
	enter() {
		let newImage = new Image();
		newImage.src = "././assets/Medieval King Pack 2/Sprites/Fall.png";
		this.game.player.leftSide = false;
		this.game.player.width = 160;
		this.game.player.height = 111;
		// this.game.player.image = playerFall2;
		// this.game.player.image = playerJump2;
		this.game.player.image = newImage;
		this.game.player.frameX = 0;
		this.game.player.maxFrame = 1;
	}
	handleInput(input) {
		if (this.game.player.onGround() && input === "PRESS right") {
			this.game.player.setState(states.RUNNING_RIGHT, 2);
		} else if (this.game.player.onGround()) {
			this.game.player.setState(states.IDLE_RIGHT, 2);
		} else if (input === "PRESS left") {
			this.game.player.setState(states.JUMP_LEFT, 2);
		} else if (input === "PRESS space") {
			this.game.player.setState(states.ATTACK_RIGHT_3, 2);
		}
	}
}
export class FallingLeft extends State {
	constructor(game) {
		super("FALL_LEFT");
		this.game = game;
	}
	enter() {
		let newImage = new Image();
		newImage.src = "././assets/Medieval King Pack 2/Sprites/Left/Fall.png";
		this.game.player.leftSide = true;
		this.game.player.width = 160;
		this.game.player.height = 111;
		// this.game.player.image = playerFall2Left;
		this.game.player.image = newImage;
		this.game.player.frameX = 1;
		this.game.player.maxFrame = 0;
		this.game.player.frameXLeft = 1;
	}
	handleInput(input) {
		if (this.game.player.onGround() && input === "PRESS left") {
			this.game.player.setState(states.RUNNING_LEFT, 2);
		} else if (this.game.player.onGround()) {
			this.game.player.setState(states.IDLE_LEFT, 2);
		} else if (input === "PRESS right") {
			this.game.player.setState(states.JUMP_RIGHT, 2);
		} else if (input === "PRESS space") {
			this.game.player.setState(states.ATTACK_LEFT_3, 2);
		}
	}
}
export class AttackRight extends State {
	constructor(game) {
		super("ATTACK_RIGHT");
		this.game = game;
	}
	enter() {
		this.game.player.leftSide = false;
		this.game.player.width = 160;
		this.game.player.height = 111;
		this.game.player.image = playerAttack2;
		this.game.player.frameX = 0;
		this.game.player.maxFrame = 3;
		this.game.player.speed = this.game.player.maxSpeed * 0.3;
		// HITBOX
		this.game.player.hitboxWidth = 150;
		this.game.player.hitboxHeight = 65;
		this.game.player.hitboxX =
			this.game.player.x +
			this.game.player.width / 2 -
			this.game.player.hitboxWidth / 2.5;
		this.game.player.hitboxY =
			this.game.player.y +
			this.game.player.height / 2 -
			this.game.player.hitboxHeight / 6;
	}
	handleInput(input) {
		if (this.game.player.frameX === this.game.player.maxFrame) {
			if (input === "PRESS space") {
				this.game.player.setState(states.ATTACK_RIGHT_2, 2);
			} else {
				this.game.player.setState(states.IDLE_RIGHT, 2);
			}
		}
	}
}
export class AttackRight2 extends State {
	constructor(game) {
		super("ATTACK_RIGHT_2");
		this.game = game;
	}
	enter() {
		this.game.player.leftSide = false;
		this.game.player.width = 160;
		this.game.player.height = 111;
		this.game.player.image = playerAttack2_2nd;
		this.game.player.frameX = 0;
		this.game.player.maxFrame = 3;
		this.game.player.speed = this.game.player.maxSpeed * 0.3;
		// HITBOX
		this.game.player.hitboxWidth = 150;
		this.game.player.hitboxHeight = 65;
		this.game.player.hitboxX =
			this.game.player.x +
			this.game.player.width / 2 -
			this.game.player.hitboxWidth / 2.5;
		this.game.player.hitboxY =
			this.game.player.y +
			this.game.player.height / 2 -
			this.game.player.hitboxHeight / 6;
	}
	handleInput(input) {
		if (this.game.player.frameX === this.game.player.maxFrame) {
			if (input === "PRESS space") {
				this.game.player.setState(states.ATTACK_RIGHT_3, 2);
			} else {
				this.game.player.setState(states.IDLE_RIGHT, 2);
			}
		}
	}
}
export class AttackRight3 extends State {
	constructor(game) {
		super("ATTACK_RIGHT_3");
		this.game = game;
	}
	enter() {
		this.game.player.leftSide = false;
		this.game.player.width = 160;
		this.game.player.height = 111;
		this.game.player.image = playerAttack2_3rd;
		this.game.player.frameX = 0;
		this.game.player.maxFrame = 3;
		this.game.player.speed = this.game.player.maxSpeed * 0.3;
		// HITBOX
		this.game.player.hitboxWidth = this.game.player.width + 20;
		this.game.player.hitboxHeight = this.game.player.height + 30;
		this.game.player.hitboxX = this.game.player.x + 20;
		this.game.player.hitboxY = this.game.player.y - 30;
	}
	handleInput(input) {
		if (this.game.player.frameX === this.game.player.maxFrame) {
			this.game.player.setState(states.IDLE_RIGHT, 2);
		}
	}
}
export class AttackLeft extends State {
	constructor(game) {
		super("ATTACK_LEFT");
		this.game = game;
	}
	enter() {
		this.game.player.leftSide = true;
		this.game.player.width = 160;
		this.game.player.height = 111;
		this.game.player.image = playerAttack2Left;
		this.game.player.frameX = 3;
		this.game.player.maxFrame = 0;
		this.game.player.frameXLeft = 3;
		this.game.player.speed = -this.game.player.maxSpeed * 0.3;
		// HITBOX
		this.game.player.hitboxWidth = -150;
		this.game.player.hitboxHeight = 65;
		this.game.player.hitboxX =
			this.game.player.x +
			this.game.player.width / 2 -
			this.game.player.hitboxWidth / 2.5;
		this.game.player.hitboxY =
			this.game.player.y +
			this.game.player.height / 2 -
			this.game.player.hitboxHeight / 6;
	}
	handleInput(input) {
		if (this.game.player.frameX === this.game.player.maxFrame) {
			if (input === "PRESS space") {
				this.game.player.setState(states.ATTACK_LEFT_2, 2);
			} else {
				this.game.player.setState(states.IDLE_LEFT, 2);
			}
		}
	}
}
export class AttackLeft2 extends State {
	constructor(game) {
		super("ATTACK_LEFT_2");
		this.game = game;
	}
	enter() {
		this.game.player.leftSide = true;
		this.game.player.width = 160;
		this.game.player.height = 111;
		this.game.player.image = playerAttack2Left_2nd;
		this.game.player.frameX = 3;
		this.game.player.maxFrame = 0;
		this.game.player.frameXLeft = 3;
		this.game.player.speed = -this.game.player.maxSpeed * 0.3;
		// HITBOX
		this.game.player.hitboxWidth = -150;
		this.game.player.hitboxHeight = 65;
		this.game.player.hitboxX =
			this.game.player.x +
			this.game.player.width / 2 -
			this.game.player.hitboxWidth / 2.5;
		this.game.player.hitboxY =
			this.game.player.y +
			this.game.player.height / 2 -
			this.game.player.hitboxHeight / 6;
	}
	handleInput(input) {
		if (this.game.player.frameX === this.game.player.maxFrame) {
			if (input === "PRESS space") {
				this.game.player.setState(states.ATTACK_LEFT_3, 2);
			} else {
				this.game.player.setState(states.IDLE_LEFT, 2);
			}
		}
	}
}
export class AttackLeft3 extends State {
	constructor(game) {
		super("ATTACK_LEFT_3");
		this.game = game;
	}
	enter() {
		this.game.player.leftSide = true;
		this.game.player.width = 160;
		this.game.player.height = 111;
		this.game.player.image = playerAttack2Left_3rd;
		this.game.player.frameX = 3;
		this.game.player.maxFrame = 0;
		this.game.player.frameXLeft = 3;
		this.game.player.speed = -this.game.player.maxSpeed * 0.3;
		// HITBOX
		this.game.player.hitboxWidth = this.game.player.width + 20;
		this.game.player.hitboxHeight = this.game.player.height + 30;
		this.game.player.hitboxX = this.game.player.x - 30;
		this.game.player.hitboxY = this.game.player.y - 30;
	}
	handleInput(input) {
		if (this.game.player.frameX === this.game.player.maxFrame) {
			this.game.player.setState(states.IDLE_LEFT, 2);
		}
	}
}
export class HurtRight extends State {
	constructor(game) {
		super("HURT_RIGHT");
		this.game = game;
	}
	enter() {
		this.game.player.leftSide = false;
		this.game.player.width = 160;
		this.game.player.height = 111;
		this.game.player.image = playerHurt2;
		this.game.player.frameX = 0;
		this.game.player.maxFrame = 4;
		this.game.player.frameXLeft = 0;
		this.game.player.speed = 0;
	}
	handleInput(input) {
		if (this.game.player.frameX === this.game.player.maxFrame) {
			this.game.player.setState(states.IDLE_RIGHT, 2);
		}
	}
}
export class HurtLeft extends State {
	constructor(game) {
		super("HURT_LEFT");
		this.game = game;
	}
	enter() {
		this.game.player.leftSide = true;
		this.game.player.width = 160;
		this.game.player.height = 111;
		this.game.player.image = playerHurt2Left;
		this.game.player.frameX = 4;
		this.game.player.maxFrame = -1;
		this.game.player.frameXLeft = 4;
		this.game.player.speed = 0;
	}
	handleInput(input) {
		if (this.game.player.frameX === this.game.player.maxFrame) {
			this.game.player.setState(states.IDLE_LEFT, 2);
		}
	}
}
