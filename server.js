const express = require('express')
const mysql = require('mysql2')
var cors = require('cors')
const fs = require('fs')

let pw = fs.readFileSync('./deets.txt', (err, data) => {
    if (err) throw err
}, { encoding: 'utf8' })

const connection = mysql.createConnection({
    host: '127.0.0.1',
    port: 1738,
    user: 'root',
    password: pw,
    database: 'senwebdb'
})

connection.connect((err) => {
    if (err) throw err
    console.log('Connected to MySQL database!')
    // connection.query('SELECT * FROM papers', (error, results) => {
    //     if (error) throw error
    //     console.log(results)
    // })
    // connection.end()
    //console.log(papers)
    //console.log(JSON.parse(papers.toString()))
    //console.log(papers.toString())
})
const app = express()
app.use(cors())
const port = 3000
// papers = fs.readFile('./papers.json', (err, data) => {
//     if (err) throw err
//     //console.log(JSON.parse(data.toString()))
// })
//console.log(papers)

let transform_publications = function (data) {

    publications = []
    author_first_keys = ['Author1First', 'Author2First', 'Author3First', 'Author4First', 'Author5First', 'Author6First', 'Author7First', 'Author8First', 'Author9First', 'Author10First']
    author_last_keys = ['Author1Last', 'Author2Last', 'Author3Last', 'Author4Last', 'Author5Last', 'Author6Last', 'Author7Last', 'Author8Last', 'Author9Last', 'Author10Last']

    for (let pub_num = 0; pub_num < data.length; pub_num++) {
        authors = []
        for (let i = 0; i < author_first_keys.length; i++) {
            if (data[pub_num][author_first_keys[i]] && data[pub_num][author_last_keys[i]]) {
                authors.push(data[pub_num][author_last_keys[i]] + ", " + data[pub_num][author_first_keys[i]])
            }
        }

        let publishYear = new Date(data[pub_num].PublishDate).getFullYear();

        publication = {
            "title": data[pub_num].Title,
            "authors": authors,
            "date": publishYear,
            "publisher": data[pub_num].Publisher,
            "url": data[pub_num].Url,
            "abstract": data[pub_num].Abstract,
            "projectID": data[pub_num].ProjectID,
            "flex1": data[pub_num].flex1,
            "flex2": data[pub_num].flex2,
            "flex3": data[pub_num].flex3,
            "flex4": data[pub_num].flex4,
            "flex5": data[pub_num].flex5,
        }
        publications.push(publication)
    }
    return publications
}

app.get('/', (req, res) => {
    res.send("hi there!")
})

// app.get('/publications/', (req, res) => {
//     connection.query('SELECT * FROM publications', (error, results) => {
//         if (error) throw error
//         //console.log(results)
//         res.send({ body: transform_publications(results) })
//     })
// })

// app.get('/members/', (req, res) => {

//     app.listen(port, () => {
//         console.log(`Example app listening on port ${port}`)
//     })
// })