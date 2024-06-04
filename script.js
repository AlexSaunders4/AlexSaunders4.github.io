document.addEventListener("DOMContentLoaded", () => {
    const image = document.getElementById("soccerPitch");
    const dataTable = document.querySelector("#data tbody");
    let incompleteRow = null;

    let stopwatchInterval = null;
    let elapsedSeconds = 0;
    let isRunning = false;

    const stopwatchTimeDisplay = document.getElementById("stopwatch-time");
    const startButton = document.getElementById("startButton");
    const pauseButton = document.getElementById("pauseButton");

    function startStopwatch() {
        if (!isRunning) {
            stopwatchInterval = setInterval(() => {
                elapsedSeconds++;
                updateStopwatchDisplay();
            }, 1000);
            isRunning = true;
        }
    }

    function pauseStopwatch() {
        if (isRunning) {
            clearInterval(stopwatchInterval);
            isRunning = false;
        }
    }

    function updateStopwatchDisplay() {
        const minutes = Math.floor(elapsedSeconds / 60).toString().padStart(2, '0');
        const seconds = (elapsedSeconds % 60).toString().padStart(2, '0');
        stopwatchTimeDisplay.textContent = `${minutes}:${seconds}`;
    }

    startButton.addEventListener("click", startStopwatch);
    pauseButton.addEventListener("click", pauseStopwatch);

    image.addEventListener("click", (event) => {
        const rect = image.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = rect.height / 2 - (event.clientY - rect.top);

        if (incompleteRow) {
            incompleteRow.cells[0].textContent = x.toFixed(2);
            incompleteRow.cells[1].textContent = y.toFixed(2);
            incompleteRow = null;
        } else {
            const row = document.createElement('tr');
            const xCell = document.createElement('td');
            const yCell = document.createElement('td');
            const emptyPlayer1Cell = document.createElement('td');
            const emptyPlayer2Cell = document.createElement('td');
            const emptyActionCell = document.createElement('td');
            const emptyTimeCell = document.createElement('td');

            xCell.textContent = x.toFixed(2);
            yCell.textContent = y.toFixed(2);

            row.appendChild(xCell);
            row.appendChild(yCell);
            row.appendChild(emptyPlayer1Cell);
            row.appendChild(emptyPlayer2Cell);
            row.appendChild(emptyActionCell);
            row.appendChild(emptyTimeCell);
            dataTable.appendChild(row);
            incompleteRow = row;
        }
    });

    function handleButtonClick(event) {
        const action = event.target.dataset.action;

        if (incompleteRow) {
            incompleteRow.cells[4].textContent = action;
            incompleteRow.cells[5].textContent = stopwatchTimeDisplay.textContent;
            incompleteRow = null;
        } else {
            const newRow = dataTable.insertRow();
            const emptyPitchXCell = newRow.insertCell();
            const emptyPitchYCell = newRow.insertCell();
            const emptyPlayer1Cell = newRow.insertCell();
            const emptyPlayer2Cell = newRow.insertCell();
            const actionCell = newRow.insertCell();
            const timeCell = newRow.insertCell();

            actionCell.textContent = action;
            timeCell.textContent = stopwatchTimeDisplay.textContent;

            incompleteRow = newRow;
        }
    }

    const buttonsDiv = document.getElementById("buttons");
    const buttonDataList = [
        { label: "Pass", action: "Pass" },
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
        { label: "Substitution", action: "Substitution" }
    ];

    buttonDataList.forEach(buttonData => {
        const button = document.createElement("button");
        button.textContent = buttonData.label;
        button.dataset.action = buttonData.action;
        button.addEventListener("click", handleButtonClick);
        buttonsDiv.appendChild(button);
    });
});
