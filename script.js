// --- NIEVE ---
const canvas = document.getElementById('snow-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function initCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles = [];
    const count = window.innerWidth < 768 ? 60 : 130;
    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 4 + 1,
            v: Math.random() * 1.5 + 0.5,
            o: Math.random()
        });
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
    ctx.beginPath();
    particles.forEach(p => {
        ctx.moveTo(p.x, p.y);
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        p.y += p.v;
        if (p.y > canvas.height) p.y = -10;
    });
    ctx.fill();
    requestAnimationFrame(animate);
}

window.addEventListener('resize', initCanvas);
initCanvas();
animate();

// --- CONTADOR DINÁMICO ---
function updateCountdown() {
    const now = new Date();
    const currentYear = now.getFullYear();
    let targetDate = new Date(`December 25, ${currentYear} 00:00:00`);

    if (now > targetDate) {
        targetDate = new Date(`December 25, ${currentYear + 1} 00:00:00`);
    }

    const diff = targetDate - now;
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('days').innerText = String(d).padStart(2, '0');
    document.getElementById('hours').innerText = String(h).padStart(2, '0');
    document.getElementById('minutes').innerText = String(m).padStart(2, '0');
    document.getElementById('seconds').innerText = String(s).padStart(2, '0');

    const footerYear = document.getElementById('current-year-footer');
    if (footerYear) {
        footerYear.innerText = `Enzo Rivero - Navidad ${targetDate.getFullYear()} 🎅`;
    }
}

setInterval(updateCountdown, 1000);
updateCountdown();

// --- INTERACCIONES ---
function lanzarGranMagia() {
    const duration = 4 * 1000;
    const end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 7,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#ff0000', '#ffffff', '#00ff00']
        });
        confetti({
            particleCount: 7,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#ff0000', '#ffffff', '#00ff00']
        });

        if (Date.now() < end) requestAnimationFrame(frame);
    }());

    mostrarToast("🎄 ¡FELIZ NOCHE PARA TODOS! 🎄");
}

function mostrarToast(texto) {
    const toast = document.getElementById('toast');
    const toastText = document.getElementById('toast-text');

    if (toast && toastText) {
        toastText.innerText = texto;
        toast.style.opacity = '1';
        toast.style.transform = 'translate(-50%, -30px)';

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translate(-50%, 0px)';
        }, 3500);
    }
}