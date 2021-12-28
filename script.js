
const apiKey = 'YUTNBi_M5WlckgYG-3houw8huA7tGIPWvwJ9dsjdAi4',
    imgContainer = document.getElementById('image-container'),
    loader = document.getElementById('loader');
let count = 5,
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
let ready = false,
    imagesLoaded = 0,
    totalImages = 0,
    initialLoad = true;

function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        checkInternetConnectivity()
    }
}

function checkInternetConnectivity(){
    setTimeout(function () {
        if (initialLoad) {
            initialLoad = false
            count = 30;
            console.log('initialLoad::', initialLoad ,'::count', count)
        }else{
            console.log('initalLoad::',initialLoad)
            count = 5;
        }
    }, 750);
}
function setAttributes(element, attributes) {
    for (let key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

function displayPhotos(photos) {
    imagesLoaded = 0;
    totalImages = photos.length;
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
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        getPhotos()
        ready = false
    }
})

getPhotos();