  // Scroll progress bar
  window.addEventListener('scroll', () => {
    const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    document.getElementById('progress').style.width = (pct * 100) + '%';
    document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 60);
  });

  // Scroll reveal
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.12 });
  document.querySelectorAll('.exp-item').forEach(el => observer.observe(el));


  // TOGGLE

// Set the theme when the page loads
document.addEventListener("DOMContentLoaded", () => {
  // 1. Check if the user has a saved preference in localStorage
  const savedTheme = localStorage.getItem("theme");
  
  if (savedTheme) {
    // Apply the saved theme
    document.documentElement.setAttribute("data-theme", savedTheme);
  } else {
    // 2. Fallback: Check their operating system's dark mode preference
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (prefersDark) {
      document.documentElement.setAttribute("data-theme", "dark");
    }
  }
});

// The function called by your onclick="toggleTheme()"
function toggleTheme() {
  const root = document.documentElement;
  const currentTheme = root.getAttribute("data-theme");
  
  if (currentTheme === "dark") {
    // Switch to light mode
    root.removeAttribute("data-theme");
    localStorage.setItem("theme", "light");
  } else {
    // Switch to dark mode
    root.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  }
}