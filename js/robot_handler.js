/**
 * The Robot handler
 */
var Robot = function (startPosition, sprite, game) {
    //Create the robot sprite
    this.robot = game.create.bitmap(sprite, {regX:'center', regY:'center', x:startPosition[0], y:startPosition[1]});
    game.stage.addChild(this.robot);


    //Create the power bar
    this.bar1 = new tine.ProgressBar('green', 'white', tine.BOTTOM_TO_TOP,515, 15);
    this.bar1.value = 100;
    this.bar1.x = 32;
    this.bar1.y = game.canvas.height - 32;
    game.stage.addChild(this.bar1);

};

Robot.prototype.update = function(game) {
    if ((game.keyboard.isDown(tine.keys.A) || game.keyboard.isDown(tine.keys.LEFT)) && (this.robot.x >= 32)) {
        this.robot.x -= 5;
    } else if ((game.keyboard.isDown(tine.keys.D)||game.keyboard.isDown(tine.keys.RIGHT)) && (this.robot.x <= (game.canvas.width - 32))) {
        this.robot.x += 5;
    }

    this.changePower(POWER_DEGRADE);

    if (this.bar1.value <= 0) {
        game.end();
    }
};

Robot.prototype.changePower = function(changeAmount) {
    this.bar1.value = this.bar1.value + changeAmount;
};
