
//controllo sul nome inserito
function check_input_nome(){
	var scheda_nome = document.getElementById("scheda_nome");
	//scheda_nome.value = scheda_nome.value.replace(/[^\w\s]/gi, '');
	scheda_nome.value = scheda_nome.value.replace(/[\n]/gi, '');
}

//controllo sulla stat inserita
function check_stat(){
	var stats = document.getElementsByClassName("stat");
	
	for(var i=0; i<stats.length; i++){
		stats[i].value = stats[i].value.replace(/\D/g,'');
		if (stats[i].value > 50)
			stats[i].value = 50;
	}
}




