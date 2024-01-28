const express = require('express')
const mongoose = require('mongoose')

const bodyParser = require('body-parser')
const { validate, ValidationError, Joi } = require('express-validation')
const cookieParser = require('cookie-parser')

const authRoutes = require('./routes/authRouths');
const postRoutes = require('./routes/postRouths');
const commentRoutes = require('./routes/commentRouths');

const app = express();
const port = process.env.PORT
const DATABASE_URL = process.env.DATABASE_URL

app.use(bodyParser.json())
app.use(cookieParser())

app.use('/auth', authRoutes);
app.use('/post', postRoutes);
app.use('/comment', commentRoutes);



app.use(function (err, req, res, next) {
    if (err instanceof ValidationError) {
        return res.status(err.statusCode).json(err)
    }
    console.log(err)
    return res.status(500).json({})
})
// app.use((err, req, res, next) => {
//   console.error(err);
//   res.status(err.status || 500).json({ error: err.message });
// });

const mongoDB = async () => {
    try {
        const conn = await mongoose.connect(`${DATABASE_URL}`);
        // console.log(`MongoDB connected: ${conn.connection.host}:${conn.connection.port}`);
        return conn;
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};
mongoDB();


app.listen(port || 3003, () => { console.log("server is working"); });