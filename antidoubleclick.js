/**
 * Script Name: antidoubleclick.js
 * Description : Displays a semi-transparent overlay to block
 *               user interaction when a page opens,
 *               then automatically removes it after a delay
 *               or specific events.
 * Copyright    : (c) 2025, bexxo.ch
 * Author       : bexxo.ch
 * License      : MIT License
 */

(function() {
    /**
     * Initializes the script with the given parameters.
     * @param {Object} options
     * @param {number} [options.distance=25]    - Distance in pixels to unlock via mouse movement
     * @param {number} [options.time=1500]      - Time in milliseconds before automatic unlocking
     * @param {boolean} [options.showOverlay=true]
     * @param {boolean} [options.disableButton=true]
     * @param {string} [options.overlayColor='rgba(0,0,0,0.5)']
     * @param {boolean} [options.unlockOnMouseMove=true]
     * @param {boolean} [options.unlockOnTimer=true]
     * @param {boolean} [options.unlockOnDblClick=true]
     * @param {boolean} [options.unlockOnVisibilityChange=false]
     * @param {boolean} [options.unlockOnFocusChange=false]
     */
    function initOverlayBlock({
        distance = 25,
        time = 1500,
        showOverlay = true,
        disableButton = true,
        overlayColor = 'rgba(0, 0, 0, 0.5)',
        unlockOnMouseMove = true,
        unlockOnTimer = true,
        unlockOnDblClick = true,
        unlockOnVisibilityChange = false,
        unlockOnFocusChange = false
    } = {}) {
        const startOverlay = () => {
            // -----------------------------------------------------------------
            // 1) CREATE THE SEMI-TRANSPARENT OVERLAY (LAYER)
            // -----------------------------------------------------------------
            const overlay = document.createElement('div');
            let overlayAdded = false;
            let isOverlayActive = false;

            function addLayerProtect() {
                if (overlayAdded || !showOverlay) return;
                overlay.style.position = 'fixed';
                overlay.style.top = '0';
                overlay.style.left = '0';
                overlay.style.width = '100%';
                overlay.style.height = '100%';
                overlay.style.backgroundColor = overlayColor;
                overlay.style.zIndex = '99999';
                overlay.style.display = 'none';
                overlay.style.pointerEvents = 'auto';
                document.body.appendChild(overlay);
                overlayAdded = true;
            }

            function showLayerProtect() {
                if (isOverlayActive || !showOverlay) return;
                addLayerProtect();
                overlay.style.display = 'block';
                isOverlayActive = true;
            }

            function hideLayerProtect() {
                if (!showOverlay) return;
                overlay.style.display = 'none';
                isOverlayActive = false;
            }

            // -----------------------------------------------------------------
            // 2) DISABLE SUBMIT BUTTONS
            // -----------------------------------------------------------------
            const buttons = document.querySelectorAll('form button, form input[type="submit"]');
            function disableButtons() {
                if (disableButton) {
                    buttons.forEach(btn => {
                        btn.disabled = true;
                        btn.style.cursor = 'not-allowed';
                    });
                }
            }
            function enableButtons() {
                if (disableButton) {
                    buttons.forEach(btn => {
                        btn.disabled = false;
                        btn.style.cursor = 'pointer';
                    });
                }
            }

            // -----------------------------------------------------------------
            // 3) FUNCTION TO REMOVE THE OVERLAY + REACTIVATE BUTTONS
            //    AND REMOVE EVENT LISTENERS
            // -----------------------------------------------------------------
            let removeOverlayTimeout = null;
            let initialMousePosition = null;
            let hasLostFocus = false;

            function removeOverlayAndEvents() {
                if (removeOverlayTimeout) {
                    clearTimeout(removeOverlayTimeout);
                    removeOverlayTimeout = null;
                }
                hideLayerProtect();
                enableButtons();
                initialMousePosition = null;
                if (unlockOnTimer || unlockOnVisibilityChange) {
                    document.removeEventListener('visibilitychange', handleVisibilityChange);
                }
                if (unlockOnMouseMove) {
                    document.removeEventListener('mousemove', handleMouseMove);
                }
                if (unlockOnDblClick) {
                    document.removeEventListener('dblclick', handleDoubleClick);
                }
                if (unlockOnFocusChange) {
                    window.removeEventListener('blur', handleWindowBlur);
                    window.removeEventListener('focus', handleWindowFocus);
                }
            }

            // -----------------------------------------------------------------
            // 4) UNLOCK LOGIC
            // -----------------------------------------------------------------
            function handleVisibilityChange() {
                if (document.hidden) {
                    hasLostFocus = true;
                }
                if (!document.hidden && isOverlayActive) {
                    if (unlockOnVisibilityChange) {
                        removeOverlayAndEvents();
                    } else if (unlockOnTimer) {
                        lancerTimerDeblocage();
                    }
                }
            }

            function lancerTimerDeblocage() {
                if (!unlockOnTimer) return;
                if (removeOverlayTimeout) clearTimeout(removeOverlayTimeout);
                removeOverlayTimeout = setTimeout(() => {
                    removeOverlayAndEvents();
                }, time);
            }

            function handleMouseMove(e) {
                if (!unlockOnMouseMove) return;
                if (!initialMousePosition) {
                    initialMousePosition = { x: e.clientX, y: e.clientY };
                    return;
                }
                const dx = e.clientX - initialMousePosition.x;
                const dy = e.clientY - initialMousePosition.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist >= distance) {
                    removeOverlayAndEvents();
                }
            }

            function handleDoubleClick() {
                if (!unlockOnDblClick) return;
                removeOverlayAndEvents();
            }

            function handleWindowBlur() {
                hasLostFocus = true;
            }

            function handleWindowFocus() {
                if (!unlockOnFocusChange) return;
                if (hasLostFocus && isOverlayActive) {
                    removeOverlayAndEvents();
                }
            }

            // -----------------------------------------------------------------
            // 5) INITIAL ACTIVATION + SETTING UP LISTENERS
            // -----------------------------------------------------------------
            if (unlockOnTimer || unlockOnVisibilityChange) {
                document.addEventListener('visibilitychange', handleVisibilityChange);
            }
            if (unlockOnMouseMove) {
                document.addEventListener('mousemove', handleMouseMove);
            }
            if (unlockOnDblClick) {
                document.addEventListener('dblclick', handleDoubleClick);
            }
            if (unlockOnFocusChange) {
                window.addEventListener('blur', handleWindowBlur);
                window.addEventListener('focus', handleWindowFocus);
            }

            if (!document.hidden) {
                showLayerProtect();
                disableButtons();
                lancerTimerDeblocage();
            } else {
                showLayerProtect();
                disableButtons();
            }
        };

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', startOverlay, { once: true });
        } else {
            startOverlay();
        }
    }

    // Attach this function to window (or globalThis) to call it from an external page
    window.initOverlayBlock = initOverlayBlock;

})();
