// Ініціалізація змінних
const slider = document.querySelector('.slider'); // Знаходимо елемент слайдера на сторінці
const slides = document.querySelectorAll('.slide'); // Збираємо всі слайди в масив
const prevButton = document.querySelector('.prev'); // Знаходимо кнопку для переміщення на попередній слайд
const nextButton = document.querySelector('.next'); // Знаходимо кнопку для переміщення на наступний слайд
const pauseButton = document.querySelector('.pause'); // Знаходимо кнопку для паузи/відновлення слайдера
const indicators = document.querySelectorAll('.indicator'); // Збираємо всі індикатори слайдів (наприклад, кружечки для вказівки активного слайду)
let currentIndex = 0; // Індекс поточного слайду, за замовчуванням перший
let slideInterval; // Змінна для збереження інтервалу автоматичного слайдера
let isPaused = false; // Перемикач для визначення, чи паузований слайдер
const slideIntervalTime = 3000; // Інтервал часу для автоматичного перегортання слайдів (3 секунди)


// Функція для оновлення слайдів
function updateSlider() {
  const offset = -currentIndex * 100; // Вираховуємо відступ для переміщення слайдера (якщо поточний індекс 1, слайдер переміститься на 100% вліво)
  slider.style.transform = `translateX(${offset}%)`; // Застосовуємо стилі для переміщення слайдів
  updateIndicators(); // Оновлюємо індикатори, щоб вказати, який слайд активний
}


// Оновлення індикаторів
function updateIndicators() {
  indicators.forEach((indicator, index) => { // Проходимо по кожному індикатору
    indicator.classList.toggle('active', index === currentIndex); // Додаємо або видаляємо клас 'active', залежно від того, чи індекс цього індикатора відповідає поточному слайду
  });
}


// Навігація вперед
function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length; // Переміщаємося до наступного слайду, циклічно (якщо досягли кінця, повертаємося на початок)
  updateSlider(); // Оновлюємо слайдер
}

// Навігація назад
function prevSlide() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length; // Переміщаємося на попередній слайд, циклічно
  updateSlider(); // Оновлюємо слайдер
}


// Клік по індикатору
indicators.forEach((indicator, index) => { // Для кожного індикатора
  indicator.addEventListener('click', () => { // Додаємо обробник події на клік
    currentIndex = index; // Встановлюємо поточний індекс в залежності від того, на який індикатор натиснули
    updateSlider(); // Оновлюємо слайдер
  });
});


// Запуск/паузування автоматичного слайдера
function togglePause() {
  if (isPaused) { // Якщо слайдер на паузі
    slideInterval = setInterval(nextSlide, slideIntervalTime); // Відновлюємо автоматичне перегортання слайдів
    pauseButton.textContent = 'Pause'; // Змінюємо текст на кнопці на "Pause"
  } else { // Якщо слайдер не на паузі
    clearInterval(slideInterval); // Зупиняємо автоматичне перегортання
    pauseButton.textContent = 'Resume'; // Змінюємо текст на кнопці на "Resume"
  }
  isPaused = !isPaused; // Перемикаємо статус паузи
}


// Обробка подій кнопок
nextButton.addEventListener('click', nextSlide); // Кнопка "Next" — перегортає на наступний слайд
prevButton.addEventListener('click', prevSlide); // Кнопка "Prev" — перегортає на попередній слайд
pauseButton.addEventListener('click', togglePause); // Кнопка "Pause/Resume" — ставить слайдер на паузу або відновлює його


// Автоматичне перегортання слайдів
function startAutoSlide() {
  slideInterval = setInterval(nextSlide, slideIntervalTime); // Запускаємо автоматичне перегортання слайдів з певним інтервалом
}
startAutoSlide(); // Викликаємо функцію для запуску слайдера


// Обробка клавіатурних подій
document.addEventListener('keydown', (event) => { // Додаємо обробник події на натискання клавіатури
  if (event.key === 'ArrowRight') { // Якщо натиснута клавіша "ArrowRight" (стрілка вправо)
    nextSlide(); // Переміщаємо на наступний слайд
  } 
  else if (event.key === 'ArrowLeft') { // Якщо натиснута клавіша "ArrowLeft" (стрілка вліво)
    prevSlide(); // Переміщаємо на попередній слайд
  }
});




// Підтримка свайпів на мобільних пристроях і перетягування мишею на десктопі
let startX = 0; // Початкова координата X для свайпу/перетягування
let isTouching = false; // Перемикач для визначення, чи відбувається свайп або перетягування

slider.addEventListener('mousedown', (e) => { // Обробка події початку перетягування миші
  isTouching = true; // Встановлюємо, що ми в процесі перетягування
  startX = e.pageX; // Запам'ятовуємо початкову позицію миші по осі X
});

slider.addEventListener('mousemove', (e) => { // Обробка події руху миші
  if (isTouching) { // Якщо ми в процесі перетягування
    const moveX = e.pageX - startX; // Вираховуємо зміщення миші по осі X
    if (moveX > 50) { // Якщо зміщення більше 50px вправо
      prevSlide(); // Переміщаємо на попередній слайд
      isTouching = false; // Завершуємо процес перетягування
    } else if (moveX < -50) { // Якщо зміщення більше 50px вліво
      nextSlide(); // Переміщаємо на наступний слайд
      isTouching = false; // Завершуємо процес перетягування
    }
  }
});

slider.addEventListener('mouseup', () => { // Обробка події завершення перетягування миші
  isTouching = false; // Завершуємо процес перетягування
});

slider.addEventListener('touchstart', (e) => { // Обробка події початку свайпу на мобільному пристрої
  isTouching = true; // Встановлюємо, що ми в процесі свайпу
  startX = e.changedTouches[0].pageX; // Запам'ятовуємо початкову позицію свайпу по осі X
});

slider.addEventListener('touchmove', (e) => { // Обробка події руху пальця під час свайпу
  if (isTouching) { // Якщо ми в процесі свайпу
    const moveX = e.changedTouches[0].pageX - startX; // Вираховуємо зміщення пальця по осі X
    if (moveX > 50) { // Якщо зміщення більше 50px вправо
      prevSlide(); // Переміщаємо на попередній слайд
      isTouching = false; // Завершуємо процес свайпу
    } else if (moveX < -50) { // Якщо зміщення більше 50px вліво
      nextSlide(); // Переміщаємо на наступний слайд
      isTouching = false; // Завершуємо процес свайпу
    }
  }
});

slider.addEventListener('touchend', () => { // Обробка події завершення свайпу на мобільному пристрої
  isTouching = false; // Завершуємо процес свайпу
});
