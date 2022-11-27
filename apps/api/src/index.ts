import * as dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import {initTRPC} from '@trpc/server'
import * as trpcExpress from '@trpc/server/adapters/express'

dotenv.config()

export const t = initTRPC.create()

export const appRouter= t.router({home:t.procedure.query((req)=>{
  console.log(req.ctx)
  return {message:'Welcome to Mealy'}
})})

export type AppRouter = typeof appRouter

const app = express()

app.use(express.json())
app.use(cors())

if (process.env.NODE_ENV !== 'production') app.use(morgan('dev'))


app.get('/', (_req, res) => {
  res.status(200).json({ message: 'Welcome to Mealy' })
})

app.use('/api/trpc',trpcExpress.createExpressMiddleware({router:appRouter}))

app.listen(process.env.PORT, () => {
  console.log(`api is listening on port ${process.env.PORT}`)
})
