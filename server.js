var http = require('http');

http.createServer(function (req, res) {
  res.end('Hello, world!');
}).listen(process.env.PORT || 3000);
