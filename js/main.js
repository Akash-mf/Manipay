// Scroll reveal
const els = document.querySelectorAll('[data-reveal]');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
}, {threshold:0.15});
els.forEach(el=>io.observe(el));

// Mobile nav drawer
const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');
const closeBtn = document.querySelector('.mobile-nav .close-btn');
if(menuToggle && mobileNav){
  menuToggle.addEventListener('click', ()=> mobileNav.classList.add('open'));
  closeBtn?.addEventListener('click', ()=> mobileNav.classList.remove('open'));
  mobileNav.addEventListener('click', (e)=>{ if(e.target === mobileNav) mobileNav.classList.remove('open'); });
  mobileNav.querySelectorAll('a').forEach(link=>{
    link.addEventListener('click', ()=> mobileNav.classList.remove('open'));
  });
}

// FAQ accordion
document.querySelectorAll('.acc-item').forEach(item=>{
  const head = item.querySelector('.acc-head');
  const body = item.querySelector('.acc-body');
  head.addEventListener('click', ()=>{
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.acc-item.open').forEach(o=>{
      if(o !== item){ o.classList.remove('open'); o.querySelector('.acc-body').style.maxHeight = null; }
    });
    if(isOpen){
      item.classList.remove('open');
      body.style.maxHeight = null;
    } else {
      item.classList.add('open');
      body.style.maxHeight = body.scrollHeight + 'px';
    }
  });
});

// Filter pills (projects page + services page)
document.querySelectorAll('.filter-pill').forEach(pill=>{
  pill.addEventListener('click', ()=>{
    const group = pill.closest('.filter-row');
    group.querySelectorAll('.filter-pill').forEach(p=>p.classList.remove('active'));
    pill.classList.add('active');
    const cat = pill.dataset.filter;
    document.querySelectorAll('.project-card, .service-card').forEach(card=>{
      card.style.display = (cat === 'all' || card.dataset.cat === cat) ? '' : 'none';
    });
  });
});

// Contact form (demo submit)
const contactForm = document.getElementById('contactForm');
if(contactForm){
  contactForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const original = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-check"></i> Message Sent!';
    setTimeout(()=>{ btn.innerHTML = original; contactForm.reset(); }, 2500);
  });
}

// Back to top button
const backToTop = document.querySelector('.back-to-top');
if(backToTop){
  window.addEventListener('scroll', ()=>{
    if(window.scrollY > 480){ backToTop.classList.add('show'); }
    else{ backToTop.classList.remove('show'); }
  });
  backToTop.addEventListener('click', (e)=>{
    e.preventDefault();
    window.scrollTo({top:0, behavior:'smooth'});
  });
}

// Scrollspy — highlight the nav link matching the section currently in view
const spySections = document.querySelectorAll('section[id]');
const spyLinks = document.querySelectorAll('nav.links a[href^="#"], .mobile-nav a[href^="#"]');
if(spySections.length && spyLinks.length){
  const spyObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const id = entry.target.getAttribute('id');
        spyLinks.forEach(link=>{
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      }
    });
  }, {rootMargin:'-40% 0px -50% 0px', threshold:0});
  spySections.forEach(sec=>spyObserver.observe(sec));
}
