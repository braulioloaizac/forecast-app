var cityName = "";
var actualDate = "";
//Gets the cities array from localStorage
var cities = JSON.parse(localStorage.getItem("cities")) || [];


var searchHistory = function(){
    for(var i = 0; i < cities.length; i++){
        var newButton = $('<button type="button" class="btn newBtn">'+cities[i]+'</button>');
        $("#search").append(newButton);

    }
}

searchHistory();

$( "button" ).on( "click", function(event) {
    event.preventDefault();
    //Gets the text written by the user
    cityName= $("input").val().trim();
    $("input").val('');
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
                var newButton = $('<button type="button" class="btn newBtn">'+cityName+'</button>');
                $("#search").append(newButton);
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
                console.log(data)
            })
        }
        else{
            alert("There was a problem with your request!");
        }
    })
}

var setInfo = function(data){
    
    //Gets the actual date from the dt value
    timeConverter(data.current.dt);

    $("#city").text(cityName + " ("+actualDate+")" );

    //Gets icon image
    var icon = data.current.weather[0].icon
    $("#icon").attr("src", "http://openweathermap.org/img/wn/"+ icon +"@2x.png");
    
    //Shows the current temperature in farenheit degrees
    $("#temp-0").text(data.current.temp);
    //Shows the current temperature in mph
    $("#wind-0").text(data.current.wind_speed);
    $("#hum-0").text(data.current.humidity);
    $("#uvIndex").text(data.current.uvi);

    for (var i = 1; i <= 5; i++){

        //Sets the date of the 5 next days
        var date = data.daily[i].dt;
        timeConverter(date);
        $("#date-"+i).text(actualDate)
        
        //Sets the icon for each day
        var iconDay = data.daily[i].weather[0].icon
        $("#icon-"+i).attr("src", "http://openweathermap.org/img/wn/"+ iconDay +"@2x.png");
        
        //Shows each day parameters
        $("#temp-"+i).text(data.daily[i].temp.day);
        $("#wind-"+i).text(data.daily[i].wind_speed);
        $("#hum-"+i).text(data.daily[i].humidity);
    }
    //Shows the info part of the page
    $("#forecast").removeClass("hide");
    saveSearch();

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


function saveSearch() {

   //Checks if that the box isn't empty
   if (cityName !== "") {
       
       //Add the new city into the array
       cities.push(cityName);
       //Saves the array
       localStorage.setItem("cities", JSON.stringify(cities));
   }
 }

  