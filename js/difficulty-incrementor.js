/**
 * The collectible handler
 */
var Difficulty = function () {
    this.thresholdSettings = [{
        'COLLECTIBLE_BAD_SPAWN_CHANCE': 0.6,
        'COLLECTIBLE_GOOD_SPAWN_CHANCE': 0.6,
        'COLLECTIBLE_SPEED': 5,
        'COLLECTIBLE_MAX': 20,
        'COLLECTIBLE_SPAWN_INTERVAL': 0.2,
        'COLLECTIBLE_SPAWN_CHANCE': 1,
        'ROBOT_MINIMUM_MOVEMENT_SPEED': 12,
        'ROBOT_BASE_MOVEMENT_SPEED': 16,
        'TRACK_CHANGE': true
    }, {
        'COLLECTIBLE_BAD_SPAWN_CHANCE': 0.4,
        'COLLECTIBLE_GOOD_SPAWN_CHANCE': 0.25,
        'COLLECTIBLE_SPEED': 2,
        'COLLECTIBLE_MAX': 12,
        'COLLECTIBLE_SPAWN_INTERVAL': 1.4,
        'COLLECTIBLE_SPAWN_CHANCE': 0.1,
        'ROBOT_MINIMUM_MOVEMENT_SPEED': 4,
        'ROBOT_BASE_MOVEMENT_SPEED': 6
    }, {
        'COLLECTIBLE_BAD_SPAWN_CHANCE': 0.25,
        'COLLECTIBLE_GOOD_SPAWN_CHANCE': 0.25,
        'COLLECTIBLE_SPEED': 2.5,
        'COLLECTIBLE_MAX': 13,
        'COLLECTIBLE_SPAWN_INTERVAL': 0.7,
        'COLLECTIBLE_SPAWN_CHANCE': 0.7,
        'ROBOT_MINIMUM_MOVEMENT_SPEED': 5,
        'ROBOT_BASE_MOVEMENT_SPEED': 7
    }, {
        'COLLECTIBLE_BAD_SPAWN_CHANCE': 0.5,
        'COLLECTIBLE_GOOD_SPAWN_CHANCE': 0.25,
        'COLLECTIBLE_SPEED': 3.5,
        'COLLECTIBLE_MAX': 14,
        'COLLECTIBLE_SPAWN_INTERVAL': 0.7,
        'COLLECTIBLE_SPAWN_CHANCE': 0.8,
        'ROBOT_MINIMUM_MOVEMENT_SPEED': 6,
        'ROBOT_BASE_MOVEMENT_SPEED': 8
    }, {
        'COLLECTIBLE_BAD_SPAWN_CHANCE': 0.6,
        'COLLECTIBLE_GOOD_SPAWN_CHANCE': 0.6,
        'COLLECTIBLE_SPEED': 5,
        'COLLECTIBLE_MAX': 20,
        'COLLECTIBLE_SPAWN_INTERVAL': 0.2,
        'COLLECTIBLE_SPAWN_CHANCE': 1,
        'ROBOT_MINIMUM_MOVEMENT_SPEED': 12,
        'ROBOT_BASE_MOVEMENT_SPEED': 16,
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
    ROBOT_BASE_MOVEMENT_SPEED = threshold['ROBOT_BASE_MOVEMENT_SPEED'];
    if (threshold['TRACK_CHANGE']) {
        // game.sound.stop('background');
        //game.sound.play('backgroundFast', "none", 0,0,-1);
    }
};


