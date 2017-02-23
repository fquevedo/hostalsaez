'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BookingsSchema = Schema({
	name: String,
	email: String,
	celphone: String,
	amount_ppl: Number,
	date_ini: { type: Date, default: Date.now },
	date_fin: { type: Date, default: Date.now },
	amount_per_day: Number,
	amount_canceled: Number,
	state: String,
	room_type: String
	//category: { type:String, enum:['pieza doble','pieza individual']}
})
/*
String, Number, Date, Buffer, Boolean, Mixed, Objectid, Array
*/

module.exports = mongoose.model('Booking', BookingsSchema)