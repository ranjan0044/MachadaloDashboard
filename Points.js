

document.addEventListener('DOMContentLoaded', function() {
    const hoverTarget = document.querySelector('.hover-target');
    const connectivityCard = document.getElementById('connectivityCard');
    const toggleButton = document.getElementById('toggleButton');
    const pointsForm = document.getElementById('pointsForm');
    let clickCount = 0;

    hoverTarget.addEventListener('click', function() {
        clickCount++;
        if (clickCount % 2 !== 0) {
            connectivityCard.style.display = 'block';
        } else {
            connectivityCard.style.display = 'none';
        }
    });

    hoverTarget.addEventListener('dblclick', function() {
        connectivityCard.style.display = 'none';
        clickCount = 0; // Reset click count on double click
    });

    toggleButton.addEventListener('click', function() {
        if (pointsForm.style.display === 'none') {
            pointsForm.style.display = 'block';
        } else {
            pointsForm.style.display = 'none';
        }
    });
});

function savePoints() {
    const favorablePoints = document.getElementById('favorablePoints').value;
    const unfavorablePoints = document.getElementById('unfavorablePoints').value;
    alert('Favorable Points: ' + favorablePoints + '\nUnfavorable Points: ' + unfavorablePoints);
    // You can add further logic to save these points, e.g., send them to a server

    const pointsForm = document.getElementById('pointsForm');
    pointsForm.style.display = 'none';
}