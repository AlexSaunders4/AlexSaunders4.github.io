document.addEventListener("DOMContentLoaded", () => {
    const image = document.getElementById("soccerPitch");
    const dataTable = document.querySelector("#data tbody");

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

        addToNextAvailableCell(0, x.toFixed(2));
        addToNextAvailableCell(1, y.toFixed(2));
    });

    function handleActionButtonClick(event) {
        const action = event.target.dataset.action;
        addToNextAvailableCell(3, action);
        addToNextAvailableCell(4, timeDisplay.textContent);
    }

    function handlePlayerButtonClick(event) {
        const player = event.target.dataset.action;
        addToNextAvailableCell(2, player);
    }

    function addToNextAvailableCell(columnIndex, value) {
        let row;
        for (row of dataTable.rows) {
            if (row.cells[columnIndex].textContent === "") {
                row.cells[columnIndex].textContent = value;
                return;
            }
        }
        // If no existing row has an empty cell in this column, create a new row
        const newRow = dataTable.insertRow();
        for (let i = 0; i < 5; i++) {  // We have 5 columns now
            const cell = newRow.insertCell();
            if (i === columnIndex) {
                cell.textContent = value;
            }
        }
    }

    function addPlayer(team) {
        const input = document.getElementById(`${team}-player-input`);
        const playerName = input.value.trim();
        if (playerName === "") return;

        const button = document.createElement("button");
        button.textContent = playerName;
        button.dataset.action = playerName;
        button.addEventListener("click", handlePlayerButtonClick);

        const teamButtonsDiv = document.getElementById(`${team}-buttons`);
        teamButtonsDiv.appendChild(button);
        input.value = ""; // Clear input field
    }

    document.getElementById("add-team1-player").addEventListener("click", () => addPlayer("team1"));
    document.getElementById("add-team2-player").addEventListener("click", () => addPlayer("team2"));

    const buttonsDiv = document.getElementById("buttons");
    const buttonDataList = [
        { label: "Pass", action: "Pass" },
        { label: "Reception", action: "Reception"},
        { label: "Dribble", action: "Dribble" },
        { label: "Shot", action: "Shot" },
        { label: "Shot on Goal", action: "Shot on Goal" },
        { label: "Tackle", action: "Tackle" },
        { label: "Foul", action: "Foul" },
        { label: "Assist", action: "Assist" },
        { label: "Save", action: "Save" },
        { label: "Corner", action: "Corner" },
        { label: "Goal", action: "Goal" },
        { label: "Yellow Card", action: "Yellow Card" },
        { label: "Red Card", action: "Red Card" },
        { label: "Free Kick", action: "Free Kick" },
        { label: "Substitution", action: "Substitution" },
    ];

    buttonDataList.forEach(({ label, action }) => {
        const button = document.createElement("button");
        button.textContent = label;
        button.dataset.action = action;
        button.addEventListener("click", handleActionButtonClick);
        buttonsDiv.appendChild(button);
    });
});
