// TODO Need to see if I can convert into a JSON file and FETCH
// TODO Add a way to save the words?
// TODO Figure out a way to categorise the words and give them an option

const foreignWords = [
  {
    translation: 'I',
    foreign: '나, 저',
  },
  {
    translation: 'you (singular)',
    foreign: '너',
  },
  {
    translation: 'he',
    foreign: '그',
  },
  {
    translation: 'we',
    foreign: '우리, 저희',
  },
  {
    translation: 'you (plural)',
    foreign: '너희',
  },
  {
    translation: 'they',
    foreign: '그들',
  },
  {
    translation: 'this',
    foreign: '이',
  },
  {
    translation: 'that',
    foreign: '그, 저',
  },
  {
    translation: 'here',
    foreign: '여기, 이곳',
  },
  {
    translation: 'there',
    foreign: '거기, 저기, 그곳, 저곳',
  },
  {
    translation: 'who',
    foreign: '누구',
  },
  {
    translation: 'what',
    foreign: '무엇',
  },
  {
    translation: 'where',
    foreign: '어디',
  },
  {
    translation: 'when',
    foreign: '언제',
  },
  {
    translation: 'how',
    foreign: 'ㅕ',
  },
  {
    translation: 'not',
    foreign: '아니다, 안, 아니',
  },
  {
    translation: 'all',
    foreign: '모든, 모두',
  },
  {
    translation: 'many',
    foreign: '많다',
  },
  {
    translation: 'some',
    foreign: '어떤, 조금',
  },
  {
    translation: 'few',
    foreign: '조금',
  },
  {
    translation: 'other',
    foreign: '다른',
  },
  {
    translation: 'one',
    foreign: '하나, 한',
  },
  {
    translation: 'two',
    foreign: '둘, 두',
  },
  {
    translation: 'three',
    foreign: '셋, 세',
  },
  {
    translation: 'four',
    foreign: '넷, 네',
  },
  {
    translation: 'five',
    foreign: '다섯',
  },
  {
    translation: 'big',
    foreign: '크다',
  },
  {
    translation: 'long',
    foreign: '길다',
  },
  {
    translation: 'wide',
    foreign: '넓다',
  },
  {
    translation: 'thick',
    foreign: '두껍다',
  },
  {
    translation: 'heavy',
    foreign: '무겁다',
  },
  {
    translation: 'small',
    foreign: '작다',
  },
  {
    translation: 'short',
    foreign: '짧다',
  },
  {
    translation: 'narrow',
    foreign: '좁다',
  },
  {
    translation: 'thin',
    foreign: '얇다',
  },
  {
    translation: 'woman',
    foreign: '여자',
  },
  {
    translation: 'man (adult male)',
    foreign: '남자, 사나이',
  },
  {
    translation: 'man (*human being*)',
    foreign: '사람',
  },
  {
    translation: 'child',
    foreign: '어린이, 아이, 애',
  },
  {
    translation: 'wife',
    foreign: '아내, 마누라',
  },
  {
    translation: 'husband',
    foreign: '남편, 사나이, 바깥어른',
  },
  {
    translation: 'mother',
    foreign: '어머니, 엄마',
  },
  {
    translation: 'father',
    foreign: '아버지, 아빠',
  },
  {
    translation: 'animal',
    foreign: '동물',
  },
  {
    translation: 'fish',
    foreign: '물고기',
  },
  {
    translation: 'bird',
    foreign: '새',
  },
  {
    translation: 'dog',
    foreign: '개',
  },
  {
    translation: 'louse',
    foreign: '이',
  },
  {
    translation: 'snake',
    foreign: '뱀',
  },
  {
    translation: 'worm',
    foreign: '지렁이',
  },
  {
    translation: 'tree',
    foreign: '나무',
  },
  {
    translation: 'forest',
    foreign: '숲',
  },
  {
    translation: 'stick',
    foreign: '막대기',
  },
  {
    translation: 'fruit',
    foreign: '열매',
  },
  {
    translation: 'seed',
    foreign: '씨',
  },
  {
    translation: 'leaf',
    foreign: '잎',
  },
]

// Need to target every element
const foreign = document.querySelector('.text__foreign')
const randomDiv = document.getElementById('randomDiv') // This needs to be hidden
const speed = document.getElementById('speed')
const translation = document.querySelector('.text__native')
const textArea = document.getElementById('textForeign')
const startBtn = document.getElementById('start')
const newWordBtn = document.getElementById('newWord')

let endTimerOne
let endTimerTwo
let startTimerOne
let startTimerTwo
let firstCalc
let secCalc

// Changes depending on if all the text is input correctly
let correct = true

// Start with the text area empty
textArea.value = ''

const start = () => {
  const random = Math.floor(Math.random() * foreignWords.length)

  // A way to split the words and put them into a span. That will give me more control for later on
  foreign.innerHTML = ''
  textArea.value = ''
  textArea.placeholder = ''
  foreignWords[random].foreign.split('').forEach((i) => {
    const charSpan = document.createElement('span')
    charSpan.innerText = i
    foreign.appendChild(charSpan)
  })
  // To add the translated word as well
  translation.innerHTML = foreignWords[random].translation
  randomDiv.innerHTML = foreignWords[random].foreign

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
  if (correct === true) start()
})

// To allow the user to hit 'Enter' for a new word
textArea.addEventListener('keyup', (e) => {
  if (correct && e.keyCode === 13) start()
})
