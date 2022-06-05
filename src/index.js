import dotenv from 'dotenv'
import express from 'express'
import ip from 'ip'
import cors from 'cors'
import bodyParser from 'body-parser'
import Response from './domain/response.js'




// const HttpStatus = {
//     OK: { code: 200, status: 'OK' },
//     CREATED: { code: 201, status: 'CREATED' },
//     NO_CONTENT: { code: 204, status: 'NO_CONTENT' },
//     BAD_REQUEST: { code: 400, status: 'BAD_REQUEST' },
//     NOT_FOUND: { code: 404, status: 'NOT_FOUND' },
//     INTERNAL_SERVER_ERROR: { code: 500, status: 'INTERNAL_SERVER_ERROR' },
//   }



dotenv.config()
const PORT = process.env.SERVER_PORT || 3000
const app = express()


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors({ origin: '*' })) // not recommended

// console.log(HttpStatus.OK.code)

app.get('/', (req, res) =>
  res.send(
    new Response(
      200,
      'OK',
      `Patient API v ${process.env.npm_package_version} \n All Systems GOOD`,
      { patients: {name:'Junior' }}

    )
  )
)

app.listen(PORT, () =>
  console.log(`server running on: http://${ip.address()}:${PORT}`)
)
