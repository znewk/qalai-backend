const express = require('express')
const routes = require('./routes')
const cors = require('cors')

const PORT = process.env.PORT || 3030

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)

app.listen(PORT, ()=>console.log('server started on port: ' + PORT))
