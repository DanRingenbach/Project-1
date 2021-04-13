




$('#select-city').click(function (event) {
  event.preventDefault();
  console.log('working')
  var userInput = $('#user-input').val()
  console.log(userInput)
  getApi();

  function getApi() {
    var recAreaUrl = 'https://upenn-cors-anywhere.herokuapp.com/https://ridb.recreation.gov/api/v1/recareas?query=' + userInput + '&limit=5&offset=0&full=true';
    fetch(recAreaUrl, { headers: { apikey: "20f84e32-f5d0-480b-9f55-dd5f515af6af" } })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)
        var name = $('<h3>').text(data.RECDATA[0].RecAreaName)
        $('#rec-index').append(name)
      })

    var locationAPI = 'https://api.opencagedata.com/geocode/v1/json?q=' + userInput + '&key=31fdf0bb1c3d44a3860a7b19963a2ac9'
    fetch(locationAPI)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)
        getAQI(data.results[0].geometry.lat, data.results[0].geometry.lng)
        // console.log(data.results[0].geometry.lat,data.results[0].geometry.lng)
      })

  }
})

function getAQI(lat, lon) {
  var AQIUrl = 'https://upenn-cors-anywhere.herokuapp.com/http://api.airvisual.com/v2/nearest_city?lat=' + lat.toFixed(2) + '&lon=' + lon.toFixed(2) + '&key=8da422fd-653c-45f1-bce2-ca27fc2c8b30'
  console.log(AQIUrl)
  fetch(AQIUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      console.log(data.data.current.pollution.aqius)
    })
}