document.addEventListener('DOMContentLoaded', function() {
    const errorNumber = document.querySelector('.error-number');
    let isAnimating = false;

    // Create shatter fragments dynamically
    function createShatterFragments() {
        // Clear any existing fragments
        const existingFragments = errorNumber.querySelectorAll('.shatter-fragment');
        existingFragments.forEach(fragment => fragment.remove());

        // Create 20 fragments with random properties
        for (let i = 0; i < 20; i++) {
            const fragment = document.createElement('div');
            fragment.className = 'shatter-fragment';

            // Adjust fragment properties based on screen size
            const isMobile = window.innerWidth <= 700;
            const maxFallDistance = isMobile ? 150 : 300; // Shorter fall on mobile
            const maxHorizontalDrift = isMobile ? 50 : 100; // Less drift on mobile

            // Random size between 4-12px (smaller on mobile)
            const maxSize = isMobile ? 6 : 12;
            const size = Math.random() * (maxSize - 4) + 4;
            fragment.style.width = size + 'px';
            fragment.style.height = (size * (0.5 + Math.random() * 1)) + 'px';

            // Random position within the number
            fragment.style.top = (Math.random() * 60 + 20) + '%'; // More contained positioning
            fragment.style.left = (Math.random() * 60 + 20) + '%';

            // Random colors with red theme
            const colors = [
                'linear-gradient(45deg, #ff4444, #ff6666)',
                'linear-gradient(45deg, #ff6666, #ffaaaa)',
                'linear-gradient(45deg, #cc0000, #ff4444)',
                'linear-gradient(45deg, #ff8888, #ffcccc)'
            ];
            fragment.style.background = colors[Math.floor(Math.random() * colors.length)];

            // Create unique animation with mobile-friendly parameters
            const fallDistance = Math.random() * maxFallDistance + (maxFallDistance * 0.5);
            const horizontalDrift = (Math.random() - 0.5) * maxHorizontalDrift;
            const rotation = Math.random() * 720 - 360; // -360 to 360 degrees
            const duration = Math.random() * 0.8 + 1.2; // 1.2-2s duration
            const scale = Math.random() * 0.6 + 0.2; // 0.2-0.8 final scale

            const keyframes = `
                @keyframes shatterFall${i} {
                    0% { 
                        opacity: 1; 
                        transform: translate(0, 0) rotate(0deg) scale(1);
                        filter: brightness(1.2) blur(0px);
                    }
                    20% {
                        opacity: 1;
                        transform: translate(${horizontalDrift * 0.2}px, ${fallDistance * 0.1}px) rotate(${rotation * 0.2}deg) scale(0.9);
                        filter: brightness(1.5) blur(0.5px);
                    }
                    50% {
                        opacity: 0.8;
                        transform: translate(${horizontalDrift * 0.6}px, ${fallDistance * 0.4}px) rotate(${rotation * 0.6}deg) scale(0.7);
                        filter: brightness(1) blur(1px);
                    }
                    80% {
                        opacity: 0.3;
                        transform: translate(${horizontalDrift * 0.9}px, ${fallDistance * 0.8}px) rotate(${rotation * 0.9}deg) scale(${scale});
                        filter: brightness(0.8) blur(2px);
                    }
                    100% { 
                        opacity: 0; 
                        transform: translate(${horizontalDrift}px, ${fallDistance}px) rotate(${rotation}deg) scale(${scale * 0.5});
                        filter: brightness(0.5) blur(3px);
                    }
                }
            `;

            // Add the keyframe to the document
            const style = document.createElement('style');
            style.textContent = keyframes;
            document.head.appendChild(style);

            // Apply the animation
            fragment.style.animation = `shatterFall${i} ${duration}s ease-out forwards`;
            fragment.style.animationDelay = (Math.random() * 0.2) + 's';

            errorNumber.appendChild(fragment);
        }
    }

    // Enhanced click effect
    errorNumber.addEventListener('click', function() {
        if (isAnimating) return;
        isAnimating = true;

        // Remove existing classes
        this.classList.remove('shatter', 'flash');

        // Force reflow
        void this.offsetWidth;

        // Create new fragments
        createShatterFragments();

        // Add the effect classes
        this.classList.add('shatter', 'flash');

        // Screen shake effect - but only on desktop
        if (window.innerWidth > 700) {
            document.body.style.animation = 'screenShake 0.6s ease-out';
        }

        // Remove flash after short time
        setTimeout(() => {
            this.classList.remove('flash');
        }, 300);

        // Clean up after animation
        setTimeout(() => {
            this.classList.remove('shatter');

            // Remove fragments
            const fragments = this.querySelectorAll('.shatter-fragment');
            fragments.forEach(fragment => fragment.remove());

            // Remove temporary styles
            const tempStyles = document.querySelectorAll('style');
            tempStyles.forEach(style => {
                if (style.textContent.includes('shatterFall')) {
                    style.remove();
                }
            });

            document.body.style.animation = '';
            isAnimating = false;
        }, 2000);
    });

    // Enhanced hover effects
    errorNumber.addEventListener('mouseenter', function() {
        if (!this.classList.contains('shatter')) {
            this.style.transition = 'transform 0.3s ease, text-shadow 0.3s ease, filter 0.3s ease';
            this.style.filter = 'brightness(1.1) drop-shadow(0 0 20px rgba(255, 255, 255, 0.3))';
        }
    });

    errorNumber.addEventListener('mouseleave', function() {
        if (!this.classList.contains('shatter')) {
            this.style.filter = 'none';
        }
    });
});

// Add screen shake keyframes
const screenShakeStyle = document.createElement('style');
screenShakeStyle.textContent = `
    @keyframes screenShake {
        0%, 100% { transform: translate(0, 0) rotate(0deg); }
        10% { transform: translate(-2px, -1px) rotate(-0.5deg); }
        20% { transform: translate(-1px, 0px) rotate(0.5deg); }
        30% { transform: translate(1px, 1px) rotate(0deg); }
        40% { transform: translate(1px, -1px) rotate(0.5deg); }
        50% { transform: translate(-1px, 1px) rotate(-0.5deg); }
        60% { transform: translate(-1px, 0px) rotate(0deg); }
        70% { transform: translate(1px, 0px) rotate(-0.5deg); }
        80% { transform: translate(-1px, -1px) rotate(0.5deg); }
        90% { transform: translate(1px, 1px) rotate(0deg); }
    }
`;
document.head.appendChild(screenShakeStyle);
