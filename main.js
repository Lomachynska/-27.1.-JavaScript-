// Ініціалізація змінних
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const pauseButton = document.querySelector('.pause');
const indicators = document.querySelectorAll('.indicator');
let currentIndex = 0;
let slideInterval;
let isPaused = false;
const slideIntervalTime = 3000; // Інтервал автоматичного перегортання слайдів

// Функція для оновлення слайдів
function updateSlider() {
  const offset = -currentIndex * 100;
  slider.style.transform = `translateX(${offset}%)`;
  updateIndicators();
}

// Оновлення індикаторів
function updateIndicators() {
  indicators.forEach((indicator, index) => {
    indicator.classList.toggle('active', index === currentIndex);
  });
}

// Навігація вперед
function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  updateSlider();
}

// Навігація назад
function prevSlide() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateSlider();
}

// Клік по індикатору
indicators.forEach((indicator, index) => {
  indicator.addEventListener('click', () => {
    currentIndex = index;
    updateSlider();
  });
});

// Запуск/паузування автоматичного слайдера
function togglePause() {
  if (isPaused) {
    slideInterval = setInterval(nextSlide, slideIntervalTime);
    pauseButton.textContent = 'Pause';
  } else {
    clearInterval(slideInterval);
    pauseButton.textContent = 'Resume';
  }
  isPaused = !isPaused;
}

// Обробка подій кнопок
nextButton.addEventListener('click', nextSlide);
prevButton.addEventListener('click', prevSlide);
pauseButton.addEventListener('click', togglePause);

// Автоматичне перегортання слайдів
function startAutoSlide() {
  slideInterval = setInterval(nextSlide, slideIntervalTime);
}
startAutoSlide();

// Обробка клавіатурних подій
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight') {
    nextSlide();
  } else if (event.key === 'ArrowLeft') {
    prevSlide();
  }
});

// Підтримка свайпів на мобільних пристроях і перетягування мишею на десктопі
let startX = 0;
let isTouching = false;

slider.addEventListener('mousedown', (e) => {
  isTouching = true;
  startX = e.pageX;
});

slider.addEventListener('mousemove', (e) => {
  if (isTouching) {
    const moveX = e.pageX - startX;
    if (moveX > 50) {
      prevSlide();
      isTouching = false;
    } else if (moveX < -50) {
      nextSlide();
      isTouching = false;
    }
  }
});

slider.addEventListener('mouseup', () => {
  isTouching = false;
});

slider.addEventListener('touchstart', (e) => {
  isTouching = true;
  startX = e.changedTouches[0].pageX;
});

slider.addEventListener('touchmove', (e) => {
  if (isTouching) {
    const moveX = e.changedTouches[0].pageX - startX;
    if (moveX > 50) {
      prevSlide();
      isTouching = false;
    } else if (moveX < -50) {
      nextSlide();
      isTouching = false;
    }
  }
});

slider.addEventListener('touchend', () => {
  isTouching = false;
});
