function ajax(script, params, callback){
    url = script + "?";
    var isnotFirstParam = false;
    for(const key in params){
        if(params.hasOwnProperty(key)){
            url += (isnotFirstParam ? "&" : "") + key + "=" + params[key];
        }
        isnotFirstParam = true;
    }

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
            callback(xmlhttp.responseText);
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
ajax("../PHP/ResponseToRequest.php", {ServerName : "zwelakhe.com", root : "/opt/lampp/htdocs", "Content-Type" : "application/x-www-html"},
    function (response){
        console.log(response);
    }
);