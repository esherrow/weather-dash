var searchCity = "San Francisco";//document.querySelector("form-control");
var lookAhead = $(".lookAhead");
//var searchBtn = document.querySelector("#searchBtn");
//var getWeather = function(){
fetch(
    'http://api.openweathermap.org/data/2.5/forecast?q='+searchCity+'&units=imperial&cnt=40&appid=650dce3c894fd8e8f9f02e1e10ba6800'
  )
    .then(function(forecast) {
      return forecast.json();
    })
    .then(function(forecast) {
        for(i=0; i<40;) {
        
            var iconForecast= document.querySelector("icon");
            var forecastIcon= document.createElement('img');
            forecastIcon.setAttribute("src", "http://openweathermap.org/img/wn/"+forecast.list[i].weather[0].icon+"@2x.png");
            //var icon = iconForecast.appendChild(forecastIcon)

            lookAhead.append(`
                <div class="card col bg-info text-white ms-3">
                <div class="card-header fw-bolder">
                    ${moment(forecast.list[i].dt_txt).format("L")}
                </div>
                <ul class="list-group list-group-flush ">
                    <li class="list-group-item icon bg-info text-white">${document.querySelector("icon")}</li>
                    <li class="list-group-item temp bg-info text-white">Temp: ${forecast.list[i].main.temp} F</li>
                    <li class="list-group-item wind bg-info text-white">Wind Speed: ${forecast.list[i].wind.speed} mph</li>
                    <li class="list-group-item humidity bg-info text-white">Humidity: ${forecast.list[i].main.humidity}%</li>
                </ul>
                </div>`);  
        
        //console.log(forecast);
        console.log(moment(forecast.list[i].dt_txt).format("L"));
        //console.log(forecast.list[i].weather[0].icon);
       
        i=i+8;
        }
    });

fetch("http://api.openweathermap.org/data/2.5/weather?q="+searchCity+"&units=imperial&appid=650dce3c894fd8e8f9f02e1e10ba6800")
.then(function(current){
    return current.json();
})
.then(function(current){
    console.log(current)
    
    var currentTemp = document.querySelector("#currentTemp");
    var currentWind = document.querySelector("#currentWind");
    var currentHumidity = document.querySelector("#currentHumidity");
    var currentDay = document.querySelector("#currentDay");
    var currentIcon = document.createElement('img');
        currentIcon.setAttribute("src", "http://openweathermap.org/img/wn/"+current.weather[0].icon+"@2x.png")
    var lat=current.coord.lat;
    var lon=current.coord.lon;
    
    currentTemp.textContent= "Temp: "+current.main.temp+" F";
    currentWind.textContent="Wind: "+current.wind.speed+" mph";
    currentHumidity.textContent="Humidity: "+current.main.humidity+"%";
    currentDay.textContent= searchCity+"  ("+moment().format("L")+")  ";
    currentDay.appendChild(currentIcon);

    fetch("https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&exclude=hourly,daily,minutely,alerts&units=imperial&appid=650dce3c894fd8e8f9f02e1e10ba6800")
    .then(function(current){
        return current.json();
    })
    .then(function(index){
        console.log(index)
        var currentUV = document.querySelector(".badge");

        currentUV.textContent=index.current.uvi;

        if(index.current.uvi < 3){
            currentUV.setAttribute("class", "bg-success badge")
        }else if(index.current.uvi >= 6){
            currentUV.setAttribute("class", "bg-danger badge")
        }else{
            currentUV.setAttribute("class", "bg-warning badge")
        }
        console.log(index.current.uvi);
    })
})
//}
//searchBtn.addEventListener("click", getWeather());