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
    if (Object.keys(compareSocietyValues).length < 2 &&  !compareSocietyValues[selectedItem] ) {
        let ratings = calculateRatingBySociety(selectedItem);
        compareSocietyValues[selectedItem] = ratings;
        addSocietyToDOM(selectedItem);
    }
}

const onSubmitCompareSociety = () => {
    let currentSocietyValues = {}
    for (const key in meanRatings) {
        currentSocietyValues[key] = meanRatings[key].society.toFixed(1) || '';
    }
    compareSocietyValues[selectedSociety] = currentSocietyValues;
    compareSocietyCharts(compareSocietyValues)
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
