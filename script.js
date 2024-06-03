document.addEventListener("DOMContentLoaded", () => {
    const image = document.getElementById("soccerPitch");
    const dataTable = document.querySelector("#data tbody");
    let incompleteRow = null; // Variable to store the incomplete row

    image.addEventListener("click", (event) => {
        const rect = image.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = rect.height / 2 - (event.clientY - rect.top);

        if (incompleteRow) {
            // If there's an incomplete row, add coordinates to it
            incompleteRow.cells[0].textContent = x.toFixed(2);
            incompleteRow.cells[1].textContent = y.toFixed(2);
            incompleteRow = null; // Mark row as complete
        } else {
            // Create a new row if there's no incomplete row
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
            incompleteRow = row; // Set new row as incomplete row
        }
    });

    // Function to handle button click event
    function handleButtonClick(event) {
        const action = event.target.dataset.action;

        if (incompleteRow) {
            // If there's an incomplete row, add action to it
            incompleteRow.cells[4].textContent = action;
            incompleteRow = null; // Mark row as complete
        } else {
            // Create a new row if there's no incomplete row
            const newRow = dataTable.insertRow();
            const emptyPitchXCell = newRow.insertCell();
            const emptyPitchYCell = newRow.insertCell();
            const emptyPlayer1Cell = newRow.insertCell();
            const emptyPlayer2Cell = newRow.insertCell();
            const actionCell = newRow.insertCell();

            actionCell.textContent = action;

            incompleteRow = newRow; // Set new row as incomplete row
        }
    }

    const buttonsDiv = document.getElementById("buttons");
    const buttonDataList = [
        { label: "Pass", action: "Pass" },
        { label: "Dribble", action: "Dribble" },
        { label: "Shot", action: "Shot" },
        { label: "Shot on Goal", action: "Shot on Goal"},
        { label: "Tackle", action: "Tackle" },
        { label: "Foul", action: "Foul" },
        { label: "Assist", action: "Assist" },
        { label: "Save", action: "Save" },
        { label: "Corner", action: "Corner" },
        { label: "Goal", action: "Goal" },
        { label: "Yellow Card", action: "Yellow Card"},
        { label: "Red Card", action: "Red Card"},
        { label: "Free Kick", action: "Free Kick" },
        { label: "Substitution", action: "Substitution"},
    ];

    buttonDataList.forEach(buttonData => {
        const button = document.createElement("button");
        button.textContent = buttonData.label;
        button.dataset.action = buttonData.action;
        button.addEventListener("click", handleButtonClick);
        buttonsDiv.appendChild(button);
    });
});