gsap.registerPlugin(ScrollTrigger);

// 1. Entrada / Loader
const startBtn = document.getElementById('start-btn');
const loader = document.getElementById('loader');

startBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    gsap.to(loader, {
        opacity: 0,
        duration: 1,
        ease: "power2.inOut",
        onComplete: () => {
            loader.style.display = 'none';
            window.scrollTo({ top: 0, behavior: 'instant' });
            gsap.to(".hero .reveal-text", { y: 0, opacity: 1, duration: 1.2, stagger: 0.2, ease: "power3.out" });
        }
    });
});

// 2. Revelado de textos normales
const scrollTexts = document.querySelectorAll('.about .reveal-text, .contact .reveal-text');
scrollTexts.forEach(text => {
    gsap.to(text, {
        scrollTrigger: { trigger: text, start: "top 85%", toggleActions: "play none none reverse" },
        y: 0, opacity: 1, duration: 1, ease: "power3.out"
    });
});

// 3. IMAGEN FLOTANTE Y TRANSPARENCIA DEL TEXTO (Efecto Signaturit)
// La tarjeta se desplaza de derecha a izquierda montándose sobre el texto
gsap.fromTo(".image-side-wrapper", 
    { x: "30vw", opacity: 0.3 },
    {
        x: "-8vw", // Se superpone ligeramente hacia la columna izquierda
        opacity: 1,
        scrollTrigger: {
            trigger: ".featured-work",
            start: "top 70%",
            end: "top 20%",
            scrub: 1
        }
    }
);

// Conforme la tarjeta entra sobre el texto, el texto pierde opacidad hasta hacerse casi transparente
gsap.to(".fade-out-text", {
    opacity: 0.1,
    scrollTrigger: {
        trigger: ".featured-work",
        start: "top 50%",
        end: "top 10%",
        scrub: 1
    }
});

// 4. CANVAS DE FONDO GLOBAL (GRIS/AZUL ESTILO DESIGNELY EN TODA LA PÁGINA)
const globalCanvas = document.getElementById('global-bg-canvas');
const gCtx = globalCanvas.getContext('2d');
globalCanvas.width = window.innerWidth;
globalCanvas.height = window.innerHeight;

let time = 0;
function animateGlobalBg() {
    requestAnimationFrame(animateGlobalBg);
    time += 0.005;
    
    gCtx.clearRect(0, 0, globalCanvas.width, globalCanvas.height);
    
    // Fondo base oscuro
    gCtx.fillStyle = '#090d16';
    gCtx.fillRect(0, 0, globalCanvas.width, globalCanvas.height);
    
    // Orbe 1: Gris azulado suave
    let x1 = globalCanvas.width * 0.3 + Math.sin(time) * 150;
    let y1 = globalCanvas.height * 0.4 + Math.cos(time * 0.8) * 100;
    let grad1 = gCtx.createRadialGradient(x1, y1, 10, x1, y1, 600);
    grad1.addColorStop(0, 'rgba(58, 134, 255, 0.18)');
    grad1.addColorStop(1, 'rgba(9, 13, 22, 0)');
    gCtx.fillStyle = grad1;
    gCtx.fillRect(0, 0, globalCanvas.width, globalCanvas.height);
    
    // Orbe 2: Tono grisáceo elegante en movimiento
    let x2 = globalCanvas.width * 0.7 + Math.cos(time * 0.7) * 200;
    let y2 = globalCanvas.height * 0.6 + Math.sin(time * 0.9) * 150;
    let grad2 = gCtx.createRadialGradient(x2, y2, 10, x2, y2, 700);
    grad2.addColorStop(0, 'rgba(148, 163, 184, 0.12)');
    grad2.addColorStop(1, 'rgba(9, 13, 22, 0)');
    gCtx.fillStyle = grad2;
    gCtx.fillRect(0, 0, globalCanvas.width, globalCanvas.height);
}
animateGlobalBg();

// 5. CANVAS INFERIOR: PUNTOS SUTILES (BLANCO, ROSA, AZUL ESTILO SIGNATURIT)
const dotsCanvas = document.getElementById('footer-dots-canvas');
const dCtx = dotsCanvas.getContext('2d');
dotsCanvas.width = window.innerWidth;
dotsCanvas.height = 250;

const dots = [];
const numDots = 60;

for (let i = 0; i < numDots; i++) {
    dots.push({
        x: Math.random() * dotsCanvas.width,
        y: Math.random() * dotsCanvas.height,
        radius: Math.random() * 2 + 1,
        color: ['rgba(255, 255, 255, 0.3)', 'rgba(255, 0, 127, 0.3)', 'rgba(58, 134, 255, 0.3)'][Math.floor(Math.random() * 3)],
        baseY: Math.random() * dotsCanvas.height,
        speed: Math.random() * 0.02 + 0.01,
        offset: Math.random() * Math.PI * 2
    });
}

function animateFooterDots() {
    requestAnimationFrame(animateFooterDots);
    dCtx.clearRect(0, 0, dotsCanvas.width, dotsCanvas.height);
    
    dots.forEach(dot => {
        dot.offset += dot.speed;
        dot.y = dot.baseY + Math.sin(dot.offset) * 12; // Movimiento sutil vertical
        
        dCtx.beginPath();
        dCtx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        dCtx.fillStyle = dot.color;
        dCtx.fill();
    });
}
animateFooterDots();

window.addEventListener('resize', () => {
    globalCanvas.width = window.innerWidth;
    globalCanvas.height = window.innerHeight;
    dotsCanvas.width = window.innerWidth;
});