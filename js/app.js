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

/*------------------- Ski areas buttons ------------------*/
const areasContainer = document.querySelector('.resorts-container');
const btnAreas = document.querySelector('.areas-btn');

// load items
window.addEventListener('DOMContentLoaded', function () {
  displaySkiResorts(resorts);
  displayAreasButtons();
});

// display ski area buttons
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

  // filter resorts
  const filterBtns = btnAreas.querySelectorAll('.filter-btn');
  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      const category = e.currentTarget.dataset.id;
      filterAndDisplayResorts(category);
    });
  });
}

displayAreasButtons();

// filter resorts based on category and display them
function filterAndDisplayResorts(category) {
  const areasCategory =
    category === 'all'
      ? resorts
      : resorts.filter((item) => item.category === category);

  displaySkiResorts(areasCategory);
}

// display ski resorts
function displaySkiResorts(resorts) {
  let displayResort = resorts
    .map((item) => {
      const { id, title, category, date, img } = item;
      return `<a href="#" class="single-resort" data-resort-id="${id}">
                <img src="${img}" alt="${title}" class="resort-img" />
                <div class="resort-info">
                  <p class="resort-area">${category}</p>
                  <h4>${title}</h4>
                  <p class="resort-date">${date}</p>
                </div>
                <button class="see-more">See More</button>
              </a>`;
    })
    .join('');

  areasContainer.innerHTML = displayResort;

  // redirect users to a single resort page when clicked
  const singleResort = document.querySelectorAll('.single-resort');
  singleResort.forEach((item) => {
    item.addEventListener('click', handleResortClick);
  });
}

// Handles the click event on a resort element and redirects the user to the single resort page
function handleResortClick(event) {
  const resortId = event.currentTarget.dataset.resortId;
  window.location.href = `resort.html?id=${resortId}`;
}
