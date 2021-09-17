require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const dns = require('dns');
const url = require('url');


// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.use(bodyParser.urlencoded({extended: true}));

const url_list = [];

app.post('/api/shorturl', (req, res) => {
  const original_url = req.body.url;
  const short_url = url_list.length;

  // dns.lookup(original_url, (err, address, family) => {
  //   console.log(`address: ${address}, family: ${family}`);
  // })

  // const parsedUrl = url.parse(original_url);
  // console.log(parsedUrl);

  const obj = {
    original_url: original_url,
    short_url: short_url
  };

  if (!original_url.match(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/g)) {
    res.json({error: 'invalid url'});
  } else {
    url_list.push(obj);
    res.json(obj);
  };

});


const getUrlObjFromUrlNumber = (number) => {
  const result = url_list.filter(element => {
    if (element.short_url === parseInt(number)) {
      return element;
    };
  });
  return result[0];
}

app.get('/api/shorturl/:number', (req, res) => {
  const url_number = req.params.number;
  const urlObj = getUrlObjFromUrlNumber(url_number);
  res.redirect(urlObj.original_url);
}); 

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
