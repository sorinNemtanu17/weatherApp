'use strict';

function getWeather() {
  function handleResponse(res) {
    return res.json();
  }

  function getApi(pos) {
    console.log(pos);
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;
    const weatherApiKey = '21d41cb7c7113a0ace7c018ecf3afe5d';
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}`;

    const unitToggle = document.querySelector('[data-unit-toggle]');
    const city = document.querySelector('.city');
    const currentTemp = document.querySelector('.current-temp');
    const iconLink = document.querySelector('#weather img');
    const description = document.querySelector('.description');
    const maxTemp = document.querySelector('.max-temp');
    const minTemp = document.querySelector('.min-temp');

    const storageNameUnit = 'unit';
    //const storageCheckRadio = 'checked'

    let storageUnitValue = localStorage.getItem(storageNameUnit);

    const radioInputs = document.querySelectorAll('[type=radio]');
    for (const radioInput of radioInputs) {
      if (radioInput.value === storageUnitValue) {
        radioInput.checked = true;
      }
    }
    function fetchUrl() {
      fetch(`${weatherApiUrl}`)
        .then(handleResponse)
        .then((data) => {
          renderWeatherInfo(data);
          convertionUnits(data);
          displayTemp();
          console.log(data);
        });
    }
    fetchUrl();
    function displayTemp() {
      currentTemp.textContent = '\u00b0' + storageUnitValue;
      maxTemp.textContent = 'H' + ': ' + '\u00b0' + storageUnitValue;
      minTemp.textContent = 'L' + ': ' + '\u00b0' + storageUnitValue;
    }
    function renderWeatherInfo(data) {
      city.textContent = data.name;
      iconLink.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      description.textContent = data.weather[0].description;
    }
    function convertionUnits(data) {
      unitToggle.addEventListener('change', (e) => {
        if ((e.target.type = 'radio')) {
          inputChange(e);
        }
      });
      function inputChange(e) {
        let unit;
        if (e.target.value === 'units=metric') {
          unit = (data.main.temp - 273.15).toFixed();
          currentTemp.textContent = '\u00b0' + unit;
          maxTemp.textContent = 'H' + ': ' + unit + '\u00b0';
          minTemp.textContent = 'L' + ': ' + unit + '\u00b0';
          localStorage.setItem(storageNameUnit, unit);
        } else {
          unit = ((data.main.temp - 273.15) * 1.8 + 32).toFixed();
          currentTemp.textContent = '\u00b0' + unit;
          maxTemp.textContent = 'H' + ': ' + unit + '\u00b0';
          minTemp.textContent = 'L' + ': ' + unit + '\u00b0';
          localStorage.setItem(storageNameUnit, unit);
        }
      }
    }
  }
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  navigator.geolocation.getCurrentPosition(getApi, error);
}

//getWeather();
const weatherLink = document.querySelector('[href="#weather"]');
weatherLink.addEventListener('click', (e) => {
  const weather = document
    .querySelector('#weather')
    .classList.add('show-weather');
});

let cat = {
  name: 'Bertie',
  breed: 'Cymric',
  color: 'white',
  greeting: function () {
    console.log('Meow!');
  },
};

// Put your code here

const catName = cat['name'];
cat.greeting();
cat['color'] = 'black';

// Don't edit the code below here

let para1 = document.createElement('p');
let para2 = document.createElement('p');

para1.textContent = `The cat's name is ${catName}.`;
para2.textContent = `The cat's color is ${cat.color}.`;

section.appendChild(para1);
section.appendChild(para2);
