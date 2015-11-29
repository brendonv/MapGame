var app     = require('express')(),
    env     = process.env.NODE_ENV || 'development',
    server  = require('http').createServer(app),
    io      = require('socket.io')(server, {
               'pingTimeout': 30000,
               'pingInterval': 5000 
              }),
     morgan = require('morgan');

server.listen(8080);
console.log("Socket server listening on 8080");
app.use(morgan('dev'));

// app.use(function(req, res, next) {
//   if(!req.secure && req.get('X-Forwarded-Proto') && (req.get('X-Forwarded-Proto') !== 'https')) {
//     res.redirect('https://' + req.get('Host') + req.url);
//   } else {
//     next();
//   }
// });

io.use(function(socket, next) {
  next();
});

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  console.log('socket connected');
  socket.on('disconnect', function() {
    console.log("SOCKET DISCONNECT");
  });
});
