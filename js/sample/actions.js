
var newXY = new Array(0, 0);
var newX, newY, newPlayerPosition, currentX, currentY, animation, moveAllowed = false;
var rand;

function playerMovement(playerDirection,requestedAnimation){

    //if there is no animation set, assume its the player direction
    if(!requestedAnimation){
        requestedAnimation = playerDirection;
    }

    //a switch statement on possible key combinations
    //move the player
    newXY = getPlayerPositionInDirection(playerDirection);
    newX = newXY[0];
    newY = newXY[1];

    //get what would be the new bounds to compare against the island etc
    newPlayerPosition = player.sprite.getBounds();
    newPlayerPosition.x = newX;
    newPlayerPosition.y = player.getY(player.getY(newY));

    moveAllowed = false;

    player.moveChunk = 5;

    if(sprint && player.energy > 2 && !player.carryingGold && !player.onBoat){
        player.moveChunk = 10;
        player.energy -= 2;
    }
    else if(player.carryingGold && !player.onBoat){
        player.moveChunk = 2.5;
    }

    //1 check for island 1
    if(collisionCheck(newPlayerPosition,i_island_1.getBounds())){
        player.setPosition(newX,newY);
        moveAllowed = true;
    }
    //2 check for island 2
    else if(collisionCheck(newPlayerPosition,i_island_2.getBounds())){
        player.setPosition(newX,newY);
        moveAllowed = true;
    }
    //3 check for bridge 1
    else if(bridge1_standing && collisionCheck(newPlayerPosition,sprite_bridge_1.getBounds())){
        player.setPosition(newX,newY);
        moveAllowed = true;
    }
    //4 check for bridge 2
    else if(bridge2_standing && collisionCheck(newPlayerPosition,sprite_bridge_2.getBounds())){
        player.setPosition(newX,newY);
        moveAllowed = true;
    }
    else if (player.hasBoat) {
        backOnSea(newX,newY);
    }
	
    if(moveAllowed = true){
        animation = player.sprite.currentAnimation;
        switch(requestedAnimation){
            case 'left':
                if (animation != 'left' && animation != 'left_gold') {
                    if(player.carryingGold){
                        player.sprite.gotoAndPlay("left_gold");
                    }
                    else{
                        player.sprite.gotoAndPlay("left");
                    }
                }
                break;
            case 'right':
                if (animation != 'right' && animation != 'right_gold') {
                    if(player.carryingGold){
                        player.sprite.gotoAndPlay("right_gold");
                    }
                    else{
                        player.sprite.gotoAndPlay("right");
                    }
                }
                break;
            case 'up_left':
            case 'up_right':
            case 'up':
                if (animation != 'up' && animation != 'up_gold') {
                    if(player.carryingGold){
                        player.sprite.gotoAndPlay("up_gold");
                    }
                    else{
                        player.sprite.gotoAndPlay("up");
                    }
                }
                break;
            case 'down_left':
            case 'down_right':
            case 'down':
                if (animation != 'down' && animation != 'down_gold') {
                    if(player.carryingGold){
                        player.sprite.gotoAndPlay("down_gold");
                    }
                    else{
                        player.sprite.gotoAndPlay("down");
                    }
                }
                break;
        }
    }


    //run a check to see if we are standing on the goldmine
    if(collisionCheck(newPlayerPosition,sprite_goldmine.getBounds()) && !player.carryingGold){
        //activate the goldmine button
        but_goldmine.visible = true;
    }
    else if(but_goldmine.visible){
        //grey out the goldmine button
        but_goldmine.visible = false;
    }
    //if he isnt on the goldmine he is on the house
    else if(collisionCheck(newPlayerPosition,sprite_house.getBounds()) && player.carryingGold){
        //activate the goldmine button
        but_home.visible = true;
    }
    else if(but_home.visible){
        //grey out the goldmine button
        but_home.visible = false;
    }



    //if he isnt on the goldmine he is on the bridgeyard
    else if(collisionCheck(newPlayerPosition,sprite_bridgeyard.getBounds())){
        if(player.gold >= gameProps.bridgeCost){
            but_bridge.gotoAndPlay("active");
            but_bridge.visible = true;
            t_but_bridge.text = "Build Bridge " + gameProps.bridgeCost;
            t_but_bridge.visible = true;
            but_bridge_active = true;
        }
        else{
            but_bridge.gotoAndPlay("noGold");
            t_but_bridge.text = "";
            but_bridge.visible = true;
            t_but_bridge.visible = true;
        }
    }


    //if he isnt on the goldmine he is on the shipyard
    else if(collisionCheck(newPlayerPosition,sprite_shipyard.getBounds()) && !player.onBoat){
    if(player.gold >= gameProps.boatCost){
            //activate the goldmine button
            but_boat.gotoAndPlay("active");
            but_boat.visible = true;
            t_but_boat.text = "Build Boat " + gameProps.boatCost;
            t_but_boat.visible = true;
            but_boat_active = true;
        }
        else{
            but_boat.gotoAndPlay("noGold");
            t_but_boat.text = "";
            but_boat.visible = true;
            t_but_boat.visible = true;
        }
    }
    //if he isnt on the goldmine he is on the airportyard
    else if(collisionCheck(newPlayerPosition,sprite_airport.getBounds())){
        if( player.gold >= gameProps.planeCost && !player.hasPlane){
            but_plane.gotoAndPlay("active");
            but_plane.visible = true;
            t_but_plane.text = "Build Plane " + gameProps.planeCost;
            t_but_plane.visible = true;
            but_plane_active = true;
        }
        else if(player.hasPlane){
            but_plane.gotoAndPlay("active");
            but_plane.visible = true;
            t_but_plane.text = "Fly Away!!";
            t_but_plane.visible = true;
            but_plane_active = true;
        }
        else{
            but_plane.gotoAndPlay("noGold");
            t_but_plane.text = "";
            but_plane.visible = true;
            t_but_plane.visible = true;
        }
    }
    else{
        resetButtons();
    }

}

