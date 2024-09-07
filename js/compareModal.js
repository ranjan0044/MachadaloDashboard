const compareSocietyValues = {};

const openCampareModal = () => {
    const allSocieties = [];
    for (const set of Object.values(uniqueSocietiesByCity)) {
        allSocieties.push(...set);
    }
    let data = document.getElementById("compareSocietySelector");
    data.innerHTML = '';
    createSearchableDropdown('compareSocietySelector', 'Search society', societies, function (selectedItem) {
        handleSelectCompareSociety(selectedItem)
    });

    $('#compareModal').modal('show');
}

const hideRankList = (id) => {
    let cardData = document.getElementById(`rankList-${id}`)
    cardData.innerHTML = '';
}
const calculateRatingBySociety = (society) => {
    let societyConnectivity = 0;
    let societyMaintenanceRating = 0;
    let societyConstruction = 0;
    let societyAmenities = 0
    let societyPeopleFriendliness = 0;
    let totalSocietyPercentage = 0;
    let societyCounts = 0

    csvData.forEach(item => {
        if (item['Society Name']?.toLowerCase() === society?.toLowerCase()) {
            societyConnectivity += stringToInteger(item['Connectivity Ratings']);
            societyMaintenanceRating += stringToInteger(item["Maintenance Rating"]);
            societyConstruction += stringToInteger(item["Construction Rating"]);
            societyAmenities += stringToInteger(item["Amenities & Livability Rating"]);
            societyPeopleFriendliness += stringToInteger(item["People Friendliness Rating"]);
            totalSocietyPercentage += stringToInteger(item["Total Rating"]);
            societyCounts = societyCounts + 1;
        }
    });
    societyConnectivity = societyConnectivity / societyCounts
    societyMaintenanceRating = societyMaintenanceRating / societyCounts;
    societyConstruction = societyConstruction / societyCounts;
    societyAmenities = societyAmenities / societyCounts;
    societyPeopleFriendliness = societyPeopleFriendliness / societyCounts;
    let meanRatings = {
        "Connectivity": societyConnectivity.toFixed(1),
        "Maintenance": societyMaintenanceRating.toFixed(1),
        'Construction': societyConstruction.toFixed(1),
        'Amenities': societyAmenities.toFixed(1),
        'PeopleFriendliness': societyPeopleFriendliness.toFixed(1)
    };
    return meanRatings
}


const handleSelectCompareSociety = (selectedItem, index) => {
    if (Object.keys(compareSocietyValues).length < 3 && !compareSocietyValues[selectedItem]) {
        let ratings = calculateRatingBySociety(selectedItem);
        compareSocietyValues[selectedItem] = ratings;
        addSocietyToDOM(selectedItem);
    }
}

const onSubmitCompareSociety = () => {
    let currentSocietyValues = {};
    for (const key in meanRatings) {
        currentSocietyValues[key] = meanRatings[key].society.toFixed(1) || '';
    }

    // Ensure that only the currently selected society's data is processed.
    compareSocietyValues[selectedSociety] = currentSocietyValues;

    // Update the comparison charts and pie charts.
    compareSocietyCharts(compareSocietyValues);
    comparePieChartSocieties(compareSocietyValues);

    // Hide rank lists for charts with associated IDs.
    cardIdsOfCharts?.forEach(id => {
        hideRankList(id);
    });
}

const addSocietyToDOM = (societyName) => {
    const container = document.getElementById('selectedSocietyForCompare');
    const societyDiv = document.createElement('div');
    societyDiv.className = 'alert alert-info alert-dismissible fade show d-flex align-items-center';
    societyDiv.id = `society-${societyName}`;

    const societyText = document.createElement('span');
    societyText.className = 'mr-auto';
    societyText.textContent = societyName;

    const removeIcon = document.createElement('button');
    removeIcon.type = 'button';
    removeIcon.className = 'close';
    removeIcon.innerHTML = '&times;';
    removeIcon.onclick = () => removeSociety(societyName);

    societyDiv.appendChild(societyText);
    societyDiv.appendChild(removeIcon);
    container.appendChild(societyDiv);
};

const removeSociety = (societyName) => {
    delete compareSocietyValues[societyName];
    const societyDiv = document.getElementById(`society-${societyName}`);
    societyDiv.remove();
};


function generateRatingButtons() {
    let buttons = '';
    for (let i = 1; i <= 5; i++) {
        buttons += `<button type="button" class="rating-btn" data-value="${i}">${i}</button>`;
    }
    return buttons;
}

// Function to toggle the visibility of a rating card
function toggleRatingCard(cardId) {
    const card = document.getElementById(cardId);
    if (card.style.display === 'block') {
        card.style.display = 'none';
    } else {
        card.style.display = 'block';
        card.querySelectorAll('.rating-buttons__').forEach(buttonGroup => {
            buttonGroup.innerHTML = generateRatingButtons();
        });
    }
}
function closeRatingCard(cardId) {
    document.getElementById(cardId).style.display = 'none';
}
// Event listener for rating button clicks
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('rating-btn')) {
        const value = event.target.getAttribute('data-value');
        const buttonGroup = event.target.closest('.rating-buttons__');
        const category = buttonGroup.getAttribute('data-category');
        buttonGroup.querySelectorAll('.rating-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');
        document.getElementById(category + 'Rating').value = value;
    }
});

// Handle form submission
document.querySelectorAll('#connectivityRatingForm').forEach(form => {
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const ratings = {
            publicTransport: document.getElementById('publicTransportRating').value,
            connectivity: document.getElementById('connectivityRating').value,
            road: document.getElementById('roadRating').value,
            market: document.getElementById('marketRating').value,
            school: document.getElementById('schoolRating').value
        };

        alert(`Ratings submitted:\nPublic Transport: ${ratings.publicTransport}\nConnectivity: ${ratings.connectivity}\nRoad: ${ratings.road}\nMarket: ${ratings.market}\nSchool: ${ratings.school}`);
    });
});