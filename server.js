const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3001;
const app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    const now = new Date().toString();
    const log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log+'\n', (err) => {
        if (err) console.log(err);
    })
    next();
});

app.use((req, res, next) => {
    res.render('maintenance');
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
   res.render('home', {
        welcomeMessage: 'Welcome to our Home',
        pageTitle: 'Home 11',
        currentYear: new Date().getFullYear(),
   });
});

app.get('/about', (req, res) => {
    res.render('about', {
        pageTitle: 'About Page 2',
        currentYear: new Date().getFullYear(),
    });
});

app.get('/bad', (req, res) => {
    const obj = {
        errorMessage: 'Unable to fulfill this request'
    }
    res.send(obj);
})

app.listen(port, () => {
    console.log(`Server is now up on port ${port}`);
});
