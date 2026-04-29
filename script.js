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