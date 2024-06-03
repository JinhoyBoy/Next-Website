"use client";
import React, { useEffect } from 'react';
import Link from 'next/link';
import './DHBWWebengineering.css';

const Webex2 = () => {
  useEffect(() => {
    const jsonstring = ' { "Menschen" : [' +
      ' { "Vorname" : "Peter", "Nachname" :"Müller", "Gender": "male", "Rolle" : "Student"  },' +
      ' { "Vorname" : "Susanne", "Nachname" :"Lehmann", "Gender": "female", "Rolle" : "Studentin"  },' +
      ' { "Vorname" : "Jürgen", "Nachname" :"Schneider", "Gender": "male", "Rolle" : "Dozent"  }'+
      ' ] }';

    window.Menschen = JSON.parse(jsonstring);

    document.getElementById('PullupServices').addEventListener("click", dothisnow);
    document.getElementById('PullupOptionsBtn').addEventListener("click", dothislater);
    document.getElementById('popupli1').addEventListener("click", showMenschen);
    document.getElementById('showwindowbtn').addEventListener("click", function() {
      document.getElementById('showwindow').style.display = "none";
    });
    document.getElementById("searchbtn").addEventListener("click", searchWikipedia);
    document.getElementById('wikiwindowbtn').addEventListener("click", function() {
      document.getElementById('wikiwindow').style.display = "none";
    });
  }, []);

  const dothisnow = () => {
    console.log("Pull up");
    const pull = document.getElementById("PullupOptions");
    pull.style.top = document.getElementById("scrollpart").offsetTop + "px";
    pull.style.display = "block";
  };

  const dothislater = () => {
    console.log("close Pull up");
    const pull = document.getElementById("PullupOptions");
    pull.style.display = "none";
  };

  const showMenschen = () => {
    console.log("showMenschen ");
    const tableheader = "<table> <tr><th>Vorname</th><th>Nachname</th><th>Gender</th><th>Rolle</th></tr>";
    let tabletext = "";
    const alle = window.Menschen;
    for (let i = 0; i < alle.Menschen.length; i++) {
      const person = alle.Menschen[i];
      tabletext += `<tr><td>${person.Vorname}</td><td>${person.Nachname}</td><td>${person.Gender}</td><td>${person.Rolle}</td></tr>`;
    }
    const tableclosing = "</table>";
    const fulltext = tableheader + tabletext + tableclosing;
    document.getElementById('showwindowData').innerHTML = fulltext;
    document.getElementById('showwindow').style.display = "block";
    document.getElementById('showwindow').style.top = "50%";
  };

  const searchWikipedia = () => {
    const searchString = document.getElementById("searchInput").value;
    const apiUrl = "/api/wiki";
    const fullUrl = `${apiUrl}?action=query&generator=prefixsearch&format=json&gpslimit=4&prop=extracts%7Cdescription&exintro=1&explaintext=1&exsentences=3&redirects=1&gpssearch=${searchString}`;
    console.log(fullUrl);
    fetch(fullUrl)
      .then(response => response.json())
      .then(data => populateSearchResultsTable(data))
      .catch(error => console.error("Error fetching data from Wikipedia:", error));
  };

  const populateSearchResultsTable = (data) => {
    console.log(data);
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
    let index = 1;
    if (data.query && data.query.pages) {
      for (const pageId in data.query.pages) {
        const page = data.query.pages[pageId];
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
  };

  return (
    <>
      <div className="pagegridcontainer" style={{ height: '100%', width: '100%', position: 'fixed'}}>
        <header className="pagegridheader flexboxheader">
          <Link href="/"><img src="logo.svg" alt="DHBW Logo" style={{ minWidth: '100px', flexBasis: '25%', maxWidth: '120px' }} width={150} height={100} /></Link>
          <span>DHBW Stuttgart Web Engineering Portal</span>
        </header>
        <nav className="pagegridnavigation">
          <ul className="flexboxnav">
            <li><a href="#Informatik">Informatik</a></li>
            <li><a href="#Elektrotechnik">Elektrotechnik</a></li>
            <li><a href="#Maschinenbau">Maschinenbau</a></li>
            <li id="PullupServices"><a href="#Dienste">Dienste</a></li>
          </ul>
        </nav>
        <div id="scrollpart" className="pagegridsrcol" style={{ overflow: 'auto' , backgroundColor: 'white'}}>
          <div className="flexyouTube youTube">
            <div className="card" style={{ position: 'relative', width: '80%', maxWidth: '600px' }}>
              <div style={{ position: 'relative', width: '100%', height: 0, paddingBottom: '56.25%' }}>
                <iframe
                  style={{ position: 'absolute', width: '100%', height: '100%', left: 0, top: 0 }}
                  id="myiframe"
                  src="https://youtube.com/embed/2dy9fLZEg9A"
                  title="YouTube Video"
                ></iframe>
              </div>
            </div>
            <div className="card">
              Die DHBW Stuttgart steht für eine einzigartige Verbindung von Theorie und Praxis:
              Zusammen mit rund 2.000 Unternehmen und sozialen Einrichtungen (den Dualen Partnern)
              werden über 40 anerkannte Bachelor-Studienrichtungen in den Fakultäten Wirtschaft,
              Technik und Sozialwesen angeboten
              <iframe id="myiframe1" style={{ width: '100%', display: 'none', minHeight: '400px' }}></iframe>
            </div>
          </div>
          <div className="flexFakultaet Fakultaeten card">
            <div id="Informatik" className="FakultaetTitel">Informatik</div>
            <div className="FakultaetBild card">
              <img src="/webex2/Erdbeer-Q.jpeg" alt="Informatik" width={300} height={200} />
            </div>
            <div className="FakultaetBeschreibung card">
              Informatiker übertragen Vorgänge der realen Welt auf Computersysteme,
              indem sie die Aufgabenstellung in geeignete Modelle überführen und diese dann
              auf Softwaresystemen abbilden. Die Vielfalt an Anwendungsmöglichkeiten ist dabei
              nahezu unbegrenzt und steigt stetig mit der zunehmenden Leistungsfähigkeit der Systeme.
            </div>
          </div>
          <div className="flexFakultaet Fakultaeten card">
            <div id="Elektrotechnik" className="FakultaetTitel">Elektrotechnik</div>
            <div className="FakultaetBild card">
              <img src="/webex2/Mandarinen-Q.jpeg" alt="Elektrotechnik" width={300} height={200} />
            </div>
            <div className="FakultaetBeschreibung card">
              Die Elektrotechnik bewegt und verändert die Welt:
              Smartphones, Assistenzsysteme, Smart Home oder Medizintechnik sind aus
              unserem Leben nicht mehr wegzudenken, die Energiewende ist in aller Munde.
              Ingenieurinnen und Ingenieure der Elektrotechnik gestalten und entwickeln
              die Systeme und haben so einen direkten Einfluss auf unser alltägliches Leben.
              Sie befassen sich nicht nur mit elektrischen und elektronischen Systemen, sondern arbeiten
              in einem sehr vielfältigen Arbeitsfeld, das von der Entwicklung eines Produkts
              über das Projektmanagement bis hin zu Marketing und Vertrieb reicht.
            </div>
          </div>
          <div className="flexFakultaet Fakultaeten card">
            <div id="Maschinenbau" className="FakultaetTitel">Maschinenbau</div>
            <div className="FakultaetBild card">
              <img src="/webex2/Pizza-Q.jpeg" alt="Maschinenbau" width={300} height={200} />
            </div>
            <div className="FakultaetBeschreibung card">
              Der Maschinenbau mit seinen zahlreichen Ausprägungen verknüpft Theorie
              und Praxis, Naturwissenschaft und Technik. Die umfassende Ausbildung an
              der Dualen Hochschule Stuttgart ermöglicht es Absolventinnen und Absolventen
              des Studiengangs, Aufgaben in vielen Tätigkeitsfeldern zu übernehmen:
            </div>
          </div>
          <div style={{ height: '10px' }}></div>
        </div>
        <footer className="pagegridsfooter">Copyright &copy; DHBW Stuttgart</footer>
        <div id="PullupOptions" style={{ position: 'fixed', left: 0, display: 'none', backgroundColor: 'white', zIndex: 10 }} className="xxx">
          <button id="PullupOptionsBtn" type="button">
            <span style={{ fontSize: '1.5em', textAlign: 'center' }}> Zurück </span>
          </button>
          <ul>
            <li id="popupli1" style={{ listStyleType: 'none', padding: '5px', cursor: 'pointer' }}>Leute</li>
            <li id="popupli2" style={{ listStyleType: 'none', padding: '5px', cursor: 'pointer' }}>
              Wikipedia Search <input type="text" id="searchInput" /> <button id="searchbtn">Ok</button>
            </li>
          </ul>
        </div>
        <div id="showwindow" style={{ position: 'fixed', left: 0, display: 'none', backgroundColor: 'white', zIndex: 10 }} className="xxxx">
          <button type="button" id="showwindowbtn">
            <span style={{ fontSize: '1.5em', textAlign: 'center' }}> Zurück </span>
          </button>
          <div id="showwindowData"></div>
        </div>
        <div id="wikiwindow" style={{ position: 'fixed', left: 0, display: 'none', backgroundColor: 'white' }}>
          <button type="button" id="wikiwindowbtn">
            <span style={{ fontSize: '1.5em', textAlign: 'center' }}> Zurück </span>
          </button>
          <table id="searchResultsTable" style={{ border: '1px solid black', borderCollapse: 'collapse' }}></table>
        </div>
      </div>
    </>
  );
};

export default Webex2;