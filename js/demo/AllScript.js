
document.addEventListener('DOMContentLoaded', function () {
    fetchCSVData();
});

const citySelector = document.getElementById('citySelector');
const societySelector = document.getElementById('societySelector');
//   const commentsTable = document.getElementById('commentsTable').getElementsByTagName('tbody')[0];

const csvData = [];
let cities = [];
let societies = [];
let selectedCity = '';
let selectedSociety = '';
let meanRatings = {
    // "Connectivity": { city: 2, society: 2, panIndia: 3 },
    // "Maintenance": { city: 5, society: 4.5, panIndia: 4.6 },
    // 'Construction': { city: 5, society: 4, panIndia: 2.4 },
    // 'Amenities': { city: 1.4, society: 4.5, panIndia: 4.7 },
    // 'PeopleFriendliness': { city: 2, society: 2.8, panIndia: 3.5 }
};
let tableData = [];
let progressPercentage = { society: 0, city: 0, panIndia: 0 };
const uniqueSocietiesByCity = {};

async function fetchCSVData() {
    const response = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vRHkzhb1ysdS3Pon1iEYdeDvAmFFVmaifuJG8LqYvfINO66OxSf-8vaM8Prsrj5Nhhdz2mxd0kdH3vB/pub?gid=173566181&single=true&output=tsv');
    const data = await response.text();
    parseCSV(data);
}


function parseCSV(data) {
    const rows = data.split(/\r?\n/);
    const headers = rows[0].split('\t');
    for (let i = 1; i < rows.length; i++) {
        const row = rows[i].split('\t');
        const rowData = {};
        headers.forEach((header, index) => {
            rowData[header] = row[index]?.trim();
        });
        csvData.push(rowData);
    }
    filterUniqueSocietiesByCity()
}

const updateQueryParam = (key, value) => {
    let currentUrl = new URL(window.location.href);
    if (currentUrl.searchParams.has(key)) {
        currentUrl.searchParams.set(key, value);
    } else {
        currentUrl.searchParams.append(key, value);
    }
    window.history.replaceState({}, '', currentUrl);
    console.log(currentUrl.href);
}

function populateCitySelector(cities) {
    createSearchableDropdown('citySelector', 'Search city', cities, function (selectedItem) {
        handleCityChange(selectedItem)
    });

    // cities = [...new Set(csvData.map(entry => entry.City))].filter(city => city);
    // cities.forEach(city => {
    //     const div = document.createElement('div');
    //     div.textContent = city;
    //     div.classList.add('dropdown-item-city'); // Add a class for styling if needed
    //     citySelector.appendChild(div);
    //     div.addEventListener('click', function () {
    //         const cityDropdownInput = document.getElementById('cityDropdownInput');
    //         const newValue = city || ''; // Example value to set
    //         cityDropdownInput.value = newValue;
    //         citySelector.style.display = 'none';
    //         handleCityChange(city)
    //     });
    // });
}
const filterUniqueSocietiesByCity = () => {
    csvData.forEach(item => {
        const city = item.City;
        const society = item["Society Name"];
        if (!uniqueSocietiesByCity[city]) {
            uniqueSocietiesByCity[city] = new Set();
        }
        uniqueSocietiesByCity[city].add(society);
    });
    const cityList = Object.keys(uniqueSocietiesByCity);

    populateCitySelector(cityList)
    let totalSociety = 0;
    for (const city in uniqueSocietiesByCity) {
        totalSociety += uniqueSocietiesByCity[city].size;
    }
    updateCounts('total', csvData?.length);
    updateCounts('society', totalSociety);

}

function handleCityChange(city) {
    updateQueryParam('city', city);
    selectedCity = city
    societies = uniqueSocietiesByCity[city];
    let parentElement = document.getElementById("societySelector");
    while (parentElement.firstChild) {
        parentElement.removeChild(parentElement.firstChild);
    }
    createSearchableDropdown('societySelector', 'Search society', societies, function (selectedItem) {
        handleSocietyChange(selectedItem)
    });

    // societySelector.innerHTML = '<option value="" disabled selected>Select Society</option>';
    // societies.forEach(society => {
    //     const option = document.createElement('option');
    //     option.value = society;
    //     option.text = society;
    //     societySelector.appendChild(option);
    // });
    // societySelector.disabled = false;
    // updateCounts('city', societies.length);
}

function handleSocietyChange(society) {
    // document.getElementById('selectedSociety').innerText = society;
    updateQueryParam('society', society);
    selectedSociety = society
    // const selectedComments = csvData.filter(entry => entry["Society Name"] === society);
    calculateMeanRatings()
}

