var source   = document.getElementById("entry-template").innerHTML;
var template = Handlebars.compile(source);
var list2={key:[]}
//httpGetAsync("https://api.github.com/users",showResp);
if(sessionStorage.list) {
    	list2=JSON.parse(sessionStorage.list)
    	document.getElementById("temp").innerHTML=template(list2)
    }
function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            //callback(xmlHttp.responseText,filter);
        	callback(xmlHttp.responseText);
        	else if( xmlHttp.status == 404)
        	document.getElementById("temp").innerHTML = "No User By this name"
           }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

/*function showResp(samp,callback)
{
	var list={};
	list.key=JSON.parse(samp);
	for(i in list.key)
	{
		httpGetAsync(list.key[i].url,filter)
	}
}*/

function filter(resp)
{
	var ob={}
	resp=JSON.parse(resp)
	if(resp.message=="Not Found")document.getElementById("temp").innerHTML=resp.message
	else{
	ob.url=resp.url
	ob.id=resp.url.substr(resp.url.lastIndexOf("/")+1)
	ob.name=resp.name || "No Name"
	ob.loc=resp.location || "Undisclosed"
	ob.flw=resp.followers
	ob.html_url=resp.html_url
	ob.avatar_url=resp.avatar_url
	list2.key.push(ob)
	console.log(ob)
	document.getElementById("temp").innerHTML=template(list2)
	sessionStorage.list=JSON.stringify(list2)
	}
}
function search(){
	httpGetAsync("https://api.github.com/users/"+document.getElementById('username').value,filter);
}
function del(str){
	console.log(str)
}
function sortby(par)
{
	console.log(par)
	switch(par)
	{
		case 'name':list2.key.sort(sort_by_name);break;
		case 'loc':list2.key.sort(sort_by_loc);break;
		case 'flw':list2.key.sort(sort_by_flw);break;
	}
	console.log(list2)
	document.getElementById("temp").innerHTML=template(list2)
}
function sort_by_name(a,b)
{
	return a.name>b.name
}
function sort_by_flw(a,b)
{
	return a.flw>b.flw
}
function sort_by_loc(a,b)
{
	return a.loc>b.loc
}