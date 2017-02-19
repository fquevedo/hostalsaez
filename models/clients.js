'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ClientsSchema = Schema({
	name: String,
	email: String
	//category: { type:String, enum:['pieza doble','pieza individual']}
})
/*
String, Number, Date, Buffer, Boolean, Mixed, Objectid, Array
*/

module.exports = mongoose.model('Client', ClientsSchema)