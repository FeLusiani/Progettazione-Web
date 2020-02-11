
stats = ["LV", "FOR", "DEX", "COS", "INT", "SAG", "CAR"];

schede_array = Array();

function RichiestaHTTP(){
	"use strict";
    try {
        var xmlhttp = new XMLHttpRequest();
    } catch (e1) {
        try {
            xmlhttp = new window.ActiveXObject("Msxml2.XMLHTTP");
        } catch (e2) {
            try {
                xmlhttp = new window.ActiveXObject("Microsoft.XMLHTTP");
            } catch (e3) {
                window.alert("Attenzione, browser non supporta ajax");
                return false;
            }
        }
    }
    return xmlhttp;
}

function CaricaUser(attempt){
	"use strict";
	var xmlhttp = RichiestaHTTP();
	
    xmlhttp.onreadystatechange = function(){
												"use strict";
												if (this.readyState == 4 && this.status == 200) {
													var response = JSON.parse(this.responseText);
													if (response.Error) {
														if (attempt == undefined){
															window.alert(response.Error);
															if(response.Redirect){window.location.replace("index.html");}
														}
													}
													else{
														var place=document.getElementById("user");
														place.innerText=response.current_username;
														if (typeof CaricaSchedario === "function"){//controlla se è una pagina che carica le schede
															CaricaSchedario();
														}
													}
												}
											};

	
	xmlhttp.open("POST","php/carica_user.php",true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send();
}