function boatMovement(playerDirection, requestedAnimation){
    //a switch statement on possible key combinations
    //move the player
    newXY = getPlayerPositionInDirection(playerDirection);
    newX = newXY[0];
    newY = newXY[1];

    //get what would be the new bounds to compare against the island etc
    newPlayerPosition = player.sprite.getBounds();
    newPlayerPosition.x = newX;
    newPlayerPosition.y = player.getY(player.getY(newY));

    oktomove = true;
    if (newPlayerPosition.x < 0) { oktomove = false; }
    if (newPlayerPosition.x > w) { oktomove = false; }
    if (newPlayerPosition.y < 0) { oktomove = false; }
    if (newPlayerPosition.y > h) { oktomove = false; }

    //1 check for island 1 and island 2
    if (oktomove) {

        //if there is no animation set, assume its the player direction
        if(!requestedAnimation){
            requestedAnimation = playerDirection;
        }

        player.moveChunk = 5;

        if(moveAllowed = true){
            animation = player.sprite.currentAnimation;
            switch(requestedAnimation){
                case 'left':
                    if (animation != 'boat_left') {
                        player.sprite.gotoAndPlay("boat_left");
                    }
                    break;
                case 'right':
                    if (animation != 'boat_right') {
                        player.sprite.gotoAndPlay("boat_right");
                    }
                    break;
                case 'up_left':
                    if (animation != 'boat_up_left') {
                        player.sprite.gotoAndPlay("boat_up_left");
                    }
                    break;
                case 'up_right':
                    if (animation != 'boat_up_right') {
                        player.sprite.gotoAndPlay("boat_up_right");
                    }
                    break;
                case 'up':
                    if (animation != 'boat_up') {
                        player.sprite.gotoAndPlay("boat_up");
                    }
                    break;
                case 'down_left':
                    if (animation != 'boat_down_left') {
                        player.sprite.gotoAndPlay("boat_down_left");
                    }
                    break;
                case 'down_right':
                    if (animation != 'boat_down_right') {
                        player.sprite.gotoAndPlay("boat_down_right");
                    }
                    break;
                case 'down':
                    if (animation != 'boat_down') {
                        player.sprite.gotoAndPlay("boat_down");
                    }
                    break;
            }
        }

        if(!collisionCheck(newPlayerPosition,i_island_1.getBounds()) && !collisionCheck(newPlayerPosition,i_island_2.getBounds())){
            if(!collisionCheck(newPlayerPosition,sprite_bridge_1.getBounds()) && !collisionCheck(newPlayerPosition,sprite_bridge_2.getBounds())){
                player.setPosition(newX,newY);
            }
            else {
                player.damageHealth(1);
            }
        }
        else {
            backOnLand(newX,newY);
        }
    }

    //check whether the boat is dismountable after moving
    //1. Check whether up hits island 1 or island 2

}

function getPlayerPositionInDirection(playerDirection){
    currentX = player.getX();
    currentY = player.getY();
    newX = currentX;
    newY = currentY;
    switch(playerDirection){
        case 'left':
            newX = currentX - player.moveChunk;
            break;
        case 'right':
            newX = currentX + player.moveChunk;
            break;
        case 'up':
            newY = currentY - player.moveChunk;
            break;
        case 'down':
            newY = currentY + player.moveChunk;
            break;
    }
    return [newX,newY];
}

function resetButtons(){
    but_plane.visible = false;
    t_but_plane.visible = false;
    but_plane_active = false;
    but_boat.visible = false;
    t_but_boat.visible = false;
    but_boat_active = false;
    but_bridge.visible = false;
    t_but_bridge.visible = false;
}

