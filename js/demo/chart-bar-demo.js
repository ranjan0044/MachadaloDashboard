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
Chart.plugins.register({
    afterDatasetsDraw: function (chart) {
        var ctx = chart.ctx;

        chart.data.datasets.forEach(function (dataset, i) {
            var meta = chart.getDatasetMeta(i);
            if (!meta.hidden) {
                meta.data.forEach(function (element, index) {
                    ctx.save(); // Save the current context state

                    var fontSize = 12; // Adjust font size to fit inside bar
                    var fontStyle = 'normal';
                    var fontFamily = 'Helvetica Neue';

                    // Draw the category label inside the bar
                    ctx.fillStyle = '#FFF'; // Category label color
                    ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);
                    var labelString = chart.data.labels[index];
                    // Truncate label if longer than 12 characters
                    if (labelString.length > 12) {
                        labelString = labelString.substring(0, 12) + '...';
                    }
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'bottom'; // Align the text to the bottom
                    var position = element.tooltipPosition();
                    var labelPositionY = position.y + element.height() / 2 - 5; 
                    var labelPositionX = position.x + 5;
                    ctx.translate(labelPositionX, labelPositionY);
                    ctx.rotate(-Math.PI / 2);
                    ctx.fillText(labelString, 0, 0);

                    // Draw the number rating on top of the bar
                    ctx.restore(); // Restore the context state
                    ctx.save(); // Save the context state again

                    ctx.fillStyle = '#0000FF'; // Number rating color
                    ctx.font = Chart.helpers.fontString(fontSize + 2, fontStyle, fontFamily); // Slightly larger font for ratings
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle'; // Align the text to the middle
                    var ratingString = dataset.data[index]?.toString(); // Format number rating
                    var ratingPositionY = position.y - (fontSize / 2) - 5;
                    ctx.fillText(ratingString, position.x, ratingPositionY);
                    
                    ctx.restore(); // Restore the context state
                });
            }
        });
    }
});

var commonOptions = {
    maintainAspectRatio: false,
    responsive: true, 
    layout: {
        padding: {
            left: 10,
            right: 25,
            top: 25,
            bottom: 0
        }
    },
    scales: {
        xAxes: [{
            gridLines: {
                display: false,
                drawBorder: false
            },
            ticks: {
                display: false // Hide the outside labels on the x-axis
            },
            maxBarThickness: 25,
        }],
        yAxes: [{
            ticks: {
                min: 1,
                max: 5,
                maxTicksLimit: 5,
                padding: 10,
                callback: function (value, index, values) {
                    return number_format(value);
                },
            },
            gridLines: {
                color: "rgb(234, 236, 244)",
                zeroLineColor: "#000000",
                drawBorder: false,
                borderDash: [2],
                zeroLineBorderDash: [2]
            }
        }],
    },
    legend: {
        display: false
    },
    tooltips: {
        titleMarginBottom: 10,
        titleFontColor: '#000000',
        titleFontSize: 14,
        backgroundColor: "rgb(255,255,255)",
        bodyFontColor: "#000000",
        borderColor: '#000',
        borderWidth: 1,
        xPadding: 15,
        yPadding: 15,
        displayColors: false,
        caretPadding: 10,
        callbacks: {
            label: function (tooltipItem, chart) {
                var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
                return datasetLabel + ': ' + number_format(tooltipItem.yLabel);
            }
        }
    },
};

let charts = [];

const renderCharts = (meanRatings) => {
    const category1ChartCtx = document.getElementById('connectivityChart').getContext('2d');
    const category2ChartCtx = document.getElementById('maintenanceChart').getContext('2d');
    const category3ChartCtx = document.getElementById('constructionChart').getContext('2d');
    const category4ChartCtx = document.getElementById('amenitiesChart').getContext('2d');
    const category5ChartCtx = document.getElementById('peopleFriendlinessChart').getContext('2d');
    const categories = ["Connectivity", "Maintenance", 'Construction', 'Amenities', 'PeopleFriendliness'];
    const chartCtxs = [category1ChartCtx, category2ChartCtx, category3ChartCtx, category4ChartCtx, category5ChartCtx];

    categories.forEach((category, index) => {
        const data = [
            meanRatings[category]?.society.toFixed(1),
            meanRatings[category]?.city?.toFixed(1),
            meanRatings[category]?.panIndia.toFixed(1)
        ];

        if (charts[index]) {
            // Update existing chart data
            charts[index].data.datasets[0].data = data;
            charts[index].data.labels = [selectedSociety, selectedCity, "Pan India"];
            charts[index].update();
        } else {
            // Create new chart instance
            const chart = new Chart(chartCtxs[index], {
                type: 'bar',
                data: {
                    labels: [`${selectedSociety}`, `${selectedCity}`, `Pan India`],
                    datasets: [{
                        label: `${category} Ratings`,
                        data: data,
                        backgroundColor: ["#4e73df", "#1cc88a", "#e74a3b"],
                        borderColor: ["#36b9cc", "#36b9cc", "#36b9cc"],
                        borderWidth: 1
                    }]
                },
                options: commonOptions
            });
            charts[index] = chart;
        }
    });
};

const compareSocietyCharts = (compareData) => {
    const categories = ["Connectivity", "Maintenance", "Construction", "Amenities", "PeopleFriendliness"];
    const chartIds = ['connectivityChart', 'maintenanceChart', 'constructionChart', 'amenitiesChart', 'peopleFriendlinessChart'];
    const chartCtxs = chartIds.map(id => document.getElementById(id).getContext('2d'));
    const societies = Object.keys(compareData);

    categories.forEach((category, index) => {
        const data = societies.map(society => compareData[society][category]);

        if (charts[index]) {
            // Update existing chart data
            charts[index].data.datasets[0].data = data;
            charts[index].data.labels = societies;
            charts[index].update();
        } else {
            // Create new chart instance
            const chart = new Chart(chartCtxs[index], {
                type: 'bar',
                data: {
                    labels: societies,
                    datasets: [{
                        label: `${category} Ratings`,
                        data: data,
                        backgroundColor: societies.map(() => "#4e73df"),
                        borderColor: societies.map(() => "#36b9cc"),
                        borderWidth: 1
                    }]
                },
                options: commonOptions
            });
            charts[index] = chart;
        }
    });
}