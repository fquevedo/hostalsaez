/*jslint node: true */
"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const Booking = require('./models/bookings');


const app = express();



const url = 'https://hostalsaez.herokuapp.com';
const mongodb = 'mongodb://fquevedo:Reservas1@ds157539.mlab.com:57539/reservas';
app.set('port',process.env.PORT || 3001);


app.use(express.static(__dirname + '/static'));
app.set('view engine', 'jade');


app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

const server = require('http').Server(app);
const io = require('socket.io')(server);

//listen for a cliente message 
io.on('connection', (socket) => {
	console.log("nueva coneixon");
	socket.on('new-message', function(data){
		Booking.find({"date_ini" : data}, function (err, item) {
			io.sockets.emit('messages', item);
		});
	});
});


app.get('/', (req,res) =>{
	res.status(200).render('welcome', {url: url});
});

app.get('/save_booking', (req,res) =>{
	res.status(200).render('save_booking', {url: url});
});

app.get('/find_bookings', (req,res) =>{
	res.status(200).render('find_bookings', {url: url});
});

app.get('/all_bookings',(req,res) =>{
	Booking.find({}, (err, booking) => {
		if (err) return res.status(500).send({message: `Error al realizar la petición ${err}`});
		if (!booking) return res.status(404).sned({message: `No existen productos`});
		res.status(200).send({message: booking});
	});
});

app.post('/save_booking', (req,res)=>{
	//create new object for save in mongodb
	var booking = new Booking();
	booking.name = req.body.name;
	booking.email = req.body.email;
	booking.celphone = req.body.celphone;
	booking.amount_ppl = req.body.amount_ppl;
	booking.date_ini = req.body.date_ini;
	booking.date_fin = req.body.date_fin;
	booking.amount_per_day = req.body.amount_per_day;
	booking.amount_canceled = req.body.amount_canceled;
	booking.state = req.body.state;
	booking.room_type = req.body.room_type;

	booking.save((err, bookingStored) => {
		if (err) res.status(500).send({message: `Error al salvar en la base de datos: ${err} `});
		//render saved data
		res.status(200).render('register_confirm', {
			name: bookingStored.name, 
			email: bookingStored.email,
			celphone: bookingStored.celphone,
			amount_ppl: bookingStored.amount_ppl,
			date_ini: bookingStored.date_ini,
			date_fin: bookingStored.date_fin,
			amount_per_day: bookingStored.amount_per_day,
			amount_canceled: bookingStored.amount_canceled,
			state: bookingStored.state,
			room_type: bookingStored.room_type,
			url:url
		});
	});	
});


mongoose.connect(mongodb);

server.listen(app.get('port'), ()=>{
	console.log('API REST corriendo en el puerto '+app.get('port'));
});