/**
 * The collectible value object
 */
var Collectible = function (startPosition, sprite, powerAffect, game) {
    //Create the sprite
    this.collectible = game.create.bitmap(sprite, {regX:'center', regY:'center', x:startPosition[0], y:startPosition[1]});
    game.stage.addChild(this.collectible);

    this.powerAffect = powerAffect;
};

Collectible.prototype.update = function (id, game, collectibleHandler) {
    this.collectible.y += COLLECTIBLE_SPEED;

    //Check if it needs to be deleted
    if (this.collectible.y - 32 > game.canvas.height) {
        game.stage.removeChild(this.collectible);
        collectibleHandler.collectiblesSpawned--;
        collectibleHandler.activeCollectables.splice(id, 1);
    }

    //Check for collision

};

// Collectible.prototype.delete = function (id)