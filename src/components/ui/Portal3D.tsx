'use client';

import { useEffect, useRef } from 'react';

export function Portal3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0, height = 0, centerX = 0, centerY = 0;
    let particles: Particle[] = [];
    let fireParticles: FireParticle[] = [];
    let time = 0;
    let animationFrameId: number;
    
    const particleCount = 800;
    const fireParticleCount = 600; // Adding magical fire effects

    function resize() {
      // Get parent container dimensions, allowing overflow for larger glow
      const parent = canvas?.parentElement;
      if (parent) {
        // Use a fixed virtual resolution for the logic, scaled to fit
        width = canvas.width = 800;
        height = canvas.height = 800;
        centerX = width / 2;
        centerY = height / 2;
      }
    }

    window.addEventListener('resize', resize);
    resize();

    class Particle {
      distance: number = 0;
      angle: number = 0;
      baseSpeed: number = 0;
      expansionRate: number = 0;
      size: number = 0;
      maxDistance: number = 0;
      life: number = 0;
      r: number = 0;
      g: number = 0;
      b: number = 0;

      constructor() {
        this.reset();
      }

      reset() {
        this.distance = Math.random() * 20; 
        this.angle = Math.random() * Math.PI * 2; 
        this.baseSpeed = 0.02 + Math.random() * 0.03;
        this.expansionRate = 0.3 + Math.random() * 1.5;
        this.size = Math.random() * 1.5 + 0.5;
        this.maxDistance = 320 + Math.random() * 80;
        this.life = 1;
        
        const colorMix = Math.random();
        if (colorMix > 0.8) {
            this.r = 255; this.g = 255; this.b = 255; // White highlights
        } else if (colorMix > 0.4) {
            this.r = 150; this.g = 230; this.b = 255; // Bright Cyan
        } else {
            this.r = 60; this.g = 150; this.b = 255; // Deep Blue
        }
      }

      update() {
        this.distance += this.expansionRate;
        const speedMulti = Math.max(0.2, 1 - (this.distance / this.maxDistance));
        this.angle += this.baseSpeed * speedMulti;
        this.size += 0.01;
        this.life = 1 - (this.distance / this.maxDistance);
        if (this.distance >= this.maxDistance) {
            this.reset();
        }
      }

      draw() {
        if (!ctx) return;
        const x = centerX + Math.cos(this.angle) * this.distance;
        const y = centerY + Math.sin(this.angle) * this.distance;
        
        ctx.beginPath();
        ctx.arc(x, y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.r}, ${this.g}, ${this.b}, ${Math.max(0, this.life)})`;
        ctx.fill();
      }
    }

    // New class for "fire effects" requested
    class FireParticle {
      x: number = 0;
      y: number = 0;
      vx: number = 0;
      vy: number = 0;
      life: number = 0;
      maxLife: number = 0;
      size: number = 0;
      colorMix: number = 0;

      constructor() {
        this.reset();
      }

      reset() {
        // Spawn randomly around the swirling ring area
        const spawnRadius = 150 + Math.random() * 180;
        const spawnAngle = Math.random() * Math.PI * 2;
        
        this.x = centerX + Math.cos(spawnAngle) * spawnRadius;
        this.y = centerY + Math.sin(spawnAngle) * spawnRadius;
        
        // Flames rise upwards and slightly drift based on the swirl
        // Add tangential velocity from the swirl + upward lift
        const tangentX = -Math.sin(spawnAngle) * 2;
        const tangentY = Math.cos(spawnAngle) * 2;
        
        this.vx = tangentX * 0.5 + (Math.random() - 0.5) * 2;
        this.vy = tangentY * 0.5 - Math.random() * 3 - 1; // Strong upward pull
        
        this.size = Math.random() * 4 + 2;
        this.maxLife = 40 + Math.random() * 60;
        this.life = this.maxLife;
        this.colorMix = Math.random();
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        
        // Fire fades and shrinks as it burns out
        this.life--;
        this.size *= 0.95;
        
        if (this.life <= 0 || this.size < 0.1) {
          this.reset();
        }
      }

      draw() {
        if (!ctx) return;
        const progress = Math.max(0, this.life / this.maxLife);
        
        // Fire colors (blue/cyan magical fire)
        let r, g, b;
        if (this.colorMix > 0.7) {
            r = 100; g = 255; b = 255; // Hot cyan core
        } else if (this.colorMix > 0.3) {
            r = 0; g = 180; b = 255; // Blue flame body
        } else {
            r = 0; g = 50; b = 255; // Dark blue/purple smoke
        }

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        // Exponential fade for realistic flame dissipation
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${Math.pow(progress, 1.5)})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
      for(let j=0; j < Math.random() * 200; j++) {
        particles[i].update();
      }
    }

    for (let i = 0; i < fireParticleCount; i++) {
      fireParticles.push(new FireParticle());
      for(let j=0; j < Math.random() * 100; j++) {
        fireParticles[i].update();
      }
    }

    function drawCoreGlow() {
      if (!ctx) return;
      const coreRadius = 260;
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, coreRadius);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.9)'); 
      gradient.addColorStop(0.5, 'rgba(200, 240, 255, 0.8)');
      gradient.addColorStop(0.8, 'rgba(100, 180, 255, 0.3)');
      gradient.addColorStop(1, 'rgba(100, 180, 255, 0)');

      ctx.beginPath();
      ctx.arc(centerX, centerY, coreRadius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    }

    function drawSpiralArms() {
      if (!ctx) return;
      const numArms = 12; 
      const maxSteps = 60; 
      const maxRadius = 380; 
      
      ctx.lineCap = 'round';
      
      for (let i = 0; i < numArms; i++) {
          const baseAngle = (Math.PI * 2 / numArms) * i - time * 1.5; 
          
          for (let j = 0; j < maxSteps; j++) {
              const progress1 = j / maxSteps;
              const progress2 = (j + 1) / maxSteps;
              
              const theta1 = j * 0.2;
              const theta2 = (j + 1) * 0.2;
              
              const rOffset1 = Math.sin(theta1 * 4 - time * 4) * 8;
              const rOffset2 = Math.sin(theta2 * 4 - time * 4) * 8;
              
              const r1 = Math.pow(progress1, 1.2) * maxRadius + rOffset1;
              const r2 = Math.pow(progress2, 1.2) * maxRadius + rOffset2;
              
              const a1 = baseAngle + theta1;
              const a2 = baseAngle + theta2;
              
              const x1 = centerX + Math.cos(a1) * r1;
              const y1 = centerY + Math.sin(a1) * r1;
              const x2 = centerX + Math.cos(a2) * r2;
              const y2 = centerY + Math.sin(a2) * r2;
              
              const alpha = Math.max(0, (1 - progress1) * 0.35); 
              
              ctx.beginPath();
              ctx.moveTo(x1, y1);
              ctx.lineTo(x2, y2);
              
              const widthScale = 1 - progress1 + 0.5;
              
              ctx.strokeStyle = `rgba(30, 120, 255, ${alpha * 0.6})`;
              ctx.lineWidth = 40 * widthScale;
              ctx.stroke();

              ctx.strokeStyle = `rgba(100, 220, 255, ${alpha * 0.8})`;
              ctx.lineWidth = 15 * widthScale;
              ctx.stroke();

              ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
              ctx.lineWidth = 3 * widthScale;
              ctx.stroke();
          }
      }
    }

    function animate() {
      time += 0.015; 
      
      if (!ctx) return;
      
      ctx.globalCompositeOperation = 'source-over';
      ctx.clearRect(0, 0, width, height);
      
      ctx.globalCompositeOperation = 'lighter';

      drawSpiralArms();
      drawCoreGlow();

      particles.forEach(p => {
          p.update();
          p.draw();
      });

      // Draw the new magical fire effects on top
      fireParticles.forEach(p => {
          p.update();
          p.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ mixBlendMode: 'screen' }}>
      <canvas 
        ref={canvasRef} 
        style={{ width: '250%', height: '250%', maxWidth: '800px', maxHeight: '800px' }}
        className="pointer-events-none"
      />
    </div>
  );
}
