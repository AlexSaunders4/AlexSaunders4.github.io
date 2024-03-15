document.addEventListener("DOMContentLoaded", function() {
    var canvas = document.getElementById("soccer-pitch");
    var ctx = canvas.getContext("2d");
    var pointTableBody = document.querySelector("#point-table tbody");
    var timerElement = document.getElementById("timer");

    // Set canvas dimensions
    canvas.width = 800;
    canvas.height = 500;

    // Draw soccer pitch elements
    drawPitch(ctx);

    // Initialize timer variables
    var startTime = new Date();
    updateTimer();

    // Function to draw soccer pitch elements
    function drawPitch(ctx) {
        // Draw field outline
        ctx.strokeStyle = "white";
        ctx.lineWidth = 3;
        ctx.strokeRect(50, 50, canvas.width - 100, canvas.height - 100);

        // Draw penalty box
        ctx.strokeRect(150, 200, 100, 200);
        ctx.strokeRect(canvas.width - 250, 200, 100, 200);

        // Draw penalty spot
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, 5, 0, 2 * Math.PI);
        ctx.stroke();

        // Draw midway line
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, 50);
        ctx.lineTo(canvas.width / 2, canvas.height - 50);
        ctx.stroke();
    }

    // Add event listener for canvas click
    canvas.addEventListener("click", function(event) {
        // Get click coordinates relative to canvas
        var rect = canvas.getBoundingClientRect();
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;

        // Plot point on canvas
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 2 * Math.PI);
        ctx.fill();

        // Get current time
        var currentTime = new Date();
        var elapsedTime = currentTime - startTime;
        var elapsedTimeStr = formatTime(elapsedTime);

        // Add point information to the table
        var newRow = pointTableBody.insertRow();
        newRow.insertCell().textContent = x.toFixed(2);
        newRow.insertCell().textContent = y.toFixed(2);
        newRow.insertCell().textContent = elapsedTimeStr;
    });

    // Function to update timer every second
    function updateTimer() {
        setInterval(function() {
            var currentTime = new Date();
            var elapsedTime = currentTime - startTime;
            var elapsedTimeStr = formatTime(elapsedTime);
            timerElement.textContent = "Time: " + elapsedTimeStr;
        }, 1000);
    }

    // Function to format time in minutes and seconds
    function formatTime(milliseconds) {
        var totalSeconds = Math.floor(milliseconds / 1000);
        var minutes = Math.floor(totalSeconds / 60);
        var seconds = totalSeconds % 60;
        return minutes.toString().padStart(2, "0") + ":" + seconds.toString().padStart(2, "0");
    }
});

