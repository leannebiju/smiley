document.addEventListener("DOMContentLoaded", () => {
    fetch("neutral.svg")
        .then(response => response.text())
        .then(svgData => {
            document.getElementById("svgContainer").innerHTML = svgData;
        })
        .catch(error => console.error("Error loading SVG:", error));
});

function animateSmile() {
    let svg = document.querySelector("#svgContainer svg");
    let mouth = svg.querySelector("#Rectangle\\ 3");

    if (!mouth) {
        console.error("Mouth not found!");
        return;
    }

    let originalX = parseInt(mouth.getAttribute("x")) || 0;
    let originalY = parseInt(mouth.getAttribute("y")) || 0;
    let originalWidth = parseInt(mouth.getAttribute("width"));

    let steps = [
        () => mouth.setAttribute("width", "30"),
        () => {
            mouth.setAttribute("width", "20");
            mouth.setAttribute("x", originalX + 10);
        },
        () => {
            let leftPixel = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            leftPixel.setAttribute("width", "10");
            leftPixel.setAttribute("height", "10");
            leftPixel.setAttribute("fill", "black");
            leftPixel.setAttribute("x", originalX);
            leftPixel.setAttribute("y", originalY);
            leftPixel.setAttribute("id", "leftCorner");
            svg.appendChild(leftPixel);
        },
        () => {
            let rightPixel = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            rightPixel.setAttribute("width", "10");
            rightPixel.setAttribute("height", "10");
            rightPixel.setAttribute("fill", "black");
            rightPixel.setAttribute("x", originalX + 30);
            rightPixel.setAttribute("y", originalY);
            rightPixel.setAttribute("id", "rightCorner");
            svg.appendChild(rightPixel);
        },
        () => mouth.setAttribute("y", originalY + 5)
    ];

    let stepIndex = 0;

    function nextStep() {
        if (stepIndex < steps.length) {
            steps[stepIndex]();
            stepIndex++;
            setTimeout(nextStep, 300);
        }
    }

    nextStep();
}
