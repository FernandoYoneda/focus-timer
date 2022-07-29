let cards = document.querySelectorAll(".card > button")
const buttonPlay = document.querySelector('.play')
const buttonStop = document.querySelector('.stop')
const minutesDisplay = document.querySelector('.minutes')
const secondsDigite = document.querySelector('.tree')
const buttonRain = document.querySelector('.rain')
const buttonHouse = document.querySelector('.house')
const buttonFire = document.querySelector('.fire')
const buttonPlus = document.querySelector('.plus')
const buttonMinus = document.querySelector('.minus')

let minutes = Number(minutesDisplay.textContent)
let timerTimeOut

const soundTree = new Audio('js/sounds/Floresta.wav')
const soundHouse = new Audio('js/sounds/Cafeteria.wav')
const soundRain = new Audio('js/sounds/Chuva.wav')
const soundFire = new Audio('js/sounds/Lareira.wav')

function toggleSelection(e) {
    for (const card of cards) {
        card.classList.remove('selected')        
    }
    e.currentTarget.classList.add('selected')
}

for (const card of cards) {
    card.addEventListener('click', toggleSelection)
}

function updateTimerDisplay(minutes, seconds) {
    minutesDisplay.textContent = String(minutes).padStart(2, "0")
    secondsDisplay.textContent = String(seconds).padStart(2, "0")
}

function resetTimer(){
    updateTimerDisplay(minutes, 0)
    clearTimeout(timerTimeOut)
}

function resetControls(){
    buttonPlay.classList.remove('clicar')
}

function countDown(){
    timerTimeOut = setTimeout(function(){
        let seconds = Number(secondsDisplay.textContent)
        let minutes = Number(minutesDisplay.textContent)

        updateTimerDisplay(minutes, 0)

        if( minutes <= 0){
            resetControls()
            return
        }

        if( seconds <= 0) {
            seconds = 60

            --minutes

            updateTimerDisplay(String(minutes -1, seconds))
        }
        
        updateTimerDisplay(minutes, String(seconds -1))

        countDown()

    }, 1000)
}

buttonPlay.addEventListener('click', () => {
    buttonPlay.classList.add('clicar')
    buttonStop.classList.remove('clicar')


    countDown()
})

buttonStop.addEventListener('click', () => {
    buttonStop.classList.add('clicar')
    buttonPlay.classList.remove('clicar')
    resetTimer()
})

buttonTree.addEventListener('click', () => {
    soundTree.play()
    soundFire.pause()
    soundRain.pause()
    soundHouse.pause()
})

buttonHouse.addEventListener('click', () => {
    soundHouse.play()
    soundFire.pause()
    soundRain.pause()
    soundTree.pause()
})

buttonRain.addEventListener('click', () => {
    soundRain.play()
    soundFire.pause()
    soundHouse.pause()
    soundTree.pause()
})

buttonFire.addEventListener('click', () => {
    soundFire.play()
    soundHouse.pause()
    soundRain.pause()
    soundTree.pause()
})

buttonPlus.addEventListener('click', () => {
    addTime()
})

buttonMinus.addEventListener('click', () => {
    removeTime()
})

function addTime() {

    minutes += 5

    seconds = Number(secondsDisplay.textContent)
    updateTimerDisplay(minutes, seconds)
}

function removeTime() {


    if (minutes <= 0) {
        resetControls()
        return
    } else {
        minutes -= 5
    }
    // minutes -= 5
    seconds = Number(secondsDisplay.textContent)
    updateTimerDisplay(minutes, seconds)
}

