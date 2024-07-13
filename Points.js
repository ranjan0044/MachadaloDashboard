// // document.getElementById('toggleButton').addEventListener('click', function() {
// //     var form = document.getElementById('pointsForm');
// //     if (form.style.display === "none") {
// //         form.style.display = "block";
// //     } else {
// //         form.style.display = "none";
// //     }
// // });

// // function savePoints() {
// //     var favorablePoints = document.getElementById('favorablePoints').value;
// //     var unfavorablePoints = document.getElementById('unfavorablePoints').value;
// //     localStorage.setItem('favorablePoints', favorablePoints);
// //     localStorage.setItem('unfavorablePoints', unfavorablePoints);
// //     alert('Points saved!');
// // }

// // // Optionally, you can load the saved points when the page loads
// // document.addEventListener('DOMContentLoaded', function() {
// //     var favorablePoints = localStorage.getItem('favorablePoints');
// //     var unfavorablePoints = localStorage.getItem('unfavorablePoints');
// //     if (favorablePoints) {
// //         document.getElementById('favorablePoints').value = favorablePoints;
// //     }
// //     if (unfavorablePoints) {
// //         document.getElementById('unfavorablePoints').value = unfavorablePoints;
// //     }
// // });


// document.addEventListener('DOMContentLoaded', function() {
//     var connectivityCard = document.getElementById('connectivityCard');
//     var hoverTarget = document.querySelector('.hover-target');

//     hoverTarget.addEventListener('mouseenter', function() {
//         connectivityCard.classList.remove('hide-card');
//         connectivityCard.style.display = 'block';
//     });

//     hoverTarget.addEventListener('mouseleave', function() {
//         connectivityCard.classList.add('hide-card');
//         setTimeout(function() {
//             connectivityCard.style.display = 'none';
//         }, 500); // Match this duration to the waveOut animation duration
//     });

//     document.getElementById('toggleButton').addEventListener('click', function() {
//         var form = document.getElementById('pointsForm');
//         if (form.style.display === "none") {
//             form.style.display = "block";
//         } else {
//             form.style.display = "none";
//         }
//     });

//     function savePoints() {
//         var favorablePoints = document.getElementById('favorablePoints').value;
//         var unfavorablePoints = document.getElementById('unfavorablePoints').value;
//         localStorage.setItem('favorablePoints', favorablePoints);
//         localStorage.setItem('unfavorablePoints', unfavorablePoints);
//         alert('Points saved!');
//     }

//     // Load saved points when the page loads
//     var favorablePoints = localStorage.getItem('favorablePoints');
//     var unfavorablePoints = localStorage.getItem('unfavorablePoints');
//     if (favorablePoints) {
//         document.getElementById('favorablePoints').value = favorablePoints;
//     }
//     if (unfavorablePoints) {
//         document.getElementById('unfavorablePoints').value = unfavorablePoints;
//     }
// });


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