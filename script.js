const quiz=[
    {
        "question": "What is the currency of Japan?",
        "option1": "Yuan",
        "option2": "Yen",
        "option3": "Won",
        "option4": "Dollar",
        "correctAnswer": "Yen"
    },
    {
        "question": "Who painted the Mona Lisa?",
        "option1": "Leonardo da Vinci",
        "option2": "Pablo Picasso",
        "option3": "Vincent van Gogh",
        "option4": "Michelangelo",
        "correctAnswer": "Leonardo da Vinci"
    },
    {
        "question": "What is the tallest mountain in the world?",
        "option1": "Mount Kilimanjaro",
        "option2": "Mount Everest",
        "option3": "Mount McKinley",
        "option4": "Mount Fuji",
        "correctAnswer": "Mount Everest"
    },
    {
        "question": "What is the capital of Australia?",
        "option1": "Melbourne",
        "option2": "Sydney",
        "option3": "Canberra",
        "option4": "Perth",
        "correctAnswer": "Canberra"
    },
    {
        "question": "Who wrote the 'Harry Potter' series?",
        "option1": "J.R.R. Tolkien",
        "option2": "J.K. Rowling",
        "option3": "George R.R. Martin",
        "option4": "C.S. Lewis",
        "correctAnswer": "J.K. Rowling"
    },
    {
        "question": "Which planet is known as the 'Morning Star' or 'Evening Star'?",
        "option1": "Venus",
        "option2": "Mars",
        "option3": "Mercury",
        "option4": "Jupiter",
        "correctAnswer": "Venus"
    },
    {
        "question": "What is the chemical symbol for iron?",
        "option1": "Fe",
        "option2": "Ir",
        "option3": "In",
        "option4": "Io",
        "correctAnswer": "Fe"
    },
    {
        "question": "Which city hosted the 2016 Summer Olympics?",
        "option1": "Beijing",
        "option2": "London",
        "option3": "Rio de Janeiro",
        "option4": "Tokyo",
        "correctAnswer": "Rio de Janeiro"
    },
    {
        "question": "Who invented the telephone?",
        "option1": "Thomas Edison",
        "option2": "Alexander Graham Bell",
        "option3": "Nikola Tesla",
        "option4": "Albert Einstein",
        "correctAnswer": "Alexander Graham Bell"
    },
    {
        "question": "What is the chemical symbol for silver?",
        "option1": "Si",
        "option2": "Ag",
        "option3": "Au",
        "option4": "Sv",
        "correctAnswer": "Ag"
    }
];

let timeLeft = 600; 
const timerDisplay = document.getElementById("timer");

function countdown() {
    const minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    timerDisplay.textContent = `${minutes}:${seconds}`;
    if (timeLeft === 0) {
        clearInterval(timer);
        alert("Time's up");
        return;
    }
    timeLeft--;
}

const timer = setInterval(countdown, 1000);


const questionCountDisplay = document.getElementById("questioncount");
const scoreDisplay = document.getElementById("score");
const questionDisplay = document.getElementById("output");
const option1Btn = document.getElementById("option1");
const option2Btn = document.getElementById("option2");
const option3Btn = document.getElementById("option3");
const option4Btn = document.getElementById("option4");
const submitBtn = document.getElementById("submitBtn");
const nextBtn = document.getElementById("nextBtn");
const feedbackDisplay = document.getElementById("feedback");

let currentQuestion = 0;
let score = 0;

function loadQuestion() {
    const currentQuiz = quiz[currentQuestion];
    questionDisplay.textContent = currentQuiz.question;
    option1Btn.textContent = currentQuiz.option1;
    option2Btn.textContent = currentQuiz.option2;
    option3Btn.textContent = currentQuiz.option3;
    option4Btn.textContent = currentQuiz.option4;
    questionCountDisplay.textContent = `${currentQuestion + 1}/${quiz.length}`;
    scoreDisplay.textContent = `${score}/${quiz.length}`;
}

function checkAnswer(selectedOption) {
    const currentQuiz = quiz[currentQuestion];
    if (selectedOption === currentQuiz.correctAnswer) {
        score++;
        scoreDisplay.textContent = `${score}/${quiz.length}`;
        feedbackDisplay.textContent = "Correct answer!";
        feedbackDisplay.style.color = "green";
    } else {
        feedbackDisplay.textContent = `Wrong answer, the correct answer is ${currentQuiz.correctAnswer}`;
        feedbackDisplay.style.color = "red";
    }
    disableOptions();
}

function disableOptions() {
    option1Btn.disabled = true;
    option2Btn.disabled = true;
    option3Btn.disabled = true;
    option4Btn.disabled = true;
}

function enableOptions() {
    option1Btn.disabled = false;
    option2Btn.disabled = false;
    option3Btn.disabled = false;
    option4Btn.disabled = false;
}

submitBtn.addEventListener("click", function () {
    const selectedOption = document.querySelector('button.btn-selected');
    if (selectedOption) {
        checkAnswer(selectedOption.textContent);
    } else {
        feedbackDisplay.textContent = "Please select an option.";
        feedbackDisplay.style.color = "red";
    }
});

nextBtn.addEventListener("click", function () {
    if (currentQuestion < quiz.length - 1) {
        currentQuestion++;
        loadQuestion();
        enableOptions();
        feedbackDisplay.textContent = "";
    } else {
        feedbackDisplay.textContent = `Your final score is ${score}/${quiz.length}`;
        disableOptions();
    }
});


const optionButtons = document.querySelectorAll('button[id^="option"]');

optionButtons.forEach(button => {
    button.addEventListener("click", function () {
        optionButtons.forEach(btn => btn.classList.remove('btn-selected'));
        this.classList.add('btn-selected');
    });
});


loadQuestion();
