
!function(window, document, undefined) {
  
  var map = new Datamap({
    element: document.getElementById('map'),
    fills: {
      defaultFill: '#000000'
    },
    projection: 'orthographic',
    projectionConfig: {
      rotation: [97,-30]
    },
    // height: window.innerHeight,
    width: window.innerWidth,
    responsive: true,
    geographyConfig: {
      highlightOnHover: false,
      popupOnHover: false,
      // popupTemplate:function(geo){console.log(geo.id);}
    }
  });

  window.addEventListener('resize', function() {
    map.resize();
  });

  function playGame() {
    console.log("Play game")
  }
  init();
  function init() {
    var b = document.getElementById('u-i');
    b.onclick = nextQuestion;
  }

  var inc = 0.03;
  var previous = {'id': 'start', 'centroid':[97, -30]};
  var countries = [];
  var country;
  var called = {};
  map.worldTopo.objects.world.geometries.forEach(function(c) {
    countries.push({"id":c.id, "name":c.properties.name});
  });

  console.log(map);

  function nextQuestion() {
    inc = 0.03
    var index = Math.floor(Math.random()*(countries.length+1));
    country = countries[index];
    var centroid = getCentroid(country.id);
    var interp = d3.geo.interpolate(previous.centroid, centroid);
    map.customRotate(centroid);
    clearFocus(previous.id);
    rotateTo(interp, function() {
      previous = {'id': country.id, 'centroid': centroid};
      called[country.name] = true;
      question(country.name);
    });
  }

  function rotateTo(interp, cb) {
    d3.timer(function() {
      if (Math.floor(inc) === 1) {
        cb();
        return true;
      }

      var rotation = interp(inc);
      map.customRotate(rotation);

      inc += 0.03;
    });
  }
// datamaps-subunit CHE
  map.svg.selectAll(".datamaps-subunit")
    .each(function(d,i) {
      if (i===1)console.log(d);
      countries.push({"name":d.properties.name, "id": d.id});
    });

  function getCentroid(id) {
    var centroid;
    map.svg.selectAll(".datamaps-subunit." + id)
      .each(function(d,i) {
        console.log(d);
        centroid = d3.geo.centroid(d);

      })
      .style('fill', "#ff0000")
      .style('stroke', "#ffffff")
      .style('stroke-width', "0.5px")
      .style('fill-opacity', 1);
    return centroid;
  }


  function clearFocus(id) {
    map.svg.selectAll(".datamaps-subunit." + id)
    .style('fill', "#000000")
    .style('stroke', "#FDFDFD")
    .style('stroke-width', "0.5px")
    .style('fill-opacity', 1);
  }


  nextQuestion();

  function question(country) {
    //GRAB USER INPUT
    console.log("QUESTION: ", country);
  }

  var i = document.getElementById("u-input");

  i.onkeypress = getInput;

  function getInput(e) {
    if (e.which === 13 || e.keyCode === 13) {
      console.log("RETURN");
      checkAnswer(i.value);
    }
  }

  function checkAnswer(input) {
    if (input.toLowerCase() === country.name.toLowerCase()) {
      console.log("Correct!");
      i.value = "";
      nextQuestion();
    }
  }


}(window, document);