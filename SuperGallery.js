// SuperGallery JS V1.0 is copyrighted to Havis V H under the brand HVH
// But Have fun Using it!! :D
const styles = [
    'color: white',

    'font-size: 30px',

    'font-family:"Outfit", sans-serif ',
    'font-weight: bold',

].join(';');
const styles2 = [
    'color: #5656f6',
    'background: #111',
    'font-size: 30px',
    'border-radius: 12px 0px 12px 0px',
    'padding: 10px',
    'font-family:"Outfit", sans-serif ',
    'font-weight: bold',
    'margin:12px'
].join(';');

console.log("%cHello There!!!", styles);
console.log("%cthis Website uses SuperGallery from %cHVH", styles, styles2);

document.getElementById("phoato").addEventListener("click", function (e) {
   if(e.target.className == "photoCarousel"){
    Carousel();
   }
});

function openGallery() {
    document.getElementById('galleryWindow').style.display = 'flex';
    setTimeout(() => {
        if (window.innerWidth > 750) {
            document.getElementById('galleryWindow').style.height = '90vh';
            document.getElementById('galleryWindow').style.width = '95vw';
            document.getElementById('galleryWindow').style.zIndex = '51';
            document.getElementById('galleryWindow').style.top = '50%';
            document.getElementById('galleryWindow').style.opacity = '100%';
        }
        else {
            document.getElementById('galleryWindow').style.height = '100vh';
            document.getElementById('galleryWindow').style.width = '100vw';

            document.getElementById('galleryWindow').style.top = '50%';
            document.getElementById('galleryWindow').style.opacity = '100%';
        }
    }, 100);
}

function closeGallery() {
    document.getElementById('galleryWindow').style.height = '20vh';
    document.getElementById('galleryWindow').style.width = '30vw';
    document.getElementById('galleryWindow').style.top = '70%';
    document.getElementById('galleryWindow').style.opacity = '0%';
    setTimeout(() => {
        document.getElementById('galleryWindow').style.display = 'none';

    }, 400);
}

_isCarouselOpen = false;
_imgIndex = 0;
var pics = []



carouseL = document.getElementById('phoato');

function imgLoader(img) {
    img.onload = function () {
        var originalWidth = img.naturalWidth;
        var originalHeight = img.naturalHeight;
        var targetWidth = 600;
        if (window.innerWidth < 750) {
            targetWidth = window.innerWidth - 120;
        }
        var aspectRatio = originalWidth / originalHeight;
        var newHeight = targetWidth / aspectRatio;
        document.getElementById('carouselImage').style.height = newHeight + 'px';
        document.getElementById('carouselImage').style.width = targetWidth + 'px';
    };
    document.getElementById('imageCounter').innerHTML = (_imgIndex + 1) + '/' + pics.length;
}

function Carousel() {
    if (_isCarouselOpen) {
        // carouseL.style.height = '0vh';
        carouseL.style.opacity = '0%';
        setTimeout(() => {
            carouseL.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 400);
        _isCarouselOpen = false;
    } else {

        carouseL.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            // carouseL.style.height = '100vh';
            carouseL.style.opacity = '100%';
        }, 100);
        _isCarouselOpen = true;
    }
}

function nextImage() {
    if (_imgIndex < pics.length - 1) {
        _imgIndex++;
        document.getElementById('carouselImage').style.background = 'url(' + pics[_imgIndex] + ') no-repeat center center';
        document.getElementById('carouselImage').style.backgroundSize = 'contain';
        var img = new Image();
        img.src = pics[_imgIndex];
        imgLoader(img);
    }
}
function prevImage() {
    if (_imgIndex > 0) {
        _imgIndex--;
        document.getElementById('carouselImage').style.background = 'url(' + pics[_imgIndex] + ') no-repeat center center';
        document.getElementById('carouselImage').style.backgroundSize = 'contain';
        var img = new Image();
        img.src = pics[_imgIndex];
        imgLoader(img);
    }
}



function trigger(action){
    picsJson = JSON.parse(atob(localStorage.getItem('msg')));
    if (action == 'loaded') {
        pics = picsJson.data;
        document.getElementById('carouselImage').style.background = 'url(' + pics[0] + ') no-repeat center center';
        document.getElementById('carouselImage').style.backgroundSize = 'contain';
        var img = new Image();
        img.src = pics[0];
        imgLoader(img);
    }
    else if (action == "target") {
        _imgIndex = picsJson.data;
        document.getElementById('carouselImage').style.background = 'url(' + pics[_imgIndex] + ') no-repeat center center';
        document.getElementById('carouselImage').style.backgroundSize = 'contain';
        var img = new Image();
        img.src = pics[_imgIndex];
        imgLoader(img);
        Carousel();
    }
}