# Rickroll Prank Website Plan (V3 - Hard Lock)

## Objective
Create a prank website that "traps" the user by locking the mouse cursor, entering full-screen, and preventing easy closure until the Rickroll video ends.

## Key Files & Context
- `index.html`: Structure with local video and bait image.
- `styles.css`: Styling for total interaction blocking and cursor hiding.
- `script.js`: Core logic for Pointer Lock, Full-screen, and Interaction Trapping.

## Implementation Steps
1.  **HTML Structure**: No changes needed.
2.  **Styling (`styles.css`)**:
    -   Apply `cursor: none !important` to `html`, `body`, and all elements during the prank.
3.  **JavaScript Logic (`script.js`)**:
    -   **Pointer Lock API**: On the initial click, call `requestPointerLock()` along with `requestFullscreen()`. This "captures" the mouse inside the browser.
    -   **Closure Prevention**: Implement `window.onbeforeunload` to show a generic browser confirmation dialog if they try to close the tab.
    -   **Aggressive Re-Locking**: Listen for `pointerlockchange`. If the lock is lost before the video ends, show the overlay again to force a re-click.
    -   **Keyboard Block**: Continue blocking all keys (F5, F11, Space, etc.) except for system-reserved ones (Esc, Alt+F4, Ctrl+Alt+Del).

## Verification & Testing
1.  **Mouse Lock Check**: Verify the mouse is "captured" and doesn't leave the window boundaries.
2.  **Closure Check**: Attempt to close the tab and verify the confirmation prompt appears.
3.  **Escape Check**: Verify that exiting full-screen or pointer lock resets the prank state until the next click.
