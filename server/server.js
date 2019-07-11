
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');
const fileUpload = require('express-fileupload');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const parksRouter = require('./routes/parks.router');
const reviewRouter = require('./routes/review.router');
const imagesRouter = require('./routes/images.router');
const UploaderS3Router = require('react-dropzone-s3-uploader/s3router');


// Express File Upload
app.use(fileUpload());

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/parks', parksRouter);
app.use('/api/review', reviewRouter);
app.use('/api/images', imagesRouter);
app.use('/s3', UploaderS3Router({
    bucket: 'parkviewmplsbucket',
    region: 'us-east-2',
    headers: { 'Access-Control-Allow-Origin': '*' },
    ACL: 'public-read',
}));

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
