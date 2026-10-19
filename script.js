// Registrar el plugin
gsap.registerPlugin(ScrollTrigger);

// 1. Lógica del botón de entrada
const startBtn = document.getElementById('start-btn');
const loader = document.getElementById('loader');

startBtn.addEventListener('click', () => {
    gsap.to(loader, {
        opacity: 0,
        duration: 1,
        onComplete: () => {
            loader.style.display = 'none';
            // Animación de los textos iniciales
            gsap.to(".hero .reveal-text", {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out"
            });
        }
    });
});

// 2. Animación de los textos al hacer scroll
const scrollTexts = document.querySelectorAll('.about .reveal-text, .contact .reveal-text');
scrollTexts.forEach(text => {
    gsap.to(text, {
        scrollTrigger: {
            trigger: text,
            start: "top 85%",
            toggleActions: "play none none reverse"
        },
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out"
    });
});

// 3. Efecto Pin (La imagen que se queda fija)
if(document.querySelector(".pinned-image img")) {
    gsap.to(".pinned-image img", {
        scrollTrigger: {
            trigger: ".featured-work",
            start: "top top",
            end: "+=100%",
            pin: true,
            scrub: 1,
        },
        scale: 1.3,
        ease: "none"
    });
    
    gsap.to(".featured-work h2", {
        scrollTrigger: {
            trigger: ".featured-work",
            start: "top top",
            end: "+=100%",
            scrub: 1,
        },
        scale: 1.5,
        opacity: 1,
        ease: "none"
    });
}

// 4. Cursor personalizado
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');
const links = document.querySelectorAll('a, button');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;
    
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

links.forEach(link => {
    link.addEventListener('mouseenter', () => cursorOutline.classList.add('hover'));
    link.addEventListener('mouseleave', () => cursorOutline.classList.remove('hover'));
});

// 5. Fondo de estrellas
const canvas = document.getElementById('stars-canvas');
const ctx = canvas.getContext('2d');
let particlesArray;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles(); 
});

class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x; this.y = y; this.directionX = directionX; this.directionY = directionY; this.size = size; this.color = color;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    update() {
        if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
        if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;
        this.x += this.directionX; this.y += this.directionY; this.draw();
    }
}

function initParticles() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 15000; 
    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 0.4) - 0.2;
        let directionY = (Math.random() * 0.4) - 0.2;
        let color = Math.random() > 0.5 ? 'rgba(244, 233, 211, 0.3)' : 'rgba(46, 196, 182, 0.4)';
        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

function connectParticles() {
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
            if (distance < (canvas.width / 10) * (canvas.height / 10)) {
                let opacityValue = 1 - (distance / 20000);
                ctx.strokeStyle = `rgba(46, 196, 182, ${opacityValue * 0.2})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    connectParticles();
}

initParticles();
animate();