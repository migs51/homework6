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

    var sumDay1 = 0;
    var sumDay2 = 0;
    var sumDay3 = 0;
    var sumDay4 = 0;
    var sumDay5 = 0;

    $.ajax({
        url: fiveDayURL,
        method: "GET"
    }).then(function(response){ 
        fiveDayTemp = response.list;
        console.log(fiveDayTemp);
        
        for (var i = 0; i < fiveDayTemp.length - 32; i++){
            sumDay1 += fiveDayTemp[i].main.temp;  
        }
        console.log(sumDay1);
        var day1Avg = sumDay1 /8;
        console.log(day1Avg);

        console.log("==============================");
        for (var i = 8; i < fiveDayTemp.length - 24; i++){
            sumDay2 += fiveDayTemp[i].main.temp;
        }
        console.log(sumDay2);
        var day2Avg = sumDay2 /8;
        console.log(day2Avg);

        console.log("==============================");
        for (var i = 16; i < fiveDayTemp.length - 16; i++){
            sumDay3 += fiveDayTemp[i].main.temp;
        }
        console.log(sumDay3);
        var day3Avg = sumDay3 /8;
        console.log(day3Avg);

        console.log("==============================");
        for (var i = 24; i < fiveDayTemp.length - 8; i++){
            sumDay4 += fiveDayTemp[i].main.temp;
        }
        console.log(sumDay4);
        var day4Avg = sumDay4 /8;
        console.log(day4Avg);

        console.log("==============================");
        for (var i = 32; i < fiveDayTemp.length; i++){
            sumDay5 += fiveDayTemp[i].main.temp;
        }
        console.log(sumDay5);
        var day5Avg = sumDay5 /8;
        console.log(day5Avg);
    })

   

});