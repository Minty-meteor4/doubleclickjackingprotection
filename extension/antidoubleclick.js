/**
 * Script Name: antidoubleclick.js
 * Description : Displays a semi-transparent overlay to block
 *               user interaction when a page opens,
 *               then automatically removes it after a delay
 *               or mouse movement.
 * Copyright    : (c) 2025, bexxo.ch
 * Author       : bexxo.ch
 * License      : MIT License
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * @version      : 1.0
 * @date         : 2025.01.20
 */

(function() {
    /**
     * Initializes the script with the given parameters.
     * @param {Object} options
     * @param {number} [options.distance=25]    - Distance in pixels to unlock via mouse movement
     * @param {number} [options.time=1500]         - Time in milliseconds before automatic unlocking (if no movement occurs)
     * @param {boolean} [options.showOverlay=true] - Whether or not to display the overlay on load
     * @param {boolean} [options.disableButton=true] - Whether or not to disable buttons initially
     * @param {string} [options.overlayColor='rgba(0,0,0,0.5)'] - CSS color of the overlay
     */
    function initOverlayBlock({
              distance = 25,
              time = 1500,
              showOverlay = true,
              disableButton = true,
              overlayColor = 'rgba(0, 0, 0, 0.5)'
          } = {})
    {
        const startOverlay = () => {
            // ---------------------------------------------------------------------
            // 1) CREATE THE SEMI-TRANSPARENT OVERLAY (LAYER)
            // ---------------------------------------------------------------------
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

            // ---------------------------------------------------------------------
            // 2) DISABLE SUBMIT BUTTONS
            // ---------------------------------------------------------------------
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

            // ---------------------------------------------------------------------
            // 3) FUNCTION TO REMOVE THE OVERLAY + REACTIVATE BUTTONS
            //    AND REMOVE EVENT LISTENERS
            // ---------------------------------------------------------------------
            let removeOverlayTimeout = null;
            let initialMousePosition = null;

            function removeOverlayAndEvents() {
                if (removeOverlayTimeout) {
                    clearTimeout(removeOverlayTimeout);
                    removeOverlayTimeout = null;
                }
                hideLayerProtect();
                enableButtons();
                initialMousePosition = null;
                document.removeEventListener('visibilitychange', handleVisibilityChange);
                document.removeEventListener('mousemove', handleMouseMove);
            }

            // ---------------------------------------------------------------------
            // 4) UNLOCK LOGIC: EITHER NO MOVEMENT FOR X SECONDS, OR
            //    MOUSE MOVEMENT OF distance PIXELS OR MORE
            // ---------------------------------------------------------------------
            function handleVisibilityChange() {
                if (!document.hidden && isOverlayActive) {
                    lancerTimerDeblocage();
                }
            }

            function lancerTimerDeblocage() {
                if (removeOverlayTimeout) clearTimeout(removeOverlayTimeout);
                removeOverlayTimeout = setTimeout(() => {
                    removeOverlayAndEvents();
                }, time);
            }

            function handleMouseMove(e) {
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

            // ---------------------------------------------------------------------
            // 5) INITIAL ACTIVATION + SETTING UP LISTENERS
            // ---------------------------------------------------------------------
            document.addEventListener('visibilitychange', handleVisibilityChange);
            document.addEventListener('mousemove', handleMouseMove);

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
