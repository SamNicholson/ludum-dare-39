
var stage, w, h, loader, preLoader, t_percent;

var placeHolder = $("#place-holder");

//images
var i_menu, i_high_scores, i_rules, i_water, sprite, i_menu_top, i_take_damage, i_island_1, i_island_2, i_gold, i_health, i_lives, i_sound, i_time, i_hasBoat, i_hasGold, i_restart, i_battery;

var bar_energy;
// menus
var i_highScoresContainer, i_rulesContainer;

//sprite
var sp_player, sp_monster, sprite_monster, sp_tentacle_1, sprite_tentacle_1, sp_tentacle_2, sprite_tentacle_2,sp_tentacle_3, sprite_tentacle_3,sp_tentacle_4, sprite_tentacle_4, sp_tentacle_5, sprite_tentacle_5;
var sp_house, sprite_house;
var sp_bridgeyard;
var sp_shipyard;
var sp_airport, sprite_bridgeyard;
var sp_goldmine, sprite_goldmine;
var sp_plane, sprite_plane;
var sp_boat, sprite_boat;
var sprite_bridge_1, sprite_bridge_2, sp_bridge;
var bridge1_health = 100, bridge1_standing = true;
var bridge2_health = 100, bridge2_standing = true;


var t_gold, t_lives, t_time, t_health;
var t_but_plane, t_but_bridge, t_but_boat;

//buttons
var but_goldmine;
var but_home;

var but_bridge, but_bridge_active = false, but_bridge_no_gold;
var but_boat, but_boat_active = false,but_boat_no_gold;
var but_plane, but_plane_active = false,but_plane_no_gold;
var but_sound;

var start_time;

// Key press functions
var up = down = left = right = sprint = false;

//This just allows us to use console.log safely in IE
if ( ! window.console ) console = { log: function(){} };


function init() {
    if (window.top != window) {
        document.getElementById("header").style.display = "none";
    }

    stage = new createjs.Stage("game");

    // grab canvas width and height for later calculations:
    w = stage.canvas.width;
    h = stage.canvas.height;

    var manifest = [
        {src: "images/main_menus/menu_loading.png", id: "menu_loading"}
        ];

    createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
    createjs.Ticker.setFPS(30);
    createjs.Ticker.addEventListener("tick", menuTick);

    preLoader = new createjs.LoadQueue(false);
    preLoader.addEventListener("complete", startLoad);
    preLoader.loadManifest(manifest);
}

function startLoad(){

    var menu_loading = new createjs.Shape();
    menu_loading.graphics.beginBitmapFill(preLoader.getResult("menu_loading")).drawRect(0,0,w,h);
    menu_loading.setBounds(0,0,w,h);

    stage.addChild(menu_loading);

    var manifest = [
        {src: "audio/BG1.mp3", id: "a_menu_theme", data: 1},
        {src: "audio/Walk1.mp3", id: "a_walk1", data: 1},
        {src: "audio/Walk2.mp3", id: "a_walk2", data: 1},
        {src:"audio/Water_splash1.mp3", id:"a_sail1"},
        {src:"audio/Water_splash2.mp3", id:"a_sail2"},
        {src:"audio/Main_theme.mp3", id:"a_main_theme"},
        {src:"audio/Monster_theme.mp3", id:"a_monster_theme"},
        {src:"audio/Monster_bang.mp3", id:"a_monster_bang"},
        {src: "audio/coin.mp3", id:"a_coin"},
        {src: "audio/Ouch1.mp3", id:"a_ouch1", data: 1},
        {src: "audio/mine.mp3", id:"a_mine"},
        {src: "audio/engine.mp3", id:"a_engine"},
        {src: "audio/engineAccelerate.mp3", id: "a_engineAccelerate", data: 1},
        {src: "audio/recharge.mp3", id: "a_recharge", data: 1},
        {src:"audio/Construct_bridge.mp3", id:"a_repair_bridge", data: 1},
        {src:"audio/Destroy_bridge.mp3", id:"a_destroy_bridge"},
        {src:"audio/takeoff.mp3", id:"a_takeoff", data: 1},

        {src:"sprites/sp_player.png", id:"sp_player"},
        {src:"sprites/sp_tentacle_1.png", id:"sp_tentacle_1"},
        {src:"sprites/sp_tentacle_2.png", id:"sp_tentacle_2"},
        {src:"sprites/sp_tentacle_3.png", id:"sp_tentacle_3"},
        {src:"sprites/sp_tentacle_4.png", id:"sp_tentacle_4"},
        {src:"sprites/sp_tentacle_5.png", id:"sp_tentacle_5"},
        {src:"sprites/sp_monster.png", id:"sp_monster"},
        {src:"sprites/sp_house.png", id:"sp_house"},
        {src:"sprites/sp_goldmine.png", id:"sp_goldmine"},
        {src:"sprites/sp_bridgeyard.png", id:"sp_bridgeyard"},
        {src:"sprites/sp_shipyard.png", id:"sp_shipyard"},
        {src:"sprites/sp_airport.png", id:"sp_airport"},
        {src:"sprites/sp_bridge.png", id:"sp_bridge"},
        {src:"sprites/sp_plane.png", id:"sp_plane"},
        {src:"sprites/sp_boat.png", id:"sp_boat"},
        {src:"sprites/sp_button.png", id:"sp_button"},
        {src:"sprites/tentacle_test.png", id:"tentacle_test"},

        {src:"sprites/sp_icons.png", id:"i_icons"},
        {src:"images/funzi_menu.png", id:"i_menu"},
        {src:"images/funzi_menu.png", id:"i_menu_rules"},
        {src:"images/funzi_menu.png", id:"i_menu_highscore"},
        {src:"images/i_water.png", id:"i_water"},
        {src:"images/i_menu_top.png", id:"i_menu_top"},
        {src:"images/i_menu_side.png", id:"i_menu_side"},
        {src:"images/i_island_1.png", id:"i_island_1"},
        {src:"images/i_island_2.png", id:"i_island_2"},
        {src:"images/i_hint.png", id:"i_hint"},
        {src:"images/main_menus/menu_gameover.png", id:"menu_gameover"},

        {src:"images/but_goldmine.png", id:"but_goldmine"},
        {src:"images/but_home.png", id:"but_home"},
        {src:"images/but_plane_inactive.png", id:"but_plane_inactive"},
        {src:"images/but_plane_no_gold.png", id:"but_plane_no_gold"}
    ];

    t_percent = new createjs.Text("Hint: Collect Gold", "40px minecraftia", "#000");
    t_percent.x = 450;
    t_percent.y = 50;
    t_percent.textBaseline = "alphabetic";

    stage.addChild(t_percent);

    loader = new createjs.LoadQueue(false);
    loader.installPlugin(createjs.Sound);
    loader.addEventListener("complete", startMenu);
    loader.addEventListener("progress", showLoadProgress);
    loader.loadManifest(manifest);

}

