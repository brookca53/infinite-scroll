const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 3;
const apiKey = '8gtOiurSmIX5MZdDoFpYLeQMEsRG6i6crIVIH3dC0uA';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
    // console.log('IN function imageLoaded()');
    imagesLoaded++;
    console.log(imagesLoaded);
    if(imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        console.log('ready = ', ready);
    }
}

// Helper Function To Set Attributes On DOM Elements
function setAttributes(element, attributes) {
    // console.log('IN function setAttributes(element, attributes)');
    for(const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create Elements For Links & Photos, Add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log('total images = ', totalImages);
    // console.log('IN function displayPhotos()');
    // Run function for each object in photosArray
    // For each photo, we will do these steps
    // 1) Create an item
    // 2) Create an img
    // 3) Put the img into the item
    // 4) Put item into the imageContainer
    photosArray.forEach((photo) => {
        // // Create <a> to link to Unsplash
        // const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');
        // // Create <img> for photo
        // const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title',photo.alt_description);
        // // Put <img> inside <a>, then put both inside imageCongtainer Element
        // item.appendChild(img);
        // imageContainer.appendChild(item);

         // Create <a> to link to Unsplash
         const item = document.createElement('a');
        //  item.setAttribute('href', photo.links.html);
        //  item.setAttribute('target', '_blank');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
         // Create <img> for photo
         const img = document.createElement('img');
        //  img.setAttribute('src', photo.urls.regular);
        //  img.setAttribute('alt', photo.alt_description);
        //  img.setAttribute('title',photo.alt_description);
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        // Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);
        // Put <img> inside <a>, then put both inside imageCongtainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get photos from Unsplash API
async function getPhotos() {
    // console.log('IN async function getPhotos()');
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
        console.log(photosArray);
    } catch(error) {
        // Catch error here
    }
}

// Check to see if scrolling near bottom of page, Load More Photos
// Add event listener to our WINDOW.  The window is the parent of the document
// and the grandparent of our body element. So we are going to the
// highest possible level.
window.addEventListener('scroll', () => {
    // console.log('IN window.addEventListener(\'scroll\', ()')
    // window.innerHeight = Height of Browser window
    // window.scrollY = How high we are from the top of the page
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight * 0.85 && ready) {
        // console.log('window.innerHeight: ', window.innerHeight);
        // console.log('window.scrollY: ', window.scrollY);
        // console.log('window.innerHeight + window.scrollY: ', window.innerHeight + window.scrollY);
        // console.log('document.body.offsetHeight: ', document.body.offsetHeight);
        // console.log('document.body.offsetHeight - 1000: ', document.body.offsetHeight - 1000);
        // console.log('load more');
        ready = false;
        getPhotos();
    }
});

// On Load
getPhotos();