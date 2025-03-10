const express = require('express')
const mysql = require('mysql')
var cors = require('cors')
const fs = require('fs')
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'somtimuser',
    password: 'somtimpassword',
    database: 'sometimdatabase'
})
const app = express()
app.use(cors())
const port = 3000
papers = fs.readFile('./papers.json', (err, data) => {
    if (err) throw err
    //console.log(JSON.parse(data.toString()))
})
//console.log(papers)

app.get('/', (req, res) => {
    fl = fs.readFileSync('./papers.json', (err, data) => {
        if (err) throw err
    })
    res.send({ body: JSON.parse(fl.toString()) })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
