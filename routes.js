var express = require('express')

import search from search.js

const app = express()

const PORT = 3000

app.post('/', function (req, res){
    const language = req.query.language
    const word = req.query.query
    const jsonObj = req.body

    return search(word, language, jsonObj)
})

var server = app.listen(PORT, function() {})