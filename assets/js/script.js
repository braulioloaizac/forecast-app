var cityName = ""

$( "button" ).on( "click", function(event) {
    event.preventDefault();
    //Gets the text written by the user
    cityName= $("input").val().trim();
    $("input").text = "";
    getCityLocation(cityName);

} );


var getCityLocation = function(cityName){
    var requestUrlCity = "http://api.openweathermap.org/geo/1.0/direct?q="+cityName+"&appid=9013afa64d3ec46d7ba514e0136c0fba";
    //Makes a request to the weather API
    fetch(requestUrlCity).then(function(response){
        if (response.ok){
            response.json().then(function(data){
                var long = data[0].lon;
                var lat = data[0].lat
                getCityWeather(long, lat);
            })
        }
        else{
            alert("Bad request");
        }
    })
};


var getCityWeather = function(lon, lat){
    var requestUrlWeather = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&units=imperial&exclude=minutely,hourly&appid=9013afa64d3ec46d7ba514e0136c0fba";
    fetch(requestUrlWeather).then(function(response){
        if (response.ok){
            response.json().then(function(data){
    
                setInfo(data);
            })
        }
        else{
            alert("There was a problem with your request!");
        }
    })
}

var setInfo = function(data){
    console.log(data)
    $("#city").text(cityName);
    
    $("#temp-0").text(data.current.temp);
    $("#wind-0").text(data.current.wind_speed);
    $("#hum-0").text(data.current.humidity);
    $("#uvIndex").text(data.current.uvi);

    for (var i = 1; i <= 5; i++){
        $("#temp-"+i).text(data.daily[i-1].temp.day);
        $("#wind-"+i).text(data.daily[i-1].wind_speed);
        $("#hum-"+i).text(data.daily[i-1].humidity);
    }

    $("#forecast").removeClass("hide");
    
}