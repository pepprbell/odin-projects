const key = '855ca86de94d46e59cd4dd9314b422d1'
const input = document.querySelector('input')
let timezone = 0

// window.addEventListener('load', )
input.addEventListener('keydown', keyHandler)

setTime()
setInterval(setTime, 1000)

function keyHandler(e) {
  if (e.keyCode != '13') { return }
  getWeather()
}

function getWeather() {
  async function fetchGeocoding() {
    const city_name = input.value.substring(0,1).toUpperCase()+input.value.substring(1).toLowerCase()
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city_name}&limit=1&appid=${key}`
    const res = await fetch(url).catch(e => console.log(e))
    console.log(res)
    // return lat, lon
    return res
  }

  async function fetchWeather() {
    const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${geo[0]}&lon=${geo[1]}&exclude=minutely,hourly,alerts&appid=${key}`
    const res = await fetch(url).catch(err => console.log(err))
    return res
  }

  // fetchGeocoding에서 lat, lon 받아와서 fetchWeather
  const geo = fetchGeocoding(input.value)
  const weatherData = fetchWeather()
  // 데이터 표시
  showData(weatherData)
}

function showData(data) {
  // sunny, cloudy, rainy, weather_snowy
  document.querySelector('#weather').innerHTML = `${weather} <span class="material-symbols-outlined">${weather_icon}</span>`
  document.querySelector('#place').innerHTML = `${place}`
  document.querySelector('#temperature').innerHTML = `${temperature}°C`
  document.querySelector('#feels_like h3').innerHTML = `${feels_like}°C`
  document.querySelector('#humidity h3').innerHTML = `${humidity}%`
  document.querySelector('#rain h3').innerHTML = `${chance_of_rain}%`
  document.querySelector('#wind h3').innerHTML = `${wind_speed}km/h`
}

function setTime() {
  const date = document.querySelector('#date')
  const time = document.querySelector('#time')

  const now = new Date()
  let year = now.getFullYear()
  let month = now.getMonth()
  let today = now.getDate()

  date.innerHTML = `${year}. ${month+1}. ${today}.`



  let hour = now.getHours()
  let minute = now.getMinutes()
  let second = now.getSeconds()
  let ampm;

  if (hour >= 12) {
    ampm = 'PM'
    if (hour > 12) {
      hour = hour - 12
    }
  } else {
    ampm = 'AM'
  }

  if (minute < 10) {
    minute = '0' + minute
  }

  if (second % 2) {
    time.innerHTML = `${hour}<span>:</span>${minute} ${ampm}`
  } else {
    time.innerHTML = `${hour}<span style='opacity:0'>:</span>${minute} ${ampm}`
  }
  
}