/**
 * The collectible value object
 */
var Collectible = function (startPosition, sprite, powerAffect, game) {
    //Create the sprite


    if (sprite == 'asteroid') {
        this.collectible = game.create.bitmap(sprite, {regX:'center', regY:'center', x:startPosition[0], y:startPosition[1]});
    } else {
        this.collectible = game.create.sprite(sprite, 'fly', {regX:'center', regY:'center', x:startPosition[0], y:startPosition[1]});
    }


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

    var rect1 = {
        'x': this.collectible.x - (this.collectible.getBounds().width / 2),
        'y': this.collectible.y - (this.collectible.getBounds().height / 2),
        'width': this.collectible.getBounds().width,
        'height': this.collectible.getBounds().height
    };

    var rect2 = {
        'x': robot.robot.x - (robot.robot.getBounds().width / 2),
        'y': robot.robot.y - (robot.robot.getBounds().height / 2),
        'width': robot.robot.getBounds().width,
        'height': robot.robot.getBounds().height
    };

    if (rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.height + rect1.y > rect2.y) {
        this.delete(id, game, collectibleHandler);
        robot.changePower(this.powerAffect);
        if (this.type == 'asteroid') {
            game.sound.play('asteroid');
        } else {
            game.sound.play('collectibleGood');
        }
    }
};

Collectible.prototype.delete = function (id, game, collectibleHandler) {
    game.stage.removeChild(this.collectible);
    collectibleHandler.collectiblesSpawned--;
    collectibleHandler.activeCollectables.splice(id, 1);
};