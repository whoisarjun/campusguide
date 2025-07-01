// Functionality for carousel buttons

document.addEventListener('DOMContentLoaded', function () {
    var carouselElement = document.getElementById('carouselExample');
    var carouselInstance = new bootstrap.Carousel(carouselElement);

    document.getElementById('prevBtn').addEventListener('click', function () {
        carouselInstance.prev();
    });

    document.getElementById('nextBtn').addEventListener('click', function () {
        carouselInstance.next();
    });

    var carouselElement2 = document.getElementById('carouselExample2');
    var carouselInstance2 = new bootstrap.Carousel(carouselElement2);

    var prevBtn2 = document.getElementById('prevBtn2');
    if (prevBtn2) {
        prevBtn2.addEventListener('click', function () {
            carouselInstance2.prev();
        });
    }

    var nextBtn2 = document.getElementById('nextBtn2');
    if (nextBtn2) {
        nextBtn2.addEventListener('click', function () {
            carouselInstance2.next();
        });
    }
});
