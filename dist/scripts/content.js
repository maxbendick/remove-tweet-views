function hideViews() {
    const analyticsLinks = document.querySelectorAll('a[href*="analytics"]');
    analyticsLinks.forEach((element)=>{
        let viewsContainer = element.parentElement;
        if (viewsContainer.parentElement.role !== 'group') {
            viewsContainer = viewsContainer.parentElement;
        }
        viewsContainer.style.display = 'none';
    });
}
function debounce(f, ms) {
    let throttled = false;
    let queued = false;
    return ()=>{
        if (throttled) {
            queued = true;
            return;
        }
        throttled = true;
        f();
        setTimeout(()=>{
            if (queued) {
                f();
            }
            throttled = false;
            queued = false;
        }, ms);
    };
}
function observeChanges(f) {
    const fDebounced = debounce(()=>{
        f();
    }, 1);
    let observer = new MutationObserver(()=>{
        fDebounced();
    });
    observer.observe(document, {
        childList: true,
        subtree: true
    });
}
observeChanges(()=>{
    hideViews();
});
