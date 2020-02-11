//carica i dati delle schede presenti nel dabatase, e li usa per popolare il pannello sinistro
function SelezionaScheda(scheda){
	"use strict";

	var id_scheda = (scheda.id).replace(/\D/g,'');
	var info = schede_array[id_scheda];
	
	//inserisce il nome all'interno nell'input della console 
	var console_input = document.getElementById("console_input");
	console_input.value += " "+info.nome+" ";
	
	//cambia focus 
	console_input.focus();
}

function invia_input(e){
	"use strict";
	var console_input = document.getElementById("console_input");
	
    var code = e.keyCode ? e.keyCode : e.which;
    if(code === 13)
    {
		var string = console_input.value;
		string = string.replace(/\s+/g, ' ');//compatta gli spazi
		string = string.replace(/<|>/g, '');//elimina eventuali "<" o ">" (per evitare l'inserimento di tag html)
		string = ">>>&emsp;" + string;
		output(string);
		console_input.value = "";
		
		execute_last_input();
    }
}

function output(string){
	"use strict";
	string = parse_input(string);

	var spazio1 = document.getElementById("spazio1");
	//spazio1.innerHTML += "<span class=\"linea\">>>>    " + string + "</span>";
	var string = "<span class=\"linea\">&emsp;" + string + "</span>";
	spazio1.insertAdjacentHTML('beforeend',string);
	refresh_console();
}

function parse_input(input){
	"use strict";
	var string = input.trim();
	
	//trova i nomi all'interno dell'input
	var schede = Array();
	schede = document.getElementsByClassName("scheda");
	
	for(var i=0;i<schede.length; i++){
		var nome = schede[i].getElementsByTagName("span")[0].innerText.trim();
		string = string.replace(nome,"<span class=\"nome\">"+nome+"</span>");
	}
	
	//trova le stat all'interno dell'input
	for(var i=0;i<stats.length; i++){
		string = string.replace(new RegExp(stats[i], "ig"),"<span class=\"stat\">"+stats[i].toUpperCase()+"</span>");
	}
	
	//trova il campo CD
	if (string.match(/CD \d+/i)){
		var patt = /CD (\d+)/i;
		var CD_value = patt.exec(string)[1];
		string = string.replace(/CD \d+/i, "<span class=\"CD\">CD "+CD_value+"</span>");
	}
	
	//trova le parole chiave
	string = string.replace("check", "<span class=\"keyword check\">check</span>");
	string = string.replace("vs", "<span class=\"keyword vs\">vs</span>");
	string = string.replace("attack", "<span class=\"keyword attack\">attack</span>");

	
	return string;
}

function refresh_console(){
	"use strict";
	var spazio1 = document.getElementById("spazio1");
	spazio1.scrollTop = spazio1.scrollHeight;
}

function execute_last_input(){
	"use strict";
	var last_line = document.getElementById("spazio1").lastChild;
	var spans = last_line.getElementsByTagName("span");
	
	if(spans.length ==0){ //niente da eseguire
		return;
	}

	//comando	NOME STAT
	if (spans.length >= 2
			&& spans[0].classList.contains("nome")
			&& spans[1].classList.contains("stat")
		){
				stat_command(spans[0].innerText, spans[1].innerText);
	}
	
	//comando	NOME check STAT CD
	if (spans.length >= 4
			&&spans[0].classList.contains("nome")
			&& spans[1].classList.contains("check")
			&& spans[2].classList.contains("stat")
			&& spans[3].classList.contains("CD")
		){
				check_command(spans[0].innerText, spans[2].innerText, spans[3].innerText);
	}

	//comando	NOME vs NOME check STAT
	if (spans.length >= 5
			&& spans[0].classList.contains("nome")
			&& spans[1].classList.contains("vs")
			&& spans[2].classList.contains("nome")
			&& spans[3].classList.contains("check")
			&& spans[4].classList.contains("stat")
		){
				vs_command(spans[0].innerText, spans[2].innerText, spans[4].innerText);
	}
}


