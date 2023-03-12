const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photoArrays = [];
// unsplash API
const count = 30;
const apiKey = "VGO_oTXKY-QMesGk9wvPrRqpe9wNpPGQ8lNXhKCM-Us";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded == totalImages) {
    ready = true;
    loader.hidden = true;
  }
}
// helper function to set attributes on dom elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// create elements for links&photos,add to dom
function displayPhotots() {
  imagesLoaded = 0;
  totalImages = photoArrays.length;
  // run function for each object in photosArray
  photoArrays.forEach((photo) => {
    // create <a> to link to unsplash
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    // create <img> for photo
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    //event listener,check when each is finished loading
    img.addEventListener("load", imageLoaded);
    // put <img> inside <a> ,then put both inside imagecontainer element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}
// get photos from unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photoArrays = await response.json();
    displayPhotots();
  } catch (err) {
    // catch error here
  }
}
// check to see if scrolling near bottom of page,load more photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

// on load
getPhotos();
