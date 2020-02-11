function sign_up(){
	var username = document.getElementById("username").value;
	var pass = document.getElementById("pass").value;
	
	var xmlhttp = RichiestaHTTP();
	
    xmlhttp.onreadystatechange = function(){
												"use strict";
												if (this.readyState == 4 && this.status == 200) {
													var response = JSON.parse(this.responseText);
													if (response.Error) {window.alert(response.Error); return;}
													else{
														window.location.replace("index.html");
													}
												}
											};

	
	xmlhttp.open("POST","php/sign_up.php",true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send("username="+username+"&pass="+pass);
}

function log_in(){
	var username = document.getElementById("username").value;
	var pass = document.getElementById("pass").value;
	
	var xmlhttp = RichiestaHTTP();
	
    xmlhttp.onreadystatechange = function(){
												"use strict";
												if (this.readyState == 4 && this.status == 200) {
													var response = JSON.parse(this.responseText);
													if (response.Error) {window.alert(response.Error); return;}
													else{
														window.location.replace("home.html");
													}
												}
											};

	
	xmlhttp.open("POST","php/log_in.php",true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send("username="+username+"&pass="+pass);
}

function log_out(){
	var xmlhttp = RichiestaHTTP();
	
    xmlhttp.onreadystatechange = function(){
												"use strict";
												if (this.readyState == 4 && this.status == 200) {
													var response = JSON.parse(this.responseText);
													if (response.Error) {window.alert(response.Error); return;}
													else{
														window.location.replace("index.html");
													}
												}
											};

	
	xmlhttp.open("POST","php/log_out.php",true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send();
}


