const cityInput = document.getElementById("cityInput");
const weatherButton = document.getElementById("weatherButton");
const outputLocation = document.getElementById("Location");
const outputTemperature = document.getElementById("Temperature");
const outputConditions = document.getElementById("Conditions");
const outputHumidity = document.getElementById("Humidity");
const outputWind = document.getElementById("Wind");

async function fetchWeather(city) {
    const sanitizedCity = city.trim();
    if (!sanitizedCity) {
        alert("Please enter a city name.");
        return;
    }

    try {
        const [locationResp, tempResp, conditionResp, iconResp, humidityResp, windResp] = await Promise.all([
            fetch(`https://wttr.in/${encodeURIComponent(sanitizedCity)}?format=j1`),
            fetch(`https://wttr.in/${encodeURIComponent(sanitizedCity)}?format=%f`),
            fetch(`https://wttr.in/${encodeURIComponent(sanitizedCity)}?format=%C`),
            fetch(`https://wttr.in/${encodeURIComponent(sanitizedCity)}?format=%c`),
            fetch(`https://wttr.in/${encodeURIComponent(sanitizedCity)}?format=%h`),
            fetch(`https://wttr.in/${encodeURIComponent(sanitizedCity)}?format=%w`)
        ]);

        const locationData = await locationResp.json();
        const area = locationData.nearest_area[0];
        const exactLocation = `${area.areaName[0].value}, ${area.region[0].value}, ${area.country[0].value}`;
        if (outputLocation) outputLocation.textContent = exactLocation;

        const tempText = (await tempResp.text()).trim();
        const conditionText = (await conditionResp.text()).trim();
        const iconText = (await iconResp.text()).trim();
        const humidityText = (await humidityResp.text()).trim();
        const windText = (await windResp.text()).trim();

        if (outputTemperature) outputTemperature.textContent = `Temperature: ${tempText}`;
        if (outputConditions) outputConditions.textContent = `Conditions: ${conditionText} ${iconText}`;
        if (outputHumidity) outputHumidity.textContent = `Humidity: ${humidityText}`;
        if (outputWind) outputWind.textContent = `Wind: ${windText}`;

    } catch (error) {
        console.error("Error fetching weather data:", error);
        if (outputTemperature) outputTemperature.textContent = "Temperature: Unable to fetch";
        if (outputConditions) outputConditions.textContent = "Conditions: Unable to fetch";
        if (outputLocation) outputLocation.textContent = "Location: Unable to fetch";
        if (outputHumidity) outputHumidity.textContent = "Humidity: Unable to fetch";
        if (outputWind) outputWind.textContent = "Wind: Unable to fetch";
    }
}

weatherButton.addEventListener("click", () => {
    fetchWeather(cityInput.value);
});


cityInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        fetchWeather(cityInput.value);
    }
});