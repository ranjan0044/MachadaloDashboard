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
        "Connectivity": societyConnectivity,
        "Maintenance": societyMaintenanceRating,
        'Construction': societyConstruction,
        'Amenities': societyAmenities,
        'PeopleFriendliness': societyPeopleFriendliness
    };
    return meanRatings
}


const handleSelectCompareSociety = (selectedItem, index) => {
    let ratings = calculateRatingBySociety(selectedItem);
    compareSocietyValues[selectedItem] = ratings;
}

const onSubmitCompareSociety = () => {
    let currentSocietyValues = {}
    for (const key in meanRatings) {
        currentSocietyValues[key] = meanRatings[key].society || '';
    }
    compareSocietyValues[selectedSociety] = currentSocietyValues;
    console.log(compareSocietyValues,"afsdfsrte")
    
}
