const express = require('express'); // import with non module

//make/Initialize express application
const app = express()
const port = 4000

// Make a routing and responses
app.get('/', (req, res) => {
  res.send('Hello World!, im using nodemon')
})

// Run the express.js application
app.listen(port, () => {
  console.log(`The express.js is running on port ${port}`)
})