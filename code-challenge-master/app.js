const express = require('express')
const cors=require("cors");
const app = express()
const port = 3000

const login = require('./login')
const encoder = require('./encoder')
const authorization = require('./middleware/authorization')

const corsOptions ={
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization'],
  credentials:true,
}

app.use(cors(corsOptions))

app.use(express.json())

app.post('/login', login)

app.post('/encode', authorization, encoder)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

module.exports= app