document.addEventListener('DOMContentLoaded', function() {
  const navbarToggler = document.querySelector('.navbar-toggler');
  const overlay = document.querySelector('.overlay');

  navbarToggler.addEventListener('click', function() {
    overlay.classList.toggle('show');
  });
});
