// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#2e44ed';

function number_format(number, decimals, dec_point, thousands_sep) {

  number = (number + '').replace(',', '').replace(' ', '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function (n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.round(n * k) / k;
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}

// Area Chart Example

let areaChart; // Store the area chart instance

const renderAreaChart = (meanRatings) => {
    const ctxLine = document.getElementById("myAreaChart").getContext('2d');
    const labels = ["Connectivity", "Maintenance", "Construction", "People Friendliness", "Amenities"];
    const societyData = [
        meanRatings?.Connectivity?.society?.toFixed(1),
        meanRatings?.Maintenance?.society?.toFixed(1),
        meanRatings?.Construction?.society?.toFixed(1),
        meanRatings?.Amenities?.society?.toFixed(1),
        meanRatings?.PeopleFriendliness?.society?.toFixed(1)
    ];
    const cityData = [
        meanRatings?.Connectivity?.city?.toFixed(1),
        meanRatings?.Maintenance?.city?.toFixed(1),
        meanRatings?.Construction?.city?.toFixed(1),
        meanRatings?.Amenities?.city?.toFixed(1),
        meanRatings?.PeopleFriendliness?.city?.toFixed(1)
    ];
    const panIndiaData = [
        meanRatings?.Connectivity?.panIndia?.toFixed(1),
        meanRatings?.Maintenance?.panIndia?.toFixed(1),
        meanRatings?.Construction?.panIndia?.toFixed(1),
        meanRatings?.Amenities?.panIndia?.toFixed(1),
        meanRatings?.PeopleFriendliness?.panIndia?.toFixed(1)
    ];

    if (areaChart) {
        // Update existing area chart data
        areaChart.data.datasets[0].data = societyData;
        areaChart.data.datasets[1].data = cityData;
        areaChart.data.datasets[2].data = panIndiaData;
        areaChart.update();
    } else {
        // Create new area chart instance
        areaChart = new Chart(ctxLine, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: "Society",
                        borderColor: "rgba(78, 115, 223, 1)",
                        data: societyData,
                        fill: false
                    },
                    {
                        label: "City",
                        borderColor: "rgba(28, 200, 138, 1)",
                        data: cityData,
                        fill: false
                    },
                    {
                        label: "PAN India",
                        borderColor: "rgba(255, 193, 7, 1)",
                        data: panIndiaData,
                        fill: false
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false, // Ensure the chart adjusts to the container size
                title: {
                  //  display: true,
                   // text: 'Comparison across Categories',
                   // fontSize: 16 // Adjust this value as needed
                },
                tooltips: {
                    mode: 'index',
                    intersect: false,
                    bodyFontSize: 12, // Adjust this value as needed
                    titleFontSize: 14 // Adjust this value as needed
                },
                hover: {
                    mode: 'nearest',
                    intersect: true
                },
                scales: {
                    xAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Categories',
                            fontSize: 12 // Adjust this value as needed
                        },
                        ticks: {
                            fontSize: 10 // Adjust this value as needed
                        }
                    }],
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Values',
                            fontSize: 12 // Adjust this value as needed
                        },
                        ticks: {
                            fontSize: 10 // Adjust this value as needed
                        }
                    }]
                },
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        fontSize: 10 ,// Adjust this value as needed
                        fontColor: '#333', // Adjust label font color
                        padding: 10, // Adjust padding between labels and other elements
                        boxWidth: 15, // Adjust the width of the colored box next to the labels
                        usePointStyle: true // Use point style shapes in legend
            
                    }
                }
            }
        });
        
    }
}
