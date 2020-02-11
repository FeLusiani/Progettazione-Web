var scheda_caricata = 0;
var id_scheda_caricata = 0;
var editing = 0;

//apre una scheda, mostrandone i dati nel pannello destro
function ApriScheda(scheda){
	"use strict";
	if (editing ==1){
		exit_edit();
	}
	
	id_scheda_caricata = (scheda.id).replace(/\D/g,'');
	scheda_caricata = 1;
	
	var display = document.getElementById("scheda_display");
	display.classList.remove("hidden");
	
	var info = schede_array[id_scheda_caricata];
	
	//nome
	var scheda_nome = document.getElementById("scheda_nome");
	scheda_nome.value = info.nome;
	
	//note
	var scheda_note = document.getElementById("scheda_note");
	scheda_note.value = info.note;
	
	//stats
	for(var i=0;i<stats.length; i++){
		var tr = document.getElementById("scheda_"+stats[i]);
		tr.getElementsByTagName("input")[0].value = info[stats[i]];
	}
}


//libera il pannello destro
function ChiudiScheda(){
	"use strict";
	id_scheda_caricata = 0;
	scheda_caricata = 0;
	var display = document.getElementById("scheda_display");
	display.classList.add("hidden");
}

//elimina la scheda attualmente aperta
function delete_scheda(){
	"use strict";
	if (scheda_caricata==0 || editing==1)
		return;
	
	var xmlhttp = RichiestaHTTP();
	
    xmlhttp.onreadystatechange = function(){
												"use strict";
												if (this.readyState == 4 && this.status == 200) {
													var response = JSON.parse(this.responseText);
													if (response.Error) {
														window.alert(response.Error); 
														if(response.Redirect){window.location.replace("index.html");}
														return;
													}
													else{
														ChiudiScheda();
														svuota_schedario();
														CaricaSchedario();
													}
												}
											};

	
	xmlhttp.open("POST","php/elimina_scheda.php",true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send("id="+id_scheda_caricata);
}

//attiva la modalità editor
function edit_scheda(){
	"use strict";
	if (scheda_caricata==0)
		return;
	
	if (editing ==1){
		exit_edit();
		return;
	}
	
	editing=1;
	
	var display = document.getElementById("scheda_display");

	//edit button
	var edit_button = document.getElementById("edit_button");
	edit_button.innerText = "CANCEL";
	
	//save button
	var save_button = document.getElementById("save_button");
	save_button.classList.remove("disabilitato");
	
	//delete button
	var delete_button = document.getElementById("delete_button");
	delete_button.classList.add("disabilitato");
	
	//nome
	var scheda_nome = document.getElementById("scheda_nome");
	scheda_nome.readOnly = false;
	scheda_nome.classList.add("editable");
	
	//note
	var scheda_note = document.getElementById("scheda_note");
	scheda_note.readOnly = false;
	scheda_note.classList.add("editable");
	
	//stats 
	var stats = document.getElementsByClassName("stat");
	
	for(var i=0; i<stats.length; i++){
		stats[i].readOnly = false;
	}
}

//disattiva la modialità editor
function exit_edit(){
	editing = 0;
	
	var display = document.getElementById("scheda_display");
	
	//edit button
	var edit_button = document.getElementById("edit_button");
	edit_button.classList.remove("disabilitato");
	edit_button.innerText = "EDIT";
	
	//save button
	var save_button = document.getElementById("save_button");
	save_button.classList.add("disabilitato");
	
	//delete button
	var delete_button = document.getElementById("delete_button");
	delete_button.classList.remove("disabilitato");
	
	//nome
	var scheda_nome = document.getElementById("scheda_nome");
	scheda_nome.readOnly = true;
	scheda_nome.classList.remove("editable");
	
	//note
	var scheda_note = document.getElementById("scheda_note");
	scheda_note.readOnly = true;
	scheda_note.classList.remove("editable");

	//stats 
	var stats = document.getElementsByClassName("stat");
	
	for(var i=0; i<stats.length; i++){
		stats[i].readOnly = true;
	}
	
	ChiudiScheda();
}

//salva la scheda che sta venendo editata e disattiva la modalità editor
function save_scheda(){
	"use strict";
	if (scheda_caricata!=1 || editing!=1)
		return;
	
	var dati = {};
	//id
	dati.id = id_scheda_caricata;
	//nome
	dati.nome = document.getElementById("scheda_nome").value.replace(/\s+/g, ' ').trim();//compatta gli spazi;
	//note
	dati.note = document.getElementById("scheda_note").value;
	//stats
	for(var i=0;i<stats.length; i++){
		var tr = document.getElementById("scheda_"+stats[i]);
		dati[stats[i]] = tr.getElementsByTagName("input")[0].value;
	}
	
	var xmlhttp = RichiestaHTTP();
	
    xmlhttp.onreadystatechange = function(){
												"use strict";
												if (this.readyState == 4 && this.status == 200) {
													var response = JSON.parse(this.responseText);
													if (response.Error) {
														window.alert(response.Error); 
														if(response.Redirect){window.location.replace("index.html");}
														return;
													}
													else{
														ChiudiScheda();
														svuota_schedario();
														CaricaSchedario();
													}
												}
											};

	
	xmlhttp.open("POST","php/salva_scheda.php",true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send("data="+JSON.stringify(dati));
	
	exit_edit();
}



