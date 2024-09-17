document.getElementById('getWeather').addEventListener('click', function() {
    const city = document.getElementById('city').value.trim();
    if (city === '') {
        alert('Please enter a city name');
        return;
    }

    const apiKey = 'f159b717c7d0abf612720eb81d3b9c66'; // Replace with your actual API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            console.log('Response received:', response);
            return response.json();
        })
        .then(data => {
            console.log('Data received:', data);

            // Check if the city was not found
            if (data.cod === '404') {
                console.log('City not found, data:', data);
                alert('City not found!');
                return;
            }

            // If city is found, update the UI with the fetched data
            document.getElementById('cityName').innerText = data.name;
            document.getElementById('temperature').innerText = `Temperature: ${data.main.temp}°C`;
            document.getElementById('weatherCondition').innerText = `Condition: ${data.weather[0].description}`;
            
            const iconCode = data.weather[0].icon;
            const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
            document.getElementById('weatherIcon').src = iconUrl;
        })
        // .catch(error => {
        //     console.error('Error fetching the weather data:', error);
        //     alert('Failed to retrieve weather data. Please try again later.');
        // });
});
