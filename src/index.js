const express = require('express');
const cors = require('cors');
const app = express();
var morgan = require('morgan')
var fs = require('fs');


require('./database');

// const {encriptarContrasenias} = require('./scripts/abmDB')
// encriptarContrasenias()

var path = require('path');
// settings
app.set('port', process.env.PORT || 4000)
// middlewares
app.use(express.json());
app.use(cors());

var accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'), {flags: 'a'}
);
app.use(morgan(':date :remote-user ":referrer" :method ":url" ESTADO :status ',{stream: accessLogStream}))

app.get('/', function (req, res) {
    res.redirect('/api') 
  })
// routes
app.use('/api', require('./routes/index'));

app.listen(app.get('port'));
console.log('Server en puerto', app.get('port'));
