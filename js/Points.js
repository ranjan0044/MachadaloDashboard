let selectedCard;

const savePoints = () => {
    const favorablePoints = document.getElementById('favorablePoints').value;
    const unfavorablePoints = document.getElementById('unfavorablePoints').value;
    alert('Favorable Points: ' + favorablePoints + '\nUnfavorable Points: ' + unfavorablePoints);
    // You can add further logic to save these points, e.g., send them to a server

    const pointsForm = selectedCard.querySelector('#pointsForm');
    pointsForm.style.display = 'none';
}

const openCardById = (id, type = "positive") => {
    let cardKey = id === 'connectivityCard' ? ['connectivityLikes', 'connectivityDislikes']
        : id === 'constructionCard' ? ['constructionLikes', 'constructionDisLikes']
            : id === 'amenitiesCard' ? ['amenitiesLikes', 'amenitiesDisLikes']
                : id === 'maintenanceCard' ? ['maintenanceLikes', 'maintenanceDisLikes']
                    : id === 'peopleFriendlinessCard' ? ['peopleFriendlinessLikes', 'peopleFriendlinessDisLikes'] : '';
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
    })
    if (!cardKey) return;
    const ulElement = selectedCard.querySelector('ul');
    ulElement.innerHTML = '';
    let indexNo = type === 'positive' ? 0 : 1;
    const likeDisLikePoints = nlpDataForLikeDislike[cardKey[indexNo]];
    for (const [key, value] of Object.entries(likeDisLikePoints)) {
        const liElement = document.createElement('li');
        liElement.textContent = `${key}: ${value}`;

        const buttonGroup = document.createElement('div');
        buttonGroup.classList.add('button-group');

        const greenButton = document.createElement('button');
        greenButton.classList.add('toggle-btn');
        greenButton.textContent = '+';
        greenButton.onclick = () => toggleColor(greenButton, 'green');

        const redButton = document.createElement('button');
        redButton.classList.add('toggle-btn');
        redButton.textContent = '-';
        redButton.onclick = () => toggleColor(redButton, 'red');

        buttonGroup.appendChild(greenButton);
        buttonGroup.appendChild(redButton);
        liElement.appendChild(buttonGroup);

        ulElement.appendChild(liElement);
    }

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
    // let cardData = document.getElementById(id)
    let rankList = document.getElementById(`rankList-${id}`);
    // Toggle visibility of rankList
    // if (rankList.style.display === 'none' || !rankList.style.display) {
    rankList.style.display = 'block';
    rankList.style.listStyle = 'none';
    rankList.style.textTransform = 'uppercase';
    rankList.style.marginTop = '20px';
    rankList.style.fontSize = '10px';
    rankList.style.textAlign = 'center';
    // Clear previous content
    rankList.innerHTML = '';
    // Add positive ratings
    for (let i = Object.keys(sortedLikes).length - 1; i >= 0; i--) {
        let listItem = document.createElement('li');
        listItem.textContent = Object.keys(sortedLikes)[i];
        // listItem.textContent = '+ ' + Object.keys(sortedLikes)[i] + ' ' + Object.values(sortedLikes)[i];
        let hue = 115;
        // Calculate brightness based on rating (5 is darkest, 1 is lightest)
        let brightness = 30 + (5 - i) * 15; // Adjust values for gradient effect
        // Set background color using hsl format
        listItem.style.backgroundColor = 'hsl(' + hue + ', 100%, ' + brightness + '%)';
        let perceivedBrightness = brightness / 100 * 255;
        listItem.style.color = perceivedBrightness > 80 ? 'black' : 'white';
        rankList.appendChild(listItem);
    }
    // } else {
    //     rankList.style.display = 'none'; // Hide rankList
    // }
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
    // Toggle visibility of rankList
    // if (rankList.style.display === 'none' || !rankList.style.display) {
    rankList.style.display = 'block';
    // Clear previous content
    rankList.innerHTML = '';
    // Add negative ratings
    for (var i = Object.keys(sortedDislikes).length - 1; i >= 0; i--) {
        var listItem = document.createElement('li');
        listItem.textContent = Object.keys(sortedDislikes)[i];
        // listItem.textContent = '- ' + Object.keys(sortedDislikes)[i] + ' ' + Object.values(sortedDislikes)[i];
        // Calculate hue for red (0 corresponds to red in hsl)
        var hue = 0;
        // Calculate brightness based on rating (-5 is darkest, -1 is lightest)
        var brightness = 50 + (-i + 5) * 10; // Adjust values for gradient effect
        // Set background color using hsl format
        listItem.style.backgroundColor = 'hsl(' + hue + ', 100%, ' + brightness + '%)';
        let perceivedBrightness = brightness / 100 * 255;
        listItem.style.color = perceivedBrightness > 160 ? 'black' : 'white';
        rankList.appendChild(listItem);
    }
    // }
    //  else {
    //     rankList.style.display = 'none'; // Hide rankList
    // }
}
