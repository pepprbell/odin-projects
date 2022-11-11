function editDOM() {
  const right = document.querySelector('.right')
  const projectList = document.querySelector('.project-list')

  const tag = (tagName, className) => {
    const newTag = document.createElement(tagName)
    className ? newTag.classList.add(className) : ''
    return newTag
  }

  const iconLibrary = (what) => {
    let icon = document.createElement('span')
    icon.classList.add('material-symbols-outlined')
    if (what === 'more') {
      icon.innerHTML = 'more_horiz'
    } else if (what === 'list') {
      icon.innerHTML = 'checklist'
    } else if (what === 'due') {
      icon.innerHTML = 'calendar_today'
    } else if (what === 'delete') {
      icon.innerHTML = 'delete'
    }
    return icon
  }

  const buttons = () => {
    const li = tag('li','buttons')
    const colors = ['red','yellow','green','blue']
    const icons = ['🔥','⚡','🌱','💧']
    for (let i = 0; i < 4; i++) {
      const color = colors[i];
      const label = tag('label',color)
      label.for = color
      label.innerHTML = icons[i]

      const input = tag('input')
      input.type = 'radio'
      input.name = 'button'
      input.id = color
      label.appendChild(input)
      li.appendChild(label)
    }
    return li
  }

  const initialDom = () => {}
  const creatingProject = () => {}
  const saveProject = (value) => {
    const project = document.querySelector('.creating-project')
    const projectBody = document.querySelector('.creating-project .project-body')
    project.classList.remove('creating-project')
    projectBody.removeChild(projectBody.firstChild)

    // create project header
    const projectHeader = tag('header','project-header')
    const projectName = tag('input')
    projectName.value = value
    const more = tag('div','more')
    more.appendChild(iconLibrary('more'))
    projectHeader.appendChild(projectName)
    projectHeader.appendChild(more)
    project.insertBefore(projectHeader,projectBody)

    // create 'add a todo' button
    projectBody.removeChild(projectBody.firstChild)
    const addTodo = tag('li','add-todo')
    const text = tag('h3')
    text.innerHTML = '+ Add a todo'
    addTodo.appendChild(text)
    projectBody.appendChild(addTodo)

    // add project to project list (left)
    const thisProject = tag('li')
    thisProject.appendChild(iconLibrary('list'))
    const thisProjectH2 = tag('h2')
    thisProjectH2.innerHTML = value
    thisProject.appendChild(thisProjectH2)
    projectList.appendChild(thisProject)

    // add 'add a project' button
    const section = tag('div','section')
    const addProject = tag('div','project')
    addProject.classList.add('add-project')
    section.appendChild(addProject)
    right.appendChild(section)

    return projectBody
  }
  const newTodo = (savedProjectBody) => {
    const todo = tag('li','todo')
    todo.classList.add('creating')

    // add todo header
    const todoHeader = tag('header','todo-header')
    const todoHeaderSpan = tag('span')
    const todoInput = tag('input')
    todoInput.type = 'text'
    todoInput.placeholder = '무슨 일이 일어나고 있나요?'
    todoHeaderSpan.appendChild(todoInput)
    todoHeader.appendChild(todoHeaderSpan)
    todo.appendChild(todoHeader)

    // add todo body
    const todoBody = tag('ul','todo-body')
    todoBody.appendChild(buttons())
    todo.appendChild(todoBody)
    savedProjectBody.insertBefore(todo, savedProjectBody.lastChild)
    todoInput.focus()
  }
  const saveTodo = () => {}
  const expandedTodo = () => {}

  const editTag = () => {}
  return { tag, saveProject, newTodo, expandedTodo }
}

function operate() {
  function addProject (e) {
    if (e.type != 'focusout' && e.keyCode != 13) { return }
    if (e.target.value === '') { return }
    const savedProjectBody = dom.saveProject(e.target.value)
    dom.newTodo(savedProjectBody)

  }
  function editProject () {}
  function deleteProject () {}
  function addTodo () {}
  function editTodo () {}
  function saveTodo () {}
  function deleteTodo () {}
  return { addProject, }
}

function addEvent() {
  const initialEvent = () => {}
  const newProject = () => {}
  const newTodo = () => {}
  const savedTodo = () => {}
  const expandedTodo = () => {}

  const newProjectList = () => {}
  return {}
}

// let a = {'key':'123'}
// console.log(a.keys())

const dom = editDOM()
const run = operate()

const input = document.querySelector('#activeInput')
input.addEventListener('keydown', run.addProject)
input.addEventListener('focusout', run.addProject)
