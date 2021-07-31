let search = document.getElementsByClassName("space");
var searchBtn = document.getElementById("btn");
const apiKey = "94f1070b60b1605c526e15498b20130c";

document.querySelector("#btn").addEventListener("click", function () {
  let searchTerm = document.querySelector("#city").value;
  var id = "city";
  localStorage.setItem(city, searchTerm);
  console.log(searchTerm);

  fetch(
    "http://api.openweathermap.org/data/2.5/weather?q=" +
      searchTerm +
      "&APPID=" +
      apiKey
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
});

//Fetch Function
