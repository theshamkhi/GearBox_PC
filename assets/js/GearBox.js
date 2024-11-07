
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