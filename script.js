const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {
    // Enter your actual API Key below
    const APIKey = '4425ec20ad0938309526ba45d7ccfb41';
    const city = document.getElementById('search-btn').value.trim();

    if (city === '') {
        alert('Please enter a city name.');
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            if (json.cod === '404') {
                container.style.height = '450px';
                weatherBox.classList.remove('active');
                weatherDetails.classList.remove('active');
                error404.classList.add('active');
                return;
            }

            container.style.height = '560px';
            weatherBox.classList.add('active');
            weatherDetails.classList.add('active');
            error404.classList.remove('active');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'clear.jpeg';
                    break;
                case 'Rain':
                    image.src = 'rain.jpeg';
                    break;
                case 'Snow':
                    image.src = 'snow.jpeg';
                    break;
                case 'Clouds':
                    image.src = 'cloud.jpeg';
                    break;
                case 'Mist':
                case 'Haze':
                    image.src = 'Haze.jpeg';
                    break;
                default:
                    image.src = 'normal.jpeg';
            }

            temperature.innerHTML = `${Math.round(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${Math.round(json.wind.speed)} Km/h`;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Could not retrieve weather data. Please try again later.');
        });
});
