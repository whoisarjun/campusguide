// Wait until the entire DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', function() {

  // Select the navbar toggler element (e.g., hamburger icon)
  const navbarToggler = document.querySelector('.navbar-toggler');

  // Select the overlay element that appears when the menu is toggled
  const overlay = document.querySelector('.overlay');

  // Add a click event listener to the navbar toggler
  navbarToggler.addEventListener('click', function() {
    // Toggle the 'show' class on the overlay to show/hide it
    overlay.classList.toggle('show');
  });
});
