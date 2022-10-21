//Vaiáveis e seleção de elementos

const apiKey = "fb1c047c78b250ff1d6d64d2e93debce";
const apiCountryURL = "https://countryflagsapi.com/png/";
const apiUnsplash = "https://source.unsplash.com/1600x900/?";


const cityInput = document.querySelector("#city-input")
const searchBtn = document.querySelector("#search")
const backButton = document.querySelector(".btn-back")

const cityElement = document.querySelector("#city")
const temperatureElement = document.querySelector("#temperature span")
const descriptionElement = document.querySelector("#description")
const weatherIconElement = document.querySelector("#weather-icon")
const countryElement = document.querySelector("#country")
const humidityElement = document.querySelector("#humidity span")
const windElement = document.querySelector("#wind span")

const weatherContainer = document.querySelector("#weather-data")

const errorMessageContainer = document.querySelector("#error-message");
const loader = document.querySelector("#loader");

const suggestionContainer = document.querySelector("#suggestions");
const suggestionButtons = document.querySelectorAll("#suggestions button");


//loader
const toggleLoader = () => {
    loader.classList.toggle("hide")
}


//Funções

const getWeatherData = async (city) => {
    toggleLoader();

    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;
    const res = await fetch(apiWeatherURL);

    toggleLoader();

    return await res.json();
}

//tratamento de erro;

const showErrorMessage = () => {
    errorMessageContainer.classList.remove("hide");
}

const hideInformation = () => {
    errorMessageContainer.classList.add("hide");
    weatherContainer.classList.add("hide");

    suggestionContainer.classList.add("hide");

}

const showWeatherData = async (city) => {
    hideInformation();

    const data = await getWeatherData(city);

    if (data['cod'] === "404") {
        showErrorMessage();
        return;
    }

    cityElement.innerText = data.name;
    temperatureElement.innerText = parseInt(data['main']['temp']);
    descriptionElement.innerText = data['weather'][0].description
    weatherIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${data['weather'][0].icon}.png`);
    countryElement.setAttribute("src", apiCountryURL + data['sys'].country)
    humidityElement.innerText = `${data['main']['humidity']}%`
    windElement.innerText = `${(data['wind'].speed)}km/h`

    // Change bg image
    document.body.style.backgroundImage = `url("${apiUnsplash + city}")`;

    weatherContainer.classList.remove("hide")

}

//Eventos

searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const city = cityInput.value;
    showWeatherData(city);
});

cityInput.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
        const city = e.target.value;
        showWeatherData(city);
    }
});

backButton.addEventListener("click", () => {
    window.location.reload();
})

suggestionButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        const city = btn.getAttribute("id");
        showWeatherData(city);
    });
});


