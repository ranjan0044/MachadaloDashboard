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
    const pointsForm = selectedCard.querySelector('#pointsForm');

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
    let cardData = document.getElementById(id)
    let rankList = cardData.querySelector('#rankList');

    // Toggle visibility of rankList
    if (rankList.style.display === 'none') {
        rankList.style.display = 'block';
        // Clear previous content
        rankList.innerHTML = '';
        // Add positive ratings
        for (var i = 5; i >= 1; i--) {
            var listItem = document.createElement('li');
            listItem.textContent = '+' + i;
            // Calculate hue for green (120 corresponds to green in hsl)
            var hue = 120;
            // Calculate brightness based on rating (5 is darkest, 1 is lightest)
            var brightness = 30 + (5 - i) * 15; // Adjust values for gradient effect
            // Set background color using hsl format
            listItem.style.backgroundColor = 'hsl(' + hue + ', 100%, ' + brightness + '%)';
            rankList.appendChild(listItem);
        }
    } else {
        rankList.style.display = 'none'; // Hide rankList
    }
}

function showNegative(id) {
    let cardData = document.getElementById(id)
    let rankList = cardData.querySelector('#rankList');

    // Toggle visibility of rankList
    if (rankList.style.display === 'none') {
        rankList.style.display = 'block';
        // Clear previous content
        rankList.innerHTML = '';
        // Add negative ratings
        for (var i = -5; i <= -1; i++) {
            var listItem = document.createElement('li');
            listItem.textContent = i;
            // Calculate hue for red (0 corresponds to red in hsl)
            var hue = 0;
            // Calculate brightness based on rating (-5 is darkest, -1 is lightest)
            var brightness = 50 + (i + 5) * 10; // Adjust values for gradient effect
            // Set background color using hsl format
            listItem.style.backgroundColor = 'hsl(' + hue + ', 100%, ' + brightness + '%)';
            rankList.appendChild(listItem);
        }
    } else {
        rankList.style.display = 'none'; // Hide rankList
    }
}

// const hideRankList = () => {
//     console.log(cardIdsOfCharts)
// }

// export {hideRankList};