/**
 * The Robot handler
 */
var Robot = function (startPosition, sprite, game, playerNumber) {
    //Create the robot sprite
    this.robot = game.create.sprite(sprite, 'fly', {regX:'center', regY:'center', x:startPosition[0], y:startPosition[1]});
    game.stage.addChild(this.robot);

    this.playerNumber = playerNumber;

    //Create the power bar
    switch (playerNumber) {
        case 1:
            var powerBarX = 32;
            var powerBarY = game.canvas.height - 32;
            this.leftKey = tine.keys.A;
            this.rightKey = tine.keys.D;
            this.sprintKey = tine.keys.SHIFT;
            this.jumpKey = tine.keys.W;
            break;
        case 2:
            var powerBarX = game.canvas.width - 48;
            var powerBarY = game.canvas.height - 32;
            this.leftKey = tine.keys.LEFT;
            this.rightKey = tine.keys.RIGHT;
            this.sprintKey = tine.keys.CTRL;
            this.jumpKey = tine.keys.UP;
            break;
    }

    this.bar1 = new tine.ProgressBar('green', 'white', tine.BOTTOM_TO_TOP, 415, 15);
    this.bar1.value = 100;
    this.bar1.x = powerBarX;
    this.bar1.y = powerBarY;
    game.stage.addChild(this.bar1);

    this.speedMultiplier = 1;
    this.degredationMultiplier = 1;

};

Robot.prototype.update = function(game) {

    if (game.keyboard.isDown(this.sprintKey)) {
        this.speedMultiplier       = ROBOT_SPRINT_MOVEMENT_MULTIPLIER;
        this.degredationMultiplier = ROBOT_SPRINT_MOVEMENT_MULTIPLIER;
    } else {
        this.speedMultiplier       = 1;
        this.degredationMultiplier = 1;
    }

    if (game.keyboard.isDown(this.jumpKey) && this.robot.y > 0 + ROBOT_SIZE) {
        this.robot.y -= this.calculateMovementSpeed() * (60 * game.time.fdelta);
        this.changePower(ROBOT_JUMP_PENALTY);
    } else if (this.robot.y < 576) {
        this.robot.y += this.calculateMovementSpeed() * (60 * game.time.fdelta);
    }

    if ((game.keyboard.isDown(this.leftKey)) && (this.robot.x - (ROBOT_SIZE / 2) >= ROBOT_BOTTOM_OFFSET)) {
        this.moveLeft(game)
    } else if ((game.keyboard.isDown(this.rightKey)) && (this.robot.x - (ROBOT_SIZE / 2) <= (game.canvas.width - ROBOT_BOTTOM_OFFSET))) {
        this.moveRight(game);
    } else {
        this.robot.gotoAndPlay('fly');
    }

    this.changePower((POWER_DEGRADE * this.degredationMultiplier));

    if (this.bar1.value <= 0) {
        game.end();
    }
};


Robot.prototype.moveLeft = function(game) {
    this.robot.x -= this.calculateMovementSpeed() * (60 * game.time.fdelta);
    this.robot.gotoAndPlay('left');
};
Robot.prototype.moveRight = function(game) {
    this.robot.x += this.calculateMovementSpeed() * (60 * game.time.fdelta);
    this.robot.gotoAndPlay('right');
};

Robot.prototype.calculateMovementSpeed = function() {
    var calculated = ROBOT_BASE_MOVEMENT_SPEED * (this.bar1.value / 100) * (this.speedMultiplier);
    if (calculated > ROBOT_MINIMUM_MOVEMENT_SPEED) {
        return calculated
    }
    return ROBOT_MINIMUM_MOVEMENT_SPEED;
};

Robot.prototype.changePower = function(changeAmount) {
    if (changeAmount < -1) {
        this.robot.gotoAndPlay('shields');
    }
    this.bar1.value = this.bar1.value + changeAmount;
    if (this.bar1.value > 100) {
        this.bar1.value = 100;
    }
};

Robot.prototype.animate = function() {

};