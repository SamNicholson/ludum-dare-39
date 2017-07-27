
function SpriteMonster () {

    //instantiate a reference in this scope, so we can use it at lower scope levels
    var thisMonster  = this;
    var thisPlayer;
    var thisGameProps;
	var timeSinceLastAttack;
	var timeBetweenAttacks;
	var isAnimating;
	var isAttacking;

    var emergeTime;
    var appearTime;
    var disappearTime;

    var firstAttack;


    this.init = function init(player, gameProps) {
		thisPlayer = player;
		thisGameProps = gameProps;
		thisMonster.timeSinceLastAttack = new Date();
		thisMonster.timeBetweenAttacks = 7;
		thisMonster.isAnimating = false;
		thisMonster.isAttacking = false;
        thisMonster.emergeTime = 1000;
        thisMonster.appearTime = 2000;
        thisMonster.disappearTime = 3000;
        thisMonster.firstAttack = true;
    };
	
	this.isMonsterReady = function isMonsterReady() {
        // Check to see if the monster is ready to be shown
		
		// If there's been enough time?
		// If there is enough gold?
		var now = new Date();
		var dif = Math.floor((now - thisMonster.timeSinceLastAttack)/1000);
        var randomAttackTime = thisMonster.timeBetweenAttacks + (Math.random() * 2);

        /*console.log("Monster check");
        if(!thisMonster.isAnimating){
            console.log(" - monster not animating");
        }
        else{
            console.log(" - monster animating");
        }
        console.log(" - Dif = " + dif);
        console.log(" - Time Between Attacks (Random) = " + randomAttackTime);

        if((thisPlayer.gold > thisGameProps.bridgeCost || player.hasBoat)){
            console.log(" - Player Meets parameters");
        }
        else{
            console.log(" - Player Fails parameters");
        }
        */
		if (!thisMonster.isAnimating && dif > randomAttackTime && (thisPlayer.gold >= thisGameProps.bridgeCost || player.hasBoat)) {
			//console.log("Monster is coming");
			thisMonster.isAnimating = true;
            soundController.monsterAttack();
			// Make the monster appear
            if(!thisMonster.firstAttack){
			    setTimeout(thisMonster.emergingMonster, 1000);
			    setTimeout(thisMonster.appearMonster, 2000);
			    setTimeout(thisMonster.disappearingMonster, 3000);
            }
            else{
                setTimeout(thisMonster.emergingMonster, 1000);
                setTimeout(thisMonster.appearMonster, 4000);
                setTimeout(thisMonster.disappearingMonster, 5000);
                thisMonster.firstAttack = false;
            }
			
			thisMonster.decreaseTime();
		}
		else if (!thisMonster.isAnimating && Math.floor((Math.random()*150)+1) <= 5 && (thisPlayer.gold >= thisGameProps.bridgeCost || thisPlayer.onBoat)) {
			//console.log("Monster rumble");
			thisMonster.isAnimating = true;
			thisMonster.actiontimeout1 = setTimeout(thisMonster.emergingMonster, 1000);
			thisMonster.actiontimeout3 = setTimeout(thisMonster.hiddenMonster, 2000);
		}
		else {
			//console.log("Monster not ready");
		}
        setTimeout(thisMonster.isMonsterReady, 500);
    };
	
	this.emergingMonster = function emergingMonster() {
		sprite_monster.gotoAndPlay("emerging");
		sprite_tentacle_1.gotoAndPlay("emerging");
		sprite_tentacle_2.gotoAndPlay("emerging");
		sprite_tentacle_3.gotoAndPlay("emerging");
		sprite_tentacle_4.gotoAndPlay("emerging");
		sprite_tentacle_5.gotoAndPlay("emerging");
	};
	
	this.appearMonster = function appearMonster() {
		sprite_monster.gotoAndPlay("appear");
		sprite_tentacle_1.gotoAndPlay("appear");
		sprite_tentacle_2.gotoAndPlay("appear");
		sprite_tentacle_3.gotoAndPlay("appear");
		sprite_tentacle_4.gotoAndPlay("appear");
		sprite_tentacle_5.gotoAndPlay("appear");
        setTimeout(soundController.bang,1000);
        setTimeout(thisMonster.startAttack,1000);
    };

    this.startAttack = function setAttack() {
        thisMonster.isAttacking = true;
        thisMonster.damageBridges();
        setTimeout(thisMonster.unsetAttack,500);
    };

    this.unsetAttack = function unsetAttack() {
        thisMonster.isAttacking = false;
    }

	this.disappearingMonster = function disappearingMonster() {
		sprite_monster.gotoAndPlay("disappear");
		sprite_tentacle_1.gotoAndPlay("disappear");
		sprite_tentacle_2.gotoAndPlay("disappear");
		sprite_tentacle_3.gotoAndPlay("disappear");
		sprite_tentacle_4.gotoAndPlay("disappear");
		sprite_tentacle_5.gotoAndPlay("disappear");
		thisMonster.stopMonster();
	};
	
	this.hiddenMonster = function hiddenMonster() {
		sprite_monster.gotoAndPlay("hidden");
		sprite_tentacle_1.gotoAndPlay("hidden");
		sprite_tentacle_2.gotoAndPlay("hidden");
		sprite_tentacle_3.gotoAndPlay("hidden");
		sprite_tentacle_4.gotoAndPlay("hidden");
		sprite_tentacle_5.gotoAndPlay("hidden");
        thisMonster.isAnimating = false;
	};

	this.stopMonster = function stopMonster() {
		// Set some variables for next time
		thisMonster.isAnimating = false;
		thisMonster.timeSinceLastAttack = new Date();
	};
	
	this.decreaseTime = function decreaseTime() {
        //Math.floor((Math.random()*100)+1) < 50 &&
		if (thisMonster.timeBetweenAttacks > 2.5) {
			thisMonster.timeBetweenAttacks -= 0.5;
		}
	};

    this.damageBridges = function damageBridges() {
        // Check the state of the bridge, and destroy if needed

        var newPlayerPosition = player.sprite.getBounds();
        newPlayerPosition.y = player.getY(newPlayerPosition.y);
        newPlayerPosition.x = player.getX();

        if (player.gold >= gameProps.bridgeCost) {
            if (bridge1_standing) {
                //rand = Math.floor((Math.random()*100)+1);
                //if (rand < 20) {
                bridge1_health -= (40 + Math.floor((Math.random()*10)+1));
                if (bridge1_health <= 0) {
                    //logger("Bridge 1 was destroyed!");
                    bridge1_standing = false;
                    sprite_bridge_1.gotoAndPlay("broken");
                    soundController.destroyBridge();
                    //if the play is on a bridge, minus 100 health to kill them
                    if(collisionCheck(newPlayerPosition, sprite_bridge_1.getBounds())){
                        player.damageHealth(100);
                    }
                }
                //}
            }
            if (bridge2_standing) {
                //rand = Math.floor((Math.random()*100)+1);
                //if (rand < 20) {
                bridge2_health -= (20 + Math.floor((Math.random()*10)+1));
                if (bridge2_health <= 0) {
                    //logger("Bridge 2 was destroyed!");
                    bridge2_standing = false;
                    sprite_bridge_2.gotoAndPlay("broken");
                    soundController.destroyBridge();
                    if(collisionCheck(newPlayerPosition, sprite_bridge_2.getBounds())){
                        player.damageHealth(100);
                    }
                }
                //}
            }
        }
    }

}

/*self instantiate in the global namespace for usage*/
var monster = new SpriteMonster();
monster.init(player, gameProps);