document.addEventListener("DOMContentLoaded", () => {
    loadSVG("neutral.svg"); // Load neutral face initially
});

let isSmiling = false; // Track state

function loadSVG(filename, callback) {
    fetch(filename)
        .then(response => response.text())
        .then(svgData => {
            document.getElementById("svgContainer").innerHTML = svgData;
            if (callback) callback();
        })
        .catch(error => console.error("Error loading SVG:", error));
}

function animateSmile() {
    let svg = document.querySelector("#svgContainer svg");
    let mouth = svg.querySelector("#Rectangle\\ 3");

    if (!mouth) {
        console.error("Mouth not found!");
        return;
    }

    let originalX = parseInt(mouth.getAttribute("x")) || 40;
    let originalY = parseInt(mouth.getAttribute("y")) || 70;

    let steps = [
        () => mouth.setAttribute("width", "30"), // Shrink mouth
        () => {
            mouth.setAttribute("width", "20");
            mouth.setAttribute("x", originalX + 10); // Center shrink
        },
        () => { // Add left pixel
            let leftPixel = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            leftPixel.setAttribute("width", "10");
            leftPixel.setAttribute("height", "10");
            leftPixel.setAttribute("fill", "black");
            leftPixel.setAttribute("x", originalX);
            leftPixel.setAttribute("y", originalY);
            leftPixel.setAttribute("id", "leftCorner");
            svg.appendChild(leftPixel);
        },
        () => { // Add right pixel
            let rightPixel = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            rightPixel.setAttribute("width", "10");
            rightPixel.setAttribute("height", "10");
            rightPixel.setAttribute("fill", "black");
            rightPixel.setAttribute("x", originalX + 30);
            rightPixel.setAttribute("y", originalY);
            rightPixel.setAttribute("id", "rightCorner");
            svg.appendChild(rightPixel);
        },
        () => mouth.setAttribute("y", originalY + 5) // Move mouth down
    ];

    let stepIndex = 0;

    function nextStep() {
        if (stepIndex < steps.length) {
            steps[stepIndex]();
            stepIndex++;
            setTimeout(nextStep, 200);
        }
    }

    nextStep();
}

function animateNeutral() {
    let svg = document.querySelector("#svgContainer svg");
    let mouth = svg.querySelector("#Rectangle\\ 3");
    let leftPixel = svg.querySelector("#leftCorner");
    let rightPixel = svg.querySelector("#rightCorner");

    if (!mouth) {
        console.error("Mouth not found!");
        return;
    }

    let originalX = 40;
    let originalY = 70;

    let steps = [
        () => mouth.setAttribute("y", originalY - 5), // Move mouth back up
        () => {
            if (rightPixel) rightPixel.remove();
            if (leftPixel) leftPixel.remove();
        },
        () => {
            mouth.setAttribute("width", "20");
            mouth.setAttribute("x", originalX + 10); // Keep centered while shrinking
        },
        () => {
            mouth.setAttribute("width", "40"); // Expand back correctly
            mouth.setAttribute("x", originalX); // Reset exact position
        }
    ];

    let stepIndex = 0;

    function nextStep() {
        if (stepIndex < steps.length) {
            steps[stepIndex]();
            stepIndex++;
            setTimeout(nextStep, 200);
        }
    }

    nextStep();
}

function toggleSmile() {
    if (isSmiling) {
        animateNeutral();
        document.getElementById("toggleButton").textContent = "Make Me Smile!";
    } else {
        animateSmile();
        document.getElementById("toggleButton").textContent = "Make Me Neutral!";
    }
    isSmiling = !isSmiling;
}
