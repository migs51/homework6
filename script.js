$(document).ready(function(){
    //Global Variables
    var citySearch = $(".form-control");
    var searchButton = $(".btn");
    var cityArea = $("#cities");
    var cityWeather = $("#cityWeather");
    var fiveDayForecast = $("#5day");
    var uvIndex = $("#uv");
   
    
    var sumDay1 = 0;
    var sumDay2 = 0;
    var sumDay3 = 0;
    var sumDay4 = 0;
    var sumDay5 = 0;

    //moment JS to populate dates for cityWeather Div and fiveDayForecast cards
    //set and get local storage for each user inputted city. make city clickable to get key value pairs.
    //add icon to represent weather conditions
    //change color of UV index that indicates if the conditions are favorable, moderate or severe

    //click event for my city search bar
    searchButton.click(function(event){
        event.preventDefault();
        //capture userinput 
        userInput = citySearch.val().trim();
        console.log(userInput);
        //dynamically add city link to div below search bar
        newDiv = $("<div>");
        cityDiv = newDiv.text(userInput);
        cityArea.append(cityDiv);
        console.log(cityDiv);

        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+ userInput +"&appid=fef78c8268ea7a4b885c42dcd03e1dd8";

        //ajax call to get the current weather from the user inputted city
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){ 
            console.log(response);
            currentWeather.append(response.name + " Weather");
            currentCityWeather =(response.main.temp - 273.15) *1.8 + 32;
            temp.append("Temp: " + currentCityWeather.toFixed(2) + " F");
            console.log("TEMP: " + currentCityWeather);
            cityHumidity = response.main.humidity;
            humidity.append("Humidity: " + cityHumidity.toFixed(2));
            console.log("City Humidity: " + cityHumidity);
            cityWindSpeed = response.wind.speed;
            windSpeed.append("Wind Speed: " + cityWindSpeed.toFixed(2));
            console.log("Wind Speed: " + cityWindSpeed);
            var cityLon = response.coord.lon;
            var cityLat = response.coord.lat;

            var indexURL = "https://api.openweathermap.org/data/2.5/uvi?appid=fef78c8268ea7a4b885c42dcd03e1dd8&lat=" + cityLat + "&lon=" + cityLon;

            //ajax call to get UV index
            $.ajax({
                url: indexURL,
                method: "GET"
            }).then(function(response){ 
                var uvIndex = response.value;
                console.log("UV INDEX: " + uvIndex);
                uv.append("UV Index: " + uvIndex);
                
            })
        })
    

        var fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + userInput + "&appid=fef78c8268ea7a4b885c42dcd03e1dd8"

        //ajax call to get 5 day temp forecast.. this API spits out the 5 day forecast in increments of 3hours. I used for loops to calculate the average for each day
        $.ajax({
            url: fiveDayURL,
            method: "GET"
        }).then(function(response){ 
            fiveDayTemp = response.list;
            console.log(fiveDayTemp);
            
            for (var i = 0; i < fiveDayTemp.length - 32; i++){
                sumDay1 += fiveDayTemp[i].main.temp;  
            }
          
            var day1Avg = (sumDay1 /8 -273.15) * 1.8 +32 ;
            console.log("Day 1 Forecast: " + day1Avg.toFixed(2));
            day1.append("Day 1: " + day1Avg.toFixed(2) + " F");
        
    
            console.log("==============================");
            for (var i = 8; i < fiveDayTemp.length - 24; i++){
                sumDay2 += fiveDayTemp[i].main.temp;
            }
        
            var day2Avg = (sumDay2 /8 -273.15) * 1.8 +32;
            console.log("Day 2 Forecast: " + day2Avg);
            day2.append("Day 2: " + day2Avg.toFixed(2) + " F");
    
            console.log("==============================");
            for (var i = 16; i < fiveDayTemp.length - 16; i++){
                sumDay3 += fiveDayTemp[i].main.temp;
            }
          
            var day3Avg = (sumDay3 /8 -273.15) * 1.8 + 32;
            console.log("Day 3 Forecast: " +day3Avg);
            day3.append("Day 3: " + day3Avg.toFixed(2) + " F");
    
            console.log("==============================");
            for (var i = 24; i < fiveDayTemp.length - 8; i++){
                sumDay4 += fiveDayTemp[i].main.temp;
            }
            
            var day4Avg = (sumDay4 /8 - 273.15) * 1.8 + 32;
            console.log("Day 4 Forecast: " + day4Avg);
            day4.append("Day 4: " + day4Avg.toFixed(2) + " F");
    
            console.log("==============================");
            for (var i = 32; i < fiveDayTemp.length; i++){
                sumDay5 += fiveDayTemp[i].main.temp;
            }
            
            var day5Avg = (sumDay5 /8 - 273.15) * 1.8 + 32;
            console.log("Day 5 Forecast: " + day5Avg);
            day5.append("Day 5: " + day5Avg.toFixed(2) + " F");
        })

        

        

        

    })

    var m = moment()
    var currentDate = m.format("dddd " + "MMMM " + "DD, " + "YYYY");

    $("#currentDate").text(currentDate);

    
    
    
    
    
  

   

   
   

});