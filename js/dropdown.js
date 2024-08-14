function createSearchableDropdown(containerId,placeholder, items, onSelect) {
    const container = document.getElementById(containerId);

    // Create input for search
    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('placeholder', placeholder);

    // Create dropdown menu
    const dropdownMenu = document.createElement('div');
    dropdownMenu.classList.add('dropdown-menu');

    // Apply CSS style for max-height and overflow-y
    dropdownMenu.style.maxHeight = '200px'; 
    dropdownMenu.style.overflowY = 'auto';

    dropdownMenu.style.width = 'auto';

    // Add input and dropdown menu to container
    container.appendChild(input);
    container.appendChild(dropdownMenu);

    // Populate dropdown items
    items?.forEach(item => {
        const div = document.createElement('div');
        div.textContent = item;
        div.classList.add('dropdown-item-city'); 
        dropdownMenu.appendChild(div);

        // Handle item selection
        div.addEventListener('click', function() {
            input.value = item; // Set input value to selected item
            dropdownMenu.style.display = 'none'; // Hide dropdown after selection
            if (typeof onSelect === 'function') {
                onSelect(item); // Call onSelect callback with selected item
            }
        });
    });

    // Filter dropdown items based on input
    input.addEventListener('input', function() {
        const filter = input.value.toLowerCase();
        const dropdownItems = dropdownMenu.getElementsByClassName('dropdown-item-city');
        for (let i = 0; i < dropdownItems.length; i++) {
            const item = dropdownItems[i];
            const textContent = item.textContent.toLowerCase();
            if (textContent.includes(filter)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        }
    });

    // Show dropdown menu on input focus
    input.addEventListener('focus', function() {
        dropdownMenu.style.display = 'block';
    });

    // Hide dropdown menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!container.contains(event.target)) {
            dropdownMenu.style.display = 'none';
        }
    });
}


function toggleColor(button, color) {
    const listItem = button.closest('li');
    listItem.classList.remove('green', 'red');
    
    if (color === 'green') {
        listItem.classList.add('green');
    } else if (color === 'red') {
        listItem.classList.add('red');
    }
}

function toggleCommentSection() {
    const commentSection = document.querySelector('.comment-section');
    const isVisible = commentSection.style.display === 'block';
    commentSection.style.display = isVisible ? 'none' : 'block';
}

function selectRating(rating) {
    const ratingOptions = document.querySelectorAll('.rating-option');
    ratingOptions.forEach(option => option.classList.remove('selected'));
    
    for (let i = 0; i < rating; i++) {
        ratingOptions[i].classList.add('selected');
    }
    document.querySelector('.comment-section').dataset.rating = rating;
}

function saveComment() {
    const textarea = document.querySelector('.comment-textarea');
    const comment = textarea.value.trim();
    const rating = document.querySelector('.comment-section').dataset.rating || 0;
    
    if (comment) {
        alert(`Comment saved: ${comment}\nRating: ${rating}`);
    } else {
        alert('Please enter a comment before saving.');
    }
    document.querySelector('.comment-section').style.display = 'none';
    textarea.value = ''; // Clear the textarea
    document.querySelector('.comment-section').dataset.rating = ''; // Clear the rating
}


// let selectedRating = 0;

// function toggleRatingCard() {
//     const popup = document.getElementById('ratingPopup');
//     popup.style.display = (popup.style.display === 'none' || popup.style.display === '') ? 'block' : 'none';
// }

// function rate(rating) {
//     selectedRating = rating;
//     const buttons = document.querySelectorAll('.rating-btn');
//     buttons.forEach(button => {
//         button.style.backgroundColor = button.textContent == rating ? '#007bff' : '#f0f0f0';
//         button.style.color = button.textContent == rating ? '#fff' : '#000';
//     });
// }

// function saveRating() {
//     const comment = document.getElementById('commentBox').value;
//     if (selectedRating && comment) {
//         console.log('Saving rating:', selectedRating, 'Comment:', comment);
       
//         toggleRatingCard(); 
//     } else {
//         alert('Please provide a rating and comment.');
//     }
// }

/// Define subcategories for each category
const subcategories = {
    connectivity: ['Public Transport', 'Market', 'Connectivity', 'School', 'Road', 'Restaurant', 'Mall'],
    maintenance: ['Water Supply', 'Maintenance', 'Hygiene', 'Power Backup', 'Electricity', 'Garbage Collection', 'Painting'],
    construction: ['Construction Quality', 'Plaster', 'Leakage', 'Balcony'],
    amenities: ['Gym', 'Security', 'Parking', 'Amenities', 'Club House', 'Garden', 'Play Area'],
    peopleFriendliness: ['Neighbours', 'Pets Friendly', 'Festivals']
};

// Function to generate and display a rating card dynamically
function generateRatingCard(categoryId, categoryName) {
    const template = document.getElementById('ratingCardTemplate');
    const clone = template.innerHTML
        .replace(/{cardId}/g, `${categoryId}RatingPopup`)
        .replace(/{categoryId}/g, categoryId)
        .replace(/{categoryName}/g, categoryName);

    const div = document.createElement('div');
    div.innerHTML = clone;
    document.body.appendChild(div);

    const form = div.querySelector(`#${categoryId}RatingForm`);
    const categorySubcategories = subcategories[categoryId] || [];

    // Add subcategory rating buttons to the form
    categorySubcategories.forEach(subcategory => {
        const formGroup = document.createElement('div');
        formGroup.className = 'form-group';
        const label = document.createElement('label');
        label.textContent = subcategory + ':';
        formGroup.appendChild(label);

        const ratingButtons = document.createElement('div');
        ratingButtons.className = 'rating-buttons__';
        ratingButtons.dataset.category = subcategory.toLowerCase().replace(/\s+/g, '');
        
        for (let i = 1; i <= 5; i++) {
            const button = document.createElement('button');
            button.className = 'rating-btn';
            button.textContent = i;
            button.dataset.category = subcategory.toLowerCase().replace(/\s+/g, '');
            button.dataset.score = i;
            button.onclick = () => rate(subcategory.toLowerCase().replace(/\s+/g, ''), i);
            ratingButtons.appendChild(button);
        }
        
        formGroup.appendChild(ratingButtons);
        form.appendChild(formGroup);
    });
}

// Function to handle the rating action
function rate(subcategory, score) {
    console.log(`Rated ${subcategory} with ${score}`);
    // Store the rating for the subcategory
    // Example: Use localStorage or send to server
}

// Function to save the rating and comment
function saveRating(category) {
    const commentBox = document.getElementById(`commentBox-${category}`);
    console.log(`Saved rating for ${category}: ${commentBox.value}`);
    // Store the comment for the category
    // Example: Use localStorage or send to server
    toggleRatingCard(`${category}RatingPopup`);
}

// Function to toggle the visibility of a rating card
function toggleRatingCard(cardId) {
    const popup = document.getElementById(cardId);
    popup.style.display = popup.style.display === 'block' ? 'none' : 'block';
}

// Example usage
function openRatingCard(categoryId, categoryName) {
    generateRatingCard(categoryId, categoryName);
    toggleRatingCard(`${categoryId}RatingPopup`);
}

// Add event listeners to all rating buttons
document.querySelectorAll('.rating-btn').forEach(button => {
    button.addEventListener('click', (event) => {
        const category = event.target.dataset.category;
        const score = parseInt(event.target.dataset.score, 10);
        rate(category, score);
    });
});

// Add event listeners to all save buttons
document.querySelectorAll('.btn-primary').forEach(button => {
    button.addEventListener('click', (event) => {
        const category = event.target.dataset.category;
        saveRating(category);
    });
});
