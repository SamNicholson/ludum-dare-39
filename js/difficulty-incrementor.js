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
        'COLLECTIBLE_BAD_SPAWN_CHANCE': 0.4,
        'COLLECTIBLE_GOOD_SPAWN_CHANCE': 0.25,
        'COLLECTIBLE_SPEED': 2,
        'COLLECTIBLE_MAX': 12,
        'COLLECTIBLE_SPAWN_INTERVAL': 1.4,
        'COLLECTIBLE_SPAWN_CHANCE': 0.1
    }, {
        'COLLECTIBLE_BAD_SPAWN_CHANCE': 0.25,
        'COLLECTIBLE_GOOD_SPAWN_CHANCE': 0.25,
        'COLLECTIBLE_SPEED': 2.5,
        'COLLECTIBLE_MAX': 13,
        'COLLECTIBLE_SPAWN_INTERVAL': 0.7,
        'COLLECTIBLE_SPAWN_CHANCE': 0.7
    }, {
        'COLLECTIBLE_BAD_SPAWN_CHANCE': 0.5,
        'COLLECTIBLE_GOOD_SPAWN_CHANCE': 0.25,
        'COLLECTIBLE_SPEED': 3.5,
        'COLLECTIBLE_MAX': 14,
        'COLLECTIBLE_SPAWN_INTERVAL': 0.7,
        'COLLECTIBLE_SPAWN_CHANCE': 0.8
    }, {
        'COLLECTIBLE_BAD_SPAWN_CHANCE': 0.6,
        'COLLECTIBLE_GOOD_SPAWN_CHANCE': 0.9,
        'COLLECTIBLE_SPEED': 5,
        'COLLECTIBLE_MAX': 15,
        'COLLECTIBLE_SPAWN_INTERVAL': 0.5,
        'COLLECTIBLE_SPAWN_CHANCE': 1,
        'TRACK_CHANGE': true
    }];
    this.currentThreshold = 0;

    this.changes = [0,16,30,58,83];
};

Difficulty.prototype.update = function(game) {
    var self = this;
    $.each(this.changes, function (key, value) {
        if (GAME_TIME > value && self.currentThreshold == key) {
            self.updateThreshold(game, self.thresholdSettings[key]);
            self.currentThreshold = key + 1;
        }
    });

};

Difficulty.prototype.updateThreshold = function (game, threshold) {
    COLLECTIBLE_BAD_SPAWN_CHANCE = threshold['COLLECTIBLE_BAD_SPAWN_CHANCE'];
    COLLECTIBLE_GOOD_SPAWN_CHANCE = threshold['COLLECTIBLE_GOOD_SPAWN_CHANCE'];
    COLLECTIBLE_SPEED = threshold['COLLECTIBLE_SPEED'];
    COLLECTIBLE_MAX = threshold['COLLECTIBLE_MAX'];
    COLLECTIBLE_SPAWN_INTERVAL = threshold['COLLECTIBLE_SPAWN_INTERVAL'];
    COLLECTIBLE_SPAWN_CHANCE = threshold['COLLECTIBLE_SPAWN_CHANCE'];
    if (threshold['TRACK_CHANGE']) {
        // game.sound.stop('background');
        game.sound.play('backgroundFast', "none", 0,0,-1);
    }
};


