const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const handlebars = require('express-handlebars');
const db = require("./config/db");
const session = require('express-session');
const cookieParser = require('cookie-parser');
const route = require('./routes');
const methodOverride = require('method-override');
require('dotenv').config();

// Connect database
db.connect()

app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(session({
  secret: 'aiphone',
  resave: false,
  saveUninitialized: true,
}));



//Morgan quest HTTP
const morgan = require('morgan');
app.use(morgan('combined'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Template Engine
app.engine('hbs', handlebars.engine({ 
    extname: 'hbs',
    helpers: {
      sum: (a, b) => a + b,
    },
}));

//config source static
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

//Routes 
route(app);



app.listen(port, () => {
    console.log(`App listening on :http://localhost:${port}`);
});