function showLoadProgress(evt) {
    var perc = evt.loaded / evt.total;
    t_percent.text = Math.ceil(perc*100).toString() + "%";
}


function startMenu(mode){

    stage.removeAllChildren();

    soundController.startMenuTheme();

    if(!mode){
        mode = '';
    }
    //background menu image
    i_menu = new createjs.Shape();
    i_menu.graphics.beginBitmapFill(loader.getResult("i_menu")).drawRect(0,0,w,h);

    if(mode == "lost"){
        //background menu image
        var lost = new createjs.Shape();
        lost.graphics.beginBitmapFill(loader.getResult("menu_gameover")).drawRect(0,0,w,h);
        stage.addChild(lost);

        //start game box
        var play_again_hit = new createjs.Shape();
        play_again_hit.graphics.beginFill("rgba(0,0,0,1)").drawRect(150,420,720,180);
        var play_again = new createjs.Shape();
        play_again.graphics.beginFill("rgba(0,0,0,0)").drawRect(150,420,720,180);
        play_again.hitArea = play_again_hit;
        stage.addChild(play_again);
        play_again.addEventListener("click",restartGame);
    }
    else{
        //start game box
        var start_game_hit = new createjs.Shape();
        start_game_hit.graphics.beginFill("rgba(0,0,0,1)").drawRect(620,165,340,130);
        var start_game = new createjs.Shape();
        start_game.graphics.beginFill("rgba(0,0,0,0)").drawRect(620,165,340,130);
        start_game.hitArea = start_game_hit;

        //rules box
        var rules_hit = new createjs.Shape();
        rules_hit.graphics.beginFill("rgba(0,0,0,1)").drawRect(520,300,440,130);
        var rules = new createjs.Shape();
        rules.graphics.beginFill("rgba(255,0,0,0)").drawRect(520,300,440,130);
        rules.hitArea = rules_hit;

        //high scores box
        var high_scores_hit = new createjs.Shape();
        high_scores_hit.graphics.beginFill("rgba(0,0,0,1)").drawRect(420,450,575,130);
        var high_scores = new createjs.Shape();
        high_scores.graphics.beginFill("rgba(0,0,0,0)").drawRect(420,450,575,130);
        high_scores.hitArea = high_scores_hit;


        //static images
        stage.addChild(i_menu,start_game,rules,high_scores);
        start_game.addEventListener("click",startGame);
        rules.addEventListener("click",showRulesMenu);
        high_scores.addEventListener("click",showHighScoresMenu);
    }

}

function showRulesMenu(){
    showRules("menu");
}

function showHighScoresMenu(){
    showHighScores("menu");
}

