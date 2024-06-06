document.addEventListener("DOMContentLoaded", () => {
    const image = document.getElementById("soccerPitch");
    const dataTable = document.querySelector("#data tbody");
    let incompleteRow = null;

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

        const row = incompleteRow || dataTable.insertRow();
        const xCell = row.cells[0] || row.insertCell();
        const yCell = row.cells[1] || row.insertCell();

        xCell.textContent = x.toFixed(2);
        yCell.textContent = y.toFixed(2);

        incompleteRow = row;
        saveDataToLocalStorage();
    });

    function handleActionButtonClick(event) {
        const action = event.target.dataset.action;

        const row = incompleteRow || dataTable.insertRow();
        const actionCell = row.cells[3] || row.insertCell(3);
        const timeCell = row.cells[4] || row.insertCell(4);

        actionCell.textContent = action;
        timeCell.textContent = timeDisplay.textContent;

        incompleteRow = row;
        saveDataToLocalStorage();
    }

    function handlePlayerButtonClick(event) {
        const player = event.target.dataset.action;

        const row = incompleteRow || dataTable.insertRow();
        const playerCell = row.cells[2] || row.insertCell(2);

        playerCell.textContent = player;

        incompleteRow = row;
        saveDataToLocalStorage();
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

    function saveDataToLocalStorage() {
        const data = [];
        document.querySelectorAll("#data tbody tr").forEach(row => {
            const cells = row.querySelectorAll("td");
            const rowData = {
                x: cells[0]?.textContent || '',
                y: cells[1]?.textContent || '',
                player: cells[2]?.textContent || '',
                action: cells[3]?.textContent || '',
                time: cells[4]?.textContent || '',
            };
            data.push(rowData);
        });
        localStorage.setItem("soccerData", JSON.stringify(data));
    }
});
