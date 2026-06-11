// Sidebar
function openNav() {
    document.getElementById("mySidebar").style.width = "260px";
}
function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
}

// Biscotto della Fortuna
const massime = [
    "Un amaro ripaga mille dolcezze, ma un buon Ramen ne ripaga diecimila.",
    "Colui che ordina Dumpling Uncommon non camminerà mai a pancia vuota.",
    "Grandi cose ti aspettano, specialmente se ordini pure il dolce.",
    "Il saggio dice: chi mangia di martedì da Uncommon, trova chiuso.",
    "Se la strada è in salita, è perché stai andando verso il bancone del Ramen."
];

function spezzaBiscotto() {
    const display = document.getElementById("frase-fortuna");
    const fraseCasuale = massime[Math.floor(Math.random() * massime.length)];
    display.style.opacity = 0;
    setTimeout(() => {
        display.innerHTML = "🥠 « " + fraseCasuale + " »";
        display.style.opacity = 1;
    }, 200);
}

// Scroll reveal
document.addEventListener("DOMContentLoaded", () => {
    const reveals = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    reveals.forEach(el => observer.observe(el));
});

// Three.js: drifting steam / lantern particles in hero
window.addEventListener("load", () => {
    const canvas = document.getElementById("hero-canvas");
    if (!canvas || typeof THREE === "undefined") return;

    const hero = document.querySelector(".hero");
    let width = hero.clientWidth;
    let height = hero.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 60;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // particle texture: soft glowing dot
    const canvasTex = document.createElement("canvas");
    canvasTex.width = 64;
    canvasTex.height = 64;
    const ctx = canvasTex.getContext("2d");
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, "rgba(212,166,86,0.9)");
    grad.addColorStop(0.4, "rgba(212,166,86,0.35)");
    grad.addColorStop(1, "rgba(212,166,86,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);
    const sprite = new THREE.CanvasTexture(canvasTex);

    const PARTICLE_COUNT = 180;
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const speeds = new Float32Array(PARTICLE_COUNT);
    const drifts = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 140;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 80;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 60;
        speeds[i] = 0.04 + Math.random() * 0.08;
        drifts[i] = Math.random() * Math.PI * 2;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
        size: 2.4,
        map: sprite,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    let frame = 0;
    function animate() {
        frame += 1;
        const pos = geometry.attributes.position.array;
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            pos[i * 3 + 1] += speeds[i];
            pos[i * 3] += Math.sin(frame * 0.01 + drifts[i]) * 0.02;
            if (pos[i * 3 + 1] > 45) {
                pos[i * 3 + 1] = -45;
                pos[i * 3] = (Math.random() - 0.5) * 140;
            }
        }
        geometry.attributes.position.needsUpdate = true;
        points.rotation.y += 0.0006;
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }
    animate();

    window.addEventListener("resize", () => {
        width = hero.clientWidth;
        height = hero.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    });
});
