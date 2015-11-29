!function(window, document) {
  
  function Game() {
    this.level = 0;
    this.totalScore = 0;
  }

  Game.prototype.score = function(time) {
    var base = 100;
    this.level++;
    if (time > 10000) return this.totalScore += base;
    return this.totalScore += base + (1000/time)*1000;
  };

  Game.prototype.finalScore = function() {
    return this.totalScore;
  }

  if (!window.Game) window.Game = Game;

}(window, document, undefined);