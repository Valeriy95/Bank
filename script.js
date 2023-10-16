'use strict';

// Modal window

const modalWindow = document.querySelector('.modal-window');
const overlay = document.querySelector('.overlay');
const btnCloseModalWindow = document.querySelector('.btn--close-modal-window');
const btnsOpenModalWindow = document.querySelectorAll(
  '.btn--show-modal-window'
);

const openModalWindow = function () {
  modalWindow.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModalWindow = function () {
  modalWindow.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModalWindow.length; i++)
  btnsOpenModalWindow[i].addEventListener('click', openModalWindow);

btnCloseModalWindow.addEventListener('click', closeModalWindow);
overlay.addEventListener('click', closeModalWindow);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modalWindow.classList.contains('hidden')) {
    closeModalWindow();
  }
});


const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.getElementById('section--1');

btnScrollTo.addEventListener('click', function() {
  section1.scrollIntoView({behavior: 'smooth'});
})

document.querySelector('.nav__links')
.addEventListener('click', function(e) {
  e.preventDefault();
  if(e.target.classList.contains('nav__link')) {
    const href = e.target.getAttribute('href');
    if (href === '#') return;
    document.querySelector(href).scrollIntoView({behavior: 'smooth'});
}})

const tabs = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container');
const tabContents = document.querySelectorAll('.operations__content');

tabContainer.addEventListener('click', function (e) {
  const clickedButton = e.target.closest('.operations__tab');
  if(!clickedButton) return;

  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  clickedButton.classList.add('operations__tab--active');

  tabContents.forEach(content => content.classList.remove('operations__content--active'));
  document.querySelector(`.operations__content--${clickedButton.dataset.tab}`).classList.add('operations__content--active');
});

function navLinksHover (e) {
    if(e.target.classList.contains('nav__link')) {
      const linkOver = e.target;
      const siblingLinks = linkOver
        .closest('.nav__links')
        .querySelectorAll('.nav__link');
      const logo = linkOver.closest('.nav')
      .querySelector('img');
      const logoText = linkOver.closest('.nav')
      .querySelector('.nav__text');
  
      siblingLinks.forEach(el => {
        if (el !== linkOver) el.style.opacity = this;
      })
      logo.style.opacity = this;
      logoText.style.opacity = this;
    }
}

// Sticky header

const nav = document.querySelector('.nav');
nav.addEventListener('mouseover', navLinksHover.bind(0.4));
nav.addEventListener('mouseout', navLinksHover.bind(1));


const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
function getStickyNav (entries) {
  const entry = entries[0];
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const headerObserver = new IntersectionObserver(getStickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`
});
headerObserver.observe(header);

// Показ элементов при прокручивании

const allSections = document.querySelectorAll('.section');

function appearanceSection (entries, observer) {
  const entry = entries[0];
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(appearanceSection, {
  root: null,
  threshold: 0.2,
});

allSections.forEach(function(section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
})

// Имплементация lazy loading для изображения

const lazyImages = document.querySelectorAll('img[data-src]');

function loadImages (entries, observer) {
  const entry = entries[0];

  if (!entry.isIntersecting) return;

  // Меняем изображение на изображение с высоким разрешением
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
}

const lazyImagesObserver = new IntersectionObserver(loadImages, {
  root: null,
  threshold: 0.7,
})

lazyImages.forEach(image => lazyImagesObserver.observe(image));

// Создание слайдера

const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');

let currentSlide = 0;
const slidesNumber = slides.length;

function createDots () {
  slides.forEach(function (_, index) {
    dotContainer.insertAdjacentHTML('beforeend',
    `<button class="dots__dot" data-slide="${index}"></button>`
    );
  });
};

createDots();

function activateCurrentDot (slide) {
  document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));
  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
}

activateCurrentDot(0);

function moveToSlide (slide) {
  slides.forEach((s, index) => (s.style.transform = `translateX(${(index - slide) * 100}%)`)
  );
};

moveToSlide(0);

function nextSlide () {
  if (currentSlide === slidesNumber - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  moveToSlide(currentSlide);

  activateCurrentDot(currentSlide);
}

function previousSlide () {
  if (currentSlide === 0) {
    currentSlide = slidesNumber - 1;
  } else {
    currentSlide--;
  }
  moveToSlide(currentSlide);

  activateCurrentDot(currentSlide);
}

btnRight.addEventListener('click', nextSlide);

btnLeft.addEventListener('click', previousSlide);

document.addEventListener('keydown', function (e) {
  
  if (e.key === 'ArrowRight') nextSlide();
  if (e.key === 'ArrowLeft') previousSlide();
});

dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const slide = e.target.dataset.slide;
    moveToSlide(slide);
    activateCurrentDot(slide);
  }
})