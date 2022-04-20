const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const { engine, create } = require('express-handlebars');

const apiRouter = require(`@routes/api`);
const clientRouter = require('@routes/client');
const authRouter = require('@routes/auth/auth.router');
const { checkCurrentUser } = require('@middlewares/auth.middleware');

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
    helpers: {
      isDefined(value) {
        return value !== undefined;
      },
    },
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.resolve('src/public')));
app.use(morgan('combined'));

// WARNING: handlebar-express can't get the res.locals
app.get('*', checkCurrentUser);
app.use(authRouter);
app.use('/api', apiRouter);
app.use('/', clientRouter);

module.exports = app;
