const video = document.getElementById('rickroll-video');
const overlay = document.getElementById('overlay');

// Handle click anywhere on the fake error
overlay.addEventListener('click', () => {
    startPrank();
});

function startPrank() {
    const docElm = document.documentElement;
    
    // Request full-screen
    if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
    } else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
    }

    // Request Pointer Lock (Locks mouse inside window and hides it)
    if (docElm.requestPointerLock) {
        docElm.requestPointerLock();
    } else if (docElm.mozRequestPointerLock) {
        docElm.mozRequestPointerLock();
    }

    // Toggle prank classes
    document.body.classList.add('active-prank');
    
    // Play local video
    video.play();
    video.volume = 1.0; 

    // Prevent closing tab (Shows a browser prompt)
    window.onbeforeunload = function() {
        return "The Rickroll is not yet complete. Are you sure you want to surrender?";
    };

    // Trap keyboard and right-click
    trapInteractions();
}

function trapInteractions() {
    // Disable right-click
    document.addEventListener('contextmenu', event => event.preventDefault());

    // Disable all keyboard keys
    document.addEventListener('keydown', event => {
        // Only block if prank is active
        if (document.body.classList.contains('active-prank')) {
            event.preventDefault();
            event.stopPropagation();
            
            // Re-enforce lock and video if they try to escape
            video.play();
            video.volume = 1.0;
            
            // Try to re-lock pointer on key press
            if (document.documentElement.requestPointerLock) {
                document.documentElement.requestPointerLock();
            }
        }
    }, true);

    // Keep re-enforcing volume and playback
    setInterval(() => {
        if (document.body.classList.contains('active-prank')) {
            video.play();
            video.volume = 1.0;
        }
    }, 500);
}

// Handle video end
video.onended = () => {
    stopPrank();
};

function stopPrank() {
    document.body.classList.remove('active-prank');
    window.onbeforeunload = null; // Allow closing again
    
    if (document.fullscreenElement) {
        document.exitFullscreen();
    }
    
    if (document.exitPointerLock) {
        document.exitPointerLock();
    }
}

// If they escape fullscreen or pointer lock prematurely
document.addEventListener('fullscreenchange', handleEscape);
document.addEventListener('pointerlockchange', handleEscape);

function handleEscape() {
    if (!document.fullscreenElement && !document.pointerLockElement && document.body.classList.contains('active-prank')) {
        // If they managed to break the lock, we must force them to click again
        document.body.classList.remove('active-prank');
        video.pause();
    }
}
