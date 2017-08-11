var http = require('http');
var os = require('os');
var hostname = os.hostname();
var listeningPort = 80;
var hitCountTotal = 0;
//var hitCountHW = 0;
var server = http.createServer(function (req, res) {
  //don't waste time with favicons
  if (req.url != "/favicon.ico") {
    if (req.url == "/metrics") {
      // /metrics for Prometheus monitoring
      res.writeHead(200, {"Content-Type": "text/plain; version=0.0.4"});
      res.write("# HELP hit_count_total The total amount of hits to this service exluding /favicon and /metrics." + "\n");
      res.write("# TYPE hit_count_total counter" + "\n");
      res.write("hit_count_total " + hitCountTotal + "\n");
      //res.write("# HELP hit_count_hw The amount of unparametised hits (ie returns 'Hello World' to this service exluding /favicon and 
/metrics ." + "\n")
      //res.write("hit_count_hw: " + hitCountHW + "\n");
      res.end();
    } else {
      var date = new Date().toISOString();
      var name = "World"
      if (req.url != "/") {
        name = req.url.split("/")[1];
      } // else {
      //  hitCountHW ++;
      //}
      // respond to the request
      res.writeHead(200, {"Content-Type": "text/plain"});
      res.write("Hello " + name + "\n");
      res.write("from demo@" + hostname + "\n");
      res.write("at " + date + "\n");
      res.end();
      // do some logging
      var clientIp = null;
      var forwardedIps = req.headers['x-forwarded-for'];
      if (forwardedIps) {
        clientIp = forwardedIps[0];
      } else {
        clientIp = req.connection.remoteAddress;
      }
      hitCountTotal++
      console.log(date + "\t" + hostname + "\t" + "[ INFO]" + "\t" + clientIp + "\t" + hitCountTotal + "\t" + name + "\t" + req.url);
      if (hitCountTotal %100 == 0)
      {
        console.log(date + "\t" + hostname + "\t" + "[MAJOR]" + "\t" + "hit count: " + hitCountTotal)
      } else if (hitCountTotal %10 == 0)
      {
        console.log(date + "\t" + hostname + "\t" + "[ WARN]" + "\t" + "hit count: " + hitCountTotal)
      }
    }
  }
});
server.listen(listeningPort );
console.log("Server running at http://localhost:" + listeningPort + "/");
