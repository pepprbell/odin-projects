const rock = document.querySelector('.rock')
const paper = document.querySelector('.paper')
const scissors = document.querySelector('.scissors')
const buttons = document.querySelectorAll('button')

buttons.forEach(button => button.addEventListener('click', playRound));

let count = {'win' : 0, 'draw' : 0, 'lose' : 0}

function getComputerChoice() {
    let n = Math.floor(Math.random()*3)
    switch (n) {
        case 0:
            return 'rock'
            break
        case 1:
            return 'paper'
            break    
        default:
            return 'scissors'
            break
    }
}

function playRound(e) {
    const computerSelection = getComputerChoice()
    const playerSelection = e.srcElement.className

    const table = {'rock':'scissors', 'paper':'rock', 'scissors':'paper'}

    if (playerSelection === computerSelection) {
        countRound('draw')
    } else if (table[playerSelection] === computerSelection) {
        countRound('win')
    } else {
        countRound('lose')
    }
}

function countRound(res) {
    let result = document.querySelector(`.${res}`)
    count[res] += 1
    result.innerHTML = ' ' + count[res]

    if (count[res] === 5 && res !== 'draw') {
        endGame(res)
    }
}

function endGame(res) {
    if (res === 'win') {
        alert('You Win!')
    } else {
        alert('Computer Win!')
    }
    count = {'win' : 0, 'draw' : 0, 'lose' : 0}
    const spans = document.querySelectorAll('span')
    spans.forEach(span => {
        span.innerHTML = ' 0'
    });
}