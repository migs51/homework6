$(document).ready(function(){

    var citySearch = $(".form-control");
    var searchButton = $(".btn");
    var cityArea = $("#cities");
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

        // for (var i = 0; i < cityArray.length; i++){
        //     newDiv = $("<div>");
        //     cityDiv = newDiv.text(cityArray[i]);
        //     cityArea.append(cityDiv);

    
        // }
    })

   

});