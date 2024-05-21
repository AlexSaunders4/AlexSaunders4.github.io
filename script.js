document.addEventListener("DOMContentLoaded", () => {
    const image = document.getElementById("soccerPitch");
    const coordinatesDisplay = document.getElementById("table");

    image.addEventListener("click", (event) => {
        const rect = image.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = rect.height / 2 - (event.clientY - rect.top);

        coordinatesDisplay.textContent = `table: (${x.toFixed(2)}, ${y.toFixed(2)})`;
    })


        