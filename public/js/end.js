const userName = document.querySelector('#username');
const saveScoreBtn = document.querySelector("#save-score-btn");
const finalScore = document.querySelector('#final-score');
const mostRecentScore = localStorage.getItem("mostRecentScore");

const hiScores = JSON.parse(localStorage.getItem("hiScores")) || [];
console.log(hiScores);

finalScore.innerText = mostRecentScore;

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
});


saveHighScore = (e) => {
    e.preventDefault();

    const score = {
        score: Math.floor(Math.random() * 100),
        name: username.value
    };

    hiScores.push(score);
    hiScores.sort((a, b) => b.score - a.score)
    hiScores.splice(5);

    localStorage.setItem("hiScores", JSON.stringify(hiScores));
    window.location.assign("/hi-scores");
};