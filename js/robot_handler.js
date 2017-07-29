/**
 * The Robot handler
 */
var Robot = function (startPosition, sprite, game) {
    //Create the robot sprite
    this.robot = game.create.sprite(sprite, 'fly', {regX:'center', regY:'center', x:startPosition[0], y:startPosition[1]});
    game.stage.addChild(this.robot);


    //Create the power bar
    this.bar1 = new tine.ProgressBar('green', 'white', tine.BOTTOM_TO_TOP,415, 15);
    this.bar1.value = 100;
    this.bar1.x = 32;
    this.bar1.y = game.canvas.height - 32;
    game.stage.addChild(this.bar1);

    this.speedMultiplier = 1;
    this.degredationMultiplier = 1;

};

Robot.prototype.update = function(game) {

    if (game.keyboard.isDown(tine.keys.SHIFT)) {
        this.speedMultiplier       = ROBOT_SPRINT_MOVEMENT_MULTIPLIER;
        this.degredationMultiplier = ROBOT_SPRINT_MOVEMENT_MULTIPLIER;
    } else {
        this.speedMultiplier       = 1;
        this.degredationMultiplier = 1;
    }

    if ((game.keyboard.isDown(tine.keys.A)) && (this.robot.x - (ROBOT_SIZE / 2) >= ROBOT_BOTTOM_OFFSET)) {
        this.robot.x -= this.calculateMovementSpeed() * (60 * game.time.fdelta);
        this.robot.gotoAndPlay('left');
    } else if ((game.keyboard.isDown(tine.keys.D)) && (this.robot.x - (ROBOT_SIZE / 2) <= (game.canvas.width - ROBOT_BOTTOM_OFFSET))) {
        this.robot.x += this.calculateMovementSpeed() * (60 * game.time.fdelta);
        this.robot.gotoAndPlay('right');
    } else {
        this.robot.gotoAndPlay('fly');
    }

    this.changePower((POWER_DEGRADE * this.degredationMultiplier));

    if (this.bar1.value <= 0) {
        game.end();
    }
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