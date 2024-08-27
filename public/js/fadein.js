// Function to wrap each word in a span with the class 'hoverfloat'
function wrapWords() {
    // Select all elements with class 'hoverify'
    const elements = document.querySelectorAll('.hoverify');

    // Loop through each element
    elements.forEach(element => {
        // Get the text content of the current element
        const text = element.textContent;

        // Split the text into words
        const words = text.split(' ');

        // Create a new HTML string with each word wrapped in a span
        const wrappedText = words.map(word => `<span class="hoverfloat">${word}</span>`).join(' ');

        // Set the innerHTML of the current element to the new HTML string
        element.innerHTML = wrappedText;
    });
}

// Call the function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', wrapWords);
