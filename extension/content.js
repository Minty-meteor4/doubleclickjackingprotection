(() => {
    if (typeof initOverlayBlock !== 'function') {
        return;
    }

    // Запускаем защиту только на целевых страницах (чтобы не трогать попапы/атакующие окна)
    const allowList = [/hack\.php/i];
    const isConfirmDone = /[?&]emailValid=/i.test(window.location.search); // страница результата, снимаем защиту
    const shouldProtect = allowList.some((pattern) => pattern.test(window.location.pathname)) && !isConfirmDone;
    if (!shouldProtect) return;

    initOverlayBlock({
        distance: 50,
        time: 4000,
        showOverlay: true,
        disableButton: true,
        overlayColor: 'rgba(0, 0, 0, 0.45)',
        // Снимаем оверлей автоматически по таймеру или при смене окна (фокус)
        unlockOnMouseMove: false,
        unlockOnTimer: true,
        unlockOnDblClick: false,
        unlockOnVisibilityChange: false,
        unlockOnFocusChange: true
    });
})();
