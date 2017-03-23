var http = require('http');
var os = require('os');
var hostname = os.hostname();
var url = require('url');
var getClientIp = function(req) {
  var ipAddress = null;
  var forwardedIpsStr = req.headers['x-forwarded-for'];
  if (forwardedIpsStr) {
    ipAddress = forwardedIpsStr[0];
  }
  if (!ipAddress) {
    ipAddress = req.connection.remoteAddress;
  }
  return ipAddress;
};
var server = http.createServer(function (req, res) {
  if (req.url != "/favicon.ico") {
    var date = new Date().toISOString();
    var name = "World"
    
    if (req.url != "/") {
      name = req.url.split("/")[1];
    }
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.write("Hello " + name + "\n");
    res.write("from bet365@" + hostname + "\n");
    res.write("at " + date + "\n");
    res.end();
  
    var clientIp = null;
    var forwardedIps = req.headers['x-forwarded-for'];
    if (forwardedIps) {
      clientIp = forwardedIps[0];
    } else {
      clientIp = req.connection.remoteAddress;
    }
    console.log(date + "\t" + clientIp + "\t" + name + "\t" + req.url);
  }
});
server.listen(80);
console.log("Server running at http://localhost:80/");
