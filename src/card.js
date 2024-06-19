import './card.css';
import Chart from 'chart.js/auto';

document.addEventListener('DOMContentLoaded', function () {

    // window.chart = new Chart(canvas, config);
    var canvas = document.getElementById("canvas");


    // Apply multiply blend when drawing datasets
    var multiply = {
        id: 'multiply',
        beforeDatasetsDraw: function (chart, options, el) {
            chart.ctx.globalCompositeOperation = 'multiply';
        },
        afterDatasetsDraw: function (chart, options) {
            chart.ctx.globalCompositeOperation = 'source-over';
        },
    };

    // Gradient color - this week
    var gradientThisWeek = canvas.getContext('2d').createLinearGradient(0, 0, 0, 150);
    gradientThisWeek.addColorStop(0, '#5555FF');
    gradientThisWeek.addColorStop(1, '#9787FF');

    // Gradient color - previous week
    var gradientPrevWeek = canvas.getContext('2d').createLinearGradient(0, 0, 0, 150);
    gradientPrevWeek.addColorStop(0, '#FF55B8');
    gradientPrevWeek.addColorStop(1, '#FF8787');

    var config = {
        type: 'line',
        data: {
            labels: ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"],
            datasets: [
                {
                    label: 'Temperature',
                    data: [100, 14, 22, 12, 0, 12, 18 ],
                    fill: false,
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    borderWidth: 2,
                    pointBackgroundColor: 'transparent',
                    pointBorderColor: '#FFFFFF',
                    pointBorderWidth: 3,
                    pointHoverBorderColor: 'rgba(255, 255, 255, 0.2)',
                    pointHoverBorderWidth: 10,
                    pointHoverRadius: 50,
                    hitRadius: 100,
                    radius: 10,
                    hoverRadius: 10,
                    tension: 0,
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            elements: {
                point: {
                    radius: 10,
                    hitRadius: 10,
                    hoverRadius: 10
                }
            },
            plugins: {
                legend: {
                    display: false,
                },
                tooltip: {
                    backgroundColor: 'transparent',
                    // backgroundColor: 'rgba(0, 0, 0, 1)',

                    displayColors: false,
                    bodyFont: {
                        size: 22,
                    },
                    callbacks: {
                        label: function (tooltipItem) {
                            return tooltipItem.formattedValue + '°F';
                            // return tooltipItem.raw + '°F';
                        }
                    }
                },
            },
            scales: {
                x: {
                    display: false,
                },
                y: {
                    display: false,
                    beginAtZero: true,
                    ticks: {
                        beginAtZero: true,
                    },
                }
            }
        },
        plugins: [multiply],
    };

    window.chart = new Chart(canvas, config);
});