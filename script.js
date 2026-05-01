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



// TESTIMONIAL

const testimonials = [
            {
                name: "Poetic Prophet",
                role: "Co-founder Techiekraft",
                quote: "Your pen game is A+++ - You can fit in as the content writer and strategist for team 🙌🏽",
                rating: 5,
                avatarColor: "linear-gradient(135deg, var(--rust), var(--sand)"
            },
            {
                name: "Ericbal",
                role: "Head Rykte Agency",
                quote: "Daravid makes a good impression with his writing skills, curates badass content, has a good grasp of whatever project he's working on and transitions quite well. There's an 80% chance of working with or recommending him again.",
                rating: 5,
                avatarColor: "linear-gradient(135deg, var(--rust), var(--sand)"
            },
            {
                name: "Henry",
                role: "Marketing Expert",
                quote: "Spaces and podcast? You killed it with your team. Super happy to progress to the next phase of our marketing journey",
                rating: 5,
                avatarColor: "linear-gradient(135deg, var(--rust), var(--sand)"
            },
            {
                name: "Anonymous",
                role: "Marketing Lead",
                quote: "Amazing scripts, intriguing storytelling. You keep your audience glued with your tactics",
                rating: 5,
                avatarColor: "linear-gradient(135deg, var(--rust), var(--sand)"
            },
            {
                name: "Oracle",
                role: "Crypto KOL",
                quote: "I trust you with delivering my articles and research works together with marketing plans. I wouldn't second guess coming to you at all",
                rating: 5,
                avatarColor: "linear-gradient(135deg, var(--rust), var(--sand)"
            }
        ];

        // ─── Build cards ───
        const track = document.getElementById('testimonialTrack');

        function createCard(data) {
            const initials = data.name.split(' ').map(n => n[0]).join('').toUpperCase();
            const stars = '★'.repeat(data.rating) + '☆'.repeat(5 - data.rating);

            const card = document.createElement('div');
            card.className = 'testimonial-card';
            card.innerHTML = `
                <div class="stars">${stars}</div>
                <p class="quote">"${data.quote}"</p>
                <div class="author">
                    <div class="author-avatar" style="background: ${data.avatarColor}">${initials}</div>
                    <div class="author-info">
                        <div class="author-name">${data.name}</div>
                        <div class="author-role">${data.role}</div>
                    </div>
                </div>
            `;
            return card;
        }

        // Render original set + duplicate set for seamless loop
        function rendertestimonial() {
            // Clear existing
            track.innerHTML = '';

            // Build one set
            const fragment = document.createDocumentFragment();
            testimonials.forEach(t => fragment.appendChild(createCard(t)));

            // Append original set
            track.appendChild(fragment.cloneNode(true));

            // Append duplicate set (required for infinite scroll illusion)
            track.appendChild(fragment.cloneNode(true));

            // Adjust animation speed based on content width (optional tuning)
            const cardWidth = 380 + 24; // card width + margin
            const totalWidth = testimonials.length * cardWidth;
            const duration = Math.max(20, totalWidth / 50); // ~25px per second
            track.style.setProperty('--duration', `${duration}s`);

            // Start animation
            track.classList.add('animating');
        }

        // ─── Init ───
        rendertestimonial();

        // Optional: re-render on resize if you want responsive card widths
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                track.classList.remove('animating');
                // Force reflow
                void track.offsetWidth;
                rendertestimonial();
            }, 250);
        });