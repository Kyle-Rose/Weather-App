currentTemperature = document.getElementById("currentTemperature");
currentConditions = document.getElementById("currentConditions");

const weatherButton = document.getElementById("weatherButton");

async function getTemperature(city) {
    try {
        const response = await fetch(`https://wttr.in/${city}?format=%f`);
        const data = await response.text();
        currentTemperature.textContent = "Temperature: " + data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

async function getConditions(city) {
    try {
        const response = await fetch(`https://wttr.in/${city}?format=%C`);
        const data = await response.text();
        currentConditions.textContent = "Conditions: " + data; + getConditionsIcon(city);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

async function getConditionsIcon(city) {
    try {
        const response = await fetch(`https://wttr.in/${city}?format=%c`);
        const data = await response.text();
        currentConditions.textContent += ` ${data}`;
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}
weatherButton.addEventListener("click", () => {
    const city = document.getElementById("cityInput").value;
    if(!city) {
        alert("Please enter a city name.");
        return;
    }
    getTemperature(city);
    getConditions(city);
});
