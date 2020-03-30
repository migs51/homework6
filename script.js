$(document).ready(function(){

    var citySearch = $(".form-control");
    var searchButton = $(".btn");
    var cityArea = $("#cities");
    var cityWeather = $("#cityWeather");
    // var cityArray = [];

    searchButton.click(function(event){
        event.preventDefault();
        console.log("it works");
        userInput = citySearch.val().trim();
        console.log(userInput);
        // cityArray.push(userInput);
        // console.log(cityArray);
        newDiv = $("<div>");
        cityDiv = newDiv.text(userInput);
        cityArea.append(cityDiv);
        console.log(cityDiv);
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+ userInput +"&appid=fef78c8268ea7a4b885c42dcd03e1dd8";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){ 
            console.log(response);
            cityWeather.append(response.name);
            cityWeather.append(response.main.temp);
            cityWeather.append(response.main.humidity);
            cityWeather.append(response.wind.speed);
            console.log(response.coord.lon);
            console.log(response.coord.lat);
        })
    

        // for (var i = 0; i < cityArray.length; i++){
        //     newDiv = $("<div>");
        //     cityDiv = newDiv.text(cityArray[i]);
        //     cityArea.append(cityDiv);

    
        // }
    })

    
    var indexURL = "https://api.openweathermap.org/data/2.5/uvi?appid=fef78c8268ea7a4b885c42dcd03e1dd8&lat=30.27&lon=-97.74";
    var fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?q=Austin&appid=fef78c8268ea7a4b885c42dcd03e1dd8"
    var lat = "";
    var lon = "";
    
    $.ajax({
        url: indexURL,
        method: "GET"
    }).then(function(response){ 
        console.log(response);
        
    })

    $.ajax({
        url: fiveDayURL,
        method: "GET"
    }).then(function(response){ 
        console.log(response);
      
    })

   

});