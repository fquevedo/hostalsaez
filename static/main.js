var socket = io.connect('http://127.0.0.1:3001',{'forceNew': true})

socket.on('messages',function(data){
	console.log(data)
	console.log(data.length)
	
	
	table = document.getElementById('pageviews')

	if (data.length>0){
		table.innerHTML='<tr><th>ID</th><th>Date Ini</th></tr>'
		for (i=0;i<data.length;++i){
		table.innerHTML+='<tr><td>'+data[i]._id+'</td><td>'+data[i].date_ini+'</td></tr>'
		}

	}
	else {
		fecha_ini = document.getElementById('search').value;
		//utilizando los nuevo de ECMAScript 6
		table.innerHTML=`<h4 align=center>No se han realizado reservas para la fecha ${fecha_ini}</h4>`
	}
	
	
})

 

function addMessage(e){
	msg = document.getElementById('search').value
	var date_time = new Date(msg).toISOString()
	
  	socket.emit('new-message', date_time)
	return false	
}

