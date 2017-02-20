'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const Client = require('./models/clients')


const app = express()
app.set('port',process.env.PORT || 3001)
app.set('view engine', 'jade')
//mongoose.connect('mongodb://localhost:27017/test')
/*

String, Number, Date, Buffer, Boolean, Mixed, Objectid, Array
*/


app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

app.get('/check_reservations',(req,res) =>{
	Client.find({}, (err, clients) => {
		if (err) return res.status(500).send({message: `Error al realizar la petición ${err}`})
		if (!clients) return res.status(404).sned({message: `No existen productos`})
		res.status(200).send({message: clients})
	})

})

app.get('/api/client/:clientId', (req,res) =>{
	let clientId = req.params.clientId
	console.log(clientId)

	Client.findById(clientId, (err, client) => {
		if (err) return res.status(500).send({message:`Error al realizar la peticion $(err)`})
		if (!client) return res.status(404).send({message: `El producto no existe`})

			res.status(200).send(client)

	})
})


app.get('/register_reservation', (req,res) =>{
	res.render('register')
	
	const date_today = Date.now()
	console.log(date_today)
})

app.get('/', (req,res) =>{
	res.render('welcome')

})

app.post('/api/client', (req,res)=>{
	//let user = new User({email: req.body.email,nombre: req.body.nombre})



	let client = new Client()

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
		///res.status(200).send({client: clientStored})
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

app.post('/api/getclientid', (req,res)=>{
	//let user = new User({email: req.body.email,nombre: req.body.nombre})


	let client = new Client()
	client.name = req.body.name
	client.email = req.body.email

	
	Client.findOne({email: req.body.email, name: req.body.name}, function(err, client) {
  		if (err) return res.status(500).send({message:`Error al realizar la peticion $(err)`})
		if (!client) return res.status(404).send({message: `no existen coincidencias con ese nombre y email`})

			res.status(200).send(client._id)
	})
		
})



/*

app.put('/api/client/:productId', (req,res) =>{

})

app.delete('api/client/:productId', (req,res) =>{

})
*/
//'mongodb://127.0.0.1:27017/clients'
mongoose.connect('mongodb://fquevedo:Hostal1@ds145289.mlab.com:45289/hostal')

app.listen(app.get('port'), ()=>{
	console.log('API REST corriendo en http://127.0.0.1:'+app.get('port'))
})