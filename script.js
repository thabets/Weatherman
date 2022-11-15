let search = document.getElementsByClassName("space");
var searchBtn = document.getElementById("btn");
var cityHistory = document.getElementById("cityHistory");
const apiKey = "94f1070b60b1605c526e15498b20130c";
const history = []; // This is for the local storage of the cities saved

$("#btn").on("click", function () {
  //Function to refresh and remove old searches from page
  function removeAllChildNodes(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }
  //variables identifying what will be refreshed
  const infoContainer = document.querySelector("#info");
  var day1 = document.getElementById("day1");
  var day2 = document.getElementById("day2");
  var day3 = document.getElementById("day3");
  var day4 = document.getElementById("day4");
  var day5 = document.getElementById("day5");
  //Future work utilize a forloop to resolve the repetitiveness
  removeAllChildNodes(infoContainer);
  removeAllChildNodes(day1);
  removeAllChildNodes(day2);
  removeAllChildNodes(day3);
  removeAllChildNodes(day4);
  removeAllChildNodes(day5);

  //Setting the search variable to be used down the line
  let searchTerm = document.querySelector("#city").value;

  //Establishing the parameters of local storage
  localStorage.setItem(city, searchTerm);

  //Pushing the search term into the history array and making sure that repetitive cities are not inserted into the array and are not displayed repetitively
  if (!history.includes(searchTerm)) {
    history.push(searchTerm);
    //Creating the History Functionality and Button
    var cityHistoryBtn = document.createElement("button");
    cityHistoryBtn.setAttribute(
      "style",
      " width: 90%; background-color: #CDCDCD;  padding: 5px 0 5px 0;color: Black;margin-top: 10px; text-align:center;"
    );
    cityHistoryBtn.textContent = searchTerm;
    cityHistoryBtn.id = searchTerm;
    cityHistory.appendChild(cityHistoryBtn);
  }

  // Fetch Function utilizing the API

  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      searchTerm +
      "&APPID=" +
      apiKey +
      "&units=metric"
  )
    .then(function (response) {
      //added Error Function
      if (response.status === 404) {
        alert("Please Double Check The City And Try Again.");
      } else if (response.status === 400) {
        alert("Please Enter A City And Try Again.");
      } else {
        return response.json();
      }
    })
    .then(function (data) {
      //first div box containing the main information for city
      let city = document.createElement("h2");
      city.textContent = searchTerm;
      info.appendChild(city);

      //Presented list Variables
      var dayInfo = document.createElement("ul"); //append list to this untitled list
      dayInfo.setAttribute = ("style", "font-family:times; font-size:20px");

      //Creating variable items with Dom for list
      var temp = document.createElement("p");
      var wind = document.createElement("p");
      var humidity = document.createElement("p");
      var UV = document.createElement("span");
      var icon = document.createElement("img");
      var Uvinfo = document.createElement("span");

      //Extracting API Info and appending items to the list
      dayInfo.textContent = "What To Expect Today:";
      temp.innerText = "Temp: " + data.main.temp + " Celcius";
      info.appendChild(temp);

      // Extract icon information from API then set it to the Icon variable
      icon.setAttribute(
        "src",
        "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png"
      );
      city.appendChild(icon);

      wind.innerText = "Wind: " + data.wind.speed + " KMH";
      info.appendChild(wind);

      humidity.innerText = "Humidity: " + data.main.humidity + " %";
      info.appendChild(humidity);

      // Retrieved Lat & Lon information for second Fetch
      let lon = data.coord.lon;

      let lat = data.coord.lat;

      // Established a second fetch call for API regarding UV as well as 5 day weather format

      fetch(
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
          lat +
          "&lon=" +
          lon +
          "&APPID=" +
          apiKey +
          "&exclude=hourly,minutely&units=metric"
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (obj) {
          let UVinfo = obj.current.uvi;

          //Creating the UV Index and appending it to the weather report

          UV.innerText = "UV Index: " + UVinfo;
          if (UVinfo <= 2) {
            UV.setAttribute(
              "style",
              "background-color: Green; border-radius: .5rem; padding:5px; color:white; "
            );
            info.appendChild(UV);
          } else if (UVinfo <= 5) {
            UV.setAttribute(
              "style",
              "background-color: Yellow; border-radius: .5rem; padding:5px; color:white; "
            );
            info.appendChild(UV);
          } else if (UVinfo <= 7) {
            UV.setAttribute(
              "style",
              "background-color: Orange; border-radius: .5rem; padding:5px; color:white; "
            );
            info.appendChild(UV);
          } else {
            UV.setAttribute(
              "style",
              "background-color: Red; border-radius: .5rem; padding:5px; color:white; "
            );
            info.appendChild(UV);
          }

          // 5-Day Forecast Variables and its API allocation
          // Date Variables
          var date = new Date();
          var day = date.getDay();
          var month = date.getMonth();
          var year = date.getFullYear();

          //day1
          var day1 = document.getElementById("day1");

          day1.setAttribute(
            "style",
            "background-color:#6495ED; color:white; border: white solid 2px; border-radius:1rem"
          );

          var fullDate1 = document.createElement("p");
          fullDate1.innerText =
            "(" + (day + 1) + "-" + (month + 1) + "-" + year + ")";
          day1.appendChild(fullDate1);

          var day1Icon = document.createElement("img");
          day1Icon.setAttribute(
            "src",
            "https://openweathermap.org/img/w/" +
              obj.daily[1].weather[0].icon +
              ".png"
          );
          day1.appendChild(day1Icon);

          var day1Temp = document.createElement("p");
          day1Temp.innerText = "Temp: " + obj.daily[1].temp.day + " Celsius";
          day1.appendChild(day1Temp);

          var day1Wind = document.createElement("p");
          day1Wind.innerText = "Wind: " + obj.daily[1].wind_speed + " KMH";
          day1.appendChild(day1Wind);

          var day1Hum = document.createElement("p");
          day1Hum.innerText = "Humidity: " + obj.daily[1].humidity + " %";
          day1.appendChild(day1Hum);

          //day2

          var day2 = document.getElementById("day2");

          day2.setAttribute(
            "style",
            "background-color:#6495ED; color:white;border: white solid 2px; border-radius:1rem"
          );
          var fullDate2 = document.createElement("p");
          fullDate2.innerText =
            "(" + (day + 2) + "-" + (month + 1) + "-" + year + ")";
          day2.appendChild(fullDate2);

          var day2Icon = document.createElement("img");
          day2Icon.setAttribute(
            "src",
            "https://openweathermap.org/img/w/" +
              obj.daily[2].weather[0].icon +
              ".png"
          );
          day2.appendChild(day2Icon);

          var day2Temp = document.createElement("p");
          day2Temp.innerText = "Temp: " + obj.daily[2].temp.day + " Celsius";
          day2.appendChild(day2Temp);

          var day2Wind = document.createElement("p");
          day2Wind.innerText = "Wind: " + obj.daily[2].wind_speed + " KMH";
          day2.appendChild(day2Wind);

          var day2Hum = document.createElement("p");
          day2Hum.innerText = "Humidity: " + obj.daily[2].humidity + " %";
          day2.appendChild(day2Hum);

          //day 3

          var day3 = document.getElementById("day3");

          day3.setAttribute(
            "style",
            "background-color:#6495ED; color:white;border: white solid 2px; border-radius:1rem"
          );

          var fullDate3 = document.createElement("p");
          fullDate3.innerText =
            "(" + (day + 3) + "-" + (month + 1) + "-" + year + ")";
          day3.appendChild(fullDate3);

          var day3Icon = document.createElement("img");
          day3Icon.setAttribute(
            "src",
            "https://openweathermap.org/img/w/" +
              obj.daily[3].weather[0].icon +
              ".png"
          );
          day3.appendChild(day3Icon);

          var day3Temp = document.createElement("p");
          day3Temp.innerText = "Temp: " + obj.daily[3].temp.day + " Celsius";
          day3.appendChild(day3Temp);

          var day3Wind = document.createElement("p");
          day3Wind.innerText = "Wind: " + obj.daily[3].wind_speed + " KMH";
          day3.appendChild(day3Wind);

          var day3Hum = document.createElement("p");
          day3Hum.innerText = "Humidity: " + obj.daily[3].humidity + " %";
          day3.appendChild(day3Hum);

          //day 4

          var day4 = document.getElementById("day4");

          day4.setAttribute(
            "style",
            "background-color:#6495ED; color:white;border: white solid 2px; border-radius:1rem"
          );

          var fullDate4 = document.createElement("p");
          fullDate4.innerText =
            "(" + (day + 4) + "-" + (month + 1) + "-" + year + ")";
          day4.appendChild(fullDate4);

          var day4Icon = document.createElement("img");
          day4Icon.setAttribute(
            "src",
            "https://openweathermap.org/img/w/" +
              obj.daily[4].weather[0].icon +
              ".png"
          );
          day4.appendChild(day4Icon);

          var day4Temp = document.createElement("p");
          day4Temp.innerText = "Temp: " + obj.daily[4].temp.day + " Celsius";
          day4.appendChild(day4Temp);

          var day4Wind = document.createElement("p");
          day4Wind.innerText = "Wind: " + obj.daily[4].wind_speed + " KMH";
          day4.appendChild(day4Wind);

          var day4Hum = document.createElement("p");
          day4Hum.innerText = "Humidity: " + obj.daily[4].humidity + " %";
          day4.appendChild(day4Hum);

          //day 5

          var day5 = document.getElementById("day5");

          day5.setAttribute(
            "style",
            "background-color:#6495ED; color:white;border: white solid 2px; border-radius:1rem"
          );
          var fullDate5 = document.createElement("p");
          fullDate5.innerText =
            "(" + (day + 5) + "-" + (month + 1) + "-" + year + ")";
          day5.appendChild(fullDate5);

          var day5Icon = document.createElement("img");
          day5Icon.setAttribute(
            "src",
            "https://openweathermap.org/img/w/" +
              obj.daily[5].weather[0].icon +
              ".png"
          );
          day5.appendChild(day5Icon);

          var day5Temp = document.createElement("p");
          day5Temp.innerText = "Temp: " + obj.daily[5].temp.day + " Celsius";
          day5.appendChild(day5Temp);

          var day5Wind = document.createElement("p");
          day5Wind.innerText = "Wind: " + obj.daily[5].wind_speed + " KMH";
          day5.appendChild(day5Wind);

          var day5Hum = document.createElement("p");
          day5Hum.innerText = "Humidity: " + obj.daily[5].humidity + " %";
          day5.appendChild(day5Hum);
        });
    });
});
