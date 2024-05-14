import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import { router } from './routes'

const { ORIGIN } = process.env

export const app = express()
app.disable('x-powered-by')
app.use(helmet())
app.use(cors({ credentials: true, origin: ORIGIN }))
app.use(express.json())
app.use(
  morgan('tiny', {
    skip: function (req) {
      return req.path === '/'
    },
  }),
)
app.use(router)
