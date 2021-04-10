




$('#select-city').click(function (event) {
  event.preventDefault();
  console.log('working')
  var userInput = $('#user-input').val()
  console.log(userInput)
  getApi();
  
  function getApi() {
    var requestUrl = 'https://upenn-cors-anywhere.herokuapp.com/https://ridb.recreation.gov/api/v1/recareas?query=' + userInput + '&limit=50&offset=0&full=true';

    fetch(requestUrl, { headers: { apikey: "20f84e32-f5d0-480b-9f55-dd5f515af6af" } })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)
      })
  }
})
