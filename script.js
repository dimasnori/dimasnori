// Typing Animation
const typingTexts = [
  'IT Support Professional',
  'Network Engineer',
  'Technical Support Specialist',
  'Infrastructure Expert'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const typingText = document.querySelector('.typing-text');
  const currentText = typingTexts[textIndex];
  
  if (!isDeleting) {
    if (charIndex < currentText.length) {
      typingText.textContent += currentText[charIndex];
      charIndex++;
      setTimeout(typeEffect, 100);
    } else {
      isDeleting = true;
      setTimeout(typeEffect, 2000);
    }
  } else {
    if (charIndex > 0) {
      typingText.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      setTimeout(typeEffect, 50);
    } else {
      isDeleting = false;
      textIndex = (textIndex + 1) % typingTexts.length;
      setTimeout(typeEffect, 500);
    }
  }
}

// Loading Animation
window.addEventListener('load', () => {
  const loading = document.getElementById('loading');
  setTimeout(() => {
    loading.style.opacity = '0';
    loading.style.visibility = 'hidden';
  }, 2500);
});

// Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  navMenu.classList.toggle('show');
});

// Close menu when link clicked
document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    navMenu.classList.remove('show');
  });
});

// Theme Toggle
const themeBtn = document.getElementById('themeBtn');
const htmlElement = document.documentElement;

// Check for saved theme preference
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
  document.body.classList.add('dark-mode');
  themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
}

themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  
  if (document.body.classList.contains('dark-mode')) {
    localStorage.setItem('theme', 'dark');
    themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    localStorage.setItem('theme', 'light');
    themeBtn.innerHTML = '<i class="fas fa-moon"></i>';
  }
});

// Particle Background
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
    this.opacity = Math.random() * 0.5 + 0.2;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x > canvas.width) this.x = 0;
    if (this.x < 0) this.x = canvas.width;
    if (this.y > canvas.height) this.y = 0;
    if (this.y < 0) this.y = canvas.height;
  }

  draw() {
    ctx.fillStyle = `rgba(255, 215, 0, ${this.opacity})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Initialize particles
for (let i = 0; i < 50; i++) {
  particles.push(new Particle());
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  particles.forEach(particle => {
    particle.update();
    particle.draw();
  });

  // Draw connections
  particles.forEach((p1, i) => {
    particles.slice(i + 1).forEach(p2 => {
      const distance = Math.sqrt(
        Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)
      );
      
      if (distance < 150) {
        ctx.strokeStyle = `rgba(255, 215, 0, ${0.2 * (1 - distance / 150)})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
    });
  });

  requestAnimationFrame(drawParticles);
}

drawParticles();

// Resize canvas
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Counter Animation
const observerOptions = {
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statNumber = entry.target.querySelector('.stat-number');
      if (statNumber && !statNumber.dataset.counted) {
        const target = parseInt(statNumber.dataset.target);
        countUp(statNumber, target);
        statNumber.dataset.counted = 'true';
      }
    }
  });
}, observerOptions);

document.querySelectorAll('.about-stats').forEach(stats => {
  observer.observe(stats);
});

function countUp(element, target) {
  let current = 0;
  const increment = target / 50;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target + '+';
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current) + '+';
    }
  }, 50);
}

// Scroll Reveal
const scrollRevealElements = document.querySelectorAll(
  '.skill-card, .portfolio-card, .service-box, .timeline-item'
);

const scrollRevealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
      scrollRevealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

scrollRevealElements.forEach(element => {
  element.style.opacity = '0';
  scrollRevealObserver.observe(element);
});

// Back to Top
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Navbar Sticky Effect
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 50) {
    navbar.style.background = 'rgba(15, 76, 117, 0.95)';
  } else {
    navbar.style.background = 'rgba(15, 76, 117, 0.7)';
  }
});

// Initialize Typing Animation
typeEffect();