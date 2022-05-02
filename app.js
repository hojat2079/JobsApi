require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

//conntect to db
const connectDb = require('./db/mogoose');

//router
const authRouter = require('./routes/auth');
const jobRouter = require('./routes/jobs');

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

//middleware
const authMiddleware = require('./middleware/authentication');

//security packege
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')


app.set('trust proxy', true);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  })
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authMiddleware, jobRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 6000;

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
