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
