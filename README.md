# Forecast-app
In this project the main objective is create a forecast app that given a city it shows the current weather conditions composed by temperature, wind velocity, humidity and uv index, from this last it shows when is dangerous to be outside through colors. Additionally it shows the forecast for the next five days.

Another functionality is that it stores the previous searches for easy access and uses the localStorage to prevent data loss.

## App Functionality

The app uses the Open Weather API to get the city coordinates, weather conditions (actually you can select the measurement units), date (provided in Unix timestamp) and the weather icons, with that information we show it on the page using the setInfo function.

The app saves the previous searches in localstorage and generates a button for each new city, with this he can just click it and access the data again and tells the user when a city doesn't exist (also if he don't put nothing on the box).

Here's a sreenshot of the app
![alt text](./snapshot.png "snapshot")

And here's the URL of the app
https://braulioloaizac.github.io/forecast-app/