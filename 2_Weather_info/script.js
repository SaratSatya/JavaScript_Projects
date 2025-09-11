document.addEventListener('DOMContentLoaded', ()=>{
    const cityInput=document.getElementById('city-input');
    const getWeatherBtn=document.getElementById('get-weather-btn');
    const weatherInfo=document.getElementById('weather-info');
    const cityNameDisplay=document.getElementById('city-name');
    const temperatureDisplay=document.getElementById('temperature');
    const descriptionDisplay=document.getElementById('description');
    const errorMessage=document.getElementById('error-message');

    const API_KEY='275df181237a95608b0d6a6ffd66a9c6'; //env variables

    getWeatherBtn.addEventListener('click', async()=>{
        const city=cityInput.value.trim();
        if(!city) return ;
        try{
            const weatherData=await fetchWeatherData(city);
            displayWeatherData(weatherData);
        }catch(error){
            showError();
        }        
        } )

        async function fetchWeatherData(city){
            //gets the data

            //whenever we make a request to the server always keep this two in mind
            //First is that the response may throw error indicating that request should be wrapped in try,catch block
            //The response may take some time to reach user indicating that the web request should be wrapped in async,await block
            const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;     
            const response=await fetch(url);
            if(!response.ok){
                throw new Error(error.message);
            }
            console.log(response);
            console.log(typeof response);
            const result = await response.json();
            console.log(result);
            return result;
          
        }

        function displayWeatherData(data){
            //displays the data
            const {name,main,weather}=data;
            weatherInfo.classList.remove('hidden');
            errorMessage.classList.add('hidden');
            cityNameDisplay.textContent=name;
            temperatureDisplay.textContent=`${main.temp} °C`;
            descriptionDisplay.textContent=weather[0].description;

        }

        function showError(message){
            weatherInfo.classList.add('hidden');
            errorMessage.classList.remove('hidden');
        }

})