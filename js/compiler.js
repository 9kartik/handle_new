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
        	showMsg()
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
	if(!list2.hasOwnProperty(ob.id))
	{
	list2.key.push(ob)
	list2[ob.id]=1
	console.log(ob)
	document.getElementById("temp").innerHTML=template(list2)
	sessionStorage.list=JSON.stringify(list2)
	}
	else{
		location.href = "#"+ob.id;
		flash(ob.id);
	}
	}
}
function showMsg(){
	document.getElementById('msg').innerHTML="Sorry!No users by that name"
	setTimeout(
		function(){
			document.getElementById('msg').innerHTML=""}, 
			 2000);
}
function flash(id){
	document.getElementById(id).className="_ "
			+document.getElementById(id).className;
	setTimeout(
		function(){
			document.getElementById(id).className=
			document.getElementById(id).className.substr(2) }, 
			 3000);
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
	selected(par)
	switch(par)
	{
		case 'name':list2.key.sort(sort_by_name);break;
		case 'loc':list2.key.sort(sort_by_loc);break;
		case 'flw':list2.key.sort(sort_by_flw);break;
	}
	//console.log(list2)
	document.getElementById("temp").innerHTML=template(list2)
}
function selected(id)
{
	document.getElementById('name').className=document.getElementById('loc').className=document.getElementById('flw').className="hyp"
	document.getElementById(id).className=" clicked"
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
function del(sr)
{

	sr=sr.substr(1)
	console.log(sr)
	for(i in list2.key)
		{
			console.log(i)
			if(list2.key[i].id==sr)
			{
				list2.key.splice(i,1)
				delete(list2[sr])
				break
			}
		}
	document.getElementById("temp").innerHTML=template(list2)
	sessionStorage.list=JSON.stringify(list2)
}
