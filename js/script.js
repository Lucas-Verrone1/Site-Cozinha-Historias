document.addEventListener('DOMContentLoaded', () => {
  const section = document.querySelector('.sections-2');
  if (!section) return;

  // monta estrutura do carousel (preserva cards existentes)
  const carousel = document.createElement('div');
  carousel.className = 'carousel';
  const track = document.createElement('div');
  track.className = 'carousel-track';

  const originalCards = Array.from(section.querySelectorAll('.card'));
  if (originalCards.length === 0) return;

  // move os originais para o track
  originalCards.forEach(c => track.appendChild(c));

  // clona todo o conjunto (append) para permitir looping contínuo
  const clones = originalCards.map(c => c.cloneNode(true));
  clones.forEach(c => track.appendChild(c));

  // monta DOM
  carousel.appendChild(track);
  section.innerHTML = '';
  section.appendChild(carousel);

  // botões de navegação simples (opcionais)
  const prevBtn = document.createElement('button');
  prevBtn.className = 'carousel-button prev';
  prevBtn.type = 'button';
  prevBtn.innerText = '‹';
  const nextBtn = document.createElement('button');
  nextBtn.className = 'carousel-button next';
  nextBtn.type = 'button';
  nextBtn.innerText = '›';
  carousel.appendChild(prevBtn);
  carousel.appendChild(nextBtn);

  // estado
  let slidesToShow = 1;
  let slideWidth = 0;
  const originalCount = originalCards.length;
  let originalWidth = 0; // largura total do conjunto original (px)
  let position = 0; // pos em px (transform translateX)
  let lastTime = null;
  const speed = 60; // px por segundo (ajuste para mais/menos velocidade)
  let running = true;
  let rafId = null;

  function calculateSlidesToShow() {
    const w = window.innerWidth;
    if (w >= 1024) return 3;
    if (w >= 768) return 2;
    return 1;
  }

  function updateSizes() {
    slidesToShow = calculateSlidesToShow();
    slideWidth = carousel.clientWidth / slidesToShow;
    // aplica largura a todos os cards (originais + clones)
    Array.from(track.children).forEach(card => {
      card.style.flex = `0 0 ${slideWidth}px`;
      card.style.maxWidth = `${slideWidth}px`;
    });
    originalWidth = slideWidth * originalCount;
  }

  function step(timestamp) {
    if (!lastTime) lastTime = timestamp;
    const dt = (timestamp - lastTime) / 1000; // segundos
    lastTime = timestamp;
    if (running) {
      position -= speed * dt; // move para a esquerda continuamente
      // quando já passou a largura do conjunto original, "loop" adicionando originalWidth
      if (position <= -originalWidth) {
        position += originalWidth;
      } else if (position >= 0) {
        // caso mova para direita demais (por nav manual), normaliza
        position -= originalWidth;
      }
      track.style.transform = `translateX(${position}px)`;
    }
    rafId = requestAnimationFrame(step);
  }

  function start() {
    if (!rafId) {
      lastTime = null;
      rafId = requestAnimationFrame(step);
    }
    running = true;
  }
  function stop() { running = false; }

  // navegação por botões: move um slide e pausa por 1s
  function moveBySlides(delta) {
    stop();
    position -= delta * slideWidth;
    // normaliza posição para intervalo [-originalWidth, 0)
    if (position <= -originalWidth) position += originalWidth;
    if (position > 0) position -= originalWidth;
    track.style.transform = `translateX(${position}px)`;
    setTimeout(start, 800);
  }

  prevBtn.addEventListener('click', () => moveBySlides(-1));
  nextBtn.addEventListener('click', () => moveBySlides(1));

  // pause on hover/focus
  carousel.addEventListener('mouseenter', stop);
  carousel.addEventListener('mouseleave', start);
  carousel.addEventListener('focusin', stop);
  carousel.addEventListener('focusout', start);

  // touch swipe: detecta arraste e converte em deslocamento e possível salto de slide
  let touchStartX = null;
  let touchDelta = 0;
  track.addEventListener('touchstart', (e) => {
    stop();
    touchStartX = e.touches[0].clientX;
    touchDelta = 0;
  }, {passive:true});
  track.addEventListener('touchmove', (e) => {
    if (touchStartX === null) return;
    touchDelta = e.touches[0].clientX - touchStartX;
    track.style.transform = `translateX(${position + touchDelta}px)`;
  }, {passive:true});
  track.addEventListener('touchend', () => {
    if (Math.abs(touchDelta) > slideWidth * 0.25) {
      const movedSlides = Math.round(touchDelta / slideWidth);
      position += movedSlides * slideWidth; // touchDelta positivo => move right
    }
    touchStartX = null;
    touchDelta = 0;
    // normaliza
    if (position <= -originalWidth) position += originalWidth;
    if (position > 0) position -= originalWidth;
    track.style.transform = `translateX(${position}px)`;
    setTimeout(start, 600);
  });

  // resize handler
  let resizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      // recalcula tamanhos e reajusta posição para não quebrar o loop visual
      const ratio = slideWidth ? (position / slideWidth) : 0;
      updateSizes();
      // recomputa position mantendo deslocamento relativo
      position = ratio * slideWidth;
      // normaliza
      if (position <= -originalWidth) position += originalWidth;
      if (position > 0) position -= originalWidth;
      track.style.transform = `translateX(${position}px)`;
    }, 120);
  });

  // inicialização
  updateSizes();
  // posiciona o track no início (0)
  position = 0;
  track.style.transform = `translateX(${position}px)`;
  start();
});