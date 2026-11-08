/**
 * =========================================================================
 * ROMANTIC PARTICLE & CONFETTI ENGINE
 * =========================================================================
 * Provides:
 * 1. Background floating rose petals and soft glowing hearts
 * 2. High-performance canvas rendering with smooth physics
 * 3. Confetti cannon burst for envelope opening and celebration moments
 * 4. Interactive click/tap heart ripples
 */

class RomanticParticlesEngine {
  constructor() {
    this.canvas = document.getElementById("ambient-particles-canvas");
    this.ctx = this.canvas ? this.canvas.getContext("2d") : null;
    this.particles = [];
    this.confettiList = [];
    this.isRunning = false;
    this.prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    this.palette = [
      "#F5C8D8", // Blush Pink
      "#EAA9BF", // Rose Pink
      "#FFF9F7", // Soft Cream
      "#C58A91", // Rose Gold
      "#E88BA6", // Warm Rose
      "#D97D99"  // Romantic Plum
    ];

    if (this.canvas) {
      this.init();
    }
  }

  init() {
    this.resize();
    window.addEventListener("resize", () => this.resize(), { passive: true });

    // Populate initial ambient particles (hearts and rose petals)
    if (!this.prefersReducedMotion) {
      const count = window.innerWidth < 768 ? 24 : 45;
      for (let i = 0; i < count; i++) {
        this.particles.push(this.createParticle(true));
      }
      this.start();
    }

    // Interactive tap/click heart ripple
    window.addEventListener("pointerdown", (e) => {
      // Don't spawn on controls/inputs to avoid distraction
      if (e.target.closest("button, input, textarea, a, select")) return;
      this.spawnTapHeart(e.clientX, e.clientY);
    }, { passive: true });
  }

  resize() {
    if (!this.canvas) return;
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
  }

  createParticle(randomY = false) {
    const isPetal = Math.random() > 0.45;
    return {
      type: isPetal ? "petal" : "heart",
      x: Math.random() * this.width,
      y: randomY ? Math.random() * this.height : -30,
      size: isPetal ? 10 + Math.random() * 12 : 9 + Math.random() * 10,
      speedY: 0.4 + Math.random() * 0.8,
      speedX: (Math.random() - 0.5) * 0.7,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.025,
      oscillationSpeed: 0.015 + Math.random() * 0.02,
      oscillationDistance: 0.5 + Math.random() * 1.2,
      oscillationAngle: Math.random() * Math.PI * 2,
      opacity: 0.25 + Math.random() * 0.45,
      color: this.palette[Math.floor(Math.random() * this.palette.length)]
    };
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    const loop = () => {
      if (!this.isRunning) return;
      this.update();
      this.draw();
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  stop() {
    this.isRunning = false;
  }

  update() {
    // Ambient petals & hearts
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      p.oscillationAngle += p.oscillationSpeed;
      p.x += p.speedX + Math.sin(p.oscillationAngle) * p.oscillationDistance;
      p.y += p.speedY;
      p.rotation += p.rotationSpeed;

      // Wrap around or recreate
      if (p.y > this.height + 40 || p.x < -40 || p.x > this.width + 40) {
        this.particles[i] = this.createParticle(false);
      }
    }

    // Confetti particles
    for (let i = this.confettiList.length - 1; i >= 0; i--) {
      const c = this.confettiList[i];
      c.x += c.vx;
      c.y += c.vy;
      c.vy += c.gravity;
      c.rotation += c.vRot;
      c.opacity -= c.decay;

      if (c.opacity <= 0 || c.y > this.height + 50) {
        this.confettiList.splice(i, 1);
      }
    }
  }

  draw() {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Draw ambient particles
    for (const p of this.particles) {
      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate(p.rotation);
      this.ctx.globalAlpha = p.opacity;

      if (p.type === "petal") {
        this.drawPetal(p.size, p.color);
      } else {
        this.drawHeart(p.size, p.color);
      }
      this.ctx.restore();
    }

    // Draw confetti particles
    for (const c of this.confettiList) {
      this.ctx.save();
      this.ctx.translate(c.x, c.y);
      this.ctx.rotate(c.rotation);
      this.ctx.globalAlpha = Math.max(0, c.opacity);

      if (c.shape === "heart") {
        this.drawHeart(c.size, c.color);
      } else {
        this.drawConfettiRibbon(c.size, c.color);
      }
      this.ctx.restore();
    }
  }

  drawPetal(size, color) {
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.moveTo(0, -size);
    this.ctx.bezierCurveTo(size * 0.75, -size * 0.5, size * 0.8, size * 0.6, 0, size);
    this.ctx.bezierCurveTo(-size * 0.8, size * 0.6, -size * 0.75, -size * 0.5, 0, -size);
    this.ctx.fill();
  }

  drawHeart(size, color) {
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    const topCurveHeight = size * 0.35;
    this.ctx.moveTo(0, topCurveHeight);
    // Left half
    this.ctx.bezierCurveTo(
      0, 0,
      -size / 2, -size / 2,
      -size / 2, topCurveHeight
    );
    this.ctx.bezierCurveTo(
      -size / 2, (size + topCurveHeight) / 2,
      0, (size + topCurveHeight) / 1.4,
      0, size
    );
    // Right half
    this.ctx.bezierCurveTo(
      0, (size + topCurveHeight) / 1.4,
      size / 2, (size + topCurveHeight) / 2,
      size / 2, topCurveHeight
    );
    this.ctx.bezierCurveTo(
      size / 2, -size / 2,
      0, 0,
      0, topCurveHeight
    );
    this.ctx.fill();
  }

  drawConfettiRibbon(size, color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(-size / 2, -size / 4, size, size / 2);
  }

  // Burst confetti at an origin (e.g., when envelope opens)
  burst(x, y, count = 65) {
    if (this.prefersReducedMotion) return;
    const colors = ["#EAA9BF", "#F5C8D8", "#C58A91", "#FFD1DC", "#FFF9F7", "#D4A373", "#E88BA6"];
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.8;
      const speed = 4 + Math.random() * 8.5;
      this.confettiList.push({
        shape: Math.random() > 0.4 ? "heart" : "ribbon",
        x: x || this.width / 2,
        y: y || this.height / 2,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 3.5, // Initial upward pop
        gravity: 0.18 + Math.random() * 0.12,
        size: 7 + Math.random() * 11,
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.25,
        opacity: 1,
        decay: 0.008 + Math.random() * 0.012,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
  }

  spawnTapHeart(x, y) {
    const el = document.createElement("div");
    el.className = "tap-floating-heart";
    el.innerHTML = "♡";
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    const randomRot = (Math.random() - 0.5) * 45;
    el.style.setProperty("--rot", `${randomRot}deg`);
    document.body.appendChild(el);

    setTimeout(() => {
      el.remove();
    }, 1100);
  }
}

// Instantiate particle engine after DOM load
window.addEventListener("DOMContentLoaded", () => {
  window.RomanticParticles = new RomanticParticlesEngine();
});

