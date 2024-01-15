const questions = [
    {
        question: "What is 1 + 1?",
        answers: [
            { text: "11", correct: false},
            { text: "2", correct: true},
            { text: "10", correct: false},
            { text: "0", correct: false},
        ]
    },
    {
        question: "What is 2 + 1?",
        answers: [
            { text: "3", correct: true},
            { text: "1", correct: false},
            { text: "18", correct: false},
            { text: "15", correct: false},
        ]
    },
    {
        question: "What is 10 + 9?",
        answers: [
            { text: "21", correct: false},
            { text: "Banana", correct: false},
            { text: "Apple", correct: false},
            { text: "19", correct: true},
        ]
    },
    {
        question: "Who is Billie Jean?",
        answers: [
            { text: "Michael Jackson", correct: false},
            { text: "People always told me", correct: false},
            { text: "Not my lover", correct: true},
            { text: "Osama Bin Laden", correct: false},
        ]
    },
    {
        question: "How many died in 9/11?",
        answers: [
            { text: "2969", correct: false},
            { text: "2996", correct: true},
            { text: "2699", correct: false},
            { text: "2990", correct: false},
        ]
    },
    {
        question: "Which of the following is an emotion",
        answers: [
            { text: "sadness", correct: true},
            { text: "apple", correct: false},
            { text: "banana", correct: false},
            { text: "potato", correct: false},
        ]
    }
];






const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
    answerButton.removeChild(answerButton.firstChild);
    document.getElementById("show1").innerHTML = " ";
    document.getElementById("show2").innerHTML = " ";
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        document.getElementById("show1").innerHTML = "Correct!";
        selectedBtn.classList.add("correct");
        score++;
    }
    else {
        document.getElementById("show2").innerHTML = "Wrong!";
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
            
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    if (score >= 4) {
        questionElement.style.color = "green";
    }
    else{
        questionElement.style.color = "red";
    }
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        questionElement.style.color = "#001e4d";
        startQuiz();
    }
})

startQuiz();