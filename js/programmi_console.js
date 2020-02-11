function stat_command(nome, stat){
	"use strict";
	output("");
	
	var id_scheda = find_id(nome);
	if (id_scheda == null){
		output("");
		return;
	}
	var stat_value = (schede_array[id_scheda])[stat];
	var string = nome + " " + stat +"&emsp;==>&emsp;"+stat_value;
	output(string);
	string = nome + " " + stat +" bonus:&emsp;"+color_bonus(stat_value-10);
	output(string);
	output("");
}

function check_command(nome, stat, CD){
	"use strict";
	var id_scheda = find_id(nome);
	if (id_scheda == null){
		output("");
		return;
	}
	var stat_value = (schede_array[id_scheda])[stat];
	
	var cd_value = /CD (\d+)/.exec(CD)[1];
	output("");
	var roll = Math.ceil(Math.random()*20);
	var string = "Rolling 1d20... -->&emsp;"+ roll;
	output(string);
	roll+= stat_value-10; //bonus o malus dato dalla stat considerata
	string = "Adding "+nome+" "+stat+" bonus:&emsp;"+color_bonus(stat_value-10);
	output(string);
	string = nome+" "+stat+" check is&emsp;"+roll;
	output(string);
	
	string = nome+" has "+ ((roll > cd_value) ?
		"<span class=\"good\">SUCCEDED!</span>" : "<span class=\"bad\">FAILED!</span>");
	output(string);
	output("");
}

function vs_command(nome1, nome2, stat){
	"use strict";
	var id_scheda1 = find_id(nome1);
	if (id_scheda1 == null){
		output("");
		return;
	}

	var id_scheda2 = find_id(nome2);
	if (id_scheda2 == null){
		output("");
		return;
	}
	
	var stat_value1 = (schede_array[id_scheda1])[stat];
	var stat_value2 = (schede_array[id_scheda2])[stat];
	
	output("");
	var roll1 = Math.ceil(Math.random()*20);
	var string;
	string = nome1+" rolls 1d20 --> "+roll1+" "+color_bonus(stat_value1-10);
	roll1 += stat_value1-10;
	string +=" ==> "+ roll1;
	output(string);
	
	var roll2 = Math.ceil(Math.random()*20);
	string = nome2+" rolls 1d20 --> "+roll2+" "+color_bonus(stat_value2-10);
	roll2 += stat_value2-10;
	string +=" ==> "+ roll2;
	output(string);
	
	var winner;
	var looser;
	if (roll1 > roll2){
		winner = nome1;
		looser = nome2;
	}
	else if (roll1 < roll2){
		winner = nome2;
		looser = nome1;
	}
	else{ //in caso di pareggio
		output("<span class=\"keyword\">IT'S A TIE! No winners, no loosers!</span>");
		return;
	}
	
	string = winner+"<span class=\"keyword\"> WINS OVER </span>"+looser;
	output(string);
	output("");
}

function find_id(nome){
	for (var i=0;i<schede_array.length;i++){
		if (schede_array[i] != undefined){
			if (schede_array[i].nome == nome)
				return i;
		}
	}
	return null;
}

function color_bonus(bonus){
	return (bonus >= 0) ? 	("<span class=\"good\">+"+bonus+"</span>"):
							("<span class=\"bad\">"+bonus+"</span>");
}






