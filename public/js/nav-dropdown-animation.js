document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    // Close menu when clicking outside navbar
    document.addEventListener('click', function(event) {
        // Check if menu is open and click is outside navbar
        if (navbarCollapse.classList.contains('show') && !navbar.contains(event.target)) {
            navbarToggler.click();
        }
    });
});
