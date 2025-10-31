require('dotenv').config();

require('./database/db.connect.js');

require('./middleware/passport/passport.middleware.js');

const path = require('path');

const express = require('express');

const hpp = require('hpp');

const cors = require('cors');

const cookieParser = require('cookie-parser');

const helmet = require('helmet');

const rateLimit = require('express-rate-limit');

const errorHandler = require('./middleware/error/error.middleware.js');

const app = express();

const apiRouter = express.Router();

const cityRouter = require('./business/cities/routes/cities.routes.js');

const listingsRouter = require('./business/listings/listings.routes.js');

const authRouter = require('./auth/routes/auth.routes.js');

const usersRouter = require('./business/users/users.routes.js');

const bookingRouter = require('./business/booking/booking.routes.js');

app.set('trust proxy', 1);

app.use(helmet());

app.use(hpp());

app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

app.use(express.json());

app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: [ process.env.LOCAL_DOMAIN, process.env.PROD_DOMAIN ], credentials: true }));

app.use('/api', apiRouter);

apiRouter.use(cityRouter);

apiRouter.use(listingsRouter);

apiRouter.use(authRouter);

apiRouter.use(usersRouter);

apiRouter.use(bookingRouter);

// app.use(errorHandler);

app.get('/' , (req, res) => res.sendFile(path.join(__dirname, 'templates', 'default.html')));

module.exports = app;