var source   = document.getElementById("entry-template").innerHTML;
var template = Handlebars.compile(source);

httpGetAsync("https://api.github.com/users",showResp);
function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}
function showResp(samp)
{
	var list={};
	list.key=JSON.parse(samp);
	console.log(list);
	document.getElementById("temp").innerHTML=template(list)
}