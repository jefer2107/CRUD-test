const express = require("express")
const consign = require("consign")
const expressValidator = require("express-validator")
const cors = require('cors')

let app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(expressValidator())

consign().include("routes").include("utils").into(app)

app.listen(4000,"127.0.0.1",()=>{

    console.log("Rodando")
})