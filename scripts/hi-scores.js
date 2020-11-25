const hiScoresList = document.querySelector("#hi-scores-list");
const hiScores = JSON.parse(localStorage.getItem("hiScores")) || [];

hiScoresList.innerHTML = hiScores
.map( score => {
        return `<li class="hi-scores">${score.name} - ${score.score}</li>`;
    })
    .join("");