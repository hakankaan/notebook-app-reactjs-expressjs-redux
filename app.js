const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001;

var notebookRouter = require('./routes/notebook');

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/', notebookRouter);

app.listen(port, () => console.log(`Notebook backend ${port}'unu dinlemeye başladı!`))

module.exports = app;