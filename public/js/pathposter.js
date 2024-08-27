// Function to send the POST request
function sendPostRequest() {
    // Get the selected option's value from both selects
    const fromValue = firstSelect.options[firstSelect.selectedIndex].value;
    const toValue = secondSelect.options[secondSelect.selectedIndex].value;

    // Prepare data to be sent
    const postData = {
        from: fromValue,
        to: toValue
    };

    // Send POST request using Fetch API
    fetch('/directions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
    });
}

// Add event listeners to both select elements
firstSelect.addEventListener('change', sendPostRequest);
secondSelect.addEventListener('change', sendPostRequest);
