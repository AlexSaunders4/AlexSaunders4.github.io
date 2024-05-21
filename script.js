document.addEventListener("DOMContentLoaded", () => {
    const image = document.getElementById("soccerPitch");
    const coordinatesTable = document.getElementById("coordinates-table").querySelector('tbody');

    image.addEventListener("click", (event) => {
        const rect = image.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const row = document.createElement('tr');
        const xCell = document.createElement('td');
        const yCell = document.createElement('td');

        xCell.textContent = x.toFixed(2);
        yCell.textContent = y.toFixed(2);

        row.appendChild(xCell);
        row.appendChild(yCell);
        coordinatesTable.appendChild(row);
    });
});
