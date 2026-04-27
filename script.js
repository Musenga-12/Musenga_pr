const root = document.documentElement;
const themeToggle = document.querySelector("#theme-toggle");
const reveals = document.querySelectorAll(".reveal");
const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "dark") {
  root.setAttribute("data-theme", "dark");
}

const updateThemeToggle = () => {
  if (!themeToggle) {
    return;
  }

  const isDark = root.getAttribute("data-theme") === "dark";
  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeToggle.setAttribute(
    "aria-label",
    isDark ? "Switch to light mode" : "Switch to dark mode"
  );
  themeToggle.querySelector(".theme-toggle-label").textContent = isDark
    ? "Light Mode"
    : "Dark Mode";
};

themeToggle?.addEventListener("click", () => {
  const isDark = root.getAttribute("data-theme") === "dark";

  if (isDark) {
    root.removeAttribute("data-theme");
    localStorage.setItem("portfolio-theme", "light");
  } else {
    root.setAttribute("data-theme", "dark");
    localStorage.setItem("portfolio-theme", "dark");
  }

  updateThemeToggle();
});

updateThemeToggle();

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
  }
);

reveals.forEach((item, index) => {
  item.style.transitionDelay = `${index * 80}ms`;
  revealObserver.observe(item);
});
