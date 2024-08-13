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

    // Determine which arrays to use based on the type (positive or negative)
    const positivePoints = nlpDataForLikeDislike[cardKey[0]] || {};
    const negativePoints = nlpDataForLikeDislike[cardKey[1]] || {};

    // Convert points to arrays and sort them
    const sortedPositivePoints = Object.entries(positivePoints).sort(([, a], [, b]) => b - a);
    const sortedNegativePoints = Object.entries(negativePoints).sort(([, a], [, b]) => b - a);

    // Combine the sorted arrays
    const combinedPoints = [...sortedPositivePoints, ...sortedNegativePoints];

    combinedPoints.forEach(([key, value], index) => {
        const pointType = index < sortedPositivePoints.length ? 'positive' : 'negative';
        
        const liElement = document.createElement('li');
        liElement.textContent = `${key.toUpperCase()}`;

        // Create agree and disagree buttons
        const agreeButton = document.createElement('button');
        agreeButton.textContent = 'Agree';
        agreeButton.className = 'agree-button';
        agreeButton.onclick = () => handleButtonClick(key, 'agree', id);

        const disagreeButton = document.createElement('button');
        disagreeButton.textContent = 'Disagree';
        disagreeButton.className = 'disagree-button';
        disagreeButton.onclick = () => handleButtonClick(key, 'disagree', id);

        // Container for buttons
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'button-container';
        buttonContainer.appendChild(agreeButton);
        buttonContainer.appendChild(disagreeButton);

        // Append button container to the list item
        liElement.appendChild(buttonContainer);

        // Determine color for gradient effect
        const hue = pointType === 'positive' ? 115 : 0; // Green for positive, Red for negative
        const totalItems = combinedPoints.length;
        const brightness = 20 + (index * 70 / (totalItems - 1));

        liElement.style.backgroundColor = `hsl(${hue}, 100%, ${brightness}%)`;

        // Adjust text color for readability
        liElement.style.color = 'black';
        liElement.style.fontSize='12px';
        liElement.style.margin = '0';
        liElement.style.padding = '2px';
        liElement.style.textTransform = 'uppercase'; 

        ulElement.appendChild(liElement);
    });
}

// Dummy function for button clicks
const handleButtonClick = (key, action, id) => {
    console.log(`Button clicked for ${key} with action ${action} on card ${id}`);
    // Implement actual functionality here
}

// Add some CSS to style the buttons
const style = document.createElement('style');
style.textContent = `
    .button-container {
        display: flex;
        justify-content: flex-end;
        gap: 5px;
        margin-top: 5px;
    }
    .agree-button {
        background-color: #4CAF50; /* Green */
        color: white;
        border: none;
        padding: 5px 10px;
        cursor: pointer;
    }
    .disagree-button {
        background-color: #f44336; /* Red */
        color: white;
        border: none;
        padding: 5px 10px;
        cursor: pointer;
    }
    .agree-button:hover, .disagree-button:hover {
        opacity: 0.8;
    }
`;
document.head.appendChild(style);












