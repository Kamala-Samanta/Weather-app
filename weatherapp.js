const cityInput = document.querySelector(".cityInput");
const weatherForm = document.querySelector(".weatherForm");
const apikey = "961b9bbbbd20811e513270fd35cebf86";//from sdc lab :)
const card = document.querySelector(".card");

weatherForm.addEventListener("submit", async event =>{
    event.preventDefault();
    card.innerHTML = "";
    const city = cityInput.value;
    const url =
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

    if(city){
        try{
            const request = await fetch(url);
            const response = await request.json();
            displayweather(response);
            console.log(response);
        }
        catch(error){
            const errormsg = "some error occured while fetching";
            handleError(errormsg);
            console.error("Error fetching weather data:", error);
        }

        cityInput.value = "";

    }
    else{
        const errormsg2 = "please enter a city"; 
        handleError(errormsg2);
    }
});

function displayweather(data){
    const inputcity = document.createElement("h1");
    const temp = document.createElement("p");
    const humidity = document.createElement("p");
    const inputdescription = document.createElement("p");
    const emoji = document.createElement("p");
    const date = document.createElement("p");

    inputcity.classList.add("cityDisplay");
    temp.classList.add("tempDisplay");
    humidity.classList.add("humidityDisplay");
    inputdescription.classList.add("description");
    emoji.classList.add("emoji");
    date.classList.add("dateDisplay");

    inputcity.innerText = data.name;
    temp.innerText = (data.main.temp - 273.15).toFixed(1) + "°C";
    humidity.innerText = "Humidity: " + data.main.humidity + "%";
    inputdescription.innerText = data.weather[0].description;
    theEmoji = emojiMaker(data.weather[0].id);
    emoji.innerText = theEmoji;

    date.innerText = getDate(data.dt);

    
    

    card.appendChild(inputcity);
    card.appendChild(date);
    card.appendChild(temp);
    card.appendChild(humidity);
    card.appendChild(inputdescription);
    card.appendChild(emoji);


    card.style.display = "flex";
    
}

function emojiMaker(id) {
    if(id >= 200 && id <= 232){
        return "⛈️";
    }
    else if(id >= 300 && id <= 321){
        return "🌦️";
    }
    else if(id >= 500 && id <= 531){
        return "🌧️";
    }
    else if(id >= 600 && id <= 622){
        return "❄️";
    }
    else if(id >= 701 && id <= 781){
        return "🌫️";
    }
    else if(id === 800){
        return "☀️";
    }
    else if(id >= 801 && id <= 804){
        return "☁️";
    }
    else{
        return "🌈";
    }
}


function handleError(msg){
    const errorDisplay = document.createElement("p");
    errorDisplay.classList.add("errorDisplay");
    errorDisplay.innerText = `Error: ${msg}`;
    card.appendChild(errorDisplay);
    card.style.display = "flex";
}


function getDate(dt){
  const date = new Date(dt * 1000);
  const day = date.toLocaleDateString("en-US", { weekday: "short" }); // e.g., "Saturday"
  const fullDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }); // e.g., "May 24, 2025"
  return (`${day}, ${fullDate}`); // e.g., "Saturday, May 24, 2025"
}


// <div class="card">
//   <h1 class="cityDisplay">CityName</h1>
//   <p class="dateDisplay">Saturday, May 24, 2025</p>
//   <p class="tempDisplay">Temperature</p>
//   <p class="humidityDisplay">Humidity</p>
//   <p class="description">Clear skies</p>
//   <p class="emoji">☀️</p>
//   <p class="errorDisplay">Please enter a city</p>
// </div>;

