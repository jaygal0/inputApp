// TODO Figure out what it doesn't register 'space'
// TODO Need to see if I can convert into a JSON file and FETCH

const foreignWords = [
  {
    translation: 'I',
    foreign: 'okay word',
  },
  {
    translation: 'you (singular)',
    foreign: 'hello okay',
  },
  {
    translation: 'he',
    foreign: 'three is this working',
  },
  {
    translation: 'we',
    foreign: 'one gosh why is this not working',
  },
]

// Need to target every element
const foreign = document.querySelector('.text__foreign')
const translation = document.querySelector('.text__native')
const textArea = document.getElementById('textForeign')
const startBtn = document.getElementById('start')

// Start with the text area empty
textArea.value = ''

// A function to split the words and put them into a span. That will give me more control for later on
const start = () => {
  const random = Math.floor(Math.random() * foreignWords.length)

  foreign.innerHTML = ''
  textArea.value = null
  foreignWords[random].foreign.split('').forEach((i) => {
    const charSpan = document.createElement('span')
    charSpan.innerText = i
    foreign.appendChild(charSpan)
  })
  // To add the translated word as well
  translation.innerHTML = foreignWords[random].translation
}

//To figure out how to check the input to the answer
textArea.addEventListener('input', () => {
  const arrayForeign = foreign.querySelectorAll('span')
  const arrayInput = textArea.value.split('')
  let correct = true

  arrayForeign.forEach((char, index) => {
    const character = arrayInput[index]
    if (character == null) {
      char.classList.remove('correct')
      char.classList.remove('incorrect')
      correct = false
    } else if (character === char.innerText) {
      char.classList.add('correct')
      char.classList.remove('incorrect')
    } else {
      char.classList.remove('correct')
      char.classList.add('incorrect')
      correct = false
    }
  })
  if (correct) start()
})

// To toggle the Play and Pause button
startBtn.addEventListener('click', () => {
  if (startBtn.innerText === 'start') {
    startBtn.innerText = 'pause'
    start()
  } else {
    startBtn.innerText = 'start'
    foreign.innerHTML = ''
    translation.innerHTML = ''
    textArea.value = null
  }
})
