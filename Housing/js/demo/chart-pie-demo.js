// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

const rederPieChart = (meanRatings) => {
var ctxPie = document.getElementById("myPieChart").getContext('2d');
    var myPieChart = new Chart(ctxPie, {
      type: 'pie',
      data: {
         labels: ["Connectivity", "Maintenance", "Construction", "People Friendliness", "Amenities"],
        datasets: [{
          // label: "Overall Ratings",
          data: [
            meanRatings?.Connectivity?.society?.toFixed(1), 
            meanRatings?.Maintenance?.society?.toFixed(1), 
            meanRatings?.Construction?.society?.toFixed(1), 
            meanRatings?.Amenities?.society?.toFixed(1), 
            meanRatings?.PeopleFriendliness?.society?.toFixed(1)
          ],
          backgroundColor: [
            'rgba(78, 115, 223, 0.5)',
            'rgba(28, 200, 138, 0.5)',
            'rgba(255, 159, 64, 0.5)',
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)'
          ],
          hoverBackgroundColor: ['#17a673','#17a673','#17a673','#17a673','#17a673'],
          hoverBorderColor: "rgba(234, 236, 244, 1)",
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        legend: {
          position: 'right',
        },
        title: {
          display: true,
          // text: 'Overall Ratings'
        },
        animation: {
          animateScale: true,
          animateRotate: true
        }
      }
    })
  }
