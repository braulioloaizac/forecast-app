var cityName = "";
var actualDate = "";

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
    //Gets the actual date from the dt value
    timeConverter(data.current.dt);

    $("#city").text(cityName + " ("+actualDate+")" );
    $("#temp-0").text(data.current.temp);
    $("#wind-0").text(data.current.wind_speed);
    $("#hum-0").text(data.current.humidity);
    $("#uvIndex").text(data.current.uvi);

    for (var i = 1; i <= 5; i++){
        //Sets the date of the 5 next days
        var date = data.daily[i].dt;
        timeConverter(date);
        $("#date-"+i).text(actualDate)
        //Shows each day parameters
        $("#temp-"+i).text(data.daily[i].temp.day);
        $("#wind-"+i).text(data.daily[i].wind_speed);
        $("#hum-"+i).text(data.daily[i].humidity);
    }

    $("#forecast").removeClass("hide");
    
}

function timeConverter(UNIX_timestamp){
    //Object date to convert unix timestamp to a readable date
    var a = new Date(UNIX_timestamp * 1000);
    var year = a.getFullYear();
    //Months start in 0
    var month = a.getMonth() + 1;
    var date = a.getDate();
    //Format the date
    actualDate = `${month}/${date}/${year}`;
  }
  