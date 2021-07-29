const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {};

let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestion = [];

let questions = [
  {
    question:
      'Bố mẹ có 6 người con trai, mỗi người con trai có 1 em gái. Hỏi gia đình đó có bao nhiêu người?',
    choice1: '7',
    choice2: '8',
    choice3: '9',
    choice4: '10',
    answer: 3,
  },
  {
    question:
      'Cái gì chặt không đứt, bứt không rời, phơi không khô, đốt không cháy?',
    choice1: 'Không Khí',
    choice2: 'Sắt',
    choice3: 'Nước',
    choice4: 'Lửa',
    answer: 3,
  },
  {
    question: 'What is the most used programming language in 2019?',
    choice1: 'Java',
    choice2: 'C',
    choice3: 'Python',
    choice4: 'JavaScript',
    answer: 1,
  },
  {
    question: 'Who is he President of US?',
    choice1: 'Florin Pop',
    choice2: 'Donald trump',
    choice3: 'Ivan Saldano',
    choice4: 'Mihai Andrei',
    answer: 2,
  },
  {
    question: 'What dose HTML stand for?',
    choice1: 'Hypertext Markup Language',
    choice2: 'Cascading Style Sheet',
    choice3: 'Jason Object Notation',
    choice4: 'Helicopters Terminals Motorboats Lamborginis',
    answer: 1,
  },
  {
    question: 'What year was JavaScript launched?',
    choice1: '1996',
    choice2: '1997',
    choice3: '1998',
    choice4: 'none of the above',
    answer: 4,
  },
];

const SCORE_POINTS = 100;
const MAX_QUESTION = 6;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestion = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestion.length === 0 || questionCounter > MAX_QUESTION) {
    localStorage.setItem('mostRecentScore', score);

    return window.location.assign('end.html');
  }

  questionCounter++;
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTION}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTION) * 100}%`;

  const questionsIndex = Math.floor(Math.random() * availableQuestion.length);
  currentQuestion = availableQuestion[questionsIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset['number'];
    choice.innerText = currentQuestion['choice' + number];
  });

  availableQuestion.splice(questionsIndex, 1);

  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener('click', (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset['number'];

    let classToApply =
      selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

    if (classToApply === 'correct') {
      incrementScore(SCORE_POINTS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startGame();
