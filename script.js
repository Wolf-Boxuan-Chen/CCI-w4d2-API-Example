const spaceContainerISS = document.getElementById("craft-iss");
const spaceContainerTian = document.getElementById("craft-tiangong");
const allCrafts = document.querySelectorAll(".craft");
const statusDisplay = document.getElementById("status-display");

const cometTexts = [
    "help!",
    "i'm just a tiny comet",
    "i'm only slightly bigger than",
    "mount everest",
    "people are trying to destroy me",
    "because i get too close to earth",
    "but i promise i'll never hit you.",
    "help!",
    "they've sent people up to space to try and stop me",
    "can you stop them?",
    "com'on, don't you want another moon?",
];

let cometTextIndex = 0;
let textCycleCount = 0;
let astronautCount = 0;

// Modal setup
const modal = document.getElementById("question-modal");
const yesBtn = document.getElementById("yes-button");
const noBtn = document.getElementById("no-button");

// Comet click handler
document.getElementById("comet-container").addEventListener("click", function() {
    const popup = document.getElementById("comet-popup");
    const comet = document.getElementById("comet-container");
    
    // Get comet position
    const rect = comet.getBoundingClientRect();
    const cometX = rect.left + rect.width / 2;
    const cometY = rect.top;
    
    // Update popup text
    popup.textContent = cometTexts[cometTextIndex];
    cometTextIndex = (cometTextIndex + 1) % cometTexts.length;
    
    // Check if we've cycled through all texts
    if (cometTextIndex === 0) {
        textCycleCount++;
        if (textCycleCount === 1) {
            // After completing one full cycle, show modal after 2 seconds
            setTimeout(() => {
                modal.classList.add("show");
            }, 2000);
            popup.classList.remove("show");
            return;
        }
    }
    
    // Position popup above comet
    popup.style.left = (cometX - 50) + "px";
    popup.style.top = (cometY - 50) + "px";
    
    // Show popup
    popup.classList.add("show");
});

// Modal button handlers
yesBtn.addEventListener("click", function() {
    modal.classList.remove("show");
    fetchAndDisplayAstronauts();
});

noBtn.addEventListener("click", function() {
    modal.classList.remove("show");
    cometTextIndex = 0;
    textCycleCount = 0;
});

// Function to play skeleton eject animation
function playSkeletonEject(startX, startY) {
    // Generate random end point
    const endX = (Math.random() - 0.5) * 1600; // Random horizontal distance
    const endY = (Math.random() - 0.5) * 1600; // Random vertical distance
    
    // Create skeleton element
    const skeleton = document.createElement("div");
    skeleton.classList.add("skeleton-eject");
    skeleton.style.left = startX + "px";
    skeleton.style.top = startY + "px";
    skeleton.style.setProperty("--end-x", endX + "px");
    skeleton.style.setProperty("--end-y", endY + "px");
    
    // Add to body
    document.body.appendChild(skeleton);
    
    // Trigger animation
    skeleton.offsetHeight; // Force reflow
    skeleton.style.animation = "ejectSkeleton 5.5s ease-out forwards";
    
    // Remove element after animation completes
    setTimeout(() => {
        skeleton.remove();
    }, 8500);
}

// Fetch astronauts from API
function fetchAndDisplayAstronauts() {
    fetch(
        "https://corquaid.github.io/international-space-station-APIs/JSON/people-in-space.json"
    )
    .then(response => response.json())
    .then(data => {
        console.log(data);
        displayAstronauts(data.people);
    })
    .catch(error => {
        console.error("Error loading JSON:", error);
    });
}

// Display astronauts with eject functionality
function displayAstronauts(astros) {
    spaceContainerISS.innerHTML = "";
    spaceContainerTian.innerHTML = "";
    
    astronautCount = astros.length;
    updateStatusDisplay();
    
    astros.forEach(astro => {
        let div = document.createElement("div");
        div.classList.add("astro");
        div.innerHTML = astro.name;
        
        div.addEventListener("click", function() {
            // Get position of astronaut element
            const rect = div.getBoundingClientRect();
            const startX = rect.left + rect.width / 2;
            const startY = rect.top + rect.height / 2;
            
            // Play skeleton eject animation
            playSkeletonEject(startX, startY);
            
            // Remove the astronaut
            div.remove();
            
            // Decrease count and update display
            astronautCount--;
            updateStatusDisplay();
            
            // Check if all astronauts are ejected
            if (astronautCount === 0) {
                showVictoryScreen();
            }
        });
        
        spaceContainerISS.appendChild(div);
        // if (astro.iss == true) {
        //     spaceContainerISS.appendChild(div);
        // } else {
        //     spaceContainerTian.appendChild(div);
        // }
    });
}

// Update status display with current astronaut count
function updateStatusDisplay() {
    if (astronautCount > 0) {
        statusDisplay.textContent = `get rid off the ${astronautCount} asstronauts in the way of lil comet`;
    }
}

// Show victory screen with moon and message
function showVictoryScreen() {
    statusDisplay.innerHTML = "";
    
    // Show moon image
    const moonImage = document.getElementById("moon-image");
    moonImage.classList.remove("hidden");
    setTimeout(() => {
        moonImage.classList.add("show");
    }, 100);
    
    // Create and show victory message
    const victoryMsg = document.createElement("div");
    victoryMsg.classList.add("victory-message");
    victoryMsg.textContent = "you've saved lil comet/ congrats on getting a second moon";
    document.body.appendChild(victoryMsg);
    
    setTimeout(() => {
        victoryMsg.classList.add("show");
    }, 500);
}
