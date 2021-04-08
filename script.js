function getApi() {
    // fetch request gets a list of all the repos for the node.js organization
    var requestUrl = 'https://upenn-cors-anywhere.herokuapp.com/https://ridb.recreation.gov/api/v1/recareaaddresses?query=Philadelphia&offset=0';
  
    fetch(requestUrl, { headers: { apikey: "20f84e32-f5d0-480b-9f55-dd5f515af6af" } })
      .then(function (response) {
  
        return response.json();
  
  
      })
      .then(function(data){
        console.log(data)
      })
  }
  getApi();