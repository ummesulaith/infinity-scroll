const apiKey = 'YUTNBi_M5WlckgYG-3houw8huA7tGIPWvwJ9dsjdAi4',
    count = 10,
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`,
    imgContainer = document.getElementById('image-container'),
    laoder = document.getElementById('loader');

let ready = false,
imagesLoaded =0,
totalImages=0;

function imageLoaded() {
    console.log('Image loaded')
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        ready=true;
        console.log('The image is ready::', ready)
    }
}
function setAttributes(element, attributes) {
    for (let key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

function displayPhotos(photos) {
    totalImages = photos.length;
    console.log('the total images::', totalImages)
    photos.forEach(photo => {
        const item = document.createElement('a')
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        })
        const img = document.createElement('img')
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.description,
            title: photo.description
        })
        img.addEventListener('load', imageLoaded)
        item.appendChild(img)
        imgContainer.appendChild(item)

    });

}
async function getPhotos() {
    let response;
    try {

        response = await fetch(apiUrl)
        const data = await response.json()
        displayPhotos(data)

    } catch (error) {
        console.log(error)
    }
}

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
        getPhotos()
        console.log('load more')
    }
})

getPhotos();