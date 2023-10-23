const express = require('express');
const session = require('express-session');
const DataController = require('./controller/DataController')
const cors = require('cors');
const app = express();
const port = 5000;
app.use(express.json())
const routes = require('./routes/routes')
app.use(cors())

var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSucessStatus: '200'
}

app.use(cors(corsOptions))
app.use(routes)
app.listen(port, () => {
    
  });