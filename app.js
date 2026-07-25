if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}
else {
    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
    }
}

window.addEventListener('DOMContentLoaded', function () {
    var pendingTarget = sessionStorage.getItem('alchemyScrollTarget');
    var hashTarget = window.location.hash ? window.location.hash.slice(1) : '';
    var targetId = pendingTarget || hashTarget;

    if (!targetId) {
        return;
    }

    sessionStorage.removeItem('alchemyScrollTarget');

    var targetElement = document.getElementById(targetId);
    if (!targetElement) {
        return;
    }

    window.requestAnimationFrame(function () {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});



window.onscroll = function () { myFunction() };

// Get the header
var header = document.getElementsByClassName("header")[0];

// Get the offset position of the navbar
var sticky = header.offsetTop;

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
    if (window.pageYOffset > sticky) {
        header.classList.add("headerSticky");
    } else {
        header.classList.remove("headerSticky");
    }
}
navOpen = 0;

openAndClose = () => {
    if (navOpen == 0) {


        document.getElementById("navi").style.width = "70vw";
        navOpen = 1;

    } else {
        document.getElementById("navi").style.width = "0vw"
        navOpen = 0;

    }
}

document.getElementById("openNav").addEventListener("click", function () {
    if (window.innerWidth < 750) {
        openAndClose();
    }
});

window.onresize = function () {
    if (window.innerWidth > 750) {
        document.getElementById("navi").style.width = "initial";

    } else {
        document.getElementById("navi").style.width = "0vw";


    }
}




