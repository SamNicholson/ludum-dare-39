/**
 * The collectible handler
 */
var Difficulty = function () {
    this.currentThreshold = 0;
    this.changes = [1,4,8,12,16,20,25,30,35,40,45,50];
};

Difficulty.prototype.update = function(game) {
    var self = this;
    $.each(this.changes, function (key, value) {
        console.log(COLLECTIBLE_BAD_SPAWN_CHANCE);
        if (GAME_TIME > value && self.currentThreshold <= key) {
            self.updateThreshold(game);
            self.currentThreshold = key + 1;
            console.log(value);
        }
    });

};

Difficulty.prototype.updateThreshold = function (game) {
    COLLECTIBLE_BAD_SPAWN_CHANCE = COLLECTIBLE_BAD_SPAWN_CHANCE * 1.05;
    COLLECTIBLE_SPEED = COLLECTIBLE_SPEED * 1.05;
    COLLECTIBLE_MAX = COLLECTIBLE_MAX * 1.1;
    COLLECTIBLE_SPAWN_INTERVAL = COLLECTIBLE_SPAWN_INTERVAL / 1.1;
    COLLECTIBLE_SPAWN_CHANCE = COLLECTIBLE_SPAWN_CHANCE / 1.1;
    ROBOT_BASE_MOVEMENT_SPEED = ROBOT_BASE_MOVEMENT_SPEED * 1.05;
    ROBOT_JUMP_PENALTY = ROBOT_JUMP_PENALTY * 1.01;
    POWER_DEGRADE = POWER_DEGRADE * 1.1;
    POINTS_MULTIPLIER = POINTS_MULTIPLIER * 1.3;
    //game.sound.play('backgroundFast', "none", 0,0,-1);
};


