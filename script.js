/* GALLERY */
let images = [
    "images/img1.jpg",
    "images/img2.jpg",
    "images/img3.jpg",
    "images/img4.jpg",
    "images/img5.jpg",
    "images/img6.jpg"
];

let index = 0;

function nextImage() {
    index = (index + 1) % images.length;
    document.getElementById("galleryImage").src = images[index];
}

function prevImage() {
    index = (index - 1 + images.length) % images.length;
    document.getElementById("galleryImage").src = images[index];
}

/* MUSIC */
let music = document.getElementById("bgMusic");
let button = document.getElementById("musicBtn");

function toggleMusic() {
    if (music.paused) {
        music.play();
        button.textContent = "♫";
    } else {
        music.pause();
        button.textContent = "🔇";
    }
}

/* CONFETTI */
function confettiBurst() {
    const canvas = document.getElementById("confettiCanvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let pieces = [];
    for (let i = 0; i < 120; i++) {
        pieces.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            size: 5 + Math.random() * 5,
            speed: 2 + Math.random() * 3,
            color: `hsl(${Math.random() * 360}, 70%, 60%)`
        });
    }

    function update() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        pieces.forEach(p => {
            ctx.fillStyle = p.color;
            ctx.fillRect(p.x, p.y, p.size, p.size);
            p.y += p.speed;
        });
        requestAnimationFrame(update);
    }

    update();
    setTimeout(() => { canvas.style.display = "none"; }, 1200);
}

/* INTRO → MAIN TRANSITION */
window.onload = () => {
    const intro = document.getElementById("introScreen");
    const cake = document.querySelector(".intro-cake");
    const blowBtn = document.getElementById("blowBtn");
    const introMusic = document.getElementById("introMusic");
    const mainMusic = document.getElementById("bgMusic");

    blowBtn.addEventListener("click", () => {

        // Dim candles
        cake.style.animation = "none";
        cake.style.filter = "brightness(0.4)";

        // Stop intro music
        introMusic.pause();
        introMusic.currentTime = 0;

        // Confetti
        confettiBurst();

        // Fade intro away
        intro.style.opacity = "0";

        setTimeout(() => {
            intro.style.display = "none";
            mainMusic.play().catch(() => {});
        }, 1200);
    });
};

