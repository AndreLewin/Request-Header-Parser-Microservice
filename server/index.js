const express = require('express');
const app = express();
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// Configuring webpack 
const config = require('../webpack.dev.config');
const compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  stats: {colors: true}
}));

app.get('/api/whoami/', (req, res) => {
  const headers = req.headers;
  
  const answer = {
    ipaddress: headers["x-forwarded-for"].split(',')[0],
    language: headers["accept-language"].split(',')[0],
    software: headers["user-agent"].match(/\((.*)\)/)[1]
    // Display the captured group .*, that is between ( and )
    // [0] contains the match, [1] contains the first captured group
  }
  
  // Send the answer to the user
  res.json(answer);
});

// listen for requests
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
