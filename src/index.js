import dotenv from 'dotenv'
import express from 'express'
import ip from 'ip'
import cors from 'cors'
import bodyParser from 'body-parser'
import Response from './domain/response.js'
import logger from './utils/logger.js'
import HttpStatus from './controller/patient.controller.js'
import patientRoutes from './route/patient.route.js'

dotenv.config()
const PORT = process.env.SERVER_PORT || 3000
const app = express()


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors({ origin: '*' })) // not recommended

// console.log(HttpStatus.OK.code)


app.use('/patients', patientRoutes);

app.get('/', (req, res) =>
  res.send(
    new Response(
      HttpStatus.OK.code, HttpStatus.OK.status,
      'Patient API - all systems good '
    )
  )
)

app.all('*', (req, res) => {
  res.status(HttpStatus.NOT_FOUND.code)
  .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, 'Route does not exist on the server'))
})


app.listen(PORT, () =>
  // console.log(`server running on: http://${ip.address()}:${PORT}`)
  logger.info(`server running on: http://${ip.address()}:${PORT}`)
);
