
var userInput = $('#input-search').val()
var backBtn = document.querySelector('#backBtn');
var card = document.querySelector(".card-container");
var startBtn = document.querySelector('#input-button');
var inputText = document.querySelector('#input-search');
var headOne = document.querySelector('h1');

startBtn.addEventListener('click',displayCards);
backBtn.addEventListener('click',backButton);

$('#input-button').click(function (event) {
  event.preventDefault();
  // console.log('working')
  var userInput = $('#input-search').val()
  console.log(userInput)
  // getApi();

  var locationAPI = 'https://api.opencagedata.com/geocode/v1/json?q=' + userInput + '&key=31fdf0bb1c3d44a3860a7b19963a2ac9'
  fetch(locationAPI)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data)
      getAQI(data.results[0].geometry.lat, data.results[0].geometry.lng)
      getApi(data.results[0].geometry.lat, data.results[0].geometry.lng)
      // console.log(data.results[0].geometry.lat,data.results[0].geometry.lng)
    })

});


function getAQI(lat, lon) {
  var AQIUrl = 'https://upenn-cors-anywhere.herokuapp.com/http://api.airvisual.com/v2/nearest_city?lat=' + lat.toFixed(2) + '&lon=' + lon.toFixed(2) + '&key=8da422fd-653c-45f1-bce2-ca27fc2c8b30'
  console.log(AQIUrl)
  fetch(AQIUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data)
      console.log(data.data.current.pollution.aqius)
    })
}

function getApi(lat, lon) {
  var userInput = $('#input-search').val()
  var recAreaUrl = 'https://upenn-cors-anywhere.herokuapp.com/https://ridb.recreation.gov/api/v1/recareas?query='+userInput+'&latitude='+lat.toFixed(1)+'&longitude='+lon.toFixed(1)+'&limit=10&offset=0&full=true&radius=100';
  console.log(recAreaUrl)
  fetch(recAreaUrl, { headers: { apikey: "20f84e32-f5d0-480b-9f55-dd5f515af6af" } })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      for (i = 0; i < data.RECDATA.length; i++) {
        console.log(data.RECDATA.length)
        
        var name = $('<h6>').text(data.RECDATA[i].RecAreaName)
        var description = $('<h6>').text(data.RECDATA[i].RecAreaDescription)
        var address = $('<h6>').text(data.RECDATA[i].RECAREAADDRESS[0].RecAreaStreetAddress1 + " " + data.RECDATA[i].RECAREAADDRESS[0].PostalCode + " " + data.RECDATA[i].RECAREAADDRESS[0].City + " " + data.RECDATA[i].RECAREAADDRESS[0].AddressStateCode)
        console.log(data.RECDATA[i].RecAreaName)
        console.log(data.RECDATA[i].RecAreaDescription)
        console.log(data.RECDATA[i].RECAREAADDRESS[0].RecAreaStreetAddress1 + " " + data.RECDATA[i].RECAREAADDRESS[0].PostalCode + " " + data.RECDATA[i].RECAREAADDRESS[0].City + " " + data.RECDATA[i].RECAREAADDRESS[0].AddressStateCode)
      }
    })
}

function displayCards(e){
  e.preventDefault();

startBtn.classList.add('hide');
inputText.classList.add('hide');
headOne.classList.add('hide');
card.classList.remove('hide');
backBtn.classList.remove('hide');
}
 function backButton(e){
   e.preventDefault();

   startBtn.classList.remove('hide');
  inputText.classList.remove('hide');
  headOne.classList.remove('hide');
  card.classList.add('hide');
  backBtn.classList.add('hide');
 }