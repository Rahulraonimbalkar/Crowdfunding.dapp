var express = require('./node_modules/express');
var app = express();
const port = process.env.PORT || 3010

app.use(express.static('src'));
app.use(express.json());


app.get('/', function (req, res) {
  res.render('index.html');
});

if (typeof localStorage === "undefined" || localStorage === null) {
  LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./src');
  localStorage.removeItem('flagIndex')
}

if(localStorage.getItem('flagIndex')==='undefined' || localStorage.getItem('flagIndex')===null ) {
  localStorage.setItem('flagIndex.json', Math.floor((Math.random() * 243) + 1));
}

app.listen(port, function () {
  console.log('Dapp listening on port 3010!');
});

