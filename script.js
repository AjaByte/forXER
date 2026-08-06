const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const question = document.getElementById('question');
const catImg = document.getElementById('cat-img');

let yesClickCount = 0;
let noClickCount = 0;
const clicksNeeded = 5;
const yesInitialRect = yesBtn.getBoundingClientRect();
let yesInitialWidth = yesInitialRect.width;
let yesInitialHeight = yesInitialRect.height;
const yesInitialFontSize = parseFloat(window.getComputedStyle(yesBtn).fontSize) || 16;
const yesInitialBorderRadius = window.getComputedStyle(yesBtn).borderRadius || '50px';

// Mga mensahe kapag sinusubukang i-click ang "No" o habang lumalaki ang Yes button
const messages = [
    "Are you sure?",
    "Pookie please...",
    "Just think about it!",
    "I will be very very very sad...",
    "Knew you would say yes!"
];

let msgIndex = 0;

// The "No" button will move only when clicked (no hover-evade)
noBtn.addEventListener('click', moveNoButton);

const noButtonPositions = ['right', 'top', 'left', 'bottom'];

function setNoButtonPosition(position) {
    const btnArea = document.querySelector('.buttons');
    if (!btnArea || !yesBtn || !noBtn) return;

    const areaRect = btnArea.getBoundingClientRect();
    const yesRect = yesBtn.getBoundingClientRect();
    const yesOffsetLeft = yesRect.left - areaRect.left;
    const yesOffsetTop = yesRect.top - areaRect.top;
    const gap = 10;

    let left = yesOffsetLeft + yesRect.width + gap;
    let top = yesOffsetTop;

    if (position === 'top') {
        left = yesOffsetLeft + yesRect.width / 2 - noBtn.offsetWidth / 2;
        top = yesOffsetTop - noBtn.offsetHeight - gap;
    } else if (position === 'left') {
        left = yesOffsetLeft - noBtn.offsetWidth - gap;
        top = yesOffsetTop;
    } else if (position === 'bottom') {
        left = yesOffsetLeft + yesRect.width / 2 - noBtn.offsetWidth / 2;
        top = yesOffsetTop + yesRect.height + gap;
    }

    noBtn.style.left = `${left}px`;
    noBtn.style.top = `${top}px`;
}

function alignNoToYes() {
    setNoButtonPosition('right');
}

// align on load and on resize; call after transforms too
window.addEventListener('resize', alignNoToYes);
// ensure alignment now (script is at end of body)
alignNoToYes();

function moveNoButton() {
    // Position NO in one of four locations relative to YES for the first four clicks
    if (noClickCount < 4) {
        const position = noButtonPositions[noClickCount];
        setNoButtonPosition(position);
    } else {
        alignNoToYes();
    }

    // Palitan ang text ng tanong o magpakita ng guilt-trip messages
    if (msgIndex < messages.length - 1) {
        question.textContent = messages[msgIndex];
        msgIndex++;
    }

    // Increase Yes size progressively each time No is clicked; after 5 clicks it fills the viewport
    noClickCount++;
    if (noClickCount < clicksNeeded) {
        const progress = noClickCount / clicksNeeded;
        const targetWidth = window.innerWidth;
        const targetHeight = window.innerHeight;

        const width = yesInitialWidth + (targetWidth - yesInitialWidth) * progress;
        const height = yesInitialHeight + (targetHeight - yesInitialHeight) * progress;
        const fontSize = yesInitialFontSize + (Math.max(window.innerWidth, window.innerHeight) / 10 - yesInitialFontSize) * progress;

        yesBtn.style.width = `${width}px`;
        yesBtn.style.height = `${height}px`;
        yesBtn.style.fontSize = `${fontSize}px`;

        // keep No positioned until the final transformation
        const position = noButtonPositions[Math.min(noClickCount, 3)];
        setNoButtonPosition(position);
    } else {
        // Final: expand Yes to cover the entire viewport
        yesBtn.style.position = 'fixed';
        yesBtn.style.left = '0';
        yesBtn.style.top = '0';
        yesBtn.style.width = '100vw';
        yesBtn.style.height = '100vh';
        yesBtn.style.borderRadius = '0';
        yesBtn.style.fontSize = `${Math.max(window.innerWidth, window.innerHeight) / 6}px`;
        yesBtn.style.zIndex = '9999';

        // hide other UI that shouldn't be visible
        noBtn.style.display = 'none';
        question.style.display = 'none';
        catImg.style.display = 'none';
    }
}

