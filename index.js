const githubs = [...document.querySelectorAll('.github')]

githubs.forEach(github => {
  github.addEventListener('click', goGithub)
})

function goGithub(e) {
  let div = e.target
  if (e.target.tagName === 'IMG') {
    div = e.target.parentElement
  }
  window.open(div.id, '_blank', '')
}