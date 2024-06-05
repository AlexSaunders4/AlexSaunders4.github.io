document.addEventListener("DOMContentLoaded", () => {
    const image = document.getElementById("soccerPitch");
    const dataTable = document.querySelector("#data tbody");
    let incompleteRow = null; // Variable to store the incomplete row

    let minutes = 0;
    let seconds = 0;
    let stopwatchInterval = null;
    const timeDisplay = document.getElementById("time");
    const startStopButton = document.getElementById("startStopButton");
    const resetButton = document.getElementById("resetButton");

    function updateStopwatch() {
        seconds++;
        if (seconds === 60) {
            minutes++;
            seconds = 0;
        }
        timeDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    startStopButton.addEventListener("click", () => {
        if (stopwatchInterval) {
            clearInterval(stopwatchInterval);
            stopwatchInterval = null;
            startStopButton.textContent = "Start";
        } else {
            stopwatchInterval = setInterval(updateStopwatch, 1000);
            startStopButton.textContent = "Pause";
        }
    });

    resetButton.addEventListener("click", () => {
        clearInterval(stopwatchInterval);
        stopwatchInterval = null;
        minutes = 0;
        seconds = 0;
        timeDisplay.textContent = "00:00";
        startStopButton.textContent = "Start";
    });

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
            const timeCell = document.createElement('td');

            xCell.textContent = x.toFixed(2);
            yCell.textContent = y.toFixed(2);

            row.appendChild(xCell);
            row.appendChild(yCell);
            row.appendChild(emptyPlayer1Cell);
            row.appendChild(emptyPlayer2Cell);
            row.appendChild(emptyActionCell);
            row.appendChild(timeCell);
            dataTable.appendChild(row);
            incompleteRow = row; // Set new row as incomplete row
        }
    });

    function handleButtonClick(event) {
        const action = event.target.dataset.action;

        if (incompleteRow) {
            incompleteRow.cells[4].textContent = action;
            incompleteRow.cells[5].textContent = timeDisplay.textContent;
            incompleteRow = null; // Mark row as complete
        } else {
            const newRow = dataTable.insertRow();
            const emptyPitchXCell = newRow.insertCell();
            const emptyPitchYCell = newRow.insertCell();
            const emptyPlayer1Cell = newRow.insertCell();
            const emptyPlayer2Cell = newRow.insertCell();
            const actionCell = newRow.insertCell();
            const timeCell = newRow.insertCell();

            actionCell.textContent = action;
            timeCell.textContent = timeDisplay.textContent;

            incompleteRow = newRow; // Set new row as incomplete row
        }
    }

    function addPlayer(team) {
        const input = document.getElementById(`${team}-player-input`);
        const playerName = input.value.trim();
        if (playerName === "") return;

        const button = document.createElement("button");
        button.textContent = playerName;
        button.dataset.action = playerName;
        button.addEventListener("click", handleButtonClick);

        const teamButtonsDiv = document.getElementById(`${team}-buttons`);
        teamButtonsDiv.appendChild(button);
        input.value = ""; // Clear input field
    }

    document.getElementById("add-team1-player").addEventListener("click", () => addPlayer("team1"));
    document.getElementById("add-team2-player").addEventListener("click", () => addPlayer("team2"));

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
    ];

    buttonDataList.forEach(({ label, action }) => {
        const button = document.createElement("button");
        button.textContent = label;
        button.dataset.action = action;
        button.addEventListener("click", handleButtonClick);
        buttonsDiv.appendChild(button);
    });
});
