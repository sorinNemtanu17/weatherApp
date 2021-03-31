'use strict';

function getWeather() {
  function handleResponse(res) {
    return res.json();
  }
  function getApi(pos) {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;

    const city = document.querySelector('.city');
    const currentTemp = document.querySelector('.current-temp');
    const iconLink = document.querySelector('#weather img');
    const description = document.querySelector('.description');
    const maxTemp = document.querySelector('.max-temp');
    const minTemp = document.querySelector('.min-temp');

    const storageName = 'unit';
    const radioInputs = document.querySelectorAll('[type=radio]');

    let getValue;
    if (localStorage.getItem(storageName) === null) {
      getValue = document.querySelector('input[value="units=metric"]').value;
    } else {
      getValue = localStorage.getItem(storageName);
    }

    const weatherApiKey = '21d41cb7c7113a0ace7c018ecf3afe5d';
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}`;

    fetchUrl();
    function fetchUrl() {
      fetch(`${weatherApiUrl}&${getValue}`)
        .then(handleResponse)
        .then((data) => {
          city.textContent = data.name;
          iconLink.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
          description.textContent = data.weather[0].description;

          currentTemp.textContent = data.main.temp.toFixed() + '\u00b0';
          maxTemp.textContent =
            'H' + ': ' + data.main.temp_max.toFixed() + '\u00b0';
          minTemp.textContent =
            'L' + ': ' + data.main.temp_min.toFixed() + '\u00b0';
          checkRadio();
        });
    }
    function checkRadio() {
      for (const radioInput of radioInputs) {
        if (radioInput.value === getValue) {
          radioInput.checked = true;
        }
        radioInput.addEventListener('change', updateTemp);
      }
    }
    function updateTemp(e) {
      getValue = e.target.value;
      localStorage.setItem(storageName, getValue);
      fetchUrl();
    }
  }
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  navigator.geolocation.getCurrentPosition(getApi, error);
}
getWeather();

const weatherLink = document.querySelector('[href="#weather"]');
weatherLink.addEventListener('click', (e) => {
  const weather = document
    .querySelector('#weather')
    .classList.add('show-weather');
});
