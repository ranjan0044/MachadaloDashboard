// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

let pieChart; // Store the pie chart instance

const convertToPercentage = (value, total) => (value / total) * 100;

const rederPieChart = (meanRatings) => {
    const ctxPie = document.getElementById("myPieChart").getContext('2d');
    const data = [
        convertToPercentage(meanRatings?.Connectivity?.society,5)?.toFixed(2),
        convertToPercentage(meanRatings?.Maintenance?.society,5)?.toFixed(2),
        convertToPercentage(meanRatings?.Construction?.society,5)?.toFixed(2),
       convertToPercentage(meanRatings?.PeopleFriendliness?.society,5)?.toFixed(2),
       convertToPercentage(meanRatings?.Amenities?.society,5)?.toFixed(2),
        
    ];

    if (pieChart) {
        // Update existing pie chart data
        pieChart.data.datasets[0].data = data;
        pieChart.update();
    } else {
        // Create new pie chart instance
        pieChart = new Chart(ctxPie, {
            type: 'pie',
            data: {
                labels: ["Connectivity", "Maintenance", "Construction", "People Friendliness", "Amenities"],
                datasets: [{
                    //   label: "Overall Ratings",
                    data: data,
                    backgroundColor: [
                        'rgba(78, 115, 223, 0.5)',
                        'rgba(28, 200, 138, 0.5)',
                        'rgba(255, 159, 64, 0.5)',
                        'rgba(255, 99, 132, 0.5)',
                        'rgba(54, 162, 235, 0.5)'
                    ],
                    hoverBackgroundColor: [
                        '#17a673', '#17a673', '#17a673', '#17a673', '#17a673'
                    ],
                    hoverBorderColor: "rgba(234, 236, 244, 1)",
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false, // Ensures the chart can resize based on the container size
                legend: {
                    position: 'bottom',
                },
                title: {
                    display: true,
                    text: 'Overall Ratings %'
                },
                animation: {
                    animateScale: true,
                    animateRotate: true
                },
                legend: {
                    labels: {
                        fontSize: 10 ,// Adjust this value as needed
                        fontColor: '#000', // Adjust label font color
                        padding: 10, // Adjust padding between labels and other elements
                        boxWidth: 15, // Adjust the width of the colored box next to the labels
                        usePointStyle: true // Use point style shapes in legend
            
                    }
                }
            }
        });
    }
}