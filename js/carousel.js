(function(){
    const carousel = document.querySelector('.carousel-restaurant');
    if(!carousel) return;

    const slides = Array.from(carousel.querySelectorAll('.slide'));
    const prevBtn = carousel.querySelector('.carousel-button.prev');
    const nextBtn = carousel.querySelector('.carousel-button.next');
    const dotsWrap = carousel.querySelector('.carousel-dots');
    let current = 0;
    let interval = null;
    const AUTOPLAY_MS = 5000;

    function createDots(){
        slides.forEach((_, i) => {
            const btn = document.createElement('button');
            btn.setAttribute('aria-label', `Go to slide ${i+1}`);
            btn.dataset.index = i;
            btn.addEventListener('click', () => goTo(i));
            dotsWrap.appendChild(btn);
        });
        updateDots();
    }

    function updateDots(){
        const dots = Array.from(dotsWrap.children);
        dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    function show(idx){
        slides.forEach((s, i) => {
            s.classList.toggle('active', i === idx);
        });
        current = idx;
        updateDots();
    }

    function next(){
        show((current + 1) % slides.length);
    }
    function prev(){
        show((current - 1 + slides.length) % slides.length);
    }

    function goTo(i){
        show(i % slides.length);
        restartAutoplay();
    }

    function startAutoplay(){
        if(interval) return;
        interval = setInterval(next, AUTOPLAY_MS);
    }
    function stopAutoplay(){
        if(!interval) return;
        clearInterval(interval);
        interval = null;
    }
    function restartAutoplay(){
        stopAutoplay();
        startAutoplay();
    }

    // Setup
    createDots();
    show(0);
    startAutoplay();

    // Controls
    if(nextBtn) nextBtn.addEventListener('click', () => { next(); restartAutoplay(); });
    if(prevBtn) prevBtn.addEventListener('click', () => { prev(); restartAutoplay(); });

    // Pause on hover/focus
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);
    carousel.addEventListener('focusin', stopAutoplay);
    carousel.addEventListener('focusout', startAutoplay);

    // Keyboard support
    document.addEventListener('keydown', (e) => {
        if(document.activeElement && (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA')) return;
        if(e.key === 'ArrowRight') { next(); restartAutoplay(); }
        if(e.key === 'ArrowLeft') { prev(); restartAutoplay(); }
    });
})();