function updateCounts(type, count) {
    // if (type === 'total')
    //     document.getElementById('totalSurvay').innerText = count;
    // else if (type === 'society')
    //     document.getElementById('socieyCount').innerText = count;
}

const stringToInteger = (rating) => {
    if (rating && parseFloat(rating))
        return parseFloat(rating);
    else return 0
}

function calculateMeanRatings() {
    let totalConnectivity = 0;
    let totalMaintenanceRating = 0;
    let totalConstruction = 0;
    let totalAmenities = 0;
    let totalPeopleFriendliness = 0;
    let totalRatingPercentage = 0

    let cityConnectivity = 0;
    let cityMaintenanceRating = 0;
    let cityConstruction = 0;
    let cityAmenities = 0;
    let cityPeopleFriendliness = 0;
    let totalCityPercentage = 0;

    let societyConnectivity = 0;
    let societyMaintenanceRating = 0;
    let societyConstruction = 0;
    let societyAmenities = 0
    let societyPeopleFriendliness = 0;
    let totalSocietyPercentage = 0;


    let cityCounts = 1
    let societyCounts = 1;
    console.log(csvData)
    csvData.forEach(item => {
        if (item?.City?.toLowerCase() === selectedCity.toLowerCase()) {
            cityConnectivity += stringToInteger(item['Connectivity Ratings']);
            cityMaintenanceRating += stringToInteger(item["Maintenance Rating"]);
            cityConstruction += stringToInteger(item["Construction Rating"]);
            cityAmenities += stringToInteger(item["Amenities & Livability Rating"]);
            cityPeopleFriendliness += stringToInteger(item["People Friendliness Rating"]);
            totalCityPercentage += stringToInteger(item["Total Rating"]);
            cityCounts = cityCounts + 1;
        }
        if (item['Society Name']?.toLowerCase() === selectedSociety?.toLowerCase()) {
            societyConnectivity += stringToInteger(item['Connectivity Ratings']);
            societyMaintenanceRating += stringToInteger(item["Maintenance Rating"]);
            societyConstruction += stringToInteger(item["Construction Rating"]);
            societyAmenities += stringToInteger(item["Amenities & Livability Rating"]);
            societyPeopleFriendliness += stringToInteger(item["People Friendliness Rating"]);
            totalSocietyPercentage += stringToInteger(item["Total Rating"]);
            console.log(totalSocietyPercentage);
            societyCounts = societyCounts + 1;
            tableData.push(item)
        }
        totalConnectivity += stringToInteger(item['Connectivity Ratings']);
        totalMaintenanceRating += stringToInteger(item["Maintenance Rating"]);
        totalConstruction += stringToInteger(item["Construction Rating"]);
        totalAmenities += stringToInteger(item["Amenities & Livability Rating"]);
        totalPeopleFriendliness += stringToInteger(item["People Friendliness Rating"]);
        totalRatingPercentage += stringToInteger(item["Total Rating"]);

    });
    totalConnectivity = totalConnectivity / csvData.length
    totalMaintenanceRating = totalMaintenanceRating / csvData.length;
    totalConstruction = totalConstruction / csvData.length;
    totalAmenities = totalAmenities / csvData.length;
    totalPeopleFriendliness = totalPeopleFriendliness / csvData.length;
    //  totalRatingPercentage = (totalRatingPercentage / (csvData.length * 25)) * 100;

    cityConnectivity = cityConnectivity / cityCounts
    cityMaintenanceRating = cityMaintenanceRating / cityCounts;
    cityConstruction = cityConstruction / cityCounts;
    cityAmenities = cityAmenities / cityCounts;
    cityPeopleFriendliness = cityPeopleFriendliness / cityCounts;
    //  totalCityPercentage = (totalCityPercentage / (cityCounts * 25)) * 100;

    societyConnectivity = societyConnectivity / societyCounts
    societyMaintenanceRating = societyMaintenanceRating / societyCounts;
    societyConstruction = societyConstruction / societyCounts;
    societyAmenities = societyAmenities / societyCounts;
    societyPeopleFriendliness = societyPeopleFriendliness / societyCounts;
    // totalSocietyPercentage = (totalSocietyPercentage / (societyCounts * 25)) * 100;


    meanRatings = {
        "Connectivity": { city: cityConnectivity, society: societyConnectivity, panIndia: totalConnectivity },
        "Maintenance": { city: cityMaintenanceRating, society: societyMaintenanceRating, panIndia: totalMaintenanceRating },
        'Construction': { city: cityConstruction, society: societyConstruction, panIndia: totalConstruction },
        'Amenities': { city: cityAmenities, society: societyAmenities, panIndia: totalAmenities },
        'PeopleFriendliness': { city: cityPeopleFriendliness, society: societyPeopleFriendliness, panIndia: totalPeopleFriendliness }
    };
    totalSocietyPercentage = (((societyConnectivity + societyMaintenanceRating + societyConstruction + societyAmenities + societyPeopleFriendliness)) / 25) * 100;
    totalCityPercentage = (((cityConnectivity + cityMaintenanceRating + cityConstruction + cityAmenities + cityPeopleFriendliness)) / 25) * 100;
    totalRatingPercentage = (((totalConnectivity + totalMaintenanceRating + totalConstruction + totalAmenities + totalPeopleFriendliness)) / 25) * 100;


    progressPercentage['society'] = totalSocietyPercentage.toFixed(2);
    progressPercentage['city'] = totalCityPercentage.toFixed(2);
    progressPercentage['panIndia'] = totalRatingPercentage.toFixed(2);

    renderCharts(meanRatings,selectedCity,selectedSociety);
    rederProgressBar();
    renderAreaChar(meanRatings);
    rederPieChart(meanRatings);
    renderTable(tableData);
}

