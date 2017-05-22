const express = require('express'),
      app = express(),
      server = require('http').createServer(app),
      io = require('socket.io')(server),
      mongoose = require('mongoose'),
      bodyParser = require('body-parser'),
      path = require('path'),
      stock = require('./server/routes/stock'),
      controllers = require('./server/controllers'),
      axios = require('axios')

require('dotenv').load();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI);

app.use(bodyParser.json())
app.use('/api/stock', stock)

app.use(express.static(path.join(__dirname, './dist')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './dist/index.html'))
});

const portApp = process.env.PORT || 3000
server.listen(portApp, () => console.log('Running on localhost:', portApp))

// ------------------------------------------------------------

io.on('connection', (socket) => {
  let controller = controllers['stock']

  // The client sends 'addstock' event to server
  socket.on('addstock', symbol => {
    axios.get(`https://www.quandl.com/api/v3/datasets/WIKI/${symbol}.json?api_key=${process.env.QUANDL_API_KEY}`)
    .then(response => {
      controller.addStock(symbol, (err, result) => {
        if(err) throw err
        controller.findAll((err, result) => {
          if(err) throw err
          io.emit('newstock', result);
        })
      })
    })
    .catch(err => {
      console.log(err)
    })
  })

  socket.on('deletestock', symbol => {
    io.emit('deletestock', symbol)
  })
});
