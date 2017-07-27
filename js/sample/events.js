
var keyDownCount = new Array();
//main keypress handler
$(document).bind('keydown', function (evt){
    var k = evt.keyCode;

    if (k == 87 || k == 119 || k == 38) {
        up = true;
    }

    if (k == 65 || k == 97 || k == 37) {
        left = true;
    }

    if (k == 83 || k == 115 || k == 40) {
        down = true;
    }

    if (k == 68 || k == 100 || k == 39) {
        right = true;
    }

    if(k == 16){
        sprint = true;
    }

    if(k == 13 || k == 32){
		checkActions();
    }
});

$(document).bind('keyup', function (evt){
    var k = evt.keyCode;
    var key = '';
    if (k == 87 || k == 119 || k == 38) {
        up = false;
    }

    if (k == 65 || k == 97 || k == 37) {
        left = false;
    }

    if (k == 83 || k == 115 || k == 40) {
        down = false;
    }

    if (k == 68 || k == 100 || k == 39) {
        right = false;
    }

    if(k == 16){
        sprint = false;
    }

});


function clickGoldmine(){
    if(but_goldmine.visible && !player.carryingGold){
        player.carryingGold = true;
        but_goldmine.visible = false;
        t_hint.text = "Hint: Take Gold Home";
        soundController.mine();
        sprite_goldmine.gotoAndPlay("noGold");
    }

}

function clickHouse(){
    if(but_home.visible && player.carryingGold){
        player.gold += player.mineAddGold;
        player.carryingGold = false;
        but_home.visible = false;
        t_hint.text = "Hint: Collect Gold";
        soundController.coin();
        sprite_goldmine.gotoAndPlay("gold");
    }
}

function clickBridgeyard(){
    if(but_bridge_active && (!bridge1_standing || !bridge2_standing)){
        player.gold -= gameProps.bridgeCost;

        if(!bridge1_standing){
            //repair bridge 1
            sprite_bridge_1.gotoAndPlay("standing");
            bridge1_health = 100;
            bridge1_standing = true;
        }
        else if(!bridge2_standing){
            //repair bridge 2
            sprite_bridge_2.gotoAndPlay("standing");
            bridge2_health = 100;
            bridge2_standing = true;
        }
        resetButtons();
    }
}

function clickShipyard(){
    if(but_boat_active && !player.hasBoat){
        player.gold -= gameProps.boatCost;
        player.onBoat = true;
        player.hasBoat = true;
        player.sprite.gotoAndPlay("boat_resting_right");
        but_boat.gotoAndPlay("inactive");
        player.setPosition(200,500);
        but_boat_active = false;
        resetButtons();
        soundController.startEngine();
    }
}

function clickAirportyard(){
    if(but_plane_active){
        if(!player.hasPlane){
            player.hasPlane = true;
            sprite_airport.gotoAndPlay("withPlane");
            //sprite_plane.visible = true;
            t_but_plane.text = "Fly Away!!";
        }
        else{
            gameWon();
        }

    }
}

function backOnLand(x, y){
    player.onBoat = false;
    player.sprite.gotoAndPlay("resting");
    player.setPosition(x, y);
    soundController.stopEngine();
}

function backOnSea(x, y){
    player.onBoat = true;
    player.sprite.gotoAndPlay("boat_resting_right");
    player.setPosition(x, y);
    soundController.startEngine();
}

function simulateClick(x, y) {
    jQuery(document.elementFromPoint(x, y)).click();
}

function restartGame() {
    soundController.stopMenuTheme();
    stage.removeAllChildren();
    bridge2_standing = true;
    bridge1_standing = true;
    stage.update();
    player.init();
    monster.init(player,gameProps);
    //start_time =
    startGame();
}

//handle the stopping of movement