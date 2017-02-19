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

	console.log(req.body.date)

	let client = new Client()

	client.name = req.body.name
	client.email = req.body.email
	

	client.save((err, clientStored) => {
		if (err) res.status(500).send({message: `Error al salvar en la base de datos: ${err} `})
		///res.status(200).send({client: clientStored})
		res.status(200).render('register_confirm', {name: clientStored.name, email: clientStored.email})

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
mongoose.connect('mongodb://127.0.0.1:27017/clients')

app.listen(app.get('port'), ()=>{
	console.log('API REST corriendo en http://127.0.0.1:'+app.get('port'))
})