let search = document.getElementsByClassName("space");
var searchBtn = document.getElementById("btn");
const apiKey = "94f1070b60b1605c526e15498b20130c";

document.querySelector("#btn").addEventListener("click", function () {
  let searchTerm = document.querySelector("#city").value;
  var id = "city";
  var info = document.getElementById("info");
  var day1 = document.getElementById("day1");
  localStorage.setItem(city, searchTerm);
  console.log(searchTerm);

  //Fetch Function

  fetch(
    "http://api.openweathermap.org/data/2.5/weather?q=" +
      searchTerm +
      "&APPID=" +
      apiKey +
      "&units=metric"
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
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
      var UV = document.createElement("p");
      var icon = document.createElement("img");

      //Extracting API Info and appending items to the list
      dayInfo.textContent = "What To Expect Today:";
      temp.innerText = "Temp: " + data.main.temp + " Celcius";
      info.appendChild(temp);

      // Extract icon information from API then set it to the Icon variable
      icon.setAttribute(
        "src",
        "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png"
      );
      city.appendChild(icon);

      wind.innerText = "Wind: " + data.wind.speed + " KMH";
      info.appendChild(wind);

      humidity.innerText = "Humidity: " + data.main.humidity + " %";
      info.appendChild(humidity);

      // Retrieved Lat & Lon information for second Fetch
      let lon = data.coord.lon;
      console.log(lon);

      let lat = data.coord.lat;
      console.log(lat);

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
          console.log(obj);
          let UVinfo = obj.current.uvi;

          //Creating the UV Index and appending it to the weather report

          UV.innerText = "UV Index: " + UVinfo;
          if (UVinfo <= 2) {
            UV.setAttribute("style", "background-color: Green");
            info.appendChild(UV);
          } else if (UVinfo <= 5) {
            UV.setAttribute("style", "background-color: Yellow");
            info.appendChild(UV);
          } else if (UVinfo <= 7) {
            UV.setAttribute("style", "background-color: Orange");
            info.appendChild(UV);
          } else {
            UV.setAttribute("style", "background-color: Red");
            info.appendChild(UV);
          }

          // 5-Day Forecast Variables and its API allocation
          //day1
          var day1 = document.getElementById("day1");

          day1.setAttribute(
            "style",
            "background-color:grey; color:white; border: white solid 2px"
          );
          var day1Icon = document.createElement("img");
          day1Icon.setAttribute(
            "src",
            "http://openweathermap.org/img/w/" +
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
            "background-color:grey; color:white;border: white solid 2px"
          );
          var day2Icon = document.createElement("img");
          day2Icon.setAttribute(
            "src",
            "http://openweathermap.org/img/w/" +
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
            "background-color:grey; color:white;border: white solid 2px"
          );
          var day3Icon = document.createElement("img");
          day3Icon.setAttribute(
            "src",
            "http://openweathermap.org/img/w/" +
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
            "background-color:grey; color:white;border: white solid 2px"
          );
          var day4Icon = document.createElement("img");
          day4Icon.setAttribute(
            "src",
            "http://openweathermap.org/img/w/" +
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
            "background-color:grey; color:white;border: white solid 2px"
          );
          var day5Icon = document.createElement("img");
          day5Icon.setAttribute(
            "src",
            "http://openweathermap.org/img/w/" +
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
