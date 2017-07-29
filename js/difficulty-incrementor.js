/**
 * The collectible handler
 */
var Difficulty = function () {
    this.thresholdSettings = [{
        'COLLECTIBLE_BAD_SPAWN_CHANCE': 0.2,
        'COLLECTIBLE_GOOD_SPAWN_CHANCE': 0.2,
        'COLLECTIBLE_SPEED': 1.5,
        'COLLECTIBLE_MAX': 10,
        'COLLECTIBLE_SPAWN_INTERVAL': 1.5,
        'COLLECTIBLE_SPAWN_CHANCE': 0.1
    }, {
        'COLLECTIBLE_BAD_SPAWN_CHANCE': 0.2,
        'COLLECTIBLE_GOOD_SPAWN_CHANCE': 0.2,
        'COLLECTIBLE_SPEED': 1.5,
        'COLLECTIBLE_MAX': 10,
        'COLLECTIBLE_SPAWN_INTERVAL': 1.5,
        'COLLECTIBLE_SPAWN_CHANCE': 0.1
    }, {
        'COLLECTIBLE_BAD_SPAWN_CHANCE': 0.2,
        'COLLECTIBLE_GOOD_SPAWN_CHANCE': 0.2,
        'COLLECTIBLE_SPEED': 1.5,
        'COLLECTIBLE_MAX': 10,
        'COLLECTIBLE_SPAWN_INTERVAL': 1.5,
        'COLLECTIBLE_SPAWN_CHANCE': 0.1
    }, {
        'COLLECTIBLE_BAD_SPAWN_CHANCE': 0.2,
        'COLLECTIBLE_GOOD_SPAWN_CHANCE': 0.2,
        'COLLECTIBLE_SPEED': 1.5,
        'COLLECTIBLE_MAX': 10,
        'COLLECTIBLE_SPAWN_INTERVAL': 1.5,
        'COLLECTIBLE_SPAWN_CHANCE': 0.1
    }, {
        'COLLECTIBLE_BAD_SPAWN_CHANCE': 0.2,
        'COLLECTIBLE_GOOD_SPAWN_CHANCE': 0.2,
        'COLLECTIBLE_SPEED': 1.5,
        'COLLECTIBLE_MAX': 10,
        'COLLECTIBLE_SPAWN_INTERVAL': 1.5,
        'COLLECTIBLE_SPAWN_CHANCE': 0.1
    }];
    this.currentThreshold = 0;

    this.changes = [20,40,60,80,100];
};

Difficulty.prototype.update = function(game) {
    var self = this;
    $.each(this.changes, function (key, value) {
        if (GAME_TIME > value && self.currentThreshold == key) {
            console.log('difficulty changed');
            console.log('game time ' + GAME_TIME);
            console.log('difficulty ' + key);
            self.updateThreshold(self.thresholdSettings[key]);
            self.currentThreshold = key + 1;
        }
    });

};

Difficulty.prototype.updateThreshold = function (threshold) {
    COLLECTIBLE_BAD_SPAWN_CHANCE = threshold['COLLECTIBLE_BAD_SPAWN_CHANCE'];
    COLLECTIBLE_GOOD_SPAWN_CHANCE = threshold['COLLECTIBLE_GOOD_SPAWN_CHANCE'];
    COLLECTIBLE_SPEED = threshold['COLLECTIBLE_SPEED'];
    COLLECTIBLE_MAX = threshold['COLLECTIBLE_MAX'];
    COLLECTIBLE_SPAWN_INTERVAL = threshold['COLLECTIBLE_SPAWN_INTERVAL'];
    COLLECTIBLE_SPAWN_CHANCE = threshold['COLLECTIBLE_SPAWN_CHANCE'];
};


