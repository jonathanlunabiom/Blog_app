//requiring express (routes), session for user session, handlebars for the front end, path to join public folder
//controllers for page routes
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');
const routes = require('./controllers');

//sequelize to automatize processes and the sequelize store to storage the user's session
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

//custom helpers for the handlebars
const hbs = exphbs.create({});

//init express and config PORT either on local as online
const app = express();
const PORT = process.env.PORT || 3001;

//session cookies exp
const sess = {
    secret: 'Super secret secret',
    
    cookie: {
      maxAge: 1800000,
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
    },

    resave: false,
    saveUninitialized: true,
    //storage on the database
    store: new SequelizeStore({
        db: sequelize
    })
};


app.use(session(sess));

//Creating handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//enconding information from the browser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//using the public folder so you dont need to call it, *front end only visible*
app.use(express.static(path.join(__dirname, 'public')));

//Using controllers as route
app.use(routes);

//Starting server listening
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});