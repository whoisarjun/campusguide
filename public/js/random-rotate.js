// Enhanced random-rotate.js with particle effects - FIXED VERSION
let direction = 1;

// Particle system for button hover effects
class ButtonParticleSystem {
    constructor() {
        this.particles = [];
        this.canvas = null;
        this.ctx = null;
        this.animationId = null;
        this.init();
    }

    init() {
        // Create canvas for particles
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '9999';
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        document.body.appendChild(this.canvas);

        this.ctx = this.canvas.getContext('2d');

        // Handle window resize
        window.addEventListener('resize', () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        });

        this.animate();
    }

    createParticles(button) {
        const rect = button.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Create small particles around the entire button border
        for (let i = 0; i < 12; i++) {
            // Random position along the button's perimeter
            const side = Math.floor(Math.random() * 4); // 0=top, 1=right, 2=bottom, 3=left
            let startX, startY, vx, vy;

            switch(side) {
                case 0: // Top edge
                    startX = rect.left + Math.random() * rect.width;
                    startY = rect.top;
                    vx = (Math.random() - 0.5) * 0.5;
                    vy = -Math.random() * 0.8 - 0.2;
                    break;
                case 1: // Right edge
                    startX = rect.right;
                    startY = rect.top + Math.random() * rect.height;
                    vx = Math.random() * 0.8 + 0.2;
                    vy = (Math.random() - 0.5) * 0.5;
                    break;
                case 2: // Bottom edge
                    startX = rect.left + Math.random() * rect.width;
                    startY = rect.bottom;
                    vx = (Math.random() - 0.5) * 0.5;
                    vy = Math.random() * 0.8 + 0.2;
                    break;
                case 3: // Left edge
                    startX = rect.left;
                    startY = rect.top + Math.random() * rect.height;
                    vx = -Math.random() * 0.8 - 0.2;
                    vy = (Math.random() - 0.5) * 0.5;
                    break;
            }

            this.particles.push({
                x: startX,
                y: startY,
                vx: vx,
                vy: vy,
                life: 1.0,
                decay: 0.012 + Math.random() * 0.008,
                size: 0.8 + Math.random() * 1.2, // Smaller particles
                color: 'rgba(255, 255, 255, '
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Update and draw particles
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];

            // Update particle - subtle floating movement
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life -= particle.decay;
            // No gravity for aura effect

            // Remove dead particles
            if (particle.life <= 0) {
                this.particles.splice(i, 1);
                continue;
            }

            // Create small glowing particles
            this.ctx.save();
            this.ctx.globalAlpha = particle.life * 0.6;

            // Soft glow effect
            this.ctx.shadowColor = 'rgba(255, 255, 255, ' + (particle.life * 0.7) + ')';
            this.ctx.shadowBlur = particle.size * 3;
            this.ctx.fillStyle = particle.color + (particle.life * 0.8) + ')';

            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();

            this.ctx.restore();
        }

        this.animationId = requestAnimationFrame(() => this.animate());
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
    }
}

// Initialize particle system
const particleSystem = new ButtonParticleSystem();

// FIXED: Enhanced facility card interactions
document.querySelectorAll('.one-of-the-other-facilities').forEach(el => {
    const button = el.querySelector('button');
    const darkener = el.querySelector('.darkener'); // Get the inner content
    let particleInterval = null;

    el.addEventListener('mouseenter', () => {
        // Apply rotation to the inner darkener div instead of the container
        const deg = 2 * direction;
        direction *= -1;

        // Transform the inner content, not the container
        if (darkener) {
            darkener.style.transform = `rotate(${deg}deg) scale(1.02)`;
            darkener.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        }

        // Start particle effect on button if it exists
        if (button) {
            // Create initial burst of particles
            particleSystem.createParticles(button);

            // Continue creating particles while hovering
            particleInterval = setInterval(() => {
                particleSystem.createParticles(button);
            }, 100);

            // Add button aura glow effect
            button.style.boxShadow = '0 0 30px rgba(255, 255, 255, 0.6), 0 0 60px rgba(255, 255, 255, 0.3)';
            button.style.transition = 'box-shadow 0.3s ease';
        }
    });

    el.addEventListener('mouseleave', () => {
        // Reset rotation on inner content
        if (darkener) {
            darkener.style.transform = 'rotate(0deg) scale(1)';
        }

        // Stop particle effects
        if (particleInterval) {
            clearInterval(particleInterval);
            particleInterval = null;
        }

        // Remove button glow
        if (button) {
            button.style.boxShadow = '';
        }
    });
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    particleSystem.destroy();
});
