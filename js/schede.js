//carica i dati delle schede presenti nel dabatase, e li usa per popolare il pannello sinistro
function CaricaSchedario(){
	"use strict";
	
	var xmlhttp = RichiestaHTTP();
	
    xmlhttp.onreadystatechange = function(){
												if (this.readyState == 4 && this.status == 200) {
													var response = JSON.parse(this.responseText);
													if (response.Error) {
														window.alert(response.Error); 
														if(response.Redirect){window.location.replace("index.html");}
														return;
													}
													else{riempi_schedario(response);}
												}
											};
	xmlhttp.open("POST","php/carica_schede.php",true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	//xmlhttp.send("user="+current_user);
	xmlhttp.send();
}

function svuota_schedario(){
	"use strict";
	var schede_wrap = document.getElementById("schede_wrap");
	while(schede_wrap.children.length > 1){
		schede_wrap.removeChild(schede_wrap.lastChild);
	}
}

//crea una nuova scheda nel database
function NuovaScheda(){
	"use strict";
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
														svuota_schedario();
														CaricaSchedario();
													}
												}
											};

	
	xmlhttp.open("POST","php/nuova_scheda.php",true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send();
}

function riempi_schedario(schede){
	"use strict";
	for(var i=0; i<schede.length; i++){
		var nuova_id = schede[i].id;
		schede_array[nuova_id] = schede[i];
		AggiungiScheda(schede_array[nuova_id]);
	}
}


//aggiunge una shceda nel pannello sinistro
function AggiungiScheda(scheda){
	"use strict";
	var schede_wrap = document.getElementById("schede_wrap");
	
	var NewScheda = document.createElement("button");
	NewScheda.id = "scheda_"+scheda.id;
	NewScheda.classList.add("scheda");
	
	var icon = document.createElement("img");
	icon.src="img/icona_persona.png";
	icon.alt = "";
	
	var name = document.createElement("span");
	var name_text = document.createTextNode(scheda.nome);
	name.appendChild(name_text);
	
	
	NewScheda.appendChild(icon);
	NewScheda.appendChild(name);
	
	if (document.getElementsByClassName("schedario_wrap").length){//ci troviamo nella pagina schedario
		NewScheda.addEventListener("click",function(){ApriScheda(this);});
	}
	else{//ci troviamo nella pagina gioco
		NewScheda.addEventListener("click",function(){SelezionaScheda(this);});
	}
	schede_wrap.appendChild(NewScheda);
}










