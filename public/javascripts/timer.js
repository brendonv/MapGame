!function(window, document) {
  
  function Timer(el) {
    //PUBLIC VARS
    this.div = el;
    this.startT;

    //PRIVATE VARS
    var itv;
    
    //PRIVILEGED METHODS
    this.updateDiv = function() {
      itv = window.setInterval(itvFunc.bind(this, this.startT, this.div), 10);
    }
    
    this.cancelInterval = function() {
      window.clearInterval(itv);
    }
    
    //PRIVATE METHOD
    function itvFunc(start, element) {
      element.value = format(Date.now() - start);
    }


    function format(t) {
      var t = t.toString().split('').reverse();
      return (t[6] || "0") + (t[5] || "0") + ":" + (t[4] || "0") + (t[3] || "0") + ":" + (t[2] || "0") + (t[1] || "0");
    }
  }

  Timer.prototype = {
    start: function() {
      this.startT = Date.now();
      this.updateDiv();
      return this.startT;
    },
    end: function() {
      this.cancelInterval();
      return Date.now() - this.startT;
    }
  };
  
  //EXPOSE
  if (!window.Timer) window.Timer = Timer;

}(window, document, undefined);