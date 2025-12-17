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



// SKILLS 
const skillData = {
  javascript: {
    title: "JavaScript",
    level: "Intermediate",
    usage: "Core application logic, async workflows, API handling",
    tools: "ES6+, DOM, Fetch API, Async/Await",
    projects: "All Projects",
    image: "assets/skills/js.png"
  },

  react: {
    title: "React",
    level: "Intermediate",
    usage: "Building reusable UI components and dynamic pages",
    tools: "Hooks, Functional Components, State Management",
    projects: "PizzaDelight",
    image: "assets/skills/react.png"
  },

  node: {
    title: "Node.js",
    level: "Intermediate",
    usage: "Backend services, APIs, authentication logic",
    tools: "Express.js, REST APIs, JWT",
    projects: "FindNest, PizzaDelight",
    image: "assets/skills/node.png"
  },

  express: {
    title: "Express.js",
    level: "Intermediate",
    usage: "Routing, middleware, REST API architecture",
    tools: "Express, MVC structure",
    projects: "FindNest, PizzaDelight",
    image: "assets/skills/express.png"
  },

  mongodb: {
    title: "MongoDB",
    level: "Basic",
    usage: "Database design and CRUD operations",
    tools: "Mongoose, Aggregation",
    projects: "FindNest, PizzaDelight",
    image: "assets/skills/mongodb.png"
  },

  htmlcss: {
    title: "HTML & CSS",
    level: "Experienced",
    usage: "Responsive layouts and UI structuring",
    tools: "Flexbox, Grid, Modern CSS",
    projects: "All projects",
    image: "assets/skills/htmlcss.png"
  },

  git: {
    title: "Git & GitHub",
    level: "Intermediate",
    usage: "Version control and collaborative development",
    tools: "Git, GitHub, Branching",
    projects: "All projects",
    image: "assets/skills/git.png"
  },

  restapi: {
    title: "REST APIs",
    level: "Intermediate",
    usage: "Client-server communication and data exchange",
    tools: "HTTP, JSON, CRUD",
    projects: "FindNest, PizzaDelight",
    image: "assets/skills/api.png"
  }
};



const skillButtons = document.querySelectorAll(".skill-item");

const titleEl = document.getElementById("skill-title");
const levelEl = document.getElementById("skill-level");
const toolsEl = document.getElementById("skill-tools");
const projectsEl = document.getElementById("skill-projects");
const usageEl = document.getElementById("skill-usage");
const imageEl = document.getElementById("skill-image");

skillButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    // remove active state
    skillButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    // get skill data
    const skill = skillData[btn.dataset.skill];

    // update content
    titleEl.textContent = skill.title;
    levelEl.textContent = `Level: ${skill.level}`;
    usageEl.textContent = `Usage: ${skill.usage}`;
    toolsEl.textContent = `Tools: ${skill.tools}`;
    projectsEl.textContent = `Used In: ${skill.projects}`;

    // update image (with smooth swap)
    imageEl.style.opacity = 0;

    setTimeout(() => {
      imageEl.src = skill.image;
      imageEl.alt = `${skill.title} icon`;
      imageEl.style.opacity = 1;
    }, 150);
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
