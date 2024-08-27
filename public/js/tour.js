document.addEventListener('DOMContentLoaded', function() {
    var carouselElement = document.getElementById('carouselExampleCaptions');
    var carouselInstance = new bootstrap.Carousel(carouselElement);

    document.getElementById('prevBtn').addEventListener('click', function() {
        carouselInstance.prev();
    });

    document.getElementById('nextBtn').addEventListener('click', function() {
        carouselInstance.next();
    });
});

document.getElementById('scroller').addEventListener('click', function() {
    window.scrollBy({ top: 500, behavior: 'smooth' });
});

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

// Select the element you're interested in
const element = document.querySelector('.spotlight-facilities-container');

// Get the distance from the top of the element to the top of the viewport
const elementTop = element.getBoundingClientRect().top;

// Get the total distance from the top of the page to the bottom of the element
const distanceFromTopToBottom = window.scrollY + elementTop + element.offsetHeight;

const element2 = document.querySelector('.other-facilities-container');

element2.style.top = `${distanceFromTopToBottom + 1250}px`;
