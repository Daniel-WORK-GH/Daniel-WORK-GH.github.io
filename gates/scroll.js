var doc = document.documentElement;

if (doc.addEventListener) {
    // IE9, Chrome, Safari, Opera
    doc.addEventListener("mousewheel", MouseWheelHandler, {passive: false});
    // Firefox
    doc.addEventListener("DOMMouseScroll", MouseWheelHandler, {passive: false});
}
// IE 6/7/8
else 
    doc.attachEvent("onmousewheel", MouseWheelHandler, {passive: false});


function MouseWheelHandler(e) {

    // cross-browser wheel delta
    var e = window.event || e; // old IE support
    var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));

    if(delta==1)         // if mouse scrolls up
    {
        doc.scrollBy(0, -60)
        e.preventDefault();
        e.stopPropagation();
    }
    if(delta==-1)        // if mouse scrolls down, we disable scrolling.
    {
        doc.scrollBy(0, 60)
        e.preventDefault();
        e.stopPropagation();
        return false;
    }
    return false;
}