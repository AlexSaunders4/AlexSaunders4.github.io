document.addEventListener("DOMContentLoaded", () => {
    const image = document.getElementById("soccerPitch");
    const dataTable = document.getElementById("data");

    image.addEventListener("click", (event) => {
        const rect = image.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = rect.height / 2 - (event.clientY - rect.top);

        const row = document.createElement('tr');
        const xCell = document.createElement('td');
        const yCell = document.createElement('td');

        xCell.textContent = x.toFixed(2);
        yCell.textContent = y.toFixed(2);

        row.appendChild(xCell);
        row.appendChild(yCell);
        dataTable.appendChild(row);
    });


// Function to handle button click event
function handleButtonClick(event) {
    // Get button data
    const buttonData = event.target.dataset;
    
    // Create a new row
    const newRow = dataTable.insertRow();
    
    // Create cells for pitch coordinates, player 1, player 2, and action
    const pitchXCell = newRow.insertCell();
    const pitchYCell = newRow.insertCell();
    const player1Cell = newRow.insertCell();
    const player2Cell = newRow.insertCell();
    const actionCell = newRow.insertCell();

    // Populate cells with data
    pitchXCell.textContent = buttonData.pitchX;
    pitchYCell.textContent = buttonData.pitchY;
    player1Cell.textContent = buttonData.player1;
    player2Cell.textContent = buttonData.player2;
    actionCell.textContent = buttonData.action;
}

// Create customizable buttons
const buttonsDiv = document.getElementById("buttons");
const buttonDataList = [
    { label: "Button 1", pitchX: "10", pitchY: "20", player1: "Player A", player2: "Player B", action: "Action 1" },
    { label: "Button 2", pitchX: "30", pitchY: "40", player1: "Player C", player2: "Player D", action: "Action 2" },
    // Add more button data as needed
];

// Loop through button data list and create buttons
buttonDataList.forEach(buttonData => {
    const button = document.createElement("button");
    button.textContent = buttonData.label;
    // Set button data attributes
    Object.entries(buttonData).forEach(([key, value]) => {
        button.dataset[key] = value;
    });
    // Add event listener to button
    button.addEventListener("click", handleButtonClick);
    buttonsDiv.appendChild(button);
});
});