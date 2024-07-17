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
    pointsForm.style.display = 'none';
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

function toggleConnectivityCard() {
    var card = document.getElementById('connectivityCard');
    if (card.style.display === 'none') {
        card.style.display = 'block';
    } else {
        card.style.display = 'none';
    }
}