require('dotenv').config({ path: './config.env' })
const express = require('express')
const connectDB = require('./config/db')
const errorHandler = require('./middleware/error')

// Connnect DB
connectDB()

const app = express()

app.use(express.json())

app.use('/api/auth', require('./routes/auth'))
app.use('/api/private', require('./routes/private'))

//Error Handlers (Should be the last pice of middleware)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

// app.use(cors())

const server = app.listen(PORT, () => {
  console.log(`Server Started at port ${PORT}`)
})

process.on('unhandledRejection', (err, promise) => {
  console.log(`Logged Error: ${err}`)
  server.close(() => {
    process.exit(1)
  })
})
