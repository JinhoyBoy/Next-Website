
"use strict";   // this gives us some more discipline in coding correct Javascript
//
// Function Init defines a string. The content of that string is actually a JSON.
// This example is just for our training.
// the object. So what we do here is to define a string ' .JSON.... ' and then parse it.
function Init ()
{
var jsonstring = ' { "Menschen" : [' +
  ' { "Vorname" : "Peter", "Nachname" :"Müller", "Gender": "male", "Rolle" : "Student"  },' +
  ' { "Vorname" : "Susanne", "Nachname" :"Lehmann", "Gender": "female", "Rolle" : "Studentin"  },' +
  ' { "Vorname" : "Jürgen", "Nachname" :"Schneider", "Gender": "male", "Rolle" : "Dozent"  }'+
  //  add another Person ..  see this statement concatenates substrings using the +  operator
  //  ... add another person like  ' .... ' +
  ' ] }';

window.Menschen = JSON.parse(jsonstring);
//
// Define all click events
//
// Here are some examples.  Currently the function would be disabled since we still have
// severe JavaScript Coding errors
//
//
document.getElementById('PullupServices').addEventListener("click", dothisnow);
// Above just gives the name of the function to the event listener, the function dothisnow must be specifed
// somewhere else
//
document.getElementById('PullupOptionsBtn').addEventListener("click", dothislater);


document.getElementById('popupli1').addEventListener("click", showMenschen)
document.getElementById('showwindowbtn').addEventListener("click", function() {
  document.getElementById('showwindow').style.display = "none";
})

document.getElementById("searchbtn").addEventListener("click", searchWikipedia);
document.getElementById('wikiwindowbtn').addEventListener("click", function() {
  document.getElementById('wikiwindow').style.display = "none";
})

 }
function dothisnow()
 {
  console.log("Pull up"); // just log that the event has triggered the right routine.
  // access the pullup Window
  //
  var pull = document.getElementById("PullupOptions"); // variable pull refers to the HTML element with the id="abc"
  pull.style.top = document.getElementById("scrollpart").offsetTop + "px";
  pull.style.display = "block";
  }

  function dothislater() 
  { 
  console.log("close Pull up"); 
  var pull = document.getElementById("PullupOptions"); 
  pull.style.display = "none";
  }
  //
  // This function is a code skeleton of getting the above defined JSON and
  // to build an HTML string implementing a table with the JSON data
  //
function showMenschen()  {
  //
  //  Show Menschen Object as dynamic table
  //
  console.log("showMenschen ");
  //
  // We could use JavaScript and the HTML object methods and properties to build a table or we just
  // construct a string with the HTML data
  //
  var tableheader = "<table> <tr>"; // this is the table header .. just take it
  tableheader += "<th>Vorname</th><th>Nachname</th><th>Gender</th><th>Rolle</th></tr>";
  //
  // now we build each row
  //
  var tabletext = "";
  var alle = window.Menschen;
  // var alle is now the reference to the Object
  // alle.Menschen is the array of people
  for (var i = 0; i < alle.Menschen.length; i++) {
    var person = alle.Menschen[i];
    tabletext += "<tr><td>" + person.Vorname + "<td>" + person.Nachname + "<td>" + person.Gender + "<td>" + person.Rolle
  }

  var tableclosing = "</table>"; // the table end just take it
  var fulltext = tableheader + tabletext + tableclosing;
  //
  // save the full text as innerHTML of the popup element named showwindowData
  document.getElementById('showwindowData').innerHTML = fulltext;
  // show the curently invisible showwindow item
  document.getElementById('showwindow').style.display = "block";
  // somewhere in the middle of the page
  document.getElementById('showwindow').style.top = "50%";
 }
//
//  Done !!!!    try it out.....
//


function searchWikipedia() {
  const searchString = document.getElementById("searchInput").value;

  const apiUrl = "http://localhost:6001/proxy/?url=https://de.wikipedia.org/w/api.php";
  const fullUrl = apiUrl + "?action=query&generator=prefixsearch&format=json&gpslimit=4&prop=extracts%7Cdescription&exintro=1&explaintext=1&exsentences=3&redirects=1&gpssearch=" + searchString;
  console.log(fullUrl)

  fetch(fullUrl)
      .then(response => response.json())
      .then(data => {
          populateSearchResultsTable(data);
      })
      .catch(error => {
          console.error("Error fetching data from Wikipedia:", error);
      });
}

function populateSearchResultsTable(data) {
  console.log(data)

  const searchResultsTable = document.getElementById("searchResultsTable");
  const wiki = document.getElementById("wikiwindow");

  searchResultsTable.innerHTML = "";
  
  wiki.style.top = document.getElementById("scrollpart").offsetTop + "px";
  wiki.style.display = "block";
  document.getElementById('wikiwindow').style.top = "50%";

  const headingRow = `
    <tr>
      <th>Title</th>
      <th>Description</th>
      <th>Extract</th>
      <th>Link</th>
    </tr>
  `;
  searchResultsTable.insertAdjacentHTML("beforeend", headingRow);
  var index = 1;
  if (data.response.query && data.response.query.pages) {
      for (const pageId in data.response.query.pages) {
          const page = data.response.query.pages[pageId];
          const row = `
              <tr>
                  <td style="border: 1px solid black;border-collapse: collapse;">${page.title}</td>
                  <td style="border: 1px solid black;border-collapse: collapse;">${page.description}</td>
                  <td style="border: 1px solid black;border-collapse: collapse;">${page.extract}</td>
                  <td style="border: 1px solid black;border-collapse: collapse;"><a href="https://de.wikipedia.org/?curid=${page.pageid}">Link${index}</a></td>
              </tr>
          `;
          searchResultsTable.insertAdjacentHTML("beforeend", row);
          index++;
      }
  } else {
      searchResultsTable.innerHTML = "<tr><td colspan='4'>No results found</td></tr>";
  }
}

