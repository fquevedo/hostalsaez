'use strict'
var socket = io.connect('https://hostalsaez.herokuapp.com',{'forceNew': true})

socket.on('messages',(data) => {
	console.log(data)
	console.log(data.length)

	var table = document.getElementById('fq_table')

	if (data.length>0){
		table.innerHTML='<tr><th>LLegada</th><th>Salida</th><th>Nombre</th><th>Email</th><th>Telefono</th><th>Personas</th><th>Cobro dia</th><th>Cancelado</th><th>Tipo</th><th>Estado</th></tr>'
		for (var i=0;i<data.length;++i){
			var tmp_date_i = new Date(data[i].date_ini)
			var tmp_date_f = new Date(data[i].date_fin)
			var tmp_date_i_ = tmp_date_i.getUTCDate()+'-'+(tmp_date_i.getUTCMonth()+1)+'-'+tmp_date_i.getUTCFullYear()
			var tmp_date_f_ = tmp_date_f.getUTCDate()+'-'+(tmp_date_f.getUTCMonth()+1)+'-'+tmp_date_f.getUTCFullYear()
			table.innerHTML+='<tr><td>'+tmp_date_i_+'</td><td>'+tmp_date_f_+'</td><td>'+data[i].name+'</td>'+
			'</td><td>'+data[i].email+'</td>'+'</td><td>'+data[i].celphone+'</td>'+'</td><td>'+data[i].amount_ppl+
			'</td>'+'</td><td>'+data[i].amount_per_day+'</td>'+'</td><td>'+data[i].amount_canceled+'</td>'+'</td><td>'
			+data[i].room_type+'</td>'+'</td><td>'+data[i].state+'</td>'+'</tr>'
		}

	}
	else {
		var fecha_ini = document.getElementById('search').value;
		//using ECMAScript 6
		table.innerHTML=`<br/><br/><h6 align=center>No se han encontrado reservas para la fecha ${fecha_ini}</h6>`
	}

	function render(table_obj,data){
		
	}
	
	
})

 

function addMessage(){
	var msg = document.getElementById('search').value
	var date_time = new Date(msg).toISOString()
	
  	socket.emit('new-message', date_time)
	return false	
}

