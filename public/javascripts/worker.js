onmessage = function(e) {
  console.log("Got message", e);
  postMessage("Got message");
};