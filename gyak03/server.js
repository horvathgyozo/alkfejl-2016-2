const express = require('express');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');

const app = express();
nunjucks.configure('views', {
    autoescape: true,
    express: app
});

// Middlewares
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function (req, res, next) {
  console.log(req.method, req.url);
  next();
});

app.get('/hello/:name', function (req, res) {
  const name = req.params.name;
  res.render('hello.njk', {
    name
  });
});

app.get('/bgcolor', function (req, res) {
  const color = req.query.color;
  const name = req.params.name;
  res.render('bgcolor.njk', {
    color
  });
});

app.get('/reg', function (req, res) {
  res.render('reg.njk', {
  });
});

app.post('/reg', function (req, res) {
  console.log(req.body);
  const {username} = req.body;
  res.end('ora vege');
});

var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Server is running!');
});