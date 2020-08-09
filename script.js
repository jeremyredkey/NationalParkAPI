//https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=I0hD3bLpkx6dih1IdE2PI2bidXF67Xe9FOa6SZJN

const apiKey = 'I0hD3bLpkx6dih1IdE2PI2bidXF67Xe9FOa6SZJN'
const searchURL = 'https://developer.nps.gov/api/v1/places'
const addressURL = 'https://developer.nps.gov/api/v1/visitorcenters'


// Each API request contains:
// Resource Endpoint
// Query String Parameters
// HTTP Request Header with an API Key
// For example, consider the following URL:
// https://developer.nps.gov/api/v1/places?stateCode=WA,CA&api_key=I0hD3bLpkx6dih1IdE2PI2bidXF67Xe9FOa6SZJN

// In the above request, two of the three necessary components are represented.
// Resource Endpoint - https://developer.nps.gov/api/v1/places
// Query String Parameters - stateCode=WA,CA
//&& API Key in the HTTP request

// Requirements:
// The user must be able to search for parks in one or more states.
// The user must be able to set the max number of results, with a default of 10.
// The search must trigger a call to NPS's API.
// The parks in the given state must be displayed on the page. Include at least:
// Full name
// Description
// Website URL
// The user must be able to make multiple searches and see only the results for the current search.

// let stateCode = $(stateCode).val().toUpperCase()


  function formSubmit() { 
     $('#form').on('submit', e => {
      e.preventDefault();
          let stateCode = $('#stateCode').val().toUpperCase()


      console.log(stateCode);
      pullResults(stateCode)
        })

  }

  function pullResults(stateCode) {
          let numResults = $('#numberResults').val()
console.log(`https://developer.nps.gov/api/v1/places?stateCode=${stateCode}&api_key=${apiKey}`)
fetch(`https://developer.nps.gov/api/v1/places?stateCode=${stateCode}&api_key=${apiKey}&limit=${numResults}`)
    .then(response => response.json())
    .then(responseJson => 
      displayResults(responseJson))
    .catch(error => alert('Error: Something went wrong'));

  }

  function displayResults(responseJson) {
    let results = $('#results');
    let numResults = $('#numberResults').val()
 if (numResults > responseJson.data.length) {
    $('#warning').append(`<h3 class="warning-message">Warning: There is not enough data to fulfill max results filter. Please add state abbeviations and try again.</h3>`)
    } else if(numResults == responseJson.data.length) {
      $('#warning').empty()
    }

 results.empty();
for(let i = 0; i < responseJson.data.length; i++) {


  console.log(responseJson.data[i])
  let link = responseJson.data[i].url;
  let title = responseJson.data[i].title;
  let desc = responseJson.data[i].listingDescription;

results.append(`
<li class="list-item-${i + 1}">
<h2>${title}</h2>
<p>${desc}</p>
<a href="${link}" target="_blank">Read More</a>
</li>
`)

}
  }

  $(function() {

    formSubmit()
  })