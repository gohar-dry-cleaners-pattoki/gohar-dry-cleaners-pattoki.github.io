// ============================================
// ===== PARTICLE BACKGROUND =====
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    
    let particles = [];
    let mouse = { x: null, y: null };
    let width, height;
    
    function init() {
        width = canvas.parentElement.offsetWidth;
        height = canvas.parentElement.offsetHeight;
        canvas.width = width;
        canvas.height = height;
        
        particles = [];
        const particleCount = Math.floor((width * height) / 15000);
        
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 2 + 0.5,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                color: `rgba(30, 58, 138, ${Math.random() * 0.3 + 0.1})`
            });
        }
    }
    
    function drawParticles() {
        ctx.clearRect(0, 0, width, height);
        
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
            
            p.x += p.speedX;
            p.y += p.speedY;
            
            if (p.x < 0 || p.x > width) p.speedX *= -1;
            if (p.y < 0 || p.y > height) p.speedY *= -1;
        });
        
        // Draw connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 120) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(30, 58, 138, ${0.1 * (1 - distance / 120)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(drawParticles);
    }
    
    // Mouse tracking for interactive particles
    canvas.addEventListener('mousemove', function(e) {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
        
        particles.forEach(p => {
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const angle = Math.atan2(dy, dx);
                const force = (100 - distance) / 100 * 0.5;
                p.x += Math.cos(angle) * force;
                p.y += Math.sin(angle) * force;
            }
        });
    });
    
    canvas.addEventListener('mouseleave', function() {
        mouse.x = null;
        mouse.y = null;
    });
    
    window.addEventListener('resize', init);
    
    init();
    drawParticles();
});