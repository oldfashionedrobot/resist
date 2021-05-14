const express = require('express');
const compileSass = require('express-compile-sass');
const app = express();
const port = 3000;
const root = process.cwd();

app.use(
  compileSass({
    root: __dirname + '/client',
    sourceMap: true, // Includes Base64 encoded source maps in output css
    sourceComments: true, // Includes source comments in output css
    watchFiles: true, // Watches sass files and updates mtime on main files for each change
    logToConsole: false, // If true, will log to console.error on errors
  })
);

app.use('/ass', express.static('client'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client/index.html');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
