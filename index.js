const express = require('express')
const app = express()
const cors = require('cors')
const organizationRouter = require('./routes/organization')

let corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://team-dot-dataanalysisapp.uc.r.appspot.com',
    'http://localhost:8080',
    '*'
  ]
}


// allow-cors
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    if ('OPTIONS' === req.method) {
      //respond with 200
      res.send(200);
    }
    else {
      //move on
      next();
    }
  });

app.use(cors(corsOptions))
// allow-cors

app.use(express.json())




// error handler
app.use(function (err, req, res, next) {
    // render the error page
    res.status(err.status || 500);
    res.json({
      status: 'error',
      data: err.message,
      message: 'Something went wrong!!! Please try again later.'
    });
  });

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to data analysis app' })
})

app.use('/api/v1/organizations', organizationRouter);


const port = 8080
app.listen(port, () => {
  console.log(`Running at localhost: ${port}`)
})
