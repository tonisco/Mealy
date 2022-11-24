import * as dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (_req, res) => {
  res.status(200).json({ message: 'Welcome to Mealy' })
})

app.listen(process.env.PORT, () => {
  console.log(`api is listening on port ${process.env.PORT}`)
})
