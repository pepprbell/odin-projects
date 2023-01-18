const key = '855ca86de94d46e59cd4dd9314b422d1'
const input = document.querySelector('input')
let timezone = 0

window.addEventListener('load', console.log('loading'))
input.addEventListener('keydown', keyHandler)

setTime()
setInterval(setTime, 1000)

getWeather('Seoul')

function keyHandler(e) {
  if (e.keyCode != '13') { return }
  if (!input.value) { return }
  getWeather()
  resetInput()
}

// todo
// 
// 

function getWeather(place) {
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
      .catch(err => {
        console.log(err)
      })
    
    console.log(res)
    if (res.cod != 200) {
      input.setCustomValidity(`${res.message}`)
      input.reportValidity()
      return false
    } else {
      input.setCustomValidity('')
      return res
    }

  }

  // const geo = fetchGeocoding(input.value)
  let weatherData;
  if (place) {
    weatherData = fetchWeather(place)
  } else {
    weatherData = fetchWeather(input.value)
    console.log(weatherData)
  }

  weatherData.then(data => {
    if (data.cod == 200) {
      showData(weatherData)
    }
  })
}

function showData(promise) {
  promise.then(res => {
    setHTML(res)
    setBackground(res)
  })
  // sunny, cloudy, rainy, weather_snowy

  function setHTML(data) {
    const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`

    document.querySelector('#weather').innerHTML = `${data.weather[0].main}<img src=""></img>`
    document.querySelector('#weather img').src = `${iconUrl}`

    document.querySelector('#description').innerText = `${data.weather[0].description}`
    document.querySelector('#place').innerText = `${data.name}`
    document.querySelector('#temperature').innerText = `${Math.round(data.main.temp - 273.15)}°C`
    document.querySelector('#feels_like h3').innerText = `${Math.round(data.main.feels_like - 273.15)}°C`
    document.querySelector('#humidity h3').innerText = `${data.main.humidity}%`
    document.querySelector('#wind h3').innerText = `${data.wind.speed}km/h`
  }

  function setBackground(data) {
    
  }
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

function resetInput() {
  input.value = ''
}