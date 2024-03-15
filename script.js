document.addEventListener("DOMContentLoaded", function() {
    // Get references to HTML elements
    var canvas = document.getElementById("soccer-pitch");
    var timerElement = document.getElementById("timer");

    // Set canvas dimensions
    canvas.width = 700;
    canvas.height = 500;

    // Get canvas context
    var ctx = canvas.getContext("2d");

    // Initialize timer variables
    var startTime = new Date();
    updateTimer();

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
        console.log("Point plotted at: X = " + x.toFixed(2) + ", Y = " + y.toFixed(2) + ", Time: " + elapsedTimeStr);
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
