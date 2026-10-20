gsap.registerPlugin(ScrollTrigger);

// 1. Manejo del Loader
const startBtn = document.getElementById('start-btn');
const loader = document.getElementById('loader');

if (startBtn && loader) {
    startBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'instant' });
        gsap.to(loader, {
            opacity: 0,
            duration: 0.8,
            ease: "power2.inOut",
            onComplete: () => {
                loader.style.display = 'none';
                window.scrollTo({ top: 0, behavior: 'instant' });
                gsap.to(".hero .reveal-text", { y: 0, opacity: 1, duration: 1.2, stagger: 0.2, ease: "power3.out" });
            }
        });
    });
}

// 2. Empuje 3D receptivo con el cursor en "EXPLORA EL HORIZONTE"
const loaderTitle = document.querySelector('.loader-title');
if (loaderTitle) {
    window.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        
        const xOffset = (clientX / innerWidth - 0.5) * 2;
        const yOffset = (clientY / innerHeight - 0.5) * 2;

        gsap.to(loaderTitle, {
            rotationY: xOffset * 15,
            rotationX: -yOffset * 15,
            z: -25 * Math.abs(xOffset),
            duration: 0.5,
            ease: "power2.out"
        });
    });
}

// 3. Animaciones de scroll para la página principal
gsap.fromTo(".image-side-wrapper", 
    { x: "35vw", opacity: 0.2 },
    {
        x: "-4vw",
        opacity: 1,
        scrollTrigger: {
            trigger: ".featured-work",
            start: "top 75%",
            end: "top 15%",
            scrub: 1
        }
    }
);

gsap.fromTo(".fade-out-title", 
    { opacity: 1 },
    {
        opacity: 0.15,
        scrollTrigger: {
            trigger: ".featured-work",
            start: "top 35%",
            end: "top -5%",
            scrub: 1
        }
    }
);

// Entrada lateral lenta y suave para el collage de dos fotos
gsap.fromTo(".item-left", 
    { x: "-20vw", opacity: 0 },
    {
        x: "0vw",
        opacity: 1,
        scrollTrigger: {
            trigger: ".billabong-section",
            start: "top 85%",
            end: "top 20%",
            scrub: 2.5
        }
    }
);

gsap.fromTo(".item-right", 
    { x: "20vw", opacity: 0 },
    {
        x: "0vw",
        opacity: 1,
        scrollTrigger: {
            trigger: ".billabong-section",
            start: "top 85%",
            end: "top 20%",
            scrub: 2.5
        }
    }
);

// 4. Fondo Global Azul/Gris unificado
const globalCanvas = document.getElementById('global-bg-canvas');
if (globalCanvas) {
    const gCtx = globalCanvas.getContext('2d');
    globalCanvas.width = window.innerWidth;
    globalCanvas.height = window.innerHeight;

    let time = 0;
    function animateGlobalBg() {
        requestAnimationFrame(animateGlobalBg);
        time += 0.003;
        
        gCtx.clearRect(0, 0, globalCanvas.width, globalCanvas.height);
        
        gCtx.fillStyle = '#0d131f';
        gCtx.fillRect(0, 0, globalCanvas.width, globalCanvas.height);
        
        let x1 = globalCanvas.width * 0.6 + Math.sin(time) * 100;
        let y1 = globalCanvas.height * 0.7 + Math.cos(time * 0.8) * 80;
        let grad1 = gCtx.createRadialGradient(x1, y1, 20, x1, y1, globalCanvas.width * 0.7);
        grad1.addColorStop(0, 'rgba(30, 64, 110, 0.45)');
        grad1.addColorStop(1, 'rgba(13, 19, 31, 0)');
        gCtx.fillStyle = grad1;
        gCtx.fillRect(0, 0, globalCanvas.width, globalCanvas.height);

        let x2 = globalCanvas.width * 0.2 + Math.cos(time * 0.7) * 120;
        let y2 = globalCanvas.height * 0.3 + Math.sin(time * 0.5) * 90;
        let grad2 = gCtx.createRadialGradient(x2, y2, 10, x2, y2, globalCanvas.width * 0.6);
        grad2.addColorStop(0, 'rgba(140, 160, 185, 0.22)');
        grad2.addColorStop(1, 'rgba(13, 19, 31, 0)');
        gCtx.fillStyle = grad2;
        gCtx.fillRect(0, 0, globalCanvas.width, globalCanvas.height);
    }
    animateGlobalBg();

    window.addEventListener('resize', () => {
        globalCanvas.width = window.innerWidth;
        globalCanvas.height = window.innerHeight;
    });
}