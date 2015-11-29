
!function(window, document, undefined) {
  
  var width = 960,
      height = 500;

  var projection = d3.geo.orthographic()
      .scale(248)
      .clipAngle(90);

  var canvas = d3.select("body").append("canvas")
      .attr("width", width)
      .attr("height", height);

  var c = canvas.node().getContext("2d");

  var path = d3.geo.path()
      .projection(projection)
      .context(c);

  var title = d3.select("h1");

  queue()
      .defer(d3.json, "/public/world.json")
      .defer(d3.tsv, "/public/world-country-names-edited.tsv")
      .await(ready);

  function ready(error, world, names) {
    if (error) throw error;
    var i = document.getElementById("u-input");
    var globe = {type: "Sphere"},
        land = topojson.feature(world, world.objects.land),
        countries = topojson.feature(world, world.objects.countries).features,
        borders = topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b; }),
        index = Math.floor(Math.random()*(countries.length+1)),
        n = countries.length;

    i.onkeypress = getInput;

    countries = countries.filter(function(d) {
      return names.some(function(n) {
        if (d.id == n.id) return d.name = n.name;
      });
    }).sort(function(a, b) {
      return a.name.localeCompare(b.name);
    });

    function transition() {
      d3.transition()
          // .duration(1000)
          .each("start", function() {
            console.log("start");
            title.text(countries[index].name);
          })
          .tween("zoomOut", function() {
          })
          .tween("rotate", function() {
            var p = d3.geo.centroid(countries[index]),
                r = d3.interpolate(projection.rotate(), [-p[0], -p[1]]);
            return function(t) {
              projection.rotate(r(t));
              c.clearRect(0, 0, width, height);
              c.fillStyle = "#bbb", c.beginPath(), path(land), c.fill();
              c.fillStyle = "#f00", c.beginPath(), path(countries[index]), c.fill();
              c.strokeStyle = "#fff", c.lineWidth = .5, c.beginPath(), path(borders), c.stroke();
              c.strokeStyle = "#000", c.lineWidth = 2, c.beginPath(), path(globe), c.stroke();
            };
          })
          .tween("zoomIn", function() {
          })
        .transition()
          .each("end", finishRotation);
    }

    function finishRotation() {
      country = countries[index];
      index = Math.floor(Math.random()*(countries.length+1));
      console.log(country);
      // transition();
    }
    transition();

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
        transition();
      }
    }

  }


}(window, document);