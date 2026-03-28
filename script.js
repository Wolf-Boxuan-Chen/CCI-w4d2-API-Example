const spaceContainerISS = document.getElementById("craft-iss");
const spaceContainerTian = document.getElementById("craft-tiangong");
const allCrafts = document.querySelectorAll(".craft");
const artistsContainer = document.getElementById("artists-container");
const survivalButton = document.getElementById("survival-button");

const artistQuotes = [
    "Lucky me.",
    "I will live for u brotha",
    "We made it",
    "Grateful beyond words",
    "For the cosmos"
];

let artistCount = 0;
let survivorsAdded = false;

function toggleSurvival() {
    if (!survivorsAdded) {
        addArtists();
        survivorsAdded = true;
        survivalButton.textContent = "More Survivors!";
    } else {
        artistsContainer.innerHTML = "";
        artistCount = 0;
        survivorsAdded = false;
        survivalButton.textContent = "Who Will Survive?";
    }
}

function addArtists() {
    artistQuotes.forEach((quote, index) => {
        setTimeout(() => {
            const artist = document.createElement("div");
            artist.classList.add("artist");
            artist.innerHTML = quote;
            artist.style.animation = `orbit 6s linear infinite`;
            artist.style.animationDelay = `${index * 0.2}s`;
            artistsContainer.appendChild(artist);
        }, index * 200);
    });
}

function checkForAstronauts(button) {
  button.style.display = "none"; // hide button
  survivorsAdded = false;

  //   The line below will pull the data from the API
  fetch(
    "https://corquaid.github.io/international-space-station-APIs/JSON/people-in-space.json"
  )
    //   The line below will pull the data from the locally stored JSON file
    //   fetch("/ex-json/astros.json")
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data);

      // Update the Message
      document.getElementById(
        "status"
      ).innerHTML = `So it seems, ${data.number} people in space will live on`;

      // Add each Astronaut to their craft
      var astros = data.people;
      astros.forEach(astro => {
        AddAstro(astro);
      });
    })
    .catch(error => {
      console.error("Error loading JSON:", error);
    });
}

function AddAstro(astro) {
  let div = document.createElement("div");
  div.classList.add("astro");
  div.innerHTML = astro.name;
  if (astro.iss == true) {
    spaceContainerISS.appendChild(div);
  } else {
    spaceContainerTian.appendChild(div);
  }
}
