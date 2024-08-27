// Initialize variables
let fromSwitch = false;
let toSwitch = false;

// Select elements
const fromSelect = document.querySelector('.fromSelect');
const toSelect = document.querySelector('.toSelect');
const button = document.querySelector('.form-button'); // Change the selector as needed

// Function to check if both selects have values
function checkButtonState() {
    if (fromSwitch && toSwitch) {
        button.removeAttribute('disabled');
    }
}

// Event listener for fromSelect
fromSelect.addEventListener('change', () => {
    fromSwitch = true;
    checkButtonState();
});

// Event listener for toSelect
toSelect.addEventListener('change', () => {
    toSwitch = true;
    checkButtonState();
});
