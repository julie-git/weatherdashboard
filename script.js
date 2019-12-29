
var cityname="";
var saveSearch=[];

// Event listener for all button elements
$("#searchbtn").on("click", function() {
    event.preventDefault();
    // In this case, the "this" keyword refers to the button that was clicked
     cityname = $("#search-text").val();
     console.log("searchbtn city=" + cityname);

    // Constructing a URL to search Giphy for the name of the person who said the quote
     var queryURL = "http://api.openweathermap.org/data/2.5/weather?q="+ cityname + "&units=imperial&APPID=86689c86634b54250ac08a4458bd5c6c";  //today's forcast
   // var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityname + "&units=imperial&APPID=86689c86634b54250ac08a4458bd5c6c"; //5day forecast
    // var queryURL= "http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=86689c86634b54250ac08a4458bd5c6c" ;                                                             
    // Performing our AJAX GET request
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // After the data comes back from the API
      .then(function(response) {

  


        console.log(response);

        displayToday();

        function displayToday(){

        /******Today's Date */
        // Get city name
        cityname = response.name;
        console.log("city= " + cityname);
        //save city name to local storage
        // localStorage.setItem(cityname);
        //Get date
        todaydate = moment().format('dddd, MMMM D, YYYY');
        //create jquary for the date
        // var newdiv= $(".row").addClass("row current-weather");
        // var todaycity = $("<h3>").text(cityname + " ("+todaydate + ")");
        $("#today-city").text(cityname + " (" +todaydate + ")");
        //add class to today city
        // todaycity.addClass("today-city");
      
        //  $(".current-weather").append(today-city);
                //***************get the icon
        var wicon = response.weather[0].icon;
        var wiconurl = "http://openweathermap.org/img/w/" + wicon + ".png"
         console.log(wiconurl);
        //  var wiconEl = $("<img>").addClass("wiconEl");
         $('#today-icon').attr('src',wiconurl);
         $('#today-icon').attr('alt',"weather icon");
      //  $("#today-city").append(wiconEl);

        //get humidity
        var humidity = response.main.humidity;
         var humdisplay = "Humidity: " + humidity + "%";
         $("#current-humid").text(humdisplay);
        

        //get temp
        var temp = response.main.temp;
        // console.log("temp=" + temp);
        // var tempdisplay= $("<p>").text("Temperature: " + temp + "°F");
        $("#current-temp").text("Temperature: " + temp + "°F");
        
        //get windspeed
        var windspeed = response.wind.speed;
        // var windisplay = $("<p>").text("Wind Speed: " + windspeed + " MPH");
        //  windisplay.addClass("today-disp");
        //  $(".current-weather").append(windisplay);
        $("#current-wind").text("Wind Speed: " + windspeed + " MPH");
        
        //get Uv index


        getFiveDay();
        showCity();
        saveCity();
        
        } 
      });
    });

      function getFiveDay(){
          // Constructing a URL to search Giphy for the name of the person who said the quote
      //  var queryURL = "http://api.openweathermap.org/data/2.5/weather?q="+ cityname + "&units=imperial&APPID=86689c86634b54250ac08a4458bd5c6c";  //today's forcast
        var queryURL2 = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityname + "&units=imperial&APPID=86689c86634b54250ac08a4458bd5c6c"; //5day forecast
                                                           
        // Performing our AJAX GET request
        $.ajax({
          url: queryURL2,
          method: "GET"
        })
          // After the data comes back from the API
          .then(function(response) {

            console.log("getFiveDay");
            console.log(response);

            var days=0;
            //read in 5 day into an array
            for (var i=0; i <6 ;i++) {
              // var indate = response.list[i].dt_txt;
             
              var tempdate = moment().add(days, 'days');
              var indate =  moment(tempdate).format('MM/DD/YYYY')
              // indate = moment().format('dddd, MMMM D, YYYY');
              console.log("i="+ i + "date=" + indate);
              $('#date-' +i).text(indate);

              var tempicon = response.list[i].weather[0].icon;
              console.log("tempicon=" +tempicon)
              var iconurl = "http://openweathermap.org/img/w/" + tempicon + ".png"
              console.log(iconurl);
              $('#tempicon-'+i).attr('src',iconurl);

              var intemp = response.list[i].main.temp;
              console.log("temp=" + intemp);
              $('#temp-'+i).text("Temp: " + intemp +"°F")

              var inhumid = response.list[i].main.humidity;
              inhumid = inhumid + " %";
              console.log("Humidity: " + inhumid);
              $('#humid-'+i).text(inhumid);
               
              days++;
            }

          });



      }

      function getUVIndex(){
        var queryURL3 = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityname + "&units=imperial&APPID=86689c86634b54250ac08a4458bd5c6c"; //5day forecast
        // var queryURL= "http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=86689c86634b54250ac08a4458bd5c6c" ;                                                             
        // Performing our AJAX GET request
        $.ajax({
          url: queryURL2,
          method: "GET"
        })
          // After the data comes back from the API
          .then(function(response) {

            console.log("getUVIndex");
            console.log(response);




      });
     }

     function saveCity(){
       console.log("savecity");
       
       saveSearch.push(cityname);
       localStorage.setItem("Searches", JSON.stringify(saveSearch));
      console.log("pushed city="+ cityname);
      console.log(saveSearch);
      
     }

     function showCity(){
       console.log("showcity");
      if (localStorage.getItem("Searches") === null) {
      // do nothing
      }else{
        let retrievedData = localStorage.getItem("Searches");
        let recentArr = JSON.parse(retrievedData);

        // recentArr.forEach(element => console.log(element));
        recentArr.forEach(function(city){
        console.log(city);
        var newbox = $("<div>");
        newbox.addClass("row card");
        newbox.text(city);
        $('#historybox').append(newbox);

        });
       
     }}