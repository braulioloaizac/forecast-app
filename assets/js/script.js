var cityName = ""

$( "button" ).on( "click", function(event) {
    event.preventDefault();
    //Gets the text written by the user
    cityName= $("input").val().trim();
    $("input").text = "";
    getCityLocation(cityName);

} );


var getCityLocation = function(cityName){
    var requestUrlCity = "http://api.openweathermap.org/geo/1.0/direct?q="+cityName+"&appid=d935de6f7be9625e1623fe87ae068e56";
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
            alert("There was a problem with your request!");
        }
    })
};


var getCityWeather = function(lon, lat){
    var requestUrlWeather = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&exclude=minutely,hourly&appid=d935de6f7be9625e1623fe87ae068e56";
    fetch(requestUrlWeather).then(function(response){
        if (response.ok){
            response.json().then(function(data){
                console.log(data)
                setInfo();
            })
        }
        else{
            alert("There was a problem with your request!");
        }
    })
}

var setInfo = function(){

}