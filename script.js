
function createParticles() {
    const container = document.getElementById("particlesContainer");
    const particleCount = window.innerWidth > 768 ? 20 : 10;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("div");
        particle.className = "particle";
        particle.style.left = Math.random() * 100 + "%";
        particle.style.animationDelay = Math.random() * 5 + "s";
        particle.style.animationDuration = Math.random() * 3 + 5 + "s";
        container.appendChild(particle);
    }
}


document.addEventListener("DOMContentLoaded", createParticles);


window.addEventListener("resize", () => {
    const container = document.getElementById("particlesContainer");
    container.innerHTML = "";
    createParticles();
});


function scrollTo(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
}


document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", (e) => {
        const href = link.getAttribute("href");
        if (href !== "#") {
            e.preventDefault();
            scrollTo(href.substring(1));
        }
    });
});


let secretCode = "";
const secretPhrase = "hello";

document.addEventListener("keypress", function (e) {
    const char = e.key.toLowerCase();
    
    if (/[a-z]/.test(char)) {
        secretCode += char;
        
        if (secretCode.includes(secretPhrase)) {
            unlockSecret();
            secretCode = "";
        }
        
        if (secretCode.length > 10) {
            secretCode = secretCode.slice(-10);
        }
    }
});

function unlockSecret() {
    const body = document.body;
    const effect = document.createElement("div");
    
    effect.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle, rgba(0, 255, 136, 0.8), transparent);
        pointer-events: none;
        z-index: 9999;
        animation: secretFlash 0.6s ease-out;
    `;
    
    body.appendChild(effect);
    
    setTimeout(() => {
        effect.remove();
        showNotification("Hello there! You've discovered the secret code! 🎉");
    }, 600);
}

function showNotification(message) {
    const notification = document.createElement("div");
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #00ff88, #0099ff);
        color: #0a1f3b;
        padding: 20px 30px;
        border-radius: 12px;
        font-weight: 700;
        z-index: 10000;
        box-shadow: 0 10px 40px rgba(0, 255, 136, 0.4);
        animation: slideInRight 0.5s ease-out;
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = "slideOutRight 0.5s ease-out forwards";
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

const notificationStyles = document.createElement("style");
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
    
    @keyframes secretFlash {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);

if (window.innerWidth <= 480) {
    document.addEventListener("DOMContentLoaded", () => {
        const particles = document.querySelectorAll(".particle");
        const toRemove = Math.floor(particles.length * 0.5);
        
        for (let i = 0; i < toRemove; i++) {
            particles[i].remove();
        }
    });
}


const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);


document.querySelectorAll(".card").forEach(card => {
    observer.observe(card);
});