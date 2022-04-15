const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const { engine } = require('express-handlebars');

const vTestApi = require('@routes/v0.2.api');
const authRouter = require('@routes/auth/auth.router');

const app = express();

app.set('json spaces', 2);
app.set('view engine', 'hbs');
app.set('views', path.resolve('src/views'));
app.engine(
  'hbs',
  engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: path.resolve('src/views/layouts'),
    partialsDir: path.resolve('src/views/partials'),
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.resolve('src/public')));
app.use(morgan('combined'));

app.get('/', (req, res) => {
  res.render('home');
});
app.use(authRouter);
app.use('/api', vTestApi);

module.exports = app;
