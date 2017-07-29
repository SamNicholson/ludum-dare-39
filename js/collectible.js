/**
 * The collectible value object
 */
var Collectible = function (startPosition, sprite, powerAffect, game) {
    //Create the sprite
    this.collectible = game.create.bitmap(sprite, {regX:'center', regY:'center', x:startPosition[0], y:startPosition[1]});
    game.stage.addChild(this.collectible);
    this.type = sprite;

    this.powerAffect = powerAffect;
};

Collectible.prototype.update = function (id, game, collectibleHandler) {

    var self = this;

    this.collectible.y += COLLECTIBLE_SPEED * (60 * game.time.fdelta);

    //Check if it needs to be deleted
    if (this.collectible.y - 32 > game.canvas.height) {
        this.delete(id, game, collectibleHandler);
    }

    //Check for collision
    $.each(game.robots, function(robotId, robot) {
        self.checkForCollision(id, game, robot, collectibleHandler);
    });

    if (this.type == 'asteroid') {
        this.collectible.rotation += 0.25;
    }
};

Collectible.prototype.checkForCollision = function (id, game, robot, collectibleHandler) {
    //Check this collectible is in the correct vertical range
    if (this.collectible.y > (game.canvas.height - ROBOT_SIZE - ROBOT_BOTTOM_OFFSET) && (this.collectible.y - (this.collectible.regY * 2)) < game.canvas.height) {

        //Check the collectible is in the correct horizontal range
        var collectibleLeftEdge = this.collectible.x;
        var collectibleRightEdge = this.collectible.x + (this.collectible.regX * 2);
        var robotLeftEdge = robot.robot.x - (ROBOT_SIZE / 2);
        var robotRightEdge = robot.robot.x + ROBOT_SIZE - (ROBOT_SIZE / 2);

        if (
            collectibleLeftEdge <= robotLeftEdge && collectibleLeftEdge >= robotRightEdge ||
            collectibleRightEdge <= robotRightEdge && collectibleRightEdge >= robotLeftEdge
        ) {
            this.delete(id, game, collectibleHandler);
            robot.changePower(this.powerAffect);
        }
    }
};

Collectible.prototype.delete = function (id, game, collectibleHandler) {
    game.stage.removeChild(this.collectible);
    collectibleHandler.collectiblesSpawned--;
    collectibleHandler.activeCollectables.splice(id, 1);
};