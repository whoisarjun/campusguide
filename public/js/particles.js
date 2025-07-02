/**
 * Magical Particle System for AI Halo Search Bar
 * Creates subtle floating particles that respond to hover and focus states
 */

class ParticleSystem {
    constructor(container, options = {}) {
        this.container = container;
        this.particles = [];
        this.animationId = null;
        this.isActive = false;

        // Configuration options
        this.config = {
            baseParticleCount: options.baseParticleCount || 10,
            hoverParticleCount: options.hoverParticleCount || 20,
            focusParticleCount: options.focusParticleCount || 30,
            particleSize: options.particleSize || 2,
            speed: options.speed || 0.5,
            fadeSpeed: options.fadeSpeed || 0.02,
            colors: options.colors || [
                'rgba(90, 120, 255, 0.6)',
                'rgba(147, 112, 255, 0.6)',
                'rgba(255, 63, 163, 0.6)',
                'rgba(255, 100, 200, 0.5)',
                'rgba(130, 95, 255, 0.6)'
            ]
        };

        this.currentParticleCount = this.config.baseParticleCount;
        this.targetParticleCount = this.config.baseParticleCount;

        this.init();
    }

    init() {
        // Create canvas for particles
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');

        // Style the canvas
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '1';
        this.canvas.style.borderRadius = 'inherit';
        this.canvas.style.overflow = 'hidden';

        // Add canvas to container
        this.container.style.position = 'relative';
        this.container.appendChild(this.canvas);

        // Set up resize observer
        this.resizeObserver = new ResizeObserver(() => this.resize());
        this.resizeObserver.observe(this.container);

        this.resize();
        this.createInitialParticles();
    }

    resize() {
        const rect = this.container.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
    }

    createParticle() {
        const rect = this.container.getBoundingClientRect();
        return {
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height,
            vx: (Math.random() - 0.5) * this.config.speed,
            vy: (Math.random() - 0.5) * this.config.speed,
            size: Math.random() * this.config.particleSize + 0.5,
            opacity: Math.random() * 0.5 + 0.2,
            color: this.config.colors[Math.floor(Math.random() * this.config.colors.length)],
            life: 1,
            maxLife: Math.random() * 3 + 2,
            twinkle: Math.random() * Math.PI * 2,
            twinkleSpeed: Math.random() * 0.02 + 0.01
        };
    }

    createInitialParticles() {
        for (let i = 0; i < this.config.baseParticleCount; i++) {
            this.particles.push(this.createParticle());
        }
    }

    updateParticleCount(newCount) {
        this.targetParticleCount = newCount;
    }

    updateParticles() {
        // Adjust particle count gradually
        if (this.particles.length < this.targetParticleCount) {
            this.particles.push(this.createParticle());
        } else if (this.particles.length > this.targetParticleCount) {
            // Remove oldest particles first
            this.particles.splice(0, this.particles.length - this.targetParticleCount);
        }

        // Update existing particles
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];

            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Update twinkle effect
            particle.twinkle += particle.twinkleSpeed;

            // Bounce off edges
            if (particle.x <= 0 || particle.x >= this.canvas.width) {
                particle.vx *= -1;
                particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
            }
            if (particle.y <= 0 || particle.y >= this.canvas.height) {
                particle.vy *= -1;
                particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
            }

            // Update life
            particle.life -= this.config.fadeSpeed;

            // Remove dead particles
            if (particle.life <= 0) {
                this.particles.splice(i, 1);
                // Add new particle to maintain count
                if (this.particles.length < this.targetParticleCount) {
                    this.particles.push(this.createParticle());
                }
            }
        }
    }

    drawParticles() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (const particle of this.particles) {
            const twinkleOpacity = Math.sin(particle.twinkle) * 0.3 + 0.7;
            const finalOpacity = particle.opacity * particle.life * twinkleOpacity;

            // Create gradient for particle
            const gradient = this.ctx.createRadialGradient(
                particle.x, particle.y, 0,
                particle.x, particle.y, particle.size * 2
            );

            const baseColor = particle.color.replace(/[\d\.]+\)$/g, `${finalOpacity})`);
            const centerColor = particle.color.replace(/[\d\.]+\)$/g, `${finalOpacity * 1.5})`);

            gradient.addColorStop(0, centerColor);
            gradient.addColorStop(0.7, baseColor);
            gradient.addColorStop(1, 'transparent');

            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();

            // Add subtle glow effect
            this.ctx.shadowColor = particle.color;
            this.ctx.shadowBlur = particle.size * 2;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size * 0.5, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.shadowBlur = 0;
        }
    }

    animate() {
        if (!this.isActive) return;

        this.updateParticles();
        this.drawParticles();

        this.animationId = requestAnimationFrame(() => this.animate());
    }

    start() {
        if (!this.isActive) {
            this.isActive = true;
            this.animate();
        }
    }

    stop() {
        this.isActive = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }

    setHoverState() {
        this.updateParticleCount(this.config.hoverParticleCount);
    }

    setFocusState() {
        this.updateParticleCount(this.config.focusParticleCount);
    }

    setNormalState() {
        this.updateParticleCount(this.config.baseParticleCount);
    }

    destroy() {
        this.stop();
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
        }
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
    }
}

// Initialize particle system for AI halo elements
document.addEventListener('DOMContentLoaded', function() {
    const aiHaloElements = document.querySelectorAll('.ai-halo');

    aiHaloElements.forEach(haloElement => {
        const particleSystem = new ParticleSystem(haloElement, {
            baseParticleCount: 4,
            hoverParticleCount: 8,
            focusParticleCount: 12,
            particleSize: 1.5,
            speed: 0.3,
            fadeSpeed: 0.015
        });

        const input = haloElement.querySelector('.ai-input');

        // Start the particle system
        particleSystem.start();

        // Handle hover events
        haloElement.addEventListener('mouseenter', () => {
            particleSystem.setHoverState();
        });

        haloElement.addEventListener('mouseleave', () => {
            if (!input || document.activeElement !== input) {
                particleSystem.setNormalState();
            }
        });

        // Handle focus events
        if (input) {
            input.addEventListener('focus', () => {
                particleSystem.setFocusState();
            });

            input.addEventListener('blur', () => {
                particleSystem.setNormalState();
            });
        }

        // Store reference for cleanup
        haloElement.particleSystem = particleSystem;
    });
});

// Cleanup function for page unload
window.addEventListener('beforeunload', function() {
    const aiHaloElements = document.querySelectorAll('.ai-halo');
    aiHaloElements.forEach(haloElement => {
        if (haloElement.particleSystem) {
            haloElement.particleSystem.destroy();
        }
    });
});
