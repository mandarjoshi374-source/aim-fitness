const navbar = document.getElementById("navbar");
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

const modal = document.getElementById("passModal");
const formContent = document.getElementById("formContent");
const successMessage = document.getElementById("successMessage");
const passForm = document.getElementById("passForm");

const maleButton = document.getElementById("maleButton");
const femaleButton = document.getElementById("femaleButton");

let gender = "male";

/* Navbar scroll effect */
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 40);
});

/* Mobile menu */
menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("open");

  const icon = menuToggle.querySelector("i");

  if (navMenu.classList.contains("open")) {
    icon.className = "fa-solid fa-xmark";
  } else {
    icon.className = "fa-solid fa-bars";
  }
});

document.querySelectorAll(".nav-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    menuToggle.querySelector("i").className = "fa-solid fa-bars";
  });
});

/* Cursor glow */
const cursorGlow = document.querySelector(".cursor-glow");

window.addEventListener("mousemove", (event) => {
  cursorGlow.style.left = `${event.clientX}px`;
  cursorGlow.style.top = `${event.clientY}px`;
});

/* Reveal animations */
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
  }
);

revealElements.forEach((element) => revealObserver.observe(element));

/* BMR Calculator */
function updateGenderButtons() {
  maleButton.classList.toggle("active", gender === "male");
  femaleButton.classList.toggle("active", gender === "female");
}

function calculateCalories() {
  const age = Number(document.getElementById("age").value) || 25;
  const weight = Number(document.getElementById("weight").value) || 70;
  const height = Number(document.getElementById("height").value) || 175;
  const activity = Number(document.getElementById("activity").value) || 1.55;

  let bmr;

  if (gender === "male") {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  const maintenance = bmr * activity;
  const shred = maintenance - 500;

  document.getElementById("bmrResult").textContent =
    Math.round(bmr).toLocaleString();

  document.getElementById("maintenanceResult").textContent =
    Math.round(maintenance).toLocaleString();

  document.getElementById("shredResult").textContent =
    Math.max(1200, Math.round(shred)).toLocaleString();
}

maleButton.addEventListener("click", () => {
  gender = "male";
  updateGenderButtons();
  calculateCalories();
});

femaleButton.addEventListener("click", () => {
  gender = "female";
  updateGenderButtons();
  calculateCalories();
});

["age", "weight", "height", "activity"].forEach((id) => {
  document.getElementById(id).addEventListener("input", calculateCalories);
});

calculateCalories();

/* Pass modal */
function openModal() {
  modal.classList.add("show");
  document.body.style.overflow = "hidden";

  formContent.classList.remove("hide");
  successMessage.classList.remove("show");
  passForm.reset();
}

function closeModal() {
  modal.classList.remove("show");
  document.body.style.overflow = "";
}

passForm.addEventListener("submit", (event) => {
  event.preventDefault();

  formContent.classList.add("hide");
  successMessage.classList.add("show");
});

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
  }
});