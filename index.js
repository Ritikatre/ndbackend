const connectToMongo = require('./db');
connectToMongo(); 
const express = require('express')
const app = express()
const port = process.env.port || 3000
var cors = require('cors')
app.use(cors())


app.use(express.json()) // for allowing entries by user in  JSON format 

// Avaialble Routes
app.use('/api/auth/', require('./routes/auth'))
app.use('/api/news', require('./routes/news'))
app.use('/api/census', require('./routes/census'))

app.listen(port, () => {
  console.log(`Narmadiya Backend listening on port ${port}`)
})
// "serve": "nodemon server.js" 
