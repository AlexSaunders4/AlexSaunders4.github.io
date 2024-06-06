// visuals.js
document.addEventListener("DOMContentLoaded", () => {
    const chartsContainer = document.getElementById('chartsContainer');

    function getPlayerPassesData() {
        const data = JSON.parse(localStorage.getItem("soccerData")) || [];
        const players = {};

        data.forEach(row => {
            if (row.action === "Pass") {
                if (!players[row.player]) {
                    players[row.player] = [];
                }
                players[row.player].push({ x: parseFloat(row.x), y: parseFloat(row.y), time: row.time });
            }
        });

        return players;
    }

    function createChart(player, passes) {
        const canvas = document.createElement('canvas');
        chartsContainer.appendChild(canvas);

        new Chart(canvas, {
            type: 'scatter',
            data: {
                datasets: [{
                    label: `${player} Passes`,
                    data: passes,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    fill: false,
                    showLine: false,
                    pointRadius: 5,
                }]
            },
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
                        text: `${player} Passes`
                    }
                }
            }
        });
    }

    function updateCharts() {
        chartsContainer.innerHTML = ''; // Clear existing charts
        const playersData = getPlayerPassesData();

        for (const player in playersData) {
            createChart(player, playersData[player]);
        }
    }

    setInterval(updateCharts, 1000); // Update the charts every second
});
