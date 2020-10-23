const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { DATABASE_URL } = require('./config/config');

const app = express();

// connection to  db
/*
mongoose.connect(DATABASE_URL)
    .then(db => console.log('db connected'))
    .catch(err => console.log(err));
*/

// importing routes
const indexRoutes = require('./routes/index');

// settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());



//routes
app.use('/', indexRoutes);
app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);

    new Promise((resolve, reject) => {
        const settings = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        };
        mongoose.connect(DATABASE_URL, settings, (err) => {
            if (err) {
                console.log('Hola')
                return eject(err);
            } else {
                console.log("Database connected succesfully.");
                return resolve();
            }
        })
    })

})