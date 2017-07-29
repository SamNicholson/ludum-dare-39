/**
 * The collectible handler
 */
var CollectibleHandler = function (game) {
    this.activeCollectables  = [];
    this.lastSpawned         = false
    this.collectiblesSpawned = 0;
    this.collectiblesLastSpawned = 0;
};

CollectibleHandler.prototype.update = function(game) {
    var self = this;

    //Handle any that need to be created
    self.create(game);

    $.each(self.activeCollectables, function(key, collectible) {
        if (!collectible) {
            return;
        }
        collectible.update(key, game, self);
    });
};

CollectibleHandler.prototype.create = function(game) {

    var spawnChance = Math.random() < COLLECTIBLE_SPAWN_CHANCE;
    var spaceForMoreCollectibles = this.collectiblesSpawned < COLLECTIBLE_MAX;
    var enoughTimeHasElapsed = this.collectiblesLastSpawned + COLLECTIBLE_SPAWN_INTERVAL < GAME_TIME;

    if (spaceForMoreCollectibles && spawnChance && enoughTimeHasElapsed) {
        this.spawnCollectible(game);
    }
};

CollectibleHandler.prototype.spawnCollectible = function (game) {

    var typeToSpawn = Math.random();

    this.collectiblesSpawned++;
    this.collectiblesLastSpawned = (new Date() - GAME_START_TIME)/1000;
    var startPosition = [
        (Math.random() * game.canvas.width + 32),
        (-32)
    ];

    if (typeToSpawn < COLLECTIBLE_BAD_SPAWN_CHANCE) {
        this.activeCollectables.push(new Collectible(startPosition, 'asteroid', -5, game));
    } else {
        this.activeCollectables.push(new Collectible(startPosition, 'collectible', +3, game));
    }





};
