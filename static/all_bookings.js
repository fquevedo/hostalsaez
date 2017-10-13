/*jslint node: true */
/* global io: true */
"use strict";
var socket = io.connect('127.0.0.1:3001');


//escucha la conexion en el socket llamado all_bookings y renderea al recibir
socket.on('all_bookings',(data) => {

	render(data);
	console.log(data);
	

});




function render(data){

	var table = document.getElementById('fq_table');
	if (data.length){
		table.innerHTML='<tr><th>Ingreso</th><th>Salida</th><th>Nombre</th><th>Email</th><th>Telefono</th><th>Personas</th><th>Cobro</th><th>Cancelado</th><th>Tipo</th><th>Estado</th></tr>';
		for (var i=0;i<data.length;++i){
			//format date
			var date_i = format_date(data[i].date_ini);
			var date_f = format_date(data[i].date_fin);
			table.innerHTML+='<tr><td>'+date_i+'</td><td>'+date_f+'</td><td>'+data[i].name+'</td>'+'</td><td>'+data[i].email+'</td>'+'</td><td>'+data[i].celphone+'</td>'+'</td><td>'+data[i].amount_ppl+'</td>'+'</td><td>'+data[i].amount_per_day+'</td>'+'</td><td>'+data[i].amount_canceled+'</td>'+'</td><td>'+data[i].room_type+'</td>'+'</td><td>'+data[i].state+'</td></tr>';
		}
	}
}

function format_date(date){

	var input_date = new Date(date);
	var dd =  input_date.getUTCDate();
	var mm = input_date.getUTCMonth()+1;
	var yyyy =  input_date.getUTCFullYear();
	var date_formated = leadingZero(dd)+'-'+leadingZero(mm)+'-'+input_date.getUTCFullYear();
	return date_formated;
}
//if month or day value is less than 10 then add 0 
function leadingZero(number) {

  if (number < 10) {
    return "0" + number.toString();
  }
  return number.toString();
}

