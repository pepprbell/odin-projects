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