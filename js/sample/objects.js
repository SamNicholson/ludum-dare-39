
function GameProperties () {

    //instantiate a reference in this scope, so we can use it at lower scope levels
    var thisGame  = this;
    var bridgeCost;
    var boatCost;
    var planeCost;

    this.init = function init() {
        thisGame.bridgeCost = 0;
        thisGame.boatCost = 100;
        thisGame.planeCost = 0;
    };
}

/*self instantiate in the global namespace for usage*/

var gameProps = new GameProperties();
gameProps.init();