
var userInput = $('#input-search').val()
var backBtn = document.querySelector('#backBtn');
var card = document.querySelector(".card-container");
var startBtn = document.querySelector('#input-button');
var inputText = document.querySelector('#input-search');
var headOne = document.querySelector('h1');
var AQI = document.querySelector('#AQI')
var REC = document.querySelector('#recArea')



backBtn.addEventListener('click', backButton);


$('#input-button').click(function (event) {
  event.preventDefault();
  $('#recArea').empty();
  $('#AQI').empty();
  
  var userInput = $('#input-search').val()
  console.log(userInput)
  

  var locationAPI = 'https://api.opencagedata.com/geocode/v1/json?q=' + userInput + '&key=31fdf0bb1c3d44a3860a7b19963a2ac9'
  fetch(locationAPI)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      if (data.results.length === 0) {
        alert('No Data Available')
      } else {
        getRecData(data.results[0].geometry.lat, data.results[0].geometry.lng)
      }
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
      console.log(data)

      var numberRaw = data.data.current.pollution.aqius
      var div1 = $('<div>').addClass('col s4 m6 custom-cards')
      var div2 = $('<div>').addClass('col card blue-grey darken-1 round-card')
      var div3 = $('<div>').addClass('card-content white-text')
      var title = $('<span>').addClass('card-title').text('Air Quality Index in this Area')
      var number = $('<h2>').text(numberRaw)
      
      if (numberRaw < 50) {
        number.css('color', 'green')
        console.log('working')
      } if (numberRaw > 50) {
        number.css('color', 'yellow')
      } if (numberRaw > 101) {
        number.css('color', 'red')
      }
      
      $('#AQI').append(div1)
      div1.append(div2)
      div2.append(div3)
      div3.append(title, number)
      AQI.classList.remove('hide');
    })
}

function getRecData(lat, lon) {
  var userInput = $('#input-search').val()
  var recAreaUrl = 'https://upenn-cors-anywhere.herokuapp.com/https://ridb.recreation.gov/api/v1/recareas?query=' + userInput + '&latitude=' + lat.toFixed(1) + '&longitude=' + lon.toFixed(1) + '&limit=10&offset=0&full=true&radius=100';
  console.log(recAreaUrl)
  fetch(recAreaUrl, { headers: { apikey: "20f84e32-f5d0-480b-9f55-dd5f515af6af" } })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      if (data.RECDATA.length === 0) {
        alert("No Data Available")
      } else {
        for (i = 0; i < data.RECDATA.length; i++) {
          console.log(data.RECDATA.length)
          var div1 = $('<div>').addClass('col s4 custom-cards')
          console.log(div1)
          var div2 = $('<div>').addClass('col card round-card card horizontal')
          var div3 = $('<div>').addClass('card-content white-text')
          var title = $('<span>').addClass('card-title').text(data.RECDATA[i].RecAreaName)
          console.log(title)
          var description = $('<p>').text(data.RECDATA[i].RecAreaDescription)
          var address = $('<p>').text(data.RECDATA[i].RECAREAADDRESS[0].RecAreaStreetAddress1 + " " + data.RECDATA[i].RECAREAADDRESS[0].PostalCode + " " + data.RECDATA[i].RECAREAADDRESS[0].City + " " + data.RECDATA[i].RECAREAADDRESS[0].AddressStateCode)
          var link = $('<a>')
          link.attr('href', data.RECDATA[i].LINK[0].URL).addClass('link')
          link.text(data.RECDATA[i].LINK[0].URL)
          console.log(data.RECDATA[i].LINK[0].URL)
          console.log(link)

          console.log(data.RECDATA[i].RecAreaName)
          console.log(data.RECDATA[i].RecAreaDescription)
          console.log(data.RECDATA[i].RECAREAADDRESS[0].RecAreaStreetAddress1 + " " + data.RECDATA[i].RECAREAADDRESS[0].PostalCode + " " + data.RECDATA[i].RECAREAADDRESS[0].City + " " + data.RECDATA[i].RECAREAADDRESS[0].AddressStateCode)

          div1.append(div2)
          div2.append(div3)
          div3.append(title, description, address, link)
          $('#recArea').append(div1)

          startBtn.classList.add('hide');
          inputText.classList.add('hide');
          headOne.classList.add('hide');
          REC.classList.remove('hide')
          card.classList.remove('hide');
          backBtn.classList.remove('hide');
        }
        getAQI(lat, lon)
      }
    })
}

function backButton(e) {
  e.preventDefault();
  console.log('working')
  startBtn.classList.remove('hide');
  inputText.classList.remove('hide');
  headOne.classList.remove('hide');
  REC.classList.add('hide');
  backBtn.classList.add('hide');
  AQI.classList.add('hide');
}


