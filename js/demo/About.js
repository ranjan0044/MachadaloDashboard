// script.js

document.addEventListener('DOMContentLoaded', function() {
    // Function to fetch survey details
    function fetchSurveyDetails(surveyType) {
        // Dummy data for demonstration; replace with actual API call
        const surveyData = {
            "Nli_Survey": {
                title: "NLI Survey",
                description: "This survey evaluates the effectiveness of our Societies ratings like Connectivity Rating, Maintenance rating, Construction ratings, Amenities Ratings, People Friendliness rating.",
                objectives: [
                    "Assess user satisfaction with NLI.",
                    "Identify areas for improvement in NLI",
                    "Can Compare with another Society"

                ]
            },
            "Painting_Survey": {
                title: "Painting Survey",
                description: "This survey gathers feedback on different painting styles.",
                objectives: [
                    "Understand preferences in painting styles.",
                    "Collect data on popular color choices."
                ]
            },
            "Solar_Survey": {
                title: "Solar Survey",
                description: "This survey aims to understand the public's opinion on solar energy.",
                objectives: [
                    "Gauge interest in solar energy solutions.",
                    "Collect data on barriers to solar energy adoption."
                ]
            }
        };

        // Get survey data based on the type
        const data = surveyData[surveyType];

        if (data) {
            document.getElementById('survey-title').innerText = data.title;
            document.getElementById('survey-description').innerText = data.description;
            
            // Clear existing objectives
            const objectivesList = document.getElementById('survey-objectives');
            objectivesList.innerHTML = '';
            
            // Add new objectives
            data.objectives.forEach(objective => {
                const listItem = document.createElement('li');
                listItem.className = 'list-group-item';
                listItem.innerText = objective;
                objectivesList.appendChild(listItem);
            });
        } else {
            // Handle case when survey type is not found
            document.getElementById('survey-title').innerText = 'Survey Not Found';
            document.getElementById('survey-description').innerText = 'The survey details could not be found.';
            document.getElementById('survey-objectives').innerHTML = '';
        }
    }

    // Get survey type from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const surveyType = urlParams.get('type') || 'Nli_Survey'; // Default to Nli_Survey

    // Fetch and display survey details
    fetchSurveyDetails(surveyType);
});
