var temp = document.createElement("p");
      var wind = document.createElement("p");
      var humidity = document.createElement("p");
      var UV = document.createElement("p");
      var icon = document.createElement("img");




      var day = [1,2,3,4,5];
      var temperature = 
      for (let i = 0; i < day.length; i++){
            var day+day[i] = document.getElementById("day"+day[i]);
            day[i].setAttribute("style", "background-color:navy; color:white");
           
           
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
 
      }