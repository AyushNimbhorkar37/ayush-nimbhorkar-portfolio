const roles = [
  "Full Stack Developer",
  "Problem Solver",
  "Product-Focused Engineer"
];

const el = document.querySelector(".typewriter");
let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
  const current = roles[roleIndex];

  if (!deleting) {
    el.textContent = current.slice(0, charIndex++);
    if (charIndex > current.length) {
      deleting = true;
      setTimeout(typeEffect, 1200);
      return;
    }
  } else {
    el.textContent = current.slice(0, charIndex--);
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(typeEffect, deleting ? 50 : 80);
}

typeEffect();

const skillData = {
  javascript: {
    title: "JavaScript",
    level: "Intermediate",
    tools: "ES6, DOM, Fetch API, Async/Await",
    projects: "FindNest, PizzaDelight"
  },
  react: {
    title: "React",
    level: "Intermediate",
    tools: "Hooks, Components, State Management",
    projects: "FindNest"
  },
  node: {
    title: "Node.js",
    level: "Intermediate",
    tools: "Express, REST APIs, JWT",
    projects: "PizzaDelight"
  },
  mongodb: {
    title: "MongoDB",
    level: "Basic",
    tools: "Mongoose, Aggregation",
    projects: "FindNest"
  }
};

const skillButtons = document.querySelectorAll(".skill-item");
const titleEl = document.getElementById("skill-title");
const levelEl = document.getElementById("skill-level");
const toolsEl = document.getElementById("skill-tools");
const projectsEl = document.getElementById("skill-projects");

skillButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    skillButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const skill = skillData[btn.dataset.skill];
    titleEl.textContent = skill.title;
    levelEl.textContent = `Level: ${skill.level}`;
    toolsEl.textContent = skill.tools;
    projectsEl.textContent = skill.projects;
  });
});

// THEME SWITCHER
const themeButtons = document.querySelectorAll(".theme-btn");
const accentDots = document.querySelectorAll(".accent-dot");
const root = document.documentElement;

// Restore saved prefs
const savedTheme = localStorage.getItem("theme");
const savedAccent = localStorage.getItem("accent");
if (savedTheme) root.setAttribute("data-theme", savedTheme);
if (savedAccent) root.setAttribute("data-accent", savedAccent);

themeButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const theme = btn.dataset.theme;
    root.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  });
});

accentDots.forEach(dot => {
  dot.addEventListener("click", () => {
    const accent =
      dot.classList.contains("cyan") ? "cyan" :
      dot.classList.contains("orange") ? "orange" : "purple";
    root.setAttribute("data-accent", accent);
    localStorage.setItem("accent", accent);
  });
});

const reveals = document.querySelectorAll(".reveal");
const onScroll = () => {
  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 80) el.classList.add("show");
  });
};
window.addEventListener("scroll", onScroll);
onScroll();

// COPY EMAIL
const copyBtn = document.getElementById("copy-email");
const emailText = document.getElementById("email-text");

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(emailText.textContent);
  copyBtn.textContent = "Copied!";
  setTimeout(() => (copyBtn.textContent = "Copy"), 1500);
});

// FORM VALIDATION + FEEDBACK
const form = document.getElementById("contactForm");
const statusEl = document.getElementById("formStatus");

form.addEventListener("submit", e => {
  e.preventDefault();

  const name = form.name?.value || document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    statusEl.textContent = "Please fill in all fields.";
    statusEl.style.color = "#f87171";
    return;
  }

  if (!email.includes("@")) {
    statusEl.textContent = "Please enter a valid email.";
    statusEl.style.color = "#f87171";
    return;
  }

  // Simulated success (can wire to backend later)
  statusEl.textContent = "Message sent successfully!";
  statusEl.style.color = "#34d399";
  form.reset();
});

// Prevent layout shift on load
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});


const heroVisual = document.querySelector(".hero-visual");
const profilePic = document.querySelector(".profile-pic");

heroVisual.addEventListener("mousemove", (e) => {
  const rect = heroVisual.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;

  profilePic.style.transform = `
    rotateX(${(-y / 30)}deg)
    rotateY(${(x / 30)}deg)
    scale(1.03)
  `;
});

heroVisual.addEventListener("mouseleave", () => {
  profilePic.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
});
