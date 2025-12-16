(() => {
    if (typeof initOverlayBlock !== 'function') {
        return;
    }

    initOverlayBlock({
        distance: 50,
        time: 3000,
        showOverlay: true,
        disableButton: true,
        overlayColor: 'rgba(0, 0, 0, 0.45)'
    });
})();
