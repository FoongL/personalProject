//installing necessary packages
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const hbs = require('express-handlebars');


//setting up packages
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/public')));
app.engine('handlebars', hbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//feeding shit
app.get('/', (req, res) => {
  res.render('trending');
});



app.listen(8080);