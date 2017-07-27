var now, dif, secs, mins;

var monsterAppearing = false;

function tick(event) {

    t_gold.text = player.gold;
    t_health.text = player.health;
    t_lives.text = player.lives;

    t_energy.text = Math.floor(player.energy);

    /*
    var temp_var = bar_energy.x;
    bar_energy.scaleX = (Math.floor(player.energy) / 100);
    bar_energy.x = temp_var;
    */
    if(player.gold < 200 && !player.carryingGold){
        t_hint.text = 'Hint: Collect gold';
    }

    if(player.gold >= 200 && !player.carryingGold && !player.hasBoat){
        t_hint.text = 'Hint: Buy a boat';
    }

    if(player.gold >= 600 && !player.carryingGold && !player.hasPlane){
        t_hint.text = 'Hint: Buy a plane';
    }

	// Update timer
    if(!player.hasWon){
        now = new Date();
        dif = Math.floor((now - start_time)/1000);
        secs = add0(dif % 60);
        mins = add0(Math.floor(dif / 60));
        player.time = (Math.floor(dif / 60) * 60) + dif % 60;
        t_time.text =  mins + ":" + secs;
    }

    // Update player movement
    if (up && left) {
        if(!player.onBoat){
            playerMovement('up','up_left');
            playerMovement('left','up_left');
        }
        else{
            boatMovement('up','up_left');
            boatMovement('left','up_left');
        }
    }
    else if (up && right) {
        if(!player.onBoat){
            playerMovement('up','up_right');
            playerMovement('right','up_right');
        }
        else{
            boatMovement('up','up_right');
            boatMovement('right','up_right');
        }
    }
    else if (down && left) {
        if(!player.onBoat){
            playerMovement('down','down_left');
            playerMovement('left','down_left');
        }
        else{
            boatMovement('down','down_left');
            boatMovement('left','down_left');
        }
    }
    else if (down && right) {
        if(!player.onBoat){
            playerMovement('down','down_right');
            playerMovement('right','down_right');
        }
        else{
            boatMovement('down','down_right');
            boatMovement('right','down_right');
        }
    }
    else if (up) {
        if(!player.onBoat){
            playerMovement('up');
        }
        else{
            boatMovement('up');
        }
    }
    else if (down) {
        if(!player.onBoat){
            playerMovement('down');
        }
        else{
            boatMovement('down');
        }
    }
    else if (left) {
        if(!player.onBoat){
            playerMovement('left');
        }
        else{
            boatMovement('left');
        }
    }
    else if (right) {
        if(!player.onBoat){
            playerMovement('right');
        }
        else{
            boatMovement('right');
        }
    }
    if(!up && !down && !left && !right){
        if(!player.onBoat && !player.carryingGold){
            player.sprite.gotoAndPlay("resting");
        }
        else if(player.carryingGold && !player.onBoat){
            player.sprite.gotoAndPlay("down_gold");
        }
    }
    ///if(player.energy < 100 && !player.carryingGold){

    //}

    newPlayerPosition = player.sprite.getBounds();
    newPlayerPosition.x = newX;
    newPlayerPosition.y = player.getY(player.getY(newY));

    if(collisionCheck(newPlayerPosition,sprite_house.getBounds()) && player.energy < 100){
        player.energy += 1.2;
        soundController.recharge();
    }

	// Show Monster
    monsterCheck();

    stage.update(event);
}

function collisionCheck(rect1,rect2){

    if(rect1.y <= rect2.y){ //top edge
    // if ( rect1.x >= rect2.x + rect2.width || rect1.x + rect1.width <= rect2.x || rect1.y >= rect2.y + rect2.height || rect1.y + rect1.height <= rect2.y ){
        return false;
    }
    else if((rect2.y + rect2.height) <= rect1.y){ //bottom edge
        return false;
    }
    else if(rect1.x < rect2.x){ //left edge
        return false;
    }
    else if((rect2.x + rect2.width) <= rect1.x){ //right edge
        return false;
    }
    else{
        return true;
    }
}

function logger(text) {
	t_hint.text = text;
}

function add0(num) {
    if (num < 10) {
        num = "0" + num;
    }
    return num;
}

function debugCollision(x,y){
    var marker = new createjs.Shape;
    marker.graphics.beginFill('#FF0000');
    marker.graphics.drawRect(x,y,5,5);

    stage.addChild(marker);
}
