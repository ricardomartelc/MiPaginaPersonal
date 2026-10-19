const dragonCanvas = document.getElementById('dragon-canvas');
if (dragonCanvas) {
    const dCtx = dragonCanvas.getContext('2d');
    dragonCanvas.width = window.innerWidth;
    dragonCanvas.height = window.innerHeight;

    let dragonX = -300;
    let angle = 0;

    // Carga de imagen opcional si me pasas el dragon.svg o dragon.png
    const dragonImg = new Image();
    dragonImg.src = 'dragon.png'; // Ruta a la imagen si la añades
    let hasCustomImage = false;

    dragonImg.onload = () => {
        hasCustomImage = true;
    };

    function animateDragon() {
        requestAnimationFrame(animateDragon);
        dCtx.clearRect(0, 0, dragonCanvas.width, dragonCanvas.height);
        
        // Avance de izquierda a derecha
        dragonX += 2.0;
        angle += 0.02;

        // FRANJA RESTRINGIDA: Vuela fijado solo en la franja central (45% de la altura de la pantalla)
        const stripeY = dragonCanvas.height * 0.45 + Math.sin(angle) * 25;
        
        if (dragonX > dragonCanvas.width + 300) {
            dragonX = -300;
        }

        dCtx.save();
        dCtx.translate(dragonX, stripeY);

        if (hasCustomImage) {
            // Si colocas una foto o SVG en tu carpeta, la pinta aquí flotando por la franja
            dCtx.drawImage(dragonImg, -100, -50, 200, 100);
        } else {
            // Renderizado vectorial fluido de alta calidad tipo malla Designely
            dCtx.rotate(Math.sin(angle) * 0.1);
            
            // Alas / Malla en movimiento
            dCtx.beginPath();
            dCtx.moveTo(-60, 0);
            dCtx.quadraticCurveTo(-10, -40 + Math.sin(angle * 2) * 20, 40, 0);
            dCtx.quadraticCurveTo(-10, 40 - Math.sin(angle * 2) * 20, -60, 0);
            dCtx.fillStyle = 'rgba(76, 201, 240, 0.35)';
            dCtx.fill();

            // Estela de partículas en la franja
            for (let i = 0; i < 20; i++) {
                let px = -i * 12 + Math.sin(angle + i * 0.3) * 6;
                let py = Math.cos(angle + i * 0.3) * 8;
                let size = (20 - i) * 0.6;
                
                dCtx.beginPath();
                dCtx.arc(px, py, size, 0, Math.PI * 2);
                dCtx.fillStyle = `rgba(140, 180, 230, ${0.4 - i * 0.018})`;
                dCtx.fill();
            }
        }

        dCtx.restore();
    }
    animateDragon();

    window.addEventListener('resize', () => {
        dragonCanvas.width = window.innerWidth;
        dragonCanvas.height = window.innerHeight;
    });
}