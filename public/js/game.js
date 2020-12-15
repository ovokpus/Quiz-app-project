// Create Constants for Question, Choices, Scores and Game
const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));// For various choice options
const scoreTxt = document.querySelector("#score");
const game = document.querySelector("#game");

// Add constants for Progress Bar and Loader
const progress = document.querySelector("#progress-text");
const progressBarFull = document.querySelector("#progress-bar-full");
const loader = document.querySelector("#loader");


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
            const formattedQuestions = {
                question: loadedQuestion.question,
            };

            const answerChoices = [...loadedQuestion.incorrect_answers];
            formattedQuestions.answer = Math.floor(Math.random() * 3) + 1;
            answerChoices.splice(formattedQuestions.answer - 1, 0, loadedQuestion.correct_answer);

            answerChoices.forEach((choice, index) => {
                formattedQuestions['choice' + (index + 1)] = choice;
            });

            return formattedQuestions;
        });

        startGame();
    })
    .catch((err) => {
        console.error(err);
    });

//Set Bonus Scores for Correct Question and Maximum number of Questions in a Quiz Session
const correctBonus = 10;
const maxQuestions = 5;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion(); //Gets a New Question
    game.classList.remove("hidden");
    loader.classList.add("hidden");
};

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= maxQuestions) {
        localStorage.setItem('mostRecentScore', score);
        //go to the end page
        return window.location.assign("/end");
    }
    questionCounter++;
    progress.innerText = `Question ${questionCounter}/${maxQuestions}`;
    // Update the Progress bar
    progressBarFull.style.width = `${(questionCounter / maxQuestions) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const CLASSTOAPPLY =
            selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        if (CLASSTOAPPLY === "correct") {
            incrementScore(correctBonus);
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
    scoreTxt.innerText = score;
};

