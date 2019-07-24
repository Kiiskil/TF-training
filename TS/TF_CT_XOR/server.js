/* 
This code sets up a basic server to run from the directory on 
port 3000. It will look for any html files in the directory 
that the server.js file is in, and the root 
directory will run index.html. 

Using node.js 
using express
*/

var path = require('path');
var express = require('express');

var app = express();

var staticPath = path.join(__dirname, '/');
app.use(express.static(staticPath));

app.listen(3000, function() {
  console.log('listening');
});