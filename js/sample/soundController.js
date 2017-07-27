function soundController() {

    this.sound = true;
    this.step = false;


    this.init = function() {
        this.main_theme = createjs.Sound.play("a_main_theme",{loop: -1});
        this.main_theme.volume = 0.8;
        this.monster_theme = createjs.Sound.play("a_monster_theme",{loop: -1});
        this.monster_theme.volume = 0;
        this.engine = createjs.Sound.play("a_engine", {loop: -1});
        this.engine.volume = 0;
    };

    this.toggleSound = function() {
        var matrix = new createjs.Matrix2D;
        if (!this.sound) {
            createjs.Sound.setMute(1);
            matrix.translate(i_sound.getBounds().x - 100, i_sound.getBounds().y);
        } else {
            createjs.Sound.setMute(0);
            matrix.translate(i_sound.getBounds().x - 80, i_sound.getBounds().y);
        }
        i_sound.graphics.beginBitmapFill(loader.getResult("i_icons"), "no-repeat", matrix).drawRect(i_sound.getBounds().x, i_sound.getBounds().y, i_sound.getBounds().width, i_sound.getBounds().height);
        this.sound = !this.sound;
    };

    this.monsterAttack = function() {
        createjs.Tween.get(this.monster_theme, {loop:false}).to({volume:1}, (monster.appearTime - monster.emergeTime))
            .wait(monster.appearTime)
            .to({volume:0}, 3000).call(function() {
            });
    };

    this.bang = function() {
        createjs.Sound.play("a_monster_bang");
    };

    this.walk = function() {
        if (player.onBoat) {
            createjs.Sound.play("a_engineAccelerate", {interrupt: "none"}).setVolume(0.5);
        } else {
            createjs.Sound.play("a_walk1", {interrupt: "none"}).setVolume(0.5);
        }
    };

    this.sail = function() {
        if (this.step) {
            createjs.Sound.play("a_sail1").setVolume(0.1);
        } else {
            createjs.Sound.play("a_sail2").setVolume(0.1);
        }
        this.step = !this.step;
    };

    this.coin = function() {
        createjs.Sound.play("a_coin").setVolume(0.1);
    };

    this.repairBridge = function() {
        createjs.Sound.play("a_repair_bridge").setVolume(0.5);
    };

    this.destroyBridge = function() {
        createjs.Sound.play("a_destroy_bridge").setVolume(0.5);
    };

    this.ouch = function() {
        createjs.Sound.play("a_ouch1", {interrupt: "none"});
    };

    this.mine = function() {
        createjs.Sound.play("a_mine");
    };

    this.startEngine = function() {
        this.engine.volume = 0.3;
    };

    this.stopEngine = function() {
        this.engine.volume = 0;
    };

    this.recharge = function() {
        createjs.Sound.play("a_recharge").setVolume(0.3);
    };

    this.startMenuTheme = function() {
        this.menuTheme = createjs.Sound.play("a_menu_theme", {loop: -1});
    };

    this.stopMenuTheme = function() {
        this.menuTheme.stop();
    };

    this.takeoff = function() {
        createjs.Sound.play("a_takeoff");
    };

    this.applause = function() {
        createjs.Sound.play("a_applause");
    };

    this.stopGame = function() {
        this.main_theme.stop();
        this.monster_theme.stop();
    };

}
var soundController = new soundController();