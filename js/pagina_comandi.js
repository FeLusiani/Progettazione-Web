function apri_chiudi(div){
	div = div.parentElement;
	if (!div.classList.contains("aperto")){ //apri
		div.classList.add("aperto");
	}
	else{ //chiudi
		div.classList.remove("aperto");
	}
}