const rederProgressBar = () => {
    let cardBody = document.querySelector("#societyCityPanIndiaProgress .card-body");
    cardBody.innerHTML = "";

    [{ label: 'Society', color: 'bg-warning', percent: progressPercentage['society'] },
    { label: 'City', color: 'bg-success', percent: progressPercentage['city'] },
    { label: 'Pan India', color: 'bg-primary', percent: progressPercentage['panIndia'] }].forEach((item) => {
        var newProgressHeader = document.createElement("h4");
        newProgressHeader.classList.add("small", "font-weight-bold");
        newProgressHeader.innerHTML = `${item?.label} Progress<span class='float-right'>${item?.percent}%</span>`;

        var newProgressDiv = document.createElement("div");
        newProgressDiv.classList.add("progress", "mb-4");

        var newProgressBar = document.createElement("div");
        newProgressBar.classList.add("progress-bar", `${item?.color}`);
        newProgressBar.setAttribute("role", "progressbar");
        newProgressBar.setAttribute("style", `width: ${item?.percent}%`);
        newProgressBar.setAttribute("aria-valuenow", `${item?.percent}`);
        newProgressBar.setAttribute("aria-valuemin", "0");
        newProgressBar.setAttribute("aria-valuemax", "100");
        newProgressDiv.appendChild(newProgressBar);
        cardBody.appendChild(newProgressHeader);
        cardBody.appendChild(newProgressDiv);
    })
}

const renderTable = (data) => {
    const tableBody = document.getElementById('dynamic-table-body');
    tableBody.innerHTML = '';
    data?.forEach(item => {
        const row = document.createElement('tr');
        const likeCell = document.createElement('td');
        likeCell.textContent = item['Like Detailed Comments'] || '';
        row.appendChild(likeCell);
        const dislikeCell = document.createElement('td');
        dislikeCell.textContent = item['Dislike Detailed Comments'] || '';
        row.appendChild(dislikeCell);
        tableBody.appendChild(row);
    });
}
const charTypes = [{ id: 'all-report', label: 'All Chart' }, { id: 'line-chart', label: 'Line Chart' }, { id: 'benchmarking-report', label: 'Benchmarking Report' }, { id: 'overall-report', label: 'Overall Report' }];
const handleDropdownItemClick = (event) => {
    event.preventDefault();
    const target = event.target.getAttribute('data-target');
    charTypes.forEach(type => {
        const chartContainer = document.getElementById(type.id);
        if (target === 'all-report') {
            let header = document.getElementById('chat-type-header');
            header.innerText = 'All Chart';
            if (chartContainer)
                chartContainer.style.display = 'block';
        } else if (chartContainer && type.id !== target) {
            chartContainer.style.display = 'none';
        } else {
            if (chartContainer)
                chartContainer.style.display = 'block';
            let header = document.getElementById('chat-type-header');
            header.innerText = type.label
        }
    });
}
charTypes.forEach(type => {
    const chartContainer = document.getElementById(type.id);
    if (chartContainer && type.id !== 'benchmarking-report') {
        chartContainer.style.display = 'none';
    }
});
const dropdownItems = document.getElementById('chart-type-dropdown').querySelectorAll('.dropdown-item');
dropdownItems.forEach(item => {
    item.addEventListener('click', handleDropdownItemClick);
});