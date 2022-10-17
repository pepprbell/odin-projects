const reservation = document.querySelector('calendar-button')

function reserve(e) {
  const modal = document.querySelector('.modal')
  e.target.disabled = true
  setTimeout(() => {
    e.target.disabled = false
  }, 2400);

  modal.classList.add('modal-on')

  const modalTimer = () => {
    modal.classList.add('modal-timer')
    setTimeout(modalOff, 2000)
  }

  const modalOff = () => {
    modal.classList.remove('modal-on')
    modal.classList.remove('modal-timer')
  }
  setTimeout(modalTimer, 200)
}

const load = () => {
  const content = document.querySelector('#content')

  const nav = () => {
    const h4s = [domFactory('h4','','home'),domFactory('h4','','menu'),domFactory('h4','','book')]
    const h4Container = domFactory('div','','')
    console.log(h4Container)
    h4s.forEach(h4 => h4Container.appendChild(h4))

    const moon = domFactory('div','moon','')
    const blanket = domFactory('div','','')
    blanket.appendChild(moon)
    blanket.appendChild(h4Container)

    const navDiv = domFactory('div','nav','')
    navDiv.appendChild(blanket)

    // const img = domFactory('div','img','')
    // content.appendChild(img)
    content.appendChild(navDiv)
  }

  const home = () => {

    const h1 = domFactory('h1','','')
    const span = domFactory('span','logo','Butter<br>PamPam')
    h1.appendChild(span)

    const homeDiv = domFactory('div','home','')
    // homeDiv.appendChild(img)
    homeDiv.appendChild(h1)

    content.appendChild(homeDiv)
  }

  const menu = () => {
    const board = domFactory('div','menu-board','')
    for (let i = 0; i <= 4; i++) {
      board.appendChild(domFactory('div','',''))
    }

    const menuDiv = domFactory('div','menu','')
    menuDiv.appendChild(board)

    content.appendChild(menuDiv)
  }

  const book = () => {
    const calendar = domFactory('div','calendar','')
    const button = domFactory('button','calendar-button','reserve')
    const modal = domFactory('div','modal','reserved!')

    const blanket = domFactory('div','','')
    blanket.appendChild(calendar)
    blanket.appendChild(button)
    blanket.appendChild(modal)

    const bookDiv = domFactory('div','book','')
    bookDiv.appendChild(blanket)

    content.appendChild(bookDiv)
    calendarControl = new CalendarControl()
  }

  nav()
  home()
  menu()
  book()
}

const domFactory = (type, className, text) => {
  const element = document.createElement(type)
  className ? element.classList.add(className) : ''
  element.innerHTML = text
  return element
}

const loader = load()

const slide = (e) => {
  const tabs = [document.querySelector('.home'),document.querySelector('.menu'),document.querySelector('.book')]
  const body = document.querySelector('body')
  console.log(e.target.innerHTML)
  switch (e.target.innerHTML) {
    case 'home':
      body.classList.remove('shade')
      tabs[0].style.left = '0'
      tabs[1].style.left = '100vw'
      tabs[2].style.left = '200vw'
      break
    case 'menu':
      body.classList.add('shade')
      tabs[0].style.left = '-100vw'
      tabs[1].style.left = '0'
      tabs[2].style.left = '100vw'
      break
    case 'book':
      body.classList.add('shade')
      tabs[0].style.left = '-200vw'
      tabs[1].style.left = '-100vw'
      tabs[2].style.left = '0'
      break
  }
}

const navButtons = [...document.querySelectorAll('.nav h4')]
navButtons.forEach(navButton => navButton.addEventListener('click',slide))

slide({target:{innerHTML:'menu'}})