function monsterCheck(){
    //monster.isMonsterReady();
    checkMonsterCollision();
}

function checkMonsterCollision() {

	if (!monster.isAttacking || player.hasWon) {
		return;
	}

	// Checking Player collision with the monster
	var hitZone = false;
    newPlayerPosition = player.sprite.getBounds();
	newPlayerPosition.y = player.getY(newPlayerPosition.y);
	newPlayerPosition.x = player.getX();

    if(collisionCheck(newPlayerPosition, sprite_tentacle_1.getBounds())){
        hitZone = true; // check for tentacle 1
    }
    else if(collisionCheck(newPlayerPosition, sprite_tentacle_2.getBounds())){
        hitZone = true; // check for tentacle 2
    }
    else if(collisionCheck(newPlayerPosition, sprite_tentacle_3.getBounds())){
        hitZone = true; // check for tentacle 3
    }
    else if(collisionCheck(newPlayerPosition, sprite_tentacle_4.getBounds())){
        hitZone = true; // check for tentacle 4
    }
    else if(collisionCheck(newPlayerPosition, sprite_tentacle_5.getBounds())){
        hitZone = true; // check for tentacle 5
    }
    else if(collisionCheck(newPlayerPosition, sprite_monster.getBounds())){
        hitZone = true; // check for monster
    }

	if (hitZone) {
		player.damageHealth(3);
	}
}

function checkActions(){
    newPlayerPosition = player.sprite.getBounds();
    newPlayerPosition.y = player.getY(newPlayerPosition.y);
    newPlayerPosition.x = player.getX();

    if(collisionCheck(newPlayerPosition, sprite_goldmine.getBounds())){
        clickGoldmine();
    }
    else if(collisionCheck(newPlayerPosition, sprite_bridgeyard.getBounds())){
        clickBridgeyard();
    }
    else if(collisionCheck(newPlayerPosition, sprite_airport.getBounds())){
        clickAirportyard();
    }
    else if(collisionCheck(newPlayerPosition, sprite_shipyard.getBounds())){
        clickShipyard();
    }
    else if(collisionCheck(newPlayerPosition, sprite_house.getBounds())){
        clickHouse();
    }

}

function showHighScores(mode) {
    if(!mode){
        mode = "";
    }
    if(mode == "menu"){
        startGame();
    }
    // ajax call to get the high scores
    $.get("scores.php", function(data) {
        var content = "<h1>High Scores</h1><table><tr><th>Rank</th><th>Name</th><th>Score</th><th>Date</th></tr>";

        $.each(data, function(i, result) {
            var row = "<tr><td>" + (i+1) + "</td><td>" + result.name + "</td><td>" + result.game_length + "</td><td>" + result.date + "</td></tr>"
            content += row;
        });
        content += "</table>";

        $("#place-holder").html(content).show().click(function() {
            closeHighScores();
        });

        createjs.Tween.get(i_highScoresContainer).to({y: 520}, 200);
        i_highScoresContainer.addEventListener("click", closeHighScores);
    });

}

function submitScore(name, score, callback) {
    jQuery.post("scores.php", {name: name, game_length: score}, callback);
}

function closeHighScores() {
    jQuery("#place-holder").html("").hide();
    createjs.Tween.get(i_highScoresContainer).to({y: 0}, 200);
}

function showRules(mode) {
    if(!mode){
        mode = "";
    }
    if(mode == "menu"){
        startGame();
    }

    jQuery.get("rules.html", function(content) {
        jQuery("#place-holder").html(content).show().click(function() {
            closeRules();
        });
    });

    createjs.Tween.get(i_rulesContainer).to({y: 520}, 200);
}

function showSubmit() {
    soundController.applause();
    jQuery.get("submit.html", function (content) {
        jQuery("#place-holder").html(content).show();
        $("#submission").on("submit", function(e) {
            e.preventDefault();
            var name = $("#name").val();
            submitScore(name, player.time, function() {
                $('#place-holder').html("");
                createjs.Tween.get(i_rulesContainer).to({y: 0}, 200);
                startMenu();
            });
        });
    });
    createjs.Tween.get(i_rulesContainer).to({y: 520}, 200);

}


function closeRules() {
    jQuery("#place-holder").html("");
    createjs.Tween.get(i_rulesContainer).to({y: 0}, 200);
}

function gameWon() {
    // enter high score
    player.hasWon = true;
    player.sprite.visible = false;
    sprite_airport.gotoAndPlay("visible");
    sprite_plane.visible = true;
    sprite_plane.gotoAndPlay("takeoff");
    soundController.takeoff();
    setTimeout(showSubmit, 1800)
    resetButtons();
}

function gameLost() {
    // menu, restart?
    startMenu("lost");
    soundController.stopGame();
}