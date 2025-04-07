const apiKey = "8d70c0aa4841015a5079b78dee3e55b0"; 

function getWeather() {
    const cityInput = document.getElementById("cityInput").value.trim();
    const weatherInfo = document.getElementById("weatherInfo");

    if (cityInput === "") {
        weatherInfo.innerHTML = "<p class='error'>Please enter a city name!</p>";
        return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => {
            console.log("Response:", response);
            if (!response.ok) {
                throw new Error("City not found or API issue");
            }
            return response.json();
        })
        .then(data => {
            console.log("Data:", data); 
            const cityName = data.name;
            const temperature = data.main.temp;
            const description = data.weather[0].description;
            weatherInfo.innerHTML = `
                <h2>${cityName}</h2>
                <p>Temperature: ${temperature}°C</p>
                <p>Description: ${description}</p>
            `;
        })
        .catch(error => {
            console.log("Error:", error); 
            weatherInfo.innerHTML = `<p class='error'>Error: ${error.message}</p>`;
        });
}

// Search on Enter key
document.getElementById("cityInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        getWeather();
    }
});