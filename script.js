const apiKey ='46181892-5791fcebe608040db310e5709'; // Replace with your Pixabay API key
const imageGrid = document.getElementById('imageGrid');
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImg');
const modalCaption = document.getElementById('modalCaption');
const closeModal = document.querySelector('.close');
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');

// Automatically fetch images when the page loads
document.addEventListener('DOMContentLoaded', () => {
    fetchImages('nature');
});

// Search functionality
searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query !== '') {
        fetchImages(query);
    } else {
        alert('Please enter a search term.');
    }
});

function fetchImages(query) {
    const url = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(query)}&image_type=photo&per_page=12`;

    fetch(url)
        .then(response => response.json())
        .then(data => displayImages(data.hits))
        .catch(() => {
            alert("Error fetching images. Please try again later.");
        });
}

function displayImages(images) {
    imageGrid.innerHTML = '';
    images.forEach(image => {
        const imgDiv = document.createElement('div');
        imgDiv.classList.add('image-item');
        imgDiv.innerHTML = `<img src="${image.webformatURL}" alt="${image.tags}">`;
        imgDiv.addEventListener('click', () => openModal(image));
        imageGrid.appendChild(imgDiv);
    });
}

function openModal(image) {
    modal.style.display = "block";
    modalImg.src = image.largeImageURL;
    modalCaption.textContent = `Photo by ${image.user} on Pixabay`;
}

closeModal.addEventListener('click', () => {
    modal.style.display = "none";
});

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};
document.addEventListener("DOMContentLoaded", function () {
    const imageItem = document.querySelector('.image-item img'); // Change this to target the specific image you want to share
    const imageUrl = imageItem.src; // Get the image URL

    // Facebook Share
    document.getElementById('facebookShare').href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(imageUrl)}`;

    // Twitter Share
    document.getElementById('twitterShare').href = `https://twitter.com/intent/tweet?url=${encodeURIComponent(imageUrl)}&text=Check%20this%20out!`;

    // Pinterest Share
    document.getElementById('pinterestShare').href = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(imageUrl)}&media=${encodeURIComponent(imageUrl)}&description=Check%20this%20out!`;
});

