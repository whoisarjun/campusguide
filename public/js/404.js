document.addEventListener('DOMContentLoaded', function() {
    const errorNumber = document.querySelector('.error-number');
    const errorContent = document.querySelector('.error-content');

    // Create lightning container
    function createLightningContainer() {
        let container = document.querySelector('.lightning-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'lightning-container';
            errorContent.appendChild(container);
        }
        return container;
    }

    // Create screen flash overlay
    function createScreenFlash() {
        let flash = document.querySelector('.screen-flash');
        if (!flash) {
            flash = document.createElement('div');
            flash.className = 'screen-flash';
            document.body.appendChild(flash);
        }
        return flash;
    }

    // Create thunder ripple effect
    function createThunderRipple() {
        const ripple = document.createElement('div');
        ripple.className = 'thunder-ripple';
        errorContent.appendChild(ripple);
        return ripple;
    }

    // Generate realistic lightning path from top of screen to 404
    function generateLightningPath(startX, startY, endX, endY, segments = 10) {
        const points = [];
        points.push({ x: startX, y: startY });

        for (let i = 1; i < segments; i++) {
            const progress = i / segments;
            const baseX = startX + (endX - startX) * progress;
            const baseY = startY + (endY - startY) * progress;

            // Add random jaggedness - more dramatic for realistic lightning
            const maxDeviation = 50 + Math.random() * 80; // Increased for screen-wide effect
            const deviation = (Math.random() - 0.5) * maxDeviation;

            points.push({
                x: baseX + deviation,
                y: baseY + Math.random() * 40 - 20 // More vertical randomness
            });
        }

        points.push({ x: endX, y: endY });
        return points;
    }

    // Get the actual position of the 404 number
    function get404Position() {
        const rect = errorNumber.getBoundingClientRect();
        const containerRect = errorContent.getBoundingClientRect();

        return {
            x: rect.left + rect.width / 2 - containerRect.left,
            y: rect.top + rect.height / 2 - containerRect.top
        };
    }

    // Create SVG lightning bolt that strikes the 404
    function createRealisticLightning(container) {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.style.position = 'fixed'; // Fixed positioning to cover entire screen
        svg.style.top = '0';
        svg.style.left = '0';
        svg.style.width = '100vw'; // Full viewport width
        svg.style.height = '100vh'; // Full viewport height
        svg.style.pointerEvents = 'none';
        svg.style.zIndex = '15';

        // Get absolute position of 404 on screen
        const target404Rect = errorNumber.getBoundingClientRect();
        const target404 = {
            x: target404Rect.left + target404Rect.width / 2,
            y: target404Rect.top + target404Rect.height / 2
        };

        // Start from top of the screen with wider horizontal range
        const startX = target404.x + (Math.random() - 0.5) * 200; // Wider horizontal range
        const startY = 0; // Start from very top of screen
        const endX = target404.x + (Math.random() - 0.5) * 30; // End near the 404
        const endY = target404.y; // End at the 404

        // Generate main lightning path
        const mainPath = generateLightningPath(startX, startY, endX, endY, 20); // More segments for longer path

        // Create main lightning stroke (thicker)
        const mainBolt = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        const pathData = `M ${mainPath[0].x} ${mainPath[0].y} ` +
            mainPath.slice(1).map(point => `L ${point.x} ${point.y}`).join(' ');

        mainBolt.setAttribute('d', pathData);
        mainBolt.setAttribute('stroke', '#ffffff');
        mainBolt.setAttribute('stroke-width', '6'); // Thicker main bolt
        mainBolt.setAttribute('fill', 'none');
        mainBolt.setAttribute('filter', 'url(#glow)');

        // Create glow filter
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
        filter.setAttribute('id', 'glow');

        const feGaussianBlur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur');
        feGaussianBlur.setAttribute('stdDeviation', '6'); // Stronger glow
        feGaussianBlur.setAttribute('result', 'coloredBlur');

        const feMerge = document.createElementNS('http://www.w3.org/2000/svg', 'feMerge');
        const feMergeNode1 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode');
        feMergeNode1.setAttribute('in', 'coloredBlur');
        const feMergeNode2 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode');
        feMergeNode2.setAttribute('in', 'SourceGraphic');

        feMerge.appendChild(feMergeNode1);
        feMerge.appendChild(feMergeNode2);
        filter.appendChild(feGaussianBlur);
        filter.appendChild(feMerge);
        defs.appendChild(filter);

        // Create secondary branches
        const branches = [];
        for (let i = 3; i < mainPath.length - 3; i += 3) {
            if (Math.random() < 0.7) { // 70% chance for branch
                const branchStart = mainPath[i];
                const branchLength = 60 + Math.random() * 100; // Longer branches for screen-wide lightning
                const branchAngle = (Math.random() - 0.5) * Math.PI * 0.9; // ±81 degrees

                const branchEnd = {
                    x: branchStart.x + Math.cos(branchAngle) * branchLength,
                    y: branchStart.y + Math.sin(branchAngle) * branchLength
                };

                const branchPath = generateLightningPath(branchStart.x, branchStart.y, branchEnd.x, branchEnd.y, 5);
                const branchBolt = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                const branchPathData = `M ${branchPath[0].x} ${branchPath[0].y} ` +
                    branchPath.slice(1).map(point => `L ${point.x} ${point.y}`).join(' ');

                branchBolt.setAttribute('d', branchPathData);
                branchBolt.setAttribute('stroke', '#87ceeb');
                branchBolt.setAttribute('stroke-width', '4'); // Thicker branches
                branchBolt.setAttribute('fill', 'none');
                branchBolt.setAttribute('filter', 'url(#glow)');
                branchBolt.style.opacity = '0.9';

                branches.push(branchBolt);
            }
        }

        svg.appendChild(defs);
        svg.appendChild(mainBolt);
        branches.forEach(branch => svg.appendChild(branch));

        document.body.appendChild(svg); // Append to body instead of container

        // Animate the lightning
        const allBolts = [mainBolt, ...branches];

        allBolts.forEach((bolt, index) => {
            const pathLength = bolt.getTotalLength();
            bolt.style.strokeDasharray = pathLength;
            bolt.style.strokeDashoffset = pathLength;
            bolt.style.opacity = '0';

            // Smooth draw animation
            setTimeout(() => {
                bolt.style.transition = 'stroke-dashoffset 0.08s ease-out, opacity 0.03s ease-in';
                bolt.style.opacity = '1';
                bolt.style.strokeDashoffset = '0';

                // Flicker effect
                setTimeout(() => {
                    bolt.style.transition = 'opacity 0.02s ease-in-out';
                    bolt.style.opacity = '0.2';

                    setTimeout(() => {
                        bolt.style.opacity = '1';

                        setTimeout(() => {
                            bolt.style.opacity = '0.4';

                            setTimeout(() => {
                                bolt.style.opacity = '1';

                                // Fade out
                                setTimeout(() => {
                                    bolt.style.transition = 'opacity 0.4s ease-out';
                                    bolt.style.opacity = '0';
                                }, 250);
                            }, 20);
                        }, 30);
                    }, 15);
                }, 80);
            }, index * 10);
        });

        return { svg, duration: 900 };
    }

    // Create thicker sparks with enhanced animation
    function createSparks(count = 16) {
        const sparks = [];
        const sparkContainer = errorNumber;

        for (let i = 0; i < count; i++) {
            const spark = document.createElement('div');
            spark.className = 'spark';

            // Enhanced thicker spark styling
            spark.style.cssText = `
                position: absolute;
                width: 6px;
                height: 6px;
                background: radial-gradient(circle, #ffffff 0%, #87ceeb 40%, #4169e1 70%, transparent 100%);
                border-radius: 50%;
                box-shadow: 
                    0 0 12px #ffffff, 
                    0 0 24px #87ceeb, 
                    0 0 36px #4169e1,
                    0 0 48px #0000ff;
                opacity: 0;
                pointer-events: none;
                z-index: 25;
            `;

            // Position sparks around the "404" text
            const angle = (360 / count) * i + Math.random() * 20;
            const radius = 70 + Math.random() * 60;
            const x = Math.cos(angle * Math.PI / 180) * radius;
            const y = Math.sin(angle * Math.PI / 180) * radius;

            spark.style.left = `calc(50% + ${x}px)`;
            spark.style.top = `calc(50% + ${y}px)`;
            spark.style.transform = 'translate(-50%, -50%)';

            sparkContainer.appendChild(spark);
            sparks.push(spark);
        }

        return sparks;
    }

    // Animate sparks with more dramatic effect
    function animateSparks(sparks) {
        sparks.forEach((spark, index) => {
            const delay = Math.random() * 80;
            const duration = 1000 + Math.random() * 500;

            setTimeout(() => {
                spark.style.transition = 'opacity 0.05s ease-out, transform 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                spark.style.opacity = '1';

                // Random trajectory with more spread
                const finalX = (Math.random() - 0.5) * 300;
                const finalY = (Math.random() - 0.5) * 300;
                spark.style.transform = `translate(calc(-50% + ${finalX}px), calc(-50% + ${finalY}px)) scale(0.1)`;

                setTimeout(() => {
                    spark.style.transition = 'opacity 0.4s ease-out';
                    spark.style.opacity = '0';
                }, duration);
            }, delay);
        });
    }

    // Enhanced 404 reaction to lightning strike
    function create404Reaction() {
        // Dramatic initial hit effect
        errorNumber.style.transition = 'all 0.02s ease-out';
        errorNumber.style.transform = 'scale(1.15) rotate(2deg)';
        errorNumber.style.color = '#ffffff';
        errorNumber.style.textShadow = `
            0 0 30px #ffffff,
            0 0 60px #87ceeb,
            0 0 90px #4169e1,
            0 0 120px #0000ff,
            0 0 150px #4b0082
        `;
        errorNumber.style.filter = 'brightness(3) saturate(2) contrast(1.5)';

        // Shake effect
        setTimeout(() => {
            errorNumber.style.transform = 'scale(1.12) rotate(-1deg)';
        }, 20);

        setTimeout(() => {
            errorNumber.style.transform = 'scale(1.18) rotate(1.5deg)';
        }, 40);

        setTimeout(() => {
            errorNumber.style.transform = 'scale(1.10) rotate(-0.5deg)';
        }, 60);

        setTimeout(() => {
            errorNumber.style.transform = 'scale(1.14) rotate(0.8deg)';
        }, 80);

        // Flicker effect
        setTimeout(() => {
            errorNumber.style.transition = 'all 0.03s ease-in-out';
            errorNumber.style.filter = 'brightness(1.5) saturate(1.2)';
            errorNumber.style.textShadow = '0 0 40px rgba(135, 206, 235, 0.8)';
        }, 120);

        setTimeout(() => {
            errorNumber.style.filter = 'brightness(2.5) saturate(1.8)';
            errorNumber.style.textShadow = `
                0 0 50px #ffffff,
                0 0 80px #87ceeb,
                0 0 110px #4169e1
            `;
        }, 150);

        setTimeout(() => {
            errorNumber.style.filter = 'brightness(1.8) saturate(1.4)';
        }, 180);

        // Gradual recovery
        setTimeout(() => {
            errorNumber.style.transition = 'all 0.6s ease-out';
            errorNumber.style.transform = 'scale(1) rotate(0deg)';
            errorNumber.style.color = 'white';
            errorNumber.style.textShadow = '0 0 30px rgba(0, 0, 0, 0.8)';
            errorNumber.style.filter = 'none';
        }, 600);
    }

    // Main lightning strike effect
    function triggerLightningStrike() {
        // Create all necessary elements
        const lightningContainer = createLightningContainer();
        const screenFlash = createScreenFlash();
        const thunderRipple = createThunderRipple();

        // Enhanced 404 reaction
        create404Reaction();

        // Create realistic lightning
        const lightning = createRealisticLightning(lightningContainer);

        // Create and animate sparks
        const sparks = createSparks(window.innerWidth <= 700 ? 12 : 20);
        setTimeout(() => {
            animateSparks(sparks);
        }, 80);

        // Enhanced screen flash
        screenFlash.style.transition = 'opacity 0.03s ease-out';
        screenFlash.style.opacity = '1';
        screenFlash.style.background = 'rgba(255, 255, 255, 0.25)';

        setTimeout(() => {
            screenFlash.style.transition = 'all 0.4s ease-out';
            screenFlash.style.opacity = '0';
            screenFlash.style.background = 'rgba(255, 255, 255, 0)';
        }, 30);

        // Enhanced thunder ripple effect
        thunderRipple.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 0;
            height: 0;
            border: 3px solid rgba(255, 255, 255, 0.6);
            border-radius: 50%;
            opacity: 0.9;
            pointer-events: none;
            transition: all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        `;

        setTimeout(() => {
            thunderRipple.style.width = '500px';
            thunderRipple.style.height = '500px';
            thunderRipple.style.opacity = '0';
        }, 10);

        // More dramatic screen shake for desktop
        if (window.innerWidth > 700) {
            document.body.style.transition = 'transform 0.08s ease-out';
            document.body.style.transform = 'translate(3px, 2px)';
            setTimeout(() => {
                document.body.style.transform = 'translate(-2px, -2px)';
                setTimeout(() => {
                    document.body.style.transform = 'translate(1px, -1px)';
                    setTimeout(() => {
                        document.body.style.transform = 'translate(0, 0)';
                    }, 40);
                }, 40);
            }, 40);
        }

        // Enhanced thunder sound effect
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const createThunderSound = () => {
                const duration = 0.3;
                const sampleRate = audioContext.sampleRate;
                const buffer = audioContext.createBuffer(1, duration * sampleRate, sampleRate);
                const data = buffer.getChannelData(0);

                for (let i = 0; i < buffer.length; i++) {
                    data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / buffer.length, 2) * 0.12;
                }

                const source = audioContext.createBufferSource();
                const gainNode = audioContext.createGain();

                source.buffer = buffer;
                gainNode.gain.setValueAtTime(0.08, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);

                source.connect(gainNode);
                gainNode.connect(audioContext.destination);
                source.start();
            };

            setTimeout(createThunderSound, 80);
        } catch (e) {
            console.log('Web Audio API not supported');
        }

        // Cleanup
        setTimeout(() => {
            if (lightning.svg.parentNode) {
                lightning.svg.remove();
            }
            thunderRipple.remove();
            sparks.forEach(spark => {
                if (spark.parentNode) {
                    spark.remove();
                }
            });

            // Reset body
            document.body.style.transition = '';
            document.body.style.transform = '';
        }, 1200);
    }

    // Click event listener
    errorNumber.addEventListener('click', triggerLightningStrike);

    // Enhanced hover effects
    errorNumber.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
        this.style.filter = 'brightness(1.3) drop-shadow(0 0 20px rgba(135, 206, 235, 0.5))';
        this.style.textShadow = '0 0 50px rgba(135, 206, 235, 0.8), 0 0 30px rgba(0, 0, 0, 0.8)';
        this.style.transform = 'scale(1.02)';
    });

    errorNumber.addEventListener('mouseleave', function() {
        this.style.filter = 'none';
        this.style.textShadow = '0 0 30px rgba(0, 0, 0, 0.8)';
        this.style.transform = 'scale(1)';
    });

    // Touch support for mobile
    errorNumber.addEventListener('touchstart', function(e) {
        e.preventDefault();
        triggerLightningStrike();
    });

    // Prevent double-tap zoom
    errorNumber.style.touchAction = 'manipulation';
});
