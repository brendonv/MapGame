!function(window, document) {
  
  function Timer(el) {
    //PUBLIC VARS
    this.div = el;
    this.startT;

    //PRIVATE VARS
    var itv;
    
    //PRIVILEGED METHODS
    this.updateDiv = function() {
      if (itv) this.cancelInterval();
      itv = window.setInterval(itvFunc.bind(this, this.startT, this.div), 10);
    }
    
    this.cancelInterval = function() {
      if (itv) {
        window.clearInterval(itv);
        itv = null;
      }
    }
    
    //PRIVATE METHOD
    function itvFunc(start, element) {
      element.value = format(Date.now() - start);
    }


    function format(t) {
      var m = s = ms = 0;
  
      t = t % (60 * 60 * 1000);
      m = Math.floor( t / (60 * 1000) );
      t = t % (60 * 1000);
      s = Math.floor( t / 1000 );
      ms = Math.floor( (t % 1000) / 10 );

      m = m ? m < 10 ? m = "0" + m : m : "00"
      s = s ? s < 10 ? s = "0" + s : s : "00"

      return m + ":" + s + ":" + ms;
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