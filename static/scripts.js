const imageUrls = JSON.parse(document.getElementById('image-urls').textContent);
let currentIndex = 0;

document.getElementById('prev').addEventListener('click', showPrevImage);
document.getElementById('next').addEventListener('click', showNextImage);
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft') {
        showPrevImage();
    } else if (event.key === 'ArrowRight') {
        showNextImage();
    }
});

function preloadImage(url) {
    const img = new Image();
    img.src = `/image_proxy?url=${encodeURIComponent(url)}`;
}

function showImage(index) {
    const imgElement = document.getElementById('image');
    const loadingElement = document.getElementById('loading');

    loadingElement.style.display = 'block';
    imgElement.style.display = 'none';

    imgElement.onload = function() {
        loadingElement.style.display = 'none';
        imgElement.style.display = 'block';
    };
    imgElement.onerror = function() {
        loadingElement.style.display = 'none';
        console.error(`Error loading image at index ${index}: ${imageUrls[index]}`);
    };

    imgElement.src = `/image_proxy?url=${encodeURIComponent(imageUrls[index])}`;
    currentIndex = index;

    // Preload next 5 images
    for (let i = 1; i <= 5; i++) {
        const preloadIndex = (index + i) % imageUrls.length;
        preloadImage(imageUrls[preloadIndex]);
    }
}

function showPrevImage() {
    const newIndex = (currentIndex - 1 + imageUrls.length) % imageUrls.length;
    showImage(newIndex);
}

function showNextImage() {
    const newIndex = (currentIndex + 1) % imageUrls.length;
    showImage(newIndex);
}

// Initial display and preload the next 5 images
showImage(currentIndex);
