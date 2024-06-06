// visuals.js
document.addEventListener("DOMContentLoaded", () => {
    const ctx = document.getElementById('fernandezPassesChart').getContext('2d');

    function getFernandezPassesData() {
        const data = JSON.parse(localStorage.getItem("soccerData")) || [];
        const fernandezPasses = data.filter(row => row.player === "Fernandez" && row.action === "Pass");
        return {
            labels: fernandezPasses.map(row => row.time),
            datasets: [{
                label: 'Fernandez Passes',
                data: fernandezPasses.map(row => ({x: parseFloat(row.x), y: parseFloat(row.y)})),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                fill: false,
                showLine: false,
                pointRadius: 5,
            }]
        };
    }

    const fernandezPassesChart = new Chart(ctx, {
        type: 'scatter',
        data: getFernandezPassesData(),
        options: {
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                    title: {
                        display: true,
                        text: 'X Coordinate'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Y Coordinate'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Fernandez Passes'
                }
            }
        }
    });

    function updateChart() {
        fernandezPassesChart.data = getFernandezPassesData();
        fernandezPassesChart.update();
    }

    setInterval(updateChart, 1000); // Update the chart every second
});
