// Зміна слайдів (управління вперед/назад)

let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const slider = document.getElementById('slider');

function showSlide(index) {
  if (index >= totalSlides) {
    currentSlide = 0;
  } else if (index < 0) {
    currentSlide = totalSlides - 1;
  } else {
    currentSlide = index;
  }
  slider.style.transform = `translateX(-${currentSlide * 100}%)`;
  updateIndicators();
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

function prevSlide() {
  showSlide(currentSlide - 1);
}

// Автоматичне перегортання слайдів:
let autoSlideInterval;

function startAutoSlide() {
  autoSlideInterval = setInterval(nextSlide, 3000); // змінюємо слайд кожні 3 секунди
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

document.getElementById('pause').addEventListener('click', () => {
  if (autoSlideInterval) {
    stopAutoSlide();
    document.getElementById('pause').textContent = 'Resume';
  } else {
    startAutoSlide();
    document.getElementById('pause').textContent = 'Pause';
  }
});

startAutoSlide(); // Почати автоматичний перехід при завантаженні


// Індикатори поточного слайду:
function createIndicators() {
    const indicatorsContainer = document.getElementById('indicators');
    for (let i = 0; i < totalSlides; i++) {
      const indicator = document.createElement('span');
      indicator.classList.add('indicator');
      indicator.addEventListener('click', () => showSlide(i));
      indicatorsContainer.appendChild(indicator);
    }
  }
  
  function updateIndicators() {
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === currentSlide);
    });
  }
  
  createIndicators();
  updateIndicators();

  
//Управління клавіатурними командами:
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
      nextSlide();
    } else if (event.key === 'ArrowLeft') {
      prevSlide();
    }
  });

  
// Підтримка тач-жестів (для мобільних пристроїв):
let startX;
let endX;

slider.addEventListener('touchstart', (event) => {
  startX = event.touches[0].clientX;
});

slider.addEventListener('touchend', (event) => {
  endX = event.changedTouches[0].clientX;
  if (startX > endX + 50) {
    nextSlide(); // свайп вправо
  } else if (startX < endX - 50) {
    prevSlide(); // свайп вліво
  }
});


//Перетягування мишею на десктопі:
let isDragging = false;
let dragStartX;

slider.addEventListener('mousedown', (event) => {
  isDragging = true;
  dragStartX = event.clientX;
});

slider.addEventListener('mousemove', (event) => {
  if (isDragging) {
    const dragDistance = dragStartX - event.clientX;
    if (dragDistance > 50) {
      nextSlide();
      isDragging = false;
    } else if (dragDistance < -50) {
      prevSlide();
      isDragging = false;
    }
  }
});

slider.addEventListener('mouseup', () => {
  isDragging = false;
});


// ВИСНОВОК
// Перемикання слайдів вручну через кнопки навігації та індикатори.
// // Автоматичне перегортання слайдів з паузою/відновленням.
// Управління через клавіатурні команди та тач-жести.
// Інтуїтивно зрозуміле та ефективне використання JavaScript та DOM.
// слайдер, який можна адаптувати під різні пристрої, підтримує як десктопні, так і мобільні платформи, і має можливість інтуїтивно керувати зміною слайдів.