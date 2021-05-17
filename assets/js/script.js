var searchCity = "muncie" //document.querySelector("form-control");

fetch(
    'http://api.openweathermap.org/data/2.5/forecast?q='+searchCity+'&units=imperial&cnt=40&appid=650dce3c894fd8e8f9f02e1e10ba6800'
  )
    .then(function(forecast) {
      return forecast.json();
    })
    .then(function(forecast) {
      for(i=0; i<40;) {
        console.log(forecast.list[i].dt_txt);
        //console.log(forecast.list[i].main.temp);
        //console.log(forecast.list[i].main.humidity);
        //console.log(forecast.list[i].weather[0].icon);
        //console.log(forecast.list[i].wind.speed);
        i=i+8;
        }
    });

fetch("http://api.openweathermap.org/data/2.5/weather?q="+searchCity+"&units=imperial&appid=650dce3c894fd8e8f9f02e1e10ba6800")
.then(function(current){
    return current.json();
})
.then(function(current){
    console.log(current.main.temp);
    console.log(current.weather[0].icon);
    console.log(current.wind.speed);
    console.log(current.main.humidity);

    var currentTemp = document.querySelector("#currentTemp");
    var currentWind = document.querySelector("#currentWind");
    var currentHumidity = document.querySelector("#currentHumidity");
    var currentUV = document.querySelector("#currentUV");
    var currentDay = document.querySelector("#currentDay");
    
    currentTemp.textContent= current.main.temp+" F";
    currentWind.textContent=current.wind.speed+" mph";
    currentHumidity.textContent=current.main.humidity+"%";
    currentDay.textContent= searchCity+"  "+current.weather[0].icon;
})
