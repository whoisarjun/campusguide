alert("test");

document.querySelectorAll('.page-link').forEach(button => {
    button.addEventListener('click', function() {
        // Remove .page-selected from all buttons
        document.querySelectorAll('.page-link').forEach(btn => btn.classList.remove('page-selected'));

        // Add .page-selected to the clicked button
        this.classList.add('page-selected');
    });
});
