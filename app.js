if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}
else {
    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
    }
}

if (location.href.includes('#')) {
    location.href = "/"
    // location.reload()
}