function getComputerChoice() {
    let n = Math.floor(Math.random()*3)
    switch (n) {
        case 0:
            return 'ROCK'
            break
        case 1:
            return 'PAPER'
            break    
        default:
            return 'SCISSORS'
            break
    }
}

function playRound(playerSelection, computerSelection=getComputerChoice()) {
    let win = ''
    let res = 0
    let table = {'ROCK':'SCISSORS', 'PAPER':'ROCK', 'SCISSORS':'PAPER'}
    playerSelection = playerSelection.toUpperCase()
    if (playerSelection === computerSelection) {
        win = 'Draw!'
        res = 1
    } else if (table[playerSelection] === computerSelection) {
        win = 'Win!'
    } else {
        win = 'Lose...'
        res = 2
    }
    return [win + ` You:${playerSelection}, Computer:${computerSelection}`, res]
}

function game() {
    let count = [0,0,0]

    for (let i = 0; i < 5; i++) {
        let playerSelection = window.prompt('Rock, Paper, Scissors!')
        let res = playRound(playerSelection)
        console.log(`Round ${i+1}: ` + res[0])
        count[res[1]] += 1
    }

    console.log('RESULT IS:')
    console.log(`Win:${count[0]}, Draw:${count[1]}, Lose:${count[2]}`)
}

game()