document.addEventListener('DOMContentLoaded', () => {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.from('.logo-pill', { duration: 1, y: -50, opacity: 0 })
    .from('.headline', { duration: 1.2, y: 40, opacity: 0 }, '-=0.5')
    .from('.subheadline', { duration: 1, y: 30, opacity: 0 }, '-=0.8')
    .from('.glass-card', { duration: 1.2, scale: 0.95, opacity: 0 }, '-=0.6')
    .from('.domain-tag', { duration: 1, y: 50, opacity: 0 }, '-=0.6');
});
