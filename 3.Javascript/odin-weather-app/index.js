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
  // async function fetchGeocoding() {
  //   const city_name = input.value.substring(0,1).toUpperCase()+input.value.substring(1).toLowerCase()
  //   const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city_name}&limit=1&appid=${key}`
  //   let res;
  //   const fetching = await fetch(url, { mode: 'cors' })
  //     .then(response => response.json())
  //     .then(data => {
  //       res = [data[0].lat,data[0].lon]
  //     })
  //     .catch(e => console.log(e))
  //   return res // [lat, lon]
  // }

  async function fetchWeather(city_name) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${key}`
    let res;
    const fetching = await fetch (url)
      .then(response => response.json())
      .then(data => {
        res = data
      })
      .catch(err => console.log(err))
    console.log(res)
    return res
  }

  // const geo = fetchGeocoding(input.value)
  const weatherData = fetchWeather(input.value)
  // 데이터 표시
  showData(weatherData)
}

function showData(data) {
  // sunny, cloudy, rainy, weather_snowy
  document.querySelector('#weather').innerText = `${data.weather.main}`
  document.querySelector('#place').innerHTML = `${data.name}`
  document.querySelector('#temperature').innerHTML = `${Math.round(data.main.temp - 273.15)}°C`
  document.querySelector('#feels_like h3').innerHTML = `${Math.round(data.main.feels_like - 273.15)}°C`
  document.querySelector('#humidity h3').innerHTML = `${data.main.humidity}%`
  document.querySelector('#wind h3').innerHTML = `${data.wind.speed}km/h`
}

function setTime() {
  // 시차 적용
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
    time.innerHTML = `${hour}<span style='opacity:0'>:</span>${minute} ${ampm}`
  } else {
    time.innerHTML = `${hour}<span>:</span>${minute} ${ampm}`
  }
  
}