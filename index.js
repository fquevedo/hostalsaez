'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path')

const Client = require('./models/clients')


const app = express()

app.use(express.static(__dirname + '/static'));
app.set('view engine', 'jade')

app.set('port',process.env.PORT || 3001)

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

var server = require('http').Server(app)
var io = require('socket.io')(server)


//listen for a cliente message 
io.on('connection', (socket) => {
	socket.on('new-message', function(data){
		Client.find({"date_ini" : data}, function (err, item) {
			io.sockets.emit('messages', item)
		})
	})
})

var url = "https://hostalsaez.herokuapp.com"

app.get('/api/client/:clientId', (req,res) =>{
	var clientId = req.params.clientId
	console.log(clientId)

	Client.findById(clientId, (err, client) => {
		if (err) return res.status(500).send({message:`Error al realizar la peticion $(err)`})
		if (!client) return res.status(404).send({message: `El producto no existe`})

			res.status(200).send(client)

	})
})

app.get('/', (req,res) =>{
	res.render('welcome', {url: 'https://hostalsaez.herokuapp.com'})
})

app.get('/register_reservation', (req,res) =>{
	res.render('register')
})

app.get('/check_reservation', (req,res) =>{
	res.render('check_reservation')
})

app.get('/check_reservations',(req,res) =>{
	Client.find({}, (err, clients) => {
		if (err) return res.status(500).send({message: `Error al realizar la petición ${err}`})
		if (!clients) return res.status(404).sned({message: `No existen productos`})
		res.status(200).send({message: clients})
	})

})

app.post('/api/client', (req,res)=>{

	var client = new Client()
	var tmp = req.body.date_ini
	console.log(tmp)
	client.name = req.body.name
	client.email = req.body.email
	client.celphone = req.body.celphone
	client.amount_ppl = req.body.amount_ppl
	client.date_ini = req.body.date_ini
	client.date_fin = req.body.date_fin
	client.amount_per_day = req.body.amount_per_day
	client.amount_canceled = req.body.amount_canceled
	client.state = req.body.state
	client.room_type = req.body.room_type

	client.save((err, clientStored) => {
		if (err) res.status(500).send({message: `Error al salvar en la base de datos: ${err} `})
		res.status(200).render('register_confirm', {
			name: clientStored.name, 
			email: clientStored.email,
			celphone: clientStored.celphone,
			amount_ppl: clientStored.amount_ppl,
			date_ini: clientStored.date_ini,
			date_fin: clientStored.date_fin,
			amount_per_day: clientStored.amount_per_day,
			amount_canceled: clientStored.amount_canceled,
			state: clientStored.state,
			room_type: clientStored.room_type

		})

	})
		
})

//Set url parameters to connect mlab DB
mongoose.connect('mongodb://fquevedo:Reservas1@ds157539.mlab.com:57539/reservas')

server.listen(app.get('port'), ()=>{
	console.log('API REST corriendo en el puerto '+app.get('port'))
})