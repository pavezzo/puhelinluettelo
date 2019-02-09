const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan')

morgan.token('data', (req, res) => {
    return 
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

app.use(bodyParser.json());

let persons = [{
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Martti Tienari",
    "number": "040-123456",
    "id": 2
  },
  {
    "name": "Arto Järvinen",
    "number": "040-123456",
    "id": 3
  },
  {
    "name": "Lea Kutvonen",
    "number": "040-123456",
    "id": 4
  }
]

app.delete('/api/persons/:id', (req, res) => {
    persons = persons.filter(e => e.id !== Number(req.params.id))
    res.sendStatus(204)
})

app.get('/api/persons/:id', (req, res) => {
    if (persons.map(e => e.id).includes(parseInt(req.params.id))) {
        res.send(persons.find(e => e.id == req.params.id))
    } else {
        res.sendStatus(404)
    }
})

app.post('/api/persons', (req, res) => {
    if (req.body === undefined || req.body.name === undefined || req.body.number === undefined) {
        return res.status(400).json({error: 'content missing'})
    }

    if (persons.map(e => e.name).includes(req.body.name)) {
        return res.status(400).json({error: 'name must be unique'})
    }

    if (persons.map(e => e.number).includes(req.body.number)) {
        return res.status(400).json({error: 'number must be unique'})
    }

    console.log(JSON.stringify(req.body))


    const newPerson = {
        "name": req.body.name,
        "number": req.body.number,
        "id": Math.floor(Math.random() * Math.floor(100000))
    }

    persons.push(newPerson)

    res.status(201).json(newPerson)
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/info', (req, res) => {
    const str = `<p>Puhelinluettelossa ${persons.length} henkilön tiedot</p> ${new Date()}`;
    res.send(str)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`running on port ${PORT}`)
});