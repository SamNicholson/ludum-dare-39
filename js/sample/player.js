
function SpritePlayer () {

    //instantiate a reference in this scope, so we can use it at lower scope levels
    var thisPlayer  = this;
    var sprite;
    var spriteOffsetX;
    var spriteOffsetY;
    var startX;
    var startY;
    var moveChunk;
    var height;
    var width;
    var gold;
    var health;
    var lives;
    var time;
    var mineAddGold;
    var carryingGold;
    var energy;
    var plane;
    var hasWon;

    this.init = function init() {
        thisPlayer.spriteOffsetX = 40;
        thisPlayer.spriteOffsetY = 40;
        thisPlayer.startX = 300;
        thisPlayer.startY = 210;
        thisPlayer.moveChunk = 5;
        thisPlayer.height = 80;
        thisPlayer.width = 80;
        thisPlayer.gold = 0;
        thisPlayer.health = 100;
        thisPlayer.lives = 3;
        thisPlayer.time = 0;
        thisPlayer.mineAddGold = 100;
        thisPlayer.carryingGold = false;
        thisPlayer.hasBoat = false;
        thisPlayer.onBoat = false;
        thisPlayer.energy = 100;
        thisPlayer.hasPlane = false;
        thisPlayer.hasWon = false;
    };

	this.checkMonster = function checkMonster() {
        
    };
	
	this.damageHealth = function damageHealth(damage) {
        thisPlayer.health -= damage;
        i_take_damage.visible = true;
        createjs.Tween.get(i_take_damage).to({alpha: 0.3},100).to({alpha: 0},100);
        soundController.ouch();
        if (thisPlayer.health <= 0) {
			thisPlayer.health = 100;
			thisPlayer.lives -= 1;
			if (thisPlayer.lives <= 0) {
                gameLost();
			}
            else{
                thisPlayer.handleDeath();
            }
		}
    };

    this.handleDeath = function handleDeath() {
        thisPlayer.carryingGold = false;
        if(thisPlayer.onBoat){
            thisPlayer.onBoat = false;
            thisPlayer.hasBoat = false;
        }
        sprite_goldmine.gotoAndPlay("gold");
        thisPlayer.sprite.gotoAndPlay("resting");
        thisPlayer.setPosition(thisPlayer.startX,thisPlayer.startY);
    }

    //this function is used to make standardised POST/GET requests for JSON data, essentially AJAX calls
    this.setPosition = function setPosition(newX,newY) {
        thisPlayer.sprite.x = newX - thisPlayer.spriteOffsetX;
        thisPlayer.sprite.y = newY + thisPlayer.spriteOffsetY;
        thisPlayer.sprite.setBounds(thisPlayer.sprite.x,thisPlayer.sprite.y,thisPlayer.width,thisPlayer.height);
        soundController.walk();
    };

    this.getX = function getX(X) {
        if(!X){
            var x =  (thisPlayer.sprite.x + thisPlayer.spriteOffsetX);
        }
        else{
            var x =  (X - thisPlayer.spriteOffsetX);
        }
        return x;
    };

    this.getY = function getY(Y) {
        if(!Y){
            var y = (thisPlayer.sprite.y - thisPlayer.spriteOffsetY);
        }
        else{
            var y = (Y + thisPlayer.spriteOffsetY);
        }
        return y;
    };

}

/*self instantiate in the global namespace for usage*/
var player = new SpritePlayer();
player.init();