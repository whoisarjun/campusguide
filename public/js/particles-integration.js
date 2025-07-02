/**
 * Particle Integration Helper
 * Adds CSS classes and manages particle states for seamless integration
 */

document.addEventListener('DOMContentLoaded', function() {
    const aiHaloElements = document.querySelectorAll('.ai-halo');

    aiHaloElements.forEach(haloElement => {
        const input = haloElement.querySelector('.ai-input');

        if (!input) return;

        // Add event listeners for particle state management
        haloElement.addEventListener('mouseenter', function() {
            this.classList.add('particle-hover');
        });

        haloElement.addEventListener('mouseleave', function() {
            this.classList.remove('particle-hover');
            // Keep focus state if input is focused
            if (document.activeElement !== input) {
                this.classList.remove('particle-focus');
            }
        });

        input.addEventListener('focus', function() {
            haloElement.classList.add('particle-focus');
            haloElement.classList.remove('particle-hover');
        });

        input.addEventListener('blur', function() {
            haloElement.classList.remove('particle-focus');
        });

        // Add typing detection for enhanced particle effect
        let typingTimer;
        input.addEventListener('input', function() {
            haloElement.classList.add('typing');

            clearTimeout(typingTimer);
            typingTimer = setTimeout(() => {
                haloElement.classList.remove('typing');
            }, 1000); // Remove typing class after 1 second of no input
        });

        // Clean up typing state on blur
        input.addEventListener('blur', function() {
            clearTimeout(typingTimer);
            haloElement.classList.remove('typing');
        });
    });

    // Optional: Add performance monitoring
    let frameCount = 0;
    let lastTime = performance.now();

    function monitorPerformance() {
        frameCount++;
        const currentTime = performance.now();

        if (currentTime - lastTime >= 5000) { // Check every 5 seconds
            const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));

            // If FPS drops below 30, reduce particle intensity
            if (fps < 30) {
                document.body.classList.add('reduced-particles');
                console.warn('Particle effects reduced due to low FPS:', fps);
            } else {
                document.body.classList.remove('reduced-particles');
            }

            frameCount = 0;
            lastTime = currentTime;
        }

        requestAnimationFrame(monitorPerformance);
    }

    // Start performance monitoring
    requestAnimationFrame(monitorPerformance);
});

// Add CSS for reduced particles mode
const reducedParticlesCSS = `
.reduced-particles .ai-halo canvas {
    opacity: 0.5 !important;
}
.reduced-particles .ai-halo::before {
    animation-duration: 8s !important;
}
.reduced-particles .ai-halo::after {
    animation-duration: 12s !important;
}
`;

// Inject reduced particles CSS
const style = document.createElement('style');
style.textContent = reducedParticlesCSS;
document.head.appendChild(style);
