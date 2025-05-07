const path = require('path');

const express = require('express');

const pool = require('./database/db.connection');

const app = express();

const cors = require('cors');

const apiRouter = express.Router();

const cityRouter = require('./business/cities/routes/cities.routes.js');

const addressRouter = require('./business/listings/address/address.routes.js');

const listingsRouter = require('./business/listings/listings.routes.js');

app.set('trust proxy', 1);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: [ 'http://localhost:3000', 'https://loca-sphere.vercel.app/'], credentials: true }));

app.use('/api', apiRouter);

apiRouter.use(cityRouter);

apiRouter.use(listingsRouter)

apiRouter.use(addressRouter);

app.get('/' , (req, res) => {

    res.sendFile(path.join(__dirname, 'templates', 'default.html'))
});

module.exports = app;