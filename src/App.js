import express from 'express'
import bodyParser from 'body-parser'
import multer from 'multer'

const App = express()
App.use(express.static('public'))
App.use(bodyParser.json())
App.use(bodyParser.urlencoded({ extended: false }))
// App.use(multer({ dest: '/tmp/' }))
export default App