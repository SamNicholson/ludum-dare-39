/**
 * The Robot handler
 */
var Robot = function (startPosition, sprite, game, playerNumber) {
    //Create the robot sprite
    this.robot = game.create.sprite(sprite, 'fly', {regX:'center', regY:'center', x:startPosition[0], y:startPosition[1]});
    game.stage.addChild(this.robot);

    this.startPosition = startPosition;

    this.playerNumber = playerNumber;

    this.baseAnimation = 'fly';

    this.gamepad = game.gamepad.get(0);

    this.lives = 3;

    //Create the power bar
    var powerBarX, powerBarY, livesX, livesY;
    switch (playerNumber) {
        case 1:
            game.create.bitmap(sprite, 'fly', {regX:'center', regY:'center', x:startPosition[0], y:startPosition[1]});
            powerBarX = 32;
            powerBarY = game.canvas.height - 32;
            livesX = 80;
            livesY = 15;
            this.leftKey = tine.keys.A;
            this.rightKey = tine.keys.D;
            this.sprintKey = tine.keys.SHIFT;
            this.jumpKey = tine.keys.W;
            break;
        case 2:
            powerBarX = game.canvas.width - 48;
            powerBarY = game.canvas.height - 32;
            livesX = 80;
            livesY = 75;
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
    this.game = game;
    game.stage.addChild(this.bar1);

    this.speedMultiplier = 1;
    this.degredationMultiplier = 1;


    this.livesText = game.create.text(this.lives, {
        font:'32px arial',
        color:'#efefef',
        x: livesX,
        y: livesY
    });

    this.dying = false;

    game.stage.addChild(this.livesText);

};

Robot.prototype.update = function(game) {

    var gamePadJumping = false;

    //if (this.gamepad.leftStickForce > 0.1) {
    //    angle = Math.atan2(this.gamepad.leftStickY, this.gamepad.leftStickX);
    //    angle += 90 * tine.RADIANS;
    //
    //    if (angle < 1.5 && angle > -1.5) {
    //        gamePadJumping = true;
    //    }
    //    if (angle < -0.1) {
    //        this.moveLeft(game);
    //    }
    //    if (angle > 0.1) {
    //        this.moveRight(game);
    //    }
    //    console.log(angle);
    //}


    if (game.keyboard.isDown(this.sprintKey) && this.bar1.value > 0) {
        this.speedMultiplier       = ROBOT_SPRINT_MOVEMENT_MULTIPLIER;
        this.degredationMultiplier = ROBOT_SPRINT_MOVEMENT_MULTIPLIER;
        this.baseAnimation = 'boost';
    } else {
        this.speedMultiplier       = 1;
        this.degredationMultiplier = 1;
        this.baseAnimation = 'fly';
    }

    if ((game.keyboard.isDown(this.jumpKey) || gamePadJumping) && this.robot.y > ROBOT_SIZE &&  this.bar1.value > 0) {
        this.jump(game);
    } else if (this.robot.y < 544) {
        this.robot.y += this.calculateMovementSpeed() * (60 * game.time.fdelta);
        this.baseAnimation = 'boost';
    }

    if ((game.keyboard.isDown(this.leftKey)) && (this.robot.x - (ROBOT_SIZE / 2) >= ROBOT_BOTTOM_OFFSET)) {
        this.moveLeft(game)
    } else if ((game.keyboard.isDown(this.rightKey)) && (this.robot.x - (ROBOT_SIZE / 2) <= (game.canvas.width - ROBOT_BOTTOM_OFFSET))) {
        this.moveRight(game);
    } else {
        this.robot.gotoAndPlay(this.baseAnimation);
    }

    this.changePower((POWER_DEGRADE * this.degredationMultiplier));
};




Robot.prototype.jump = function(game) {
    this.robot.y -= this.calculateMovementSpeed() * (60 * game.time.fdelta);
    this.changePower(ROBOT_JUMP_PENALTY);
    this.baseAnimation = 'boost';
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
    if (this.bar1.value < 0) {
        this.bar1.value = 0;
    }
    if (this.bar1.value == 0 && changeAmount <= -1) {
        console.log(changeAmount);
        this.looseLife();
    }
};

Robot.prototype.looseLife = function() {
    if (!this.dying) {
        this.dying = true;
        if (this.lives == 0) {
            this.game.end();
            return true;
        }
        this.lives--;
        this.baseAnimation = 'explode';
        this.robot.gotoAndPlay(this.baseAnimation);

        setTimeout(function (robot) {
            robot.robot.gotoAndPlay(robot.baseAnimation);
            robot.robot.x = robot.startPosition[0];
            robot.robot.y = robot.startPosition[1];
            robot.dying = false;
            robot.changePower(100);
            robot.baseAnimation = 'fly';
        }, 1000, this);
        this.livesText.text = this.lives;
    }
};