function resetYesButton() {
    yesBtn.style.position = '';
    yesBtn.style.left = '';
    yesBtn.style.top = '';
    yesBtn.style.width = `${yesInitialWidth}px`;
    yesBtn.style.height = `${yesInitialHeight}px`;
    yesBtn.style.fontSize = `${yesInitialFontSize}px`;
    yesBtn.style.borderRadius = yesInitialBorderRadius;
    yesBtn.style.zIndex = '';
    yesBtn.style.transform = '';
    question.style.display = '';
    catImg.style.display = '';
    noBtn.style.display = '';
    noClickCount = 0;
    alignNoToYes();
}

function createFireworks() {
    const container = document.getElementById('fireworks-container');
    if (!container) return;
    container.innerHTML = '';

    const colors = ['#ff3b3f', '#ffdd57', '#22c55e', '#38bdf8', '#a855f7'];
    for (let i = 0; i < 18; i++) {
        const spark = document.createElement('span');
        spark.className = 'firework';
        const size = 6 + Math.random() * 12;
        spark.style.width = `${size}px`;
        spark.style.height = `${size}px`;
        spark.style.left = `${Math.random() * 100}%`;
        spark.style.top = `${Math.random() * 100}%`;
        spark.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        spark.style.animationDuration = `${1 + Math.random() * 0.5}s`;
        spark.style.animationDelay = `${Math.random() * 0.2}s`;
        container.appendChild(spark);
    }
}

function createSparkles() {
    const container = document.getElementById('fireworks-container');
    if (!container) return;

    const colors = ['rgba(255,255,255,0.9)', 'rgba(255,230,180,0.9)', 'rgba(200,245,255,0.9)'];
    for (let i = 0; i < 24; i++) {
        const sparkle = document.createElement('span');
        sparkle.className = 'sparkle';
        const size = 3 + Math.random() * 8;
        sparkle.style.width = `${size}px`;
        sparkle.style.height = `${size}px`;
        sparkle.style.left = `${Math.random() * 100}%`;
        sparkle.style.top = `${Math.random() * 100}%`;
        sparkle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        sparkle.style.animationDuration = `${3 + Math.random() * 2}s`;
        sparkle.style.animationDelay = `${Math.random() * 1}s`;
        container.appendChild(sparkle);
    }
}

function createStars() {
    const container = document.getElementById('fireworks-container');
    if (!container) return;

    const colors = ['#ff9bff', '#fff475', '#8bf6ff', '#ffb3ba', '#c1e1c5'];
    for (let i = 0; i < 18; i++) {
        const star = document.createElement('span');
        star.className = 'star';
        const size = 6 + Math.random() * 10;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${80 + Math.random() * 20}%`;
        star.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        star.style.animationDuration = `${4 + Math.random() * 3}s`;
        star.style.animationDelay = `${Math.random() * 2}s`;
        container.appendChild(star);
    }
}

// Kapag na-click ang "Yes" button
yesBtn.addEventListener('click', () => {
    question.textContent = "I Miss You So Much! ❤️";
    resetYesButton();
    noBtn.style.display = 'none';
    createFireworks();
    createSparkles();
    createStars();
    
    // Palitan ng masayang cat GIF kapag nag-yes
    catImg.src = "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3Z0aXFpcXVjZ3p1MWZpcmlqM3ZqOHhybm95cnV2OG9zZ3NoOHlsbCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/MDJ9IbxxvDUQM/giphy.gif";
});