function menuTick(event){
    stage.update(event);
}

function startGame() {
    //document.getElementById("loader").className = "";
    stage.removeAllChildren();
    soundController.stopMenuTheme();
    // start the theme sound
    soundController.init();

    //start the timer

    start_time = new Date();

    //background water image
    i_water = new createjs.Shape();
    i_water.graphics.beginBitmapFill(loader.getResult("i_water")).drawRect(0,0,w,h);
    i_water.setBounds(0,0,w,h);

    //top menu
    i_top_menu = new createjs.Shape();
    i_top_menu.setBounds(0,0,1000,28);

    var matrix = new createjs.Matrix2D;
    matrix.translate(i_top_menu.getBounds().x, i_top_menu.getBounds().y);
    i_top_menu.graphics.beginBitmapFill(loader.getResult("i_menu_top"), "no-repeat", matrix).drawRect(i_top_menu.getBounds().x, i_top_menu.getBounds().y,i_top_menu.getBounds().width,i_top_menu.getBounds().height);

    //hints box
    i_hint = new createjs.Shape();
    i_hint.setBounds(0,30,250,50);

    var matrix = new createjs.Matrix2D;
    matrix.translate(i_hint.getBounds().x, i_hint.getBounds().y);
    i_hint.graphics.beginBitmapFill(loader.getResult("i_hint"), "no-repeat", matrix).drawRect(i_hint.getBounds().x, i_hint.getBounds().y,i_hint.getBounds().width,i_hint.getBounds().height);

    i_take_damage = new createjs.Shape();
    i_take_damage.graphics.beginFill('rgba(255,0,0,1)');
    createjs.Tween.get(i_take_damage).to({alpha: 0.3},0);
    i_take_damage.visible = false;
    i_take_damage.graphics.drawRect(0,0,w,h);
    i_take_damage.cache(0,0,w,h);

    //island 1
    i_island_1 = new createjs.Shape();
    i_island_1.setBounds(100,100,400,420);
    var matrix = new createjs.Matrix2D;
    matrix.translate(i_island_1.getBounds().x, i_island_1.getBounds().y);
    i_island_1.graphics.beginBitmapFill(loader.getResult("i_island_1"), "no-repeat", matrix).drawRect(i_island_1.getBounds().x, i_island_1.getBounds().y,i_island_1.getBounds().width,i_island_1.getBounds().height);

    //island 2
    i_island_2 = new createjs.Shape();
    i_island_2.setBounds(680,80,240,320);
    var matrix = new createjs.Matrix2D;
    matrix.translate(i_island_2.getBounds().x, i_island_2.getBounds().y);
    i_island_2.graphics.beginBitmapFill(loader.getResult("i_island_2"), "no-repeat", matrix).drawRect(i_island_2.getBounds().x,i_island_2.getBounds().y,i_island_2.getBounds().width,i_island_2.getBounds().height);

    i_gold = new createjs.Shape();
    i_gold.setBounds(900, 2, 20, 20)
    var matrix = new createjs.Matrix2D;
    matrix.translate(i_gold.getBounds().x, i_gold.getBounds().y);
    i_gold.graphics.beginBitmapFill(loader.getResult("i_icons"), "no-repeat", matrix).drawRect(i_gold.getBounds().x, i_gold.getBounds().y, i_gold.getBounds().width, i_gold.getBounds().height);

    i_health = new createjs.Shape();
    i_health.setBounds(740, 2, 20, 20)
    var matrix = new createjs.Matrix2D;
    matrix.translate(i_health.getBounds().x - 40, i_health.getBounds().y);
    i_health.graphics.beginBitmapFill(loader.getResult("i_icons"), "no-repeat", matrix).drawRect(i_health.getBounds().x, i_health.getBounds().y, i_health.getBounds().width, i_health.getBounds().height);

    i_lives = new createjs.Shape();
    i_lives.setBounds(690, 2, 20, 20)
    var matrix = new createjs.Matrix2D;
    matrix.translate(i_lives.getBounds().x - 60, i_lives.getBounds().y);
    i_lives.graphics.beginBitmapFill(loader.getResult("i_icons"), "no-repeat", matrix).drawRect(i_lives.getBounds().x, i_lives.getBounds().y, i_lives.getBounds().width, i_lives.getBounds().height);

    i_sound = new createjs.Shape();
    i_sound.setBounds(100, 2, 20, 20)
    var matrix = new createjs.Matrix2D;
    matrix.translate(i_sound.getBounds().x - 80, i_sound.getBounds().y);
    i_sound.graphics.beginBitmapFill(loader.getResult("i_icons"), "no-repeat", matrix).drawRect(i_sound.getBounds().x, i_sound.getBounds().y, i_sound.getBounds().width, i_sound.getBounds().height);
    i_sound.addEventListener("click", soundController.toggleSound);


    i_time = new createjs.Shape();
    i_time.setBounds(460, 2, 20, 20)
    var matrix = new createjs.Matrix2D;
    matrix.translate(i_time.getBounds().x - 120, i_time.getBounds().y);
    i_time.graphics.beginBitmapFill(loader.getResult("i_icons"), "no-repeat", matrix).drawRect(i_time.getBounds().x, i_time.getBounds().y, i_time.getBounds().width, i_time.getBounds().height);

    i_hasBoat = new createjs.Shape();
    i_hasBoat.setBounds(970, 2, 20, 20)
    var matrix = new createjs.Matrix2D;
    matrix.translate(i_hasBoat.getBounds().x - 140, i_hasBoat.getBounds().y);
    i_hasBoat.graphics.beginBitmapFill(loader.getResult("i_icons"), "no-repeat", matrix).drawRect(i_hasBoat.getBounds().x, i_hasBoat.getBounds().y, i_hasBoat.getBounds().width, i_hasBoat.getBounds().height);

    i_hasGold = new createjs.Shape();
    i_hasGold.setBounds(370, 0, 20, 20)
    var matrix = new createjs.Matrix2D;
    matrix.translate(i_lives.getBounds().x - 60, i_lives.getBounds().y);
    i_hasGold.graphics.beginBitmapFill(loader.getResult("i_icons"), "no-repeat", matrix).drawRect(i_hasGold.getBounds().x, i_hasGold.getBounds().y, i_hasGold.getBounds().width, i_hasGold.getBounds().height);

    i_restart = new createjs.Shape();
    i_restart.setBounds(70, 2, 20, 20)
    var matrix = new createjs.Matrix2D;
    matrix.translate(i_restart.getBounds().x - 180, i_restart.getBounds().y);
    i_restart.graphics.beginBitmapFill(loader.getResult("i_icons"), "no-repeat", matrix).drawRect(i_restart.getBounds().x, i_restart.getBounds().y, i_restart.getBounds().width, i_restart.getBounds().height);
    i_restart.addEventListener("click", restartGame);

    i_rules = new createjs.Shape();
    i_rules.setBounds(10, 2, 20, 20)
    var matrix = new createjs.Matrix2D;
    matrix.translate(i_rules.getBounds().x - 200, i_rules.getBounds().y);
    i_rules.graphics.beginBitmapFill(loader.getResult("i_icons"), "no-repeat", matrix).drawRect(i_rules.getBounds().x, i_rules.getBounds().y, i_rules.getBounds().width, i_rules.getBounds().height);
    i_rules.addEventListener("click", showRules);

    i_high_scores = new createjs.Shape();
    i_high_scores.setBounds(40, 2, 20, 20)
    var matrix = new createjs.Matrix2D;
    matrix.translate(i_high_scores.getBounds().x - 220, i_high_scores.getBounds().y);
    i_high_scores.graphics.beginBitmapFill(loader.getResult("i_icons"), "no-repeat", matrix).drawRect(i_high_scores.getBounds().x, i_high_scores.getBounds().y, i_high_scores.getBounds().width, i_high_scores.getBounds().height);
    i_high_scores.addEventListener("click", showHighScores);

    i_battery = new createjs.Shape();
    i_battery.setBounds(820, 2, 20, 20)
    var matrix = new createjs.Matrix2D;
    matrix.translate(i_battery.getBounds().x - 240, i_battery.getBounds().y);
    i_battery.graphics.beginBitmapFill(loader.getResult("i_icons"), "no-repeat", matrix).drawRect(i_battery.getBounds().x, i_battery.getBounds().y, i_battery.getBounds().width, i_battery.getBounds().height);


    i_highScoresContainer = new createjs.Shape();
    i_highScoresContainer.graphics.beginFill("#b09966").drawRect(250,-440,500,440);

    i_rulesContainer = new createjs.Shape();
    i_rulesContainer.graphics.beginFill("#b09966").drawRect(250,-440,500,440);

    var sp_bridge1 = new createjs.SpriteSheet({
        "images": [loader.getResult("sp_bridge")],
        "frames": {width:220, height:75},
        "animations": {
            standing: [0],
            broken: [1]
        }
    });
    sprite_bridge_1 = new createjs.Sprite(sp_bridge1, "standing");
    sprite_bridge_1.setBounds(480,260,220,60);
    sprite_bridge_1.setTransform(sprite_bridge_1.getBounds().x, sprite_bridge_1.getBounds().y, 1, 1);
    sprite_bridge_1.framerate = 30;
	
	var sp_bridge2 = new createjs.SpriteSheet({
        "images": [loader.getResult("sp_bridge")],
        "frames": {width:220, height:75},
        "animations": {
            standing: [0],
            broken: [1]
        }
    });
    sprite_bridge_2 = new createjs.Sprite(sp_bridge2, "standing");
    sprite_bridge_2.setBounds(480,120,220,60);
    sprite_bridge_2.setTransform(sprite_bridge_2.getBounds().x, sprite_bridge_2.getBounds().y, 1, 1);
    sprite_bridge_2.framerate = 30;

    //Monster Sprite
    var sp_monster = new createjs.SpriteSheet({
        "images": [loader.getResult("sp_monster")],
        "frames": {width:200, height:200},
        "animations": {
            // start, end, next, speed
            visible: {
                frames: [8,9,10],
                speed: 0.2
            },
            appear: {
                frames: [3,4,5,6,7,8],
                next: "visible",
                speed: 0.2
            },
            disappear: {
                frames: [8,7,6,5,4,3],
                next: "hidden",
                speed: 0.2
            },
            emerging: {
                frames: [1,2],
                speed: 0.2
            },
            hidden: [13,13]
        }
    });
    sprite_monster = new createjs.Sprite(sp_monster, "hidden");
    sprite_monster.setBounds(700,350,250,250);
    sprite_monster.setTransform(sprite_monster.getBounds().x,sprite_monster.getBounds().y, 1, 1);
    sprite_monster.framerate = 30;

    //Tentacle 1
    var sp_tentacle_1 = new createjs.SpriteSheet({
        "images": [loader.getResult("sp_tentacle_1")],
        "frames": {width:350, height:480},
        "animations": {
            visible: {
                frames: [15,16,17,18,19],
                speed: 0.2
            },
            emerging: {
                frames: [1,2,3,4],
                speed: 0.2
            },
            appear: {
                frames: [5,6,7,8,9,10,11,12,13,14],
                next: "visible",
                speed: 0.2
            },
            disappear: {
                frames: [14,13,12,11,10,9,8,7,6,5],
                next: "hidden",
                speed: 0.2
            },
            hidden: [0,0]
        }
    });
    sprite_tentacle_1 = new createjs.Sprite(sp_tentacle_1, "hidden");
    sprite_tentacle_1.setBounds(360,40,350,480);
    sprite_tentacle_1.setTransform(sprite_tentacle_1.getBounds().x,sprite_tentacle_1.getBounds().y, 1, 1);
    sprite_tentacle_1.framerate = 30;

    //Tentacle 2
    var sp_tentacle_2 = new createjs.SpriteSheet({
        "images": [loader.getResult("sp_tentacle_2")],
        "frames": {width:240, height:320},
        "animations": {
            visible: {
                frames: [15,16,17,18,19],
                speed: 0.2
            },
            emerging: {
                frames: [1,2,3,4],
                speed: 0.2
            },
            appear: {
                frames: [5,6,7,8,9,10,11,12,13,14],
                next: "visible",
                speed: 0.2
            },
            disappear: {
                frames: [14,13,12,11,10,9,8,7,6,5],
                next: "hidden",
                speed: 0.2
            },
            hidden: [0,0]
        }
    });
    sprite_tentacle_2 = new createjs.Sprite(sp_tentacle_2, "hidden");
    sprite_tentacle_2.setBounds(710,40,240,320);
    sprite_tentacle_2.setTransform(sprite_tentacle_2.getBounds().x,sprite_tentacle_2.getBounds().y, 1, 1);
    sprite_tentacle_2.framerate = 30;

    //Tentacle 3
    var sp_tentacle_3 = new createjs.SpriteSheet({
        "images": [loader.getResult("sp_tentacle_3")],
        "frames": {width:320, height:220},
        "animations": {
            visible: {
                frames: [15,16,17,18,19],
                speed: 0.2
            },
            emerging: {
                frames: [1,2,3,4],
                speed: 0.2
            },
            appear: {
                frames: [5,6,7,8,9,10,11,12,13,14],
                next: "visible",
                speed: 0.2
            },
            disappear: {
                frames: [14,13,12,11,10,9,8,7,6,5],
                next: "hidden",
                speed: 0.2
            },
            hidden: [0,0]
        }
    });
    sprite_tentacle_3 = new createjs.Sprite(sp_tentacle_3, "hidden");
    sprite_tentacle_3.setBounds(50,350,320,220);
    sprite_tentacle_3.setTransform(sprite_tentacle_3.getBounds().x,sprite_tentacle_3.getBounds().y, 1, 1);
    sprite_tentacle_3.framerate = 30;

    //Tentacle 4
    var sp_tentacle_4 = new createjs.SpriteSheet({
        "images": [loader.getResult("sp_tentacle_4")],
        "frames": {width:200, height:140},
        "animations": {
            visible: {
                frames: [15,16,17,18,19],
                speed: 0.2
            },
            emerging: {
                frames: [1,2,3,4],
                speed: 0.2
            },
            appear: {
                frames: [5,6,7,8,9,10,11,12,13,14],
                next: "visible",
                speed: 0.2
            },
            disappear: {
                frames: [14,13,12,11,10,9,8,7,6,5],
                next: "hidden",
                speed: 0.2
            },
            hidden: [0,0]
        }
    });
    sprite_tentacle_4 = new createjs.Sprite(sp_tentacle_4, "hidden");
    sprite_tentacle_4.setBounds(40,210,200,140);
    sprite_tentacle_4.setTransform(sprite_tentacle_4.getBounds().x,sprite_tentacle_4.getBounds().y, 1, 1);
    sprite_tentacle_4.framerate = 30;

    //Tentacle 5
    var sp_tentacle_5 = new createjs.SpriteSheet({
        "images": [loader.getResult("sp_tentacle_5")],
        "frames": {width:320, height:180},
        "animations": {
            visible: {
                frames: [15,16,17,18,19],
                speed: 0.2
            },
            emerging: {
                frames: [1,2,3,4],
                speed: 0.2
            },
            appear: {
                frames: [5,6,7,8,9,10,11,12,13,14],
                next: "visible",
                speed: 0.2
            },
            disappear: {
                frames: [14,13,12,11,10,9,8,7,6,5],
                next: "hidden",
                speed: 0.2
            },
            hidden: [0,0]
        }
    });
    sprite_tentacle_5 = new createjs.Sprite(sp_tentacle_5, "hidden");
    sprite_tentacle_5.setBounds(50,50,320,180);
    sprite_tentacle_5.setTransform(sprite_tentacle_5.getBounds().x,sprite_tentacle_5.getBounds().y, 1, 1);
    sprite_tentacle_5.framerate = 30;

    /*
     var sp_shipyard, sprite_bridgeyard;
     var sp_airport, sprite_bridgeyard;
     */

    //House
    var sp_house = new createjs.SpriteSheet({
        "images": [loader.getResult("sp_house")],
        "frames": {width:100, height:100},
        "animations": {
            // start, end, next, speed
            visible: {
                frames: [0,1,2,3,2,1],
                speed: 0.025
            }
        }
    });
    sprite_house = new createjs.Sprite(sp_house, "visible");
    sprite_house.setBounds(250,240,100,100);
    sprite_house.setTransform(sprite_house.getBounds().x,sprite_house.getBounds().y, 1, 1);
    sprite_house.framerate = 30;

    //BridgeYard
    var sp_bridgeyard = new createjs.SpriteSheet({
        "images": [loader.getResult("sp_bridgeyard")],
        "frames": {width:100, height:100},
        "animations": {
            // start, end, next, speed
            visible: {
                frames: [0,1,2,3,2,1],
                speed: 0.025
            }
        }
    });
    sprite_bridgeyard = new createjs.Sprite(sp_bridgeyard, "visible");
    sprite_bridgeyard.setBounds(360,120,100,100);
    sprite_bridgeyard.setTransform(sprite_bridgeyard.getBounds().x,sprite_bridgeyard.getBounds().y, 1, 1);
    sprite_bridgeyard.framerate = 30;

    //Shipyard
    var sp_shipyard = new createjs.SpriteSheet({
        "images": [loader.getResult("sp_shipyard")],
        "frames": {width:100, height:100},
        "animations": {
            // start, end, next, speed
            visible: [0,0]
        }
    });
    sprite_shipyard = new createjs.Sprite(sp_shipyard, "visible");
    sprite_shipyard.setBounds(120,380,100,100);
    sprite_shipyard.setTransform(sprite_shipyard.getBounds().x,sprite_shipyard.getBounds().y, 1, 1);
    sprite_shipyard.framerate = 30;

    //airport
    var sp_airport = new createjs.SpriteSheet({
        "images": [loader.getResult("sp_airport")],
        "frames": {width:100, height:100},
        "animations": {
            // start, end, next, speed
            visible: {
                frames: [5],
                speed: 0.025
            },
            withPlane: {
                frames: [0,1,2,3],
                speed: 0.025
            }
        }
    });
    sprite_airport = new createjs.Sprite(sp_airport, "visible");
    sprite_airport.setBounds(160,120,100,100);
    sprite_airport.setTransform(sprite_airport.getBounds().x,sprite_airport.getBounds().y, 1, 1);
    sprite_airport.framerate = 30;

    //Goldmine
    var sp_goldmine = new createjs.SpriteSheet({
        "images": [loader.getResult("sp_goldmine")],
        "frames": {width:100, height:100},
        "animations": {
            // start, end, next, speed
            gold: [0,0],
            noGold: [1,1]
        }
    });
    sprite_goldmine = new createjs.Sprite(sp_goldmine, "gold");
    sprite_goldmine.setBounds(750,100,100,100);
    sprite_goldmine.setTransform(sprite_goldmine.getBounds().x,sprite_goldmine.getBounds().y, 1, 1);
    sprite_goldmine.framerate = 30;

    //Plane
    var sp_plane = new createjs.SpriteSheet({
        "images": [loader.getResult("sp_plane")],
        "frames": {width:1000, height:600},
        "animations": {
            // start, end, next, speed
            takeoff: {
                frames: [0,1,2,3,4,5,6,7],
                speed: 0.05,
                next: "stationary"
            },
            stationary: [0,0]
        }
    });
    sprite_plane = new createjs.Sprite(sp_plane, "stationary");
    sprite_plane.setBounds(0,0,1000,600);
    sprite_plane.setTransform(sprite_plane.getBounds().x,sprite_plane.getBounds().y, 1, 1);
    sprite_plane.visible = false;
    sprite_plane.framerate = 30;

    //text
    t_time = new createjs.Text("3:00", "16px minecraftia", "#fff");
    t_time.x = 480;
    t_time.y = 20;
    t_time.textBaseline = "alphabetic";
    t_lives = new createjs.Text("3 Lives", "16px minecraftia", "#000");
    t_lives.x = 720;
    t_lives.y = 20;
    t_lives.textBaseline = "alphabetic";
    t_gold = new createjs.Text("500 Gold", "16px minecraftia", "#000");
    t_gold.x = 930;
    t_gold.y = 20;
    t_gold.textBaseline = "alphabetic";
    t_health = new createjs.Text("100 Health", "16px minecraftia", "#000");
    t_health.x = 770;
    t_health.y = 20;
    t_health.textBaseline = "alphabetic";
    t_energy = new createjs.Text("100", "16px minecraftia", "#000");
    t_energy.x = 850;
    t_energy.y = 20;
    t_energy.textBaseline = "alphabetic";
    t_hint = new createjs.Text("Hint: Collect Gold", "17px minecraftia", "#000");
    t_hint.x = 15;
    t_hint.y = 65;
    t_hint.textBaseline = "alphabetic";

    t_but_plane = new createjs.Text("", "12px minecraftia", "#000");
    t_but_plane.x = 210;
    t_but_plane.y = 246;
    t_but_plane.textAlign = "center";
    t_but_plane.textBaseline = "alphabetic";
    t_but_boat = new createjs.Text("", "12px minecraftia", "#000");
    t_but_boat.x = 170;
    t_but_boat.y = 525;
    t_but_boat.textAlign = "center";
    t_but_boat.textBaseline = "alphabetic";
    t_but_bridge = new createjs.Text("", "12px minecraftia", "#000");
    t_but_bridge.x = 410;
    t_but_bridge.y = 246;
    t_but_bridge.textAlign = "center";
    t_but_bridge.textBaseline = "alphabetic";

    //Button Bridge
    var standard_button = new createjs.SpriteSheet({
        "images": [loader.getResult("sp_button")],
        "frames": {width:100, height:40},
        "animations": {
            active: [0,0],
            noGold: [1,1]
        }
    });

	// Button Bridge
	but_bridge = new createjs.Sprite(standard_button, "active");
    but_bridge.setBounds(360,220,100,50);
    but_bridge.setTransform(but_bridge.getBounds().x,but_bridge.getBounds().y, 1, 1);
    but_bridge.visible = false;
    but_bridge.addEventListener("click",clickBridgeyard);
    sprite_bridgeyard.addEventListener("click",clickBridgeyard);

    //Button Boat
    but_boat = new createjs.Sprite(standard_button, "active");
    but_boat.setBounds(120,500,100,50);
    but_boat.setTransform(but_boat.getBounds().x,but_boat.getBounds().y, 1, 1);
    but_boat.visible = false;
    but_boat.addEventListener("click",clickShipyard);
    sprite_shipyard.addEventListener("click",clickShipyard);

    //Button Plane

    but_plane = new createjs.Sprite(standard_button, "active");
    but_plane.setBounds(160,220,100,50);
    but_plane.setTransform(but_plane.getBounds().x,but_plane.getBounds().y, 1, 1);
    but_plane.visible = false;
    but_plane.addEventListener("click",clickAirportyard);
    sprite_airport.addEventListener("click",clickAirportyard);

    but_goldmine = new createjs.Shape();
    but_goldmine.setBounds(750,200,100,40);
    var matrix = new createjs.Matrix2D;
    matrix.translate(but_goldmine.getBounds().x, but_goldmine.getBounds().y);
    but_goldmine.graphics.beginBitmapFill(loader.getResult("but_goldmine"), "no-repeat", matrix).drawRect(but_goldmine.getBounds().x, but_goldmine.getBounds().y,but_goldmine.getBounds().width,but_goldmine.getBounds().height);
    but_goldmine.visible = false;
    but_goldmine.addEventListener("click",clickGoldmine);
    sprite_goldmine.addEventListener("click",clickGoldmine);

    but_home = new createjs.Shape();
    but_home.setBounds(250,320,100,40);
    var matrix = new createjs.Matrix2D;
    matrix.translate(but_home.getBounds().x, but_home.getBounds().y);
    but_home.graphics.beginBitmapFill(loader.getResult("but_home"), "no-repeat", matrix).drawRect(but_home.getBounds().x, but_home.getBounds().y,but_home.getBounds().width,but_home.getBounds().height);
    but_home.visible = false;
    but_home.addEventListener("click",clickHouse);
    sprite_house.addEventListener("click",clickHouse);

    //Icons Sprite


    //Player Sprite
    sp_player = new createjs.SpriteSheet({
        "images": [loader.getResult("sp_player")],
        "frames": {width:80, height:80},
        /*"animations": {
            // start, end, next, speed
            resting: [0,3],
            left: [16,17,"left",0.25],
            right: [8,9,"right",0.25],
            up: [24,25,"up",0.25],
            down: [32,33,"down",0.25],
            boat_right: [40,44,""]
        }*/
        "animations": {
            // start, end, next, speed
            resting: {
                frames: [0,1,2,3],
                speed: 0.25
            },
            dead: {
                frames: [26],
                speed: 0.25
            },
            respawn: {
                frames: [27],
                speed: 0.25
            },
            left: {
                frames: [16,17],
                speed: 0.25
            },
            right: {
                frames: [8,9],
                speed: 0.25
            },
            up: {
                frames: [24,25],
                speed: 0.25
            },
            down: {
                frames: [32,33],
                speed: 0.25
            },
            left_gold: {
                frames: [20,21],
                speed: 0.25
            },
            right_gold: {
                frames: [12,13],
                speed: 0.25
            },
            up_gold: {
                frames: [28,29],
                speed: 0.25
            },
            down_gold: {
                frames: [36,37],
                speed: 0.25
            },
            boat_resting_right: {
                frames: [40,41],
                speed: 0.1
            },
            boat_right: {
                frames: [41,42,43,44],
                speed: 0.25,
                next: "boat_resting_right"
            },
            boat_resting_left: {
                frames: [48,49],
                speed: 0.1
            },
            boat_left: {
                frames: [49,50,51,52],
                speed: 0.25,
                next: "boat_resting_left"
            },
            boat_resting_up: {
                frames: [56,57],
                speed: 0.1
            },
            boat_up: {
                frames: [58,59],
                speed: 0.25,
                next: "boat_resting_up"
            },
            boat_resting_down: {
                frames: [64,65],
                speed: 0.1
            },
            boat_down: {
                frames: [66,67],
                speed: 0.25,
                next: "boat_resting_down"
            },
            boat_up_left: {
                frames: [74]
            },
            boat_down_left: {
                frames: [72]
            },
            boat_up_right: {
                frames: [75]
            },
            boat_down_right: {
                frames: [73]
            }
        }

    });
    player.sprite = new createjs.Sprite(sp_player, "resting");
    player.sprite.setTransform(player.getX(player.startX), player.getY(player.startY), 1, 1);
    player.sprite.setBounds(player.getX(player.startX),player.getY(player.startY),player.width,player.height);
    player.sprite.framerate = 30;

    //static images
    stage.addChild(i_water,i_top_menu,i_island_1,i_island_2, i_gold, i_health, i_lives, i_sound, i_time, i_hasBoat, i_hasGold, i_restart, i_rules, i_high_scores, i_battery);

    //sprite
    stage.addChild(sprite_bridge_1,sprite_bridge_2);

    stage.addChild(sprite_house,sprite_airport, sprite_shipyard,sprite_bridgeyard,sprite_goldmine);



    //text
    stage.addChild(t_time,t_lives,t_gold,t_health,i_hint,t_energy);

    //buttons
    stage.addChild(but_goldmine, but_home, but_bridge, but_boat, but_plane, but_sound);

    stage.addChild(t_but_bridge,t_but_plane,t_but_boat);

    //player
    stage.addChild(player.sprite);

    // menus
    stage.addChild(sprite_monster,sprite_tentacle_1,sprite_tentacle_4,sprite_tentacle_3,sprite_tentacle_2,sprite_tentacle_5,sprite_plane);

    stage.addChild(i_highScoresContainer, i_rulesContainer);
    stage.addChild(i_hint,t_hint);

    //filters
    stage.addChild(i_take_damage);

    createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
    createjs.Ticker.setFPS(30);
    createjs.Ticker.addEventListener("tick", tick);

    monster.isMonsterReady();

}

