const weatherForm = document.querySelector('form');
const search =document.querySelector('#search-bar');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const temperature = document.getElementById('temperature')
const address = document.getElementById('address')
const time = document.getElementById('time');
const condition = document.getElementById('condition');
const wind = document.getElementById('wind');
const humidity = document.getElementById('humidity');
const is_day = document.getElementById('is_day');
const img = document.getElementById('img');
const img_forecast = document.getElementById('img-forecast')
const temperature_forecast = document.getElementById('temperature-forecast');
const avg_humidity = document.getElementById('avg-humidity');
const rain = document.getElementById('rain');
const mintem = document.getElementById('mintem');
const sunrise = document.getElementById('sunrise');
const sunset = document.getElementById('sunset');
const condition_forecast =document.getElementById('condition-forecast');

const dataFetch = (location) => {
    messageOne.textContent = 'Loading ...'

    fetch(`/weather?address=${location}`).then(response => {
        response.json().then(data => {
            if(data.error)
                messageOne.textContent = data.error;
            else{
                if(data.forecast.current.is_day)
                    is_day.textContent = "Day";
                else is_day.textContent = "Night"
                condition_forecast.textContent = data.forecast.forecast.forecastday[0].day.condition.text;
                sunrise.textContent = data.forecast.forecast.forecastday[0].astro.sunrise;
                sunset.textContent = data.forecast.forecast.forecastday[0].astro.sunset;
                mintem.textContent = data.forecast.forecast.forecastday[0].day.mintemp_c + '°C';
                avg_humidity.textContent = data.forecast.forecast.forecastday[0].day.avghumidity;
                rain.textContent = data.forecast.forecast.forecastday[0].day.daily_chance_of_rain + '%';
                temperature_forecast.textContent = data.forecast.forecast.forecastday[0].day.maxtemp_c + '°';
                img_forecast.setAttribute('src', data.forecast.forecast.forecastday[0].day.condition.icon)
                img.setAttribute('src', data.forecast.current.condition.icon);
                humidity.textContent = data.forecast.current.humidity;
                wind.textContent = data.forecast.current.wind_dir + ' ' + data.forecast.current.wind_mph+ 'mph'
                condition.textContent = data.forecast.current.condition.text;
                address.textContent=data.location;
                time.textContent=data.forecast.location.localtime;
                temperature.textContent = data.forecast.current.temp_c + '°';
                messageOne.textContent = data.location;
            }
        })
    })
}

dataFetch('New Delhi');

weatherForm.addEventListener('submit',(e) => {
    e.preventDefault(); 
    const location = search.value;
    dataFetch(location)
})