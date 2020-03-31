$(document).ready(function(){
    //Global Variables
    var citySearch = $(".form-control");
    var searchButton = $(".btn");
    var cityArea = $("#cities");
    var cityWeather = $("#cityWeather");
    var fiveDayForecast = $("#5day");
   
    
    var sumDay1 = 0;
    var sumDay2 = 0;
    var sumDay3 = 0;
    var sumDay4 = 0;
    var sumDay5 = 0;

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
            cityWeather.append(response.name);
            currentCityWeather = (response.main.temp - 273.15) *1.8 + 32;
            cityWeather.append(currentCityWeather.toFixed(2));
            cityHumidity = response.main.humidity;
            cityWeather.append(cityHumidity.toFixed(2));
            console.log("City Humidity: " + cityHumidity);
            cityWindSpeed = response.wind.speed;
            cityWeather.append(cityWindSpeed.toFixed(2));
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
                cityWeather.append(uvIndex);
                
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
            console.log(day1Avg.toFixed(2));
            fiveDayForecast.append(day1Avg.toFixed(2));
    
            console.log("==============================");
            for (var i = 8; i < fiveDayTemp.length - 24; i++){
                sumDay2 += fiveDayTemp[i].main.temp;
            }
        
            var day2Avg = (sumDay2 /8 -273.15) * 1.8 +32;
            console.log(day2Avg);
            fiveDayForecast.append(day2Avg.toFixed(2));
    
            console.log("==============================");
            for (var i = 16; i < fiveDayTemp.length - 16; i++){
                sumDay3 += fiveDayTemp[i].main.temp;
            }
          
            var day3Avg = (sumDay3 /8 -273.15) * 1.8 + 32;
            console.log(day3Avg);
            fiveDayForecast.append(day3Avg.toFixed(2));
    
            console.log("==============================");
            for (var i = 24; i < fiveDayTemp.length - 8; i++){
                sumDay4 += fiveDayTemp[i].main.temp;
            }
            
            var day4Avg = (sumDay4 /8 - 273.15) * 1.8 + 32;
            console.log(day4Avg);
            fiveDayForecast.append(day4Avg.toFixed(2));
    
            console.log("==============================");
            for (var i = 32; i < fiveDayTemp.length; i++){
                sumDay5 += fiveDayTemp[i].main.temp;
            }
            
            var day5Avg = (sumDay5 /8 - 273.15) * 1.8 + 32;
            console.log(day5Avg);
            fiveDayForecast.append(day5Avg.toFixed(2));
        })
    

    })

    
    
    
    
  

   

   
   

});