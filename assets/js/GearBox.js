






































































































































































































































































// 

const toggleButton = document.getElementById('seller-info-toggle');
const modal = document.getElementById('seller-info-modal');

toggleButton.addEventListener('mouseover', () => {
    modal.classList.remove('hidden');
});

toggleButton.addEventListener('mouseleave', () => {
    modal.classList.add('hidden');
});

// Optional: Hide the modal when the mouse leaves the modal itself
modal.addEventListener('mouseleave', () => {
    modal.classList.add('hidden');
});

// 

function initializeCarousel() {
    const images = [
        "../assets/images/processur.webp", // add more image paths if needed
    ];
    let currentIndex = 0;

    const mainImage = document.querySelector("img[alt='Main Product']");
    const prevBtn = document.getElementById("prev");
    const nextBtn = document.getElementById("next");

    // event listeners for navigation buttons
    prevBtn.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        mainImage.src = images[currentIndex];
    });

    nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % images.length;
        mainImage.src = images[currentIndex];
    });

    // event listeners for thumbnails
    document.getElementById("thumb1").addEventListener("click", () => {
        mainImage.src = images[0];
        currentIndex = 0;
    });
    document.getElementById("thumb2").addEventListener("click", () => {
        mainImage.src = images[1];
        currentIndex = 1;
    });
    document.getElementById("thumb3").addEventListener("click", () => {
        mainImage.src = images[2];
        currentIndex = 2;
    });
    document.getElementById("thumb4").addEventListener("click", () => {
        mainImage.src = images[3];
        currentIndex = 3;
    });
}

// check if screen width is less than or equal to 768px
if (window.innerWidth <= 768) {
    initializeCarousel();
}

// add an event listener to reinitialize carousel if the window is resized to mobile size
window.addEventListener("resize", () => {
    if (window.innerWidth <= 768) {
        initializeCarousel();
    }
});
