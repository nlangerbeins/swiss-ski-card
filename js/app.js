import resorts from './data.js';

// Numbers
const items = [...document.querySelectorAll('#number')];

const updateCount = (el) => {
  const value = parseInt(el.dataset.value);
  const increment = Math.ceil(value / 1000);
  let initial = 0;

  const increaseCount = setInterval(() => {
    initial += increment;

    if (initial > value) {
      el.textContent = value;
      clearInterval(increaseCount);
      return;
    }

    el.textContent = initial;
  }, 10);
};

items.forEach((i) => updateCount(i));

// Slides
const slides = document.querySelectorAll('.single-slide');
slides.forEach((el) => {
  el.addEventListener('mouseover', () => {
    removeFocus();
    el.classList.add('selected');
  });

  const removeFocus = () => {
    slides.forEach((item) => {
      item.classList.remove('selected');
    });
  };
});

// Questions
const questions = document.querySelectorAll('.question');

questions.forEach((question) => {
  const btn = question.querySelector('.question-btn');

  btn.addEventListener('click', () => {
    questions.forEach((item) => {
      if (item !== question) {
        item.classList.remove('show-text');
      }
    });
    question.classList.toggle('show-text');
  });
});

// Hamburger Button
const hamburger = document.querySelector('.hamburger-btn');
const navMenu = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navMenu.classList.toggle('open');
});

const links = document.querySelectorAll('.nav-link');
links.forEach((link) =>
  link.addEventListener('click', function () {
    hamburger.classList.remove('open');
    navMenu.classList.remove('open');
  })
);

document.querySelector('.nav-logo').addEventListener('click', () => {
  hamburger.classList.remove('open');
  navMenu.classList.remove('open');
});

// Header Background change on scroll
window.addEventListener('scroll', () => {
  if (window.scrollY >= window.innerHeight - 700) {
    document.querySelector('.navbar').classList.add('active');
    document.querySelector('.nav-logo').classList.add('logo-active');
  } else {
    document.querySelector('.navbar').classList.remove('active');
    document.querySelector('.nav-logo').classList.remove('logo-active');
  }
});

// Ski areas buttons

const areasContainer = document.querySelector('.resorts-container');
const btnAreas = document.querySelector('.areas-btn');

// load items
window.addEventListener('DOMContentLoaded', function () {
  displaySkiResorts(resorts);
  displayAreasButtons();
});

function displaySkiResorts(skiResorts) {
  let displayResort = skiResorts.map((item) => {
    return `<a href="" class="single-resort">
            <img src=${item.img} alt=${item.title} class="resort-img" />
            <div class="resort-info">
              <p class="resort-area">${item.category}</p>
              <h4>${item.title}</h4>
              <p class="resort-date">${item.date}</p>
            </div>
            <button class="see-more">see more</button>
          </a>`;
  });
  displayResort = displayResort.join('');

  areasContainer.innerHTML = displayResort;
}

function displayAreasButtons() {
  const areas = resorts.reduce(
    function (values, item) {
      if (!values.includes(item.category)) {
        values.push(item.category);
      }
      return values;
    },
    ['all']
  );

  const categoryBtns = areas
    .map((item) => {
      return `<button class="filter-btn" type="button" data-id=${item}>${item}</button>`;
    })
    .join('');

  btnAreas.innerHTML = categoryBtns;

  // filter items
  const filterBtns = btnAreas.querySelectorAll('.filter-btn');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      const category = e.currentTarget.dataset.id;
      const areasCategory = resorts.filter((item) => {
        if (item.category === category) {
          return item;
        }
      });

      //   console.log(areasCategory);
      if (category === 'all') {
        displaySkiResorts(resorts);
      } else {
        displaySkiResorts(areasCategory);
      }
    });
  });
}
