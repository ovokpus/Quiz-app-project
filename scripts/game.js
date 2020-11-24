// Create Constants for Question, Choices, Scores and Game
const QUESTION = document.querySelector("#question");
const CHOICES = Array.from(document.querySelectorAll(".choice-text"));// For various choice options
const SCORETXT = document.querySelector("#score");
const GAME = document.querySelector("#game");

// Add constants for Progress Bar and Loader
const PROGRESS = document.querySelector("#progress-text");
const PROGRESSBARFULL = document.querySelector("#progress-bar-full");
const LOADER = document.querySelector("#loader");


let currentQuestion = {};
let acceptingAnswers = false;//Creates delay before next question
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [];// Pulls Questions from API linked below:

fetch("https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple")
    .then(res => {
        return res.json();
    })
    .then((loadedQuestions) => {
        questions = loadedQuestions.results.map((loadedQuestion) => {
            const FORMATTEDQUESTIONS = {
                question: loadedQuestion.question,
            };

            const ANSWERCHOICES = [...loadedQuestion.incorrect_answers];
            FORMATTEDQUESTIONS.answer = Math.floor(Math.random() * 3) + 1;
            ANSWERCHOICES.splice(
                FORMATTEDQUESTIONS.answer - 1,
                0,
                loadedQuestion.correct_answer
            );

            ANSWERCHOICES.forEach((choice, index) => {
                FORMATTEDQUESTIONS['choice' + (index + 1)] = choice;
            });

            return FORMATTEDQUESTIONS;
        });
        
        startGame();
    })
    .catch((err) => {
        console.error(err);
    });

//Set Bonus Scores for Correct Question and Maximum number of Questions in a Quiz Session
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

 startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion(); //Gets a New Question
    game.classList.remove("hidden");
    loader.classList.add("hidden");
};

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        //go to the end page
        return window.location.assign("end.html");
    }
    questionCounter++;
    PROGRESS.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    // Update the Progress bar
    PROGRESSBARFULL.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const QUESTIONINDEX = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[QUESTIONINDEX];
    QUESTION.innerText = currentQuestion.question;

    CHOICES.forEach(choice => {
        const NUMBER = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + NUMBER];
    });

    availableQuestions.splice(QUESTIONINDEX, 1);
    acceptingAnswers = true;
};

CHOICES.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const CLASSTOAPPLY =
            selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        if (CLASSTOAPPLY === "correct") {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(CLASSTOAPPLY);
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(CLASSTOAPPLY);
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = num => {
    score += num;
    SCORETXT.innerText = score;
};

