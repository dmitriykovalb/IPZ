const e="94de6ba65dcd62978f016f65b0a4fee9";let t=document.getElementById("search-btn"),n=document.getElementById("search-txt"),a=document.getElementById("city-name"),d=document.getElementById("icon"),i=document.getElementById("temp"),o=document.getElementById("humidity-div");function m(){if(""===n.value);else{!function(e,t){console.log("hello");var n=new XMLHttpRequest;n.onreadystatechange=(()=>{4==n.readyState&&200==n.status&&t(n.responseText)}),n.open("GET",e,!0),n.send()}("https://api.openweathermap.org/data/2.5/weather?q="+n.value+"&appid="+e,c)}}function c(e){let t=JSON.parse(e);a.innerHTML=t.name,d.src="http://openweathermap.org/img/w/"+t.weather[0].icon+".png",i.innerHTML=parseInt(t.main.temp-273)+"°",o.innerHTML=t.main.humidity+"%"}t.addEventListener("click",m),n.addEventListener("keyup",function(e){"Enter"===e.key&&m()});