if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send(`Server listening to port ${PORT}`)
})

app.use('/audio', require('./routes/audios.routes'));

app.listen(PORT, () => {
    console.log(`Server listening to port ${PORT}`)
})