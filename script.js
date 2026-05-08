const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.14 });
reveals.forEach(el => io.observe(el));

const topbar = document.getElementById('topbar');
let lastY = window.scrollY;
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  topbar.classList.toggle('scrolled', y > 20);
  if (window.innerWidth > 1180) {
    if (y > lastY && y > 160) topbar.classList.add('hide');
    else topbar.classList.remove('hide');
  }
  lastY = y;
});

const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');
menuBtn?.addEventListener('click', () => nav.classList.toggle('open'));
document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

const galleryGrid = document.getElementById('galleryGrid');
const imageCandidates = [];
for (let i = 1; i <= 10; i++) {
  ['jpg','jpeg','png','webp'].forEach(ext => imageCandidates.push(`${i}.${ext}`));
}

const tryLoad = (src) => new Promise(resolve => {
  const img = new Image();
  img.onload = () => resolve(src);
  img.onerror = () => resolve(null);
  img.src = src;
});

(async () => {
  const found = [];
  for (const src of imageCandidates) {
    const ok = await tryLoad(src);
    if (ok) found.push(ok);
  }
  if (!galleryGrid) return;
  if (found.length) {
    galleryGrid.innerHTML = found.slice(0, 9).map((src, index) => {
      const cls = `${index % 5 === 0 ? 'tall' : ''} ${index % 4 === 2 ? 'wide' : ''}`.trim();
      return `
      <div class="gallery-item ${cls}">
        <img src="${src}" alt="LEGO Kuaför Güzellik Salonu görseli">
        <div class="gallery-overlay">
          <span>lego premium galeri</span>
          <div class="gallery-plus">+</div>
        </div>
      </div>`;
    }).join('');
    bindLightbox();
  }
})();


const heroBg = document.querySelector('.hero-bg');
window.addEventListener('scroll', () => {
  if (!heroBg) return;
  const y = window.scrollY;
  heroBg.style.transform = `scale(1.04) translateY(${Math.min(y * 0.12, 42)}px)`;
}, { passive: true });

document.querySelectorAll('.spotlight-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mx', `${x}%`);
    card.style.setProperty('--my', `${y}%`);
  });
});

const galleryItems = () => document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.getElementById('lightboxClose');

function bindLightbox() {
  galleryItems().forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (!img || !lightbox || !lightboxImage) return;
      lightboxImage.src = img.src;
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
    });
  });
}
lightboxClose?.addEventListener('click', () => {
  lightbox?.classList.remove('open');
  lightbox?.setAttribute('aria-hidden', 'true');
});
lightbox?.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
  }
});

window.addEventListener('load', () => {
  const loader = document.getElementById('siteLoader');
  setTimeout(() => loader?.classList.add('hide'), 900);
});
