/*jslint node: true */
/* global io: true */
"use strict";

if (socket!=null)
	alert('existe socket');
else
	alert('no existe socket');

socket.on('messages',(data) => {
	// render table with booking information
	render(data);
});

socket.on('message_to_client',(data) => {
	// render table with booking information
	console.log(data);
	$('.connected_users').append(data+"<br>");

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
	else {
		var input_date = format_date(document.getElementById('search').value);
		//ECMAScript 6
		table.innerHTML=`<br/><br/><h6 align=center>No se han encontrado reservas para la fecha ${input_date}</h6>`;
	}
}
function addMessage(){
	var msg = document.getElementById('search').value;
	var date_time = new Date(msg).toISOString();
	//emit input date to new-message socket
  	socket.emit('new-message', date_time);
	return false;
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