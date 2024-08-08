let selectedCard;

const savePoints = () => {
    const favorablePoints = document.getElementById('favorablePoints').value;
    const unfavorablePoints = document.getElementById('unfavorablePoints').value;
    alert('Favorable Points: ' + favorablePoints + '\nUnfavorable Points: ' + unfavorablePoints);
    // You can add further logic to save these points, e.g., send them to a server

    const pointsForm = selectedCard.querySelector('#pointsForm');
    pointsForm.style.display = 'none';
}

const openCardById = (id) => {
    selectedCard = document.getElementById(id);
    let elements = document.querySelectorAll('.rating-card');
    elements?.forEach((item) => {
        if (item?.id === id) {
            if (selectedCard.style.display === 'block') {
                selectedCard.style.display = 'none';
            } else {
                selectedCard.style.display = 'block';
            }
        } else
            item.style.display = 'none';
    });
    showRatingInsideCard(id, "positive");
}
const openBoxInCard = () => {
    const pointsForm = selectedCard.querySelector('#pointsForm');
    if (pointsForm.style.display === 'block') {
        pointsForm.style.display = 'none';
    } else {
        pointsForm.style.display = 'block';
    }
}

function showPositive(id) {
    let cardKey = id === 'connectivityCard' ? 'connectivityLikes' : id === 'constructionCard' ? 'constructionLikes' : id === 'amenitiesCard' ? 'amenitiesLikes' : id === 'maintenanceCard' ? 'maintenanceLikes' : id === 'peopleFriendlinessCard' ? 'peopleFriendlinessLikes' : '';
    const sortedLikes = Object.entries(nlpDataForLikeDislike[cardKey])
        .sort(([, a], [, b]) => a - b)
        .reduce((acc, [key, value]) => {
            acc[key] = value;
            return acc;
        }, {});
    let rankList = document.getElementById(`rankList-${id}`);
    rankList.style.display = 'block';
    rankList.style.listStyle = 'none';
    rankList.style.textTransform = 'uppercase';
    rankList.style.marginTop = '20px';
    rankList.style.fontSize = '10px';
    rankList.style.textAlign = 'center';
    rankList.innerHTML = '';
    for (let i = Object.keys(sortedLikes).length - 1; i >= 0; i--) {
        let listItem = document.createElement('li');
        listItem.textContent = Object.keys(sortedLikes)[i];
        let hue = 115;
        let brightness = 30 + (5 - i) * 15; // Adjust values for gradient effect
        listItem.style.backgroundColor = 'hsl(' + hue + ', 100%, ' + brightness + '%)';
        let perceivedBrightness = brightness / 100 * 255;
        listItem.style.color = perceivedBrightness > 80 ? 'black' : 'white';
        rankList.appendChild(listItem);
    }
}

function showNegative(id) {
    let cardKey = id === 'connectivityCard' ? 'connectivityDislikes' : id === 'constructionCard' ? 'constructionDislikes' : id === 'amenitiesCard' ? 'amenitiesDislikes' : id === 'maintenanceCard' ? 'maintenanceDislikes' : id === 'peopleFriendlinessCard' ? 'peopleFriendlinessDislikes' : ''
    const sortedDislikes = Object.entries(nlpDataForLikeDislike[cardKey])
        .sort(([, a], [, b]) => a - b)
        .reduce((acc, [key, value]) => {
            acc[key] = value;
            return acc;
        }, {});
    let rankList = document.getElementById(`rankList-${id}`);
    rankList.style.display = 'block';
    rankList.innerHTML = '';
    for (var i = Object.keys(sortedDislikes).length - 1; i >= 0; i--) {
        var listItem = document.createElement('li');
        listItem.textContent = Object.keys(sortedDislikes)[i];
        var hue = 0;
        var brightness = 50 + (-i + 5) * 10; // Adjust values for gradient effect
        listItem.style.backgroundColor = 'hsl(' + hue + ', 100%, ' + brightness + '%)';
        let perceivedBrightness = brightness / 100 * 255;
        listItem.style.color = perceivedBrightness > 160 ? 'black' : 'white';
        rankList.appendChild(listItem);
    }
}


const showRatingInsideCard = (id, type = "positive") => {
    // Determine the keys based on the card ID
    const cardKey = id === 'connectivityCard' ? ['connectivityLikes', 'connectivityDislikes']
        : id === 'constructionCard' ? ['constructionLikes', 'constructionDislikes']
            : id === 'amenitiesCard' ? ['amenitiesLikes', 'amenitiesDislikes']
                : id === 'maintenanceCard' ? ['maintenanceLikes', 'maintenanceDislikes']
                    : id === 'peopleFriendlinessCard' ? ['peopleFriendlinessLikes', 'peopleFriendlinessDislikes'] : '';

    if (!cardKey) return;

    const selectedCard = document.getElementById(id);
    const ulElement = selectedCard.querySelector('ul');
    ulElement.innerHTML = '';

    // Determine which array to use based on the type (positive or negative)
    const indexNo = type === 'positive' ? 0 : 1;
    const likeDisLikePoints = nlpDataForLikeDislike[cardKey[indexNo]];

    if (!likeDisLikePoints) return;

    // Convert object to array and sort by value
    const sortedEntries = Object.entries(likeDisLikePoints).sort(([, a], [, b]) => b - a);

    sortedEntries.forEach(([key, value]) => {
        const liElement = document.createElement('li');
        liElement.textContent = `${key}: ${value}`;

        const buttonGroup = document.createElement('div');
        buttonGroup.classList.add('button-group');

        // Determine icon and color based on type
        const thumbsUpIcon = type === 'positive' ? 'fas fa-thumbs-up' : 'fas fa-thumbs-up';
        const thumbsDownIcon = type === 'positive' ? 'fas fa-thumbs-down' : 'fas fa-thumbs-down';
        
        const thumbsUpColor = type === 'positive' ? 'green' : 'green';
        const thumbsDownColor = type === 'positive' ? 'red' : 'red';

        // Create the thumbs-up button
        const thumbsUpButton = document.createElement('button');
        thumbsUpButton.classList.add('toggle-btn');
        thumbsUpButton.innerHTML = `<i class="${thumbsUpIcon}"></i>`;
        thumbsUpButton.style.color = thumbsUpColor;
        thumbsUpButton.onclick = () => toggleColor(thumbsUpButton, thumbsUpColor);

        // Create the thumbs-down button
        const thumbsDownButton = document.createElement('button');
        thumbsDownButton.classList.add('toggle-btn');
        thumbsDownButton.innerHTML = `<i class="${thumbsDownIcon}"></i>`;
        thumbsDownButton.style.color = thumbsDownColor;
        thumbsDownButton.onclick = () => toggleColor(thumbsDownButton, thumbsDownColor);

        buttonGroup.appendChild(thumbsUpButton);
        buttonGroup.appendChild(thumbsDownButton);
        liElement.appendChild(buttonGroup);

        ulElement.appendChild(liElement);
    });
};



