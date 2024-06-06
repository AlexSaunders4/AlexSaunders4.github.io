document.addEventListener("DOMContentLoaded", () => {
    const image = document.getElementById("soccerPitch");
    const dataTable = document.querySelector("#data tbody");
    let incompleteRow = null; // Variable to store the incomplete row
    let cellIndex = 0; // Keep track of the current cell index to fill

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

    function fillCell(content) {
        if (!incompleteRow) {
            incompleteRow = dataTable.insertRow();
            for (let i = 0; i < 5; i++) {
                incompleteRow.insertCell(); // Create empty cells for new row
            }
            cellIndex = 0;
        }

        incompleteRow.cells[cellIndex].textContent = content;
        cellIndex++;

        if (cellIndex >= 5) {
            incompleteRow = null; // Mark row as complete
        }
    }

    image.addEventListener("click", (event) => {
        const rect = image.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = rect.height / 2 - (event.clientY - rect.top);
        fillCell(`(${x.toFixed(2)}, ${y.toFixed(2)})`);
    });

    function handleButtonClick(event) {
        const content = event.target.dataset.action;
        fillCell(content);
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
        button.addEventListener("click", handleButtonClick);
        buttonsDiv.appendChild(button);
    });
});
