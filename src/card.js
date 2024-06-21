import './card.css';
import Chart from 'chart.js/auto';
import { fetchWeeklyWeather } from "./apiModule";

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
            labels: ["", "", "", "", "", "", ""],
            datasets: [
                {
                    label: 'Temperature',
                    data: [80, 85, 75, 80, 65, 85, 70],
                    fill: false,
                    borderColor: 'rgba(255, 255, 255, 0.6)',
                    borderWidth: 2,
                    pointBackgroundColor: 'transparent',
                    pointBorderColor: '#FFFFFF',
                    pointBorderWidth: 3,
                    pointHoverBorderColor: 'rgba(255, 255, 255, 0.2)',
                    pointHoverBorderWidth: 10,
                    pointHoverRadius: 50,
                    hitRadius: 80,
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
                    displayColors: false,
                    bodyFont: {
                        size: 32,
                        weight: 'bolder',
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

export function displayChart(city) {
    fetchWeeklyWeather(city).then((weatherData) => {
        let tempArr = []
        if (weatherData.forecast && weatherData.forecast.forecastday) {

            weatherData.forecast.forecastday.forEach(dayData => {
                tempArr.push(Math.ceil(dayData.day.avgtemp_f));
            });
        }
        window.chart.data.datasets[0].data = tempArr;
        window.chart.update();
    }).catch((err) => {
        console.log(err)
        let tempArr = [77, 77, 77, 77, 77, 77, 77]; // Default data
        // Update chart data
        window.chart.data.datasets[0].data = tempArr;
        window.chart.update();
    });
}