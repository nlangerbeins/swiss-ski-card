import resorts from './data.js';

const resortDOM = document.querySelector('.singleResort-wrapper');

document.addEventListener('DOMContentLoaded', function () {
  const urlParams = new URLSearchParams(window.location.search);
  const resortId = urlParams.get('id');

  // find the resort with the matching ID
  const selectedResort = resorts.find((resort) => resort.id == resortId);

  // display the information about the selected resort
  if (selectedResort) {
    displayResortInfo(selectedResort);
  } else {
    console.error('Resort not found');
  }
});

// display resort description
function displayResortInfo(resort) {
  const { title, category, date, img, desc } = resort;

  resortDOM.innerHTML = `<div class="singleResort-container">
              <img src=${img} alt=${title} class="singleResort-img" />
              <div class="singleResort-info">
                <h4 class="singleResort-area">${category}</h4>
                <h3 class="singleResort-name">${title}</h3>
                <p class="singleResort-date">${date}</p>
                <p class="singleResort-desc">${desc}</p>
              </div>
            </div>`;
}

// relocate back to main page
const btnBackHome = document.querySelector('.resort-btn');
btnBackHome.addEventListener('click', (e) => {
  e.preventDefault();

  history.go(-1);
});
