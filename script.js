document.addEventListener('DOMContentLoaded', function() {
    var pitch = document.querySelector('.pitch');
    var coordinatesDisplay = document.getElementById('coordinates');

    pitch.addEventListener('click', function(event) {
        var rect = pitch.getBoundingClientRect();
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;

        // Display coordinates in a table
        coordinatesDisplay.innerHTML = '<table><tr><th>X</th><th>Y</th></tr><tr><td>' + x + '</td><td>' + y + '</td></tr></table>';
    });
});
