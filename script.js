document.addEventListener("DOMContentLoaded", () => {
    const image = document.getElementById("soccerPitch");
    const dataTable = document.querySelector("#data tbody"); // Reference the tbody of the table

    image.addEventListener("click", (event) => {
        const rect = image.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = rect.height / 2 - (event.clientY - rect.top);

        const row = document.createElement('tr');
        const xCell = document.createElement('td');
        const yCell = document.createElement('td');
        const emptyPlayer1Cell = document.createElement('td');
        const emptyPlayer2Cell = document.createElement('td');
        const emptyActionCell = document.createElement('td');

        xCell.textContent = x.toFixed(2);
        yCell.textContent = y.toFixed(2);
        
        row.appendChild(xCell);
        row.appendChild(yCell);
        row.appendChild(emptyPlayer1Cell);
        row.appendChild(emptyPlayer2Cell);
        row.appendChild(emptyActionCell);
        dataTable.appendChild(row);
    });

    // Function to handle button click event
    function handleButtonClick(event) {
        const buttonData = event.target.dataset;
        const newRow = dataTable.insertRow();

        const pitchXCell = newRow.insertCell();
        const pitchYCell = newRow.insertCell();
        const player1Cell = newRow.insertCell();
        const player2Cell = newRow.insertCell();
        const actionCell = newRow.insertCell();

        pitchXCell.textContent = buttonData.pitchX;
        pitchYCell.textContent = buttonData.pitchY;
        player1Cell.textContent = buttonData.player1;
        player2Cell.textContent = buttonData.player2;
        actionCell.textContent = buttonData.action;
    }

    const buttonsDiv = document.getElementById("buttons");
    const buttonDataList = [
        { label: "Button 1", pitchX: "10", pitchY: "20", player1: "Player A", player2: "Player B", action: "Action 1" },
        { label: "Button 2", pitchX: "30", pitchY: "40", player1: "Player C", player2: "Player D", action: "Action 2" },
    ];

    buttonDataList.forEach(buttonData => {
        const button = document.createElement("button");
        button.textContent = buttonData.label;
        Object.entries(buttonData).forEach(([key, value]) => {
            button.dataset[key] = value;
        });
        button.addEventListener("click", handleButtonClick);
        buttonsDiv.appendChild(button);
    });
});
