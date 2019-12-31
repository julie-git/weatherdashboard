
var cityname="";
var saveSearch=[];

function displayLastSearch(){
  if (localStorage.getItem("Searches") === null) {
    cityname="Seattle";
  }else{
    let savedData= localStorage.getItem("Searches")
    let getArray= JSON.parse(savedData);
    cityname = getArray[getArray.length-1];
    console.log(cityname);
  } 
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q="+ cityname + "&units=imperial&APPID=86689c86634b54250ac08a4458bd5c6c";  //today's forcast
    // Performing our AJAX GET request
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // After the data comes back from the API
      .then(function(response) {

          console.log(response);

        displayToday(response);
        getFiveDay();
               
        
      });


}




function getSavedCity(){
    console.log("getSaveddity");
      cityname = $(e.target).text();
     console.log("get Saved city=" + cityname);

    // Constructing a URL to search Giphy for the name of the person who said the quote
     var queryURL = "http://api.openweathermap.org/data/2.5/weather?q="+ cityname + "&units=imperial&APPID=86689c86634b54250ac08a4458bd5c6c";  //today's forcast
                                             
    // Performing our AJAX GET request
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // After the data comes back from the API
      .then(function(response) {

          console.log(response);

        displayToday(response);
        getFiveDay();
        showCity();
        // saveCity();
        
         
      });

}



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
              $('#humid-'+i).text("Humidity: " + inhumid);
               
              days++;
            }

          });



      }

      function displayToday(response){

        /******Today's Date */
        // Get city name
        cityname = response.name;
        console.log("city= " + cityname);
       
        //Get date
        todaydate = moment().format('dddd, MMMM D, YYYY');
        
        $("#today-city").text(cityname + " (" +todaydate + ")");
        
                //***************get the icon
        var wicon = response.weather[0].icon;
        var wiconurl = "http://openweathermap.org/img/w/" + wicon + ".png"
         console.log(wiconurl);
        //  var wiconEl = $("<img>").addClass("wiconEl");
         $('#today-icon').attr('src',wiconurl);
         $('#today-icon').attr('alt',"weather icon");
      

        //get humidity
        var humidity = response.main.humidity;
         var humdisplay = "Humidity: " + humidity + "%";
         $("#current-humid").text(humdisplay);
        

        //get temp
        var temp = response.main.temp;
        $("#current-temp").text("Temperature: " + temp + "°F");
        
        //get windspeed
        var windspeed = response.wind.speed;
        $("#current-wind").text("Wind Speed: " + windspeed + " MPH");
        
        //get Uv index
        let lat = response.coord.lat;
        let long= response.coord.lon;
        console.log("long=" + long + "  lat = "+ lat);
        getUVIndex(lat,long);
      }

      function getUVIndex(lat,long){
        var queryURL3 = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + long + "&APPID=86689c86634b54250ac08a4458bd5c6c"; //5day forecast
        // var queryURL= "http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=86689c86634b54250ac08a4458bd5c6c" ;                                                             
        // Performing our AJAX GET request
        $.ajax({
          url: queryURL3,
          method: "GET"
        })
          // After the data comes back from the API
          .then(function(response) {

            console.log("getUVIndex");
            console.log(response);
            var uvindex = response.value;
            console.log(uvindex);
            $("#current-uv").text("UV Index: " + uvindex);



      });
     }

     function saveCity(){
       console.log("savecity");
       //get stored array
       if (localStorage.getItem("Searches") === null) {
          console.log("savecity searches is null");
          saveSearch.push(cityname.toLowerCase());
          localStorage.setItem("Searches", JSON.stringify(saveSearch));
          console.log("pushed city="+ cityname);
          console.log(saveSearch);
      }else{
        let savedData= localStorage.getItem("Searches")
        let getArray= JSON.parse(savedData);
        console.log("saveCity getarray" + getArray);
        var found = getArray.includes(cityname.toLowerCase());
        console.log("savecity found = " + found);
        if(found === false){
          console.log("saveCity city not found= " + cityname);
          getArray.push(cityname.toLowerCase());
          localStorage.setItem("Searches", JSON.stringify(getArray));
          console.log("pushed city="+ cityname);
          console.log(saveSearch);
        }
          
     }
    }

     function showCity(){
       console.log("showcity");
       //clear all displayed cities
      //  $("#historybox").empty();

      if (localStorage.getItem("Searches") === null) {
      // do nothing
      }else{
        let retrievedData = localStorage.getItem("Searches");
        let recentArr = JSON.parse(retrievedData);
        recentArr.forEach(function(city){
        console.log(city);
        // var newbox = $("<div>");
        // newbox.addClass("row card savecard");
        // newbox.text(city);
        var newbox= $("<li>");
        newbox.addClass("list-group-item");
        newbox.text(city);
        $("#historybox ul").append(newbox);

        });
       
     }}

     $(document).on("click",".list-group-item",function(e){
      event.preventDefault();
       console.log("you clicked list item")
        cityname  = $(e.target).text();
        console.log(cityname);
     })

     // Event listener for all button elements
$("#searchbtn").on("click", function() {
  event.preventDefault();
  // In this case, the "this" keyword refers to the button that was clicked
   cityname = $("#search-text").val();
   console.log("searchbtn city=" + cityname);

  // Constructing a URL to search Giphy for the name of the person who said the quote
   var queryURL = "http://api.openweathermap.org/data/2.5/weather?q="+ cityname + "&units=imperial&APPID=86689c86634b54250ac08a4458bd5c6c";  //today's forcast
                                           
  // Performing our AJAX GET request
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    // After the data comes back from the API
    .then(function(response) {

        console.log(response);

      displayToday(response);
      getFiveDay();
      showCity();
      saveCity();
      
       
    });
  });

  function myclick(e){
    event.preventDefault();
    console.log("clicked li")
    var newcity  = $(e.target).text();
    console.log(cityname);
  }


  // $("historylist li").click(function(e) {
  //   console.log("clicked li")
  //   cityname = $(e.target).text();
  //   console.log(cityname);
  // });