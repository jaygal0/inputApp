// TODO Add a way to save the words?

// Need to target every element
const foreign = document.querySelector('.text__foreign')
const randomDiv = document.getElementById('randomDiv') // This needs to be hidden
const speed = document.getElementById('speed')
const translation = document.querySelector('.text__native')
const textArea = document.getElementById('textForeign')
const startBtn = document.getElementById('start')
const newWordBtn = document.getElementById('newWord')
const filterBtns = document.querySelectorAll('.filter__btns')
const filterDiv = document.getElementById('filterDiv')

// To help calculate the WPM
let endTimerOne
let endTimerTwo
let startTimerOne
let startTimerTwo
let firstCalc
let secCalc

// To know which filter button is being pressed
let filter = 'All'

// To understand which filter button is being clicked on
filterBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    filter = e.currentTarget.dataset.id
    start()
    speed.innerHTML = ''
  })
})

// Changes depending on if all the text is input correctly
let correct = true

// Start with the text area empty
textArea.value = ''

const start = () => {
  // URL is hosted on my GitHub
  const url =
    'https://gist.githubusercontent.com/jaygal0/7330ba460ffdf7b6b24e958b7be5b623/raw/e533a0834895edf36d68c19939091e4742cd192d/koreanwords.json'

  // To retrieve and parse the (filtered) JSON data
  function retrieve() {
    return fetch(url)
      .then((response) => response.json())
      .then((data) =>
        data.filter((item) => {
          if (filter === 'All') {
            return item
          } else {
            return item.type.includes(filter)
          }
        })
      )
  }

  // To show the filter buttons after hitting the start button
  filterDiv.classList.remove('hidden')

  // To add a new word into the game
  async function newWord() {
    const words = await retrieve()
    const randomNo = Math.floor(Math.random() * words.length)
    const foreignWord = words[randomNo].korean
    const transWord = words[randomNo].english

    // A way to split the words and put them into a span. That will give me more control for later on
    foreign.innerHTML = ''
    textArea.value = ''
    textArea.placeholder = ''
    foreignWord.split('').forEach((i) => {
      const charSpan = document.createElement('span')
      charSpan.innerText = i
      foreign.appendChild(charSpan)
    })
    // To add the translated word as well
    translation.innerHTML = transWord
    randomDiv.innerHTML = foreignWord
  }
  newWord()

  // To check the amount of words in the randomDiv
  let amount = randomDiv.innerHTML.split(' ').length

  // A function to calculate time elapsed between the start() function activation times
  // Also calculates the WPM
  foreign.classList.toggle('time')
  if (foreign.classList.contains('time')) {
    startTimerOne = new Date()
    endTimerTwo = new Date()
    firstCalc = (endTimerTwo - startTimerTwo) / 1000 / 60
    speed.innerHTML = `${Math.round(amount / firstCalc)} WPM`
  } else {
    startTimerTwo = new Date()
    endTimerOne = new Date()
    secCalc = (endTimerOne - startTimerOne) / 1000 / 60
    speed.innerHTML = `${Math.round(amount / secCalc)} WPM`
  }
  if (speed.innerHTML === 'NaN WPM') {
    speed.innerHTML = ''
  }
}

//To figure out how to check the input to the answer
textArea.addEventListener('input', () => {
  const arrayForeign = foreign.querySelectorAll('span')
  const arrayInput = textArea.value.split('')

  arrayForeign.forEach((char, index) => {
    const character = arrayInput[index]
    if (character == null) {
      char.classList.remove('correct')
      char.classList.remove('incorrect')
      correct = false
    } else if (character === char.innerHTML) {
      char.classList.add('correct')
      char.classList.remove('incorrect')
      correct = true
    } else {
      char.classList.remove('correct')
      char.classList.add('incorrect')
      correct = false
    }
  })
})

// To allow the user to hit the 'New Word' button
newWordBtn.addEventListener('click', () => {
  if (newWordBtn.innerHTML === 'start') {
    newWordBtn.innerHTML = 'new word'
    start()
  } else if (textArea.value === '') {
  } else if (correct) {
    start()
  }
})

// To allow the user to hit 'Enter' for a new word
textArea.addEventListener('keyup', (e) => {
  if (newWordBtn.innerHTML === 'start' && e.keyCode === 13) {
    newWordBtn.innerHTML = 'new word'
    start()
  } else if (textArea.value === '') {
  } else if (correct && e.keyCode === 13) {
    start()
  }
})
