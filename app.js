// Need to target every element
const hiddenDiv = document.getElementById('needsToBeHidden') // This needs to be hidden
const foreign = document.querySelector('.translation__word--foreign')
const translation = document.querySelector('.translation__word--english')
const textArea = document.getElementById('textForeign')
const inputBox = document.querySelector('.input__box')
const filterBtns = document.querySelectorAll('.filter__btns')
const filterDiv = document.getElementById('filterDiv')
const startBtn = document.getElementById('start')
const newWordBtn = document.getElementById('newWord')
const keyboardBtns = document.querySelectorAll('.keyboard--btns')
const speed = document.getElementById('speed')

// To make the keyboard responsive for an english keyboard and a korean keyboard
keyboardBtns.forEach((btn) => {
  window.addEventListener('keydown', (e) => {
    if (e.keyCode == btn.dataset.id) {
      btn.classList.add('activeBtn')
    }
  })
  window.addEventListener('keyup', (e) => {
    if (e.keyCode == btn.dataset.id) {
      btn.classList.remove('activeBtn')
    }
  })
  textArea.addEventListener('input', (e) => {
    if (btn.dataset.kor === e.data) {
      btn.classList.add('activeBtn')
    } else {
      btn.classList.remove('activeBtn')
    }
  })
})

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

// A For loop to change active filter buttons
const filterBtnsActive = document.getElementsByClassName('filter__btns')
for (let i = 0; i < filterBtnsActive.length; i++) {
  filterBtnsActive[i].addEventListener('click', function () {
    let activeFilter = document.getElementsByClassName('activeFilter')
    if (activeFilter.length > 0) {
      activeFilter[0].className = activeFilter[0].className.replace(
        'activeFilter',
        ''
      )
      this.className += ' activeFilter'
    }
  })
}

// Changes depending on if all the text is input correctly
let correct = true
let correctWord = false

// Start with the text area empty
textArea.value = ''

const start = () => {
  // URL is hosted on my GitHub
  const url =
    'https://gist.githubusercontent.com/jaygal0/7330ba460ffdf7b6b24e958b7be5b623/raw/fe98aed4d70e232ff2eb446445611e09b9ef9dd7/koreanwords.json'

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

    // To remove the small placeholder font setting at the beginning of the game
    inputBox.classList.remove('input__box--start')

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
    hiddenDiv.innerHTML = foreignWord
  }
  newWord()

  // To focus on the input box after hitting new word or a filter
  inputBox.focus()

  // To check the amount of words in the hiddenDiv
  let amount = hiddenDiv.innerHTML.split(' ').length

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

  // To check if the entire word is correct
  if (foreign.innerHTML.includes('incorrect')) {
    correctWord = false
  } else {
    correctWord = true
  }

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
  } else if (correct && correctWord) {
    start()
  }
})

// To allow the user to hit 'Enter' for a new word
textArea.addEventListener('keyup', (e) => {
  if (newWordBtn.innerHTML === 'start' && e.keyCode === 13) {
    newWordBtn.innerHTML = 'new word'
    start()
  } else if (textArea.value === '') {
  } else if (correct && correctWord && e.keyCode === 13) {
    start()
  }
})
