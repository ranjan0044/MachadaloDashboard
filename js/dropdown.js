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


