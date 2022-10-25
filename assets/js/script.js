var scoreTimer = 60; 
var currentQuestionIndex = 0; 
var timeInterval = 0; 
var headerWrapperEl = document.querySelector("#header-wrapper");
var mainEl = document.querySelector("#main");
var questionWrapperEl = document.querySelector("#question-wrapper");

var questionArray = [
    {
        text: "What is NOT a JavaScript data type?",
        choice1: "Number",
        choice2: "Undefined",
        choice3: "Borders",
        choice4: "Boolean",
        answer: "3"
    },
    {
        text: "Which symbol is used for multi line comments in JavaScript?",
        choice1: "// This is a comment",
        choice2: "/* This is a comment */",
        choice3: "<!--This is a comment -->",
        choice4: "'This is a comment'",
        answer: "2"
    },
    {
        text: "What of the above operators is a AND sign?",
        choice1: "+",
        choice2: "&",
        choice3: "&&",
        choice4: "||",
        answer: "3"
    },
    {
        text: "Question 1",
        choice1: "Choice 1",
        choice2: "Choice 2",
        choice3: "Choice 3",
        choice4: "Choice 4",
        answer: "3"
    },
    {
        text: "Question 1",
        choice1: "Choice 1",
        choice2: "Choice 2",
        choice3: "Choice 3",
        choice4: "Choice 4",
        answer: "3"
    },
    {
        text: "Question 1",
        choice1: "Choice 1",
        choice2: "Choice 2",
        choice3: "Choice 3",
        choice4: "Choice 4",
        answer: "3"
    },
    {
        text: "What of the above options stands for OR operator ?",
        choice1: "+",
        choice2: "&",
        choice3: "&&",
        choice4: "||",
        answer: "4"
    },
    {
        text: "What of the above options stands for OR operator ?",
        choice1: "+",
        choice2: "&",
        choice3: "&&",
        choice4: "||",
        answer: "4"
    },
    ];

var highScoreLinkEl = document.createElement("a");
highScoreLinkEl.href = "./scores.html";
highScoreLinkEl.innerHTML = "High Scores";
headerWrapperEl.appendChild(highScoreLinkEl);

var timerEl = document.createElement("p");
timerEl.textContent = "Time: " + scoreTimer;
headerWrapperEl.appendChild(timerEl);

var questionTextEl = document.createElement("h2");
questionTextEl.textContent = "JavaScript Quiz Challenge";
questionWrapperEl.appendChild(questionTextEl);

var instructionsEl = document.createElement("p");
instructionsEl.innerHTML = "Please try your Best answering the following code-related questions !!!<br> Incorrect answers will penalize your score/time by 6 seconds."
instructionsEl.id = "instructions";
questionWrapperEl.appendChild(instructionsEl);

var startBtnWrapperEl = document.createElement("div");
startBtnWrapperEl.id = "startBtn-wrapper";

var startBtnEl = document.createElement("button");
startBtnEl.className = "btn";
startBtnEl.id = "startBtn";
startBtnEl.innerHTML = "Start Quiz";
startBtnWrapperEl.appendChild(startBtnEl);
questionWrapperEl.appendChild(startBtnWrapperEl);


var initializeQuiz = function () {
    questionWrapperEl.removeChild(instructionsEl);
    questionWrapperEl.removeChild(startBtnWrapperEl);

    questionTextEl.textContent = questionArray[currentQuestionIndex].text;

    var choiceOlEl = document.createElement("ol");
    choiceOlEl.id = "choice-ol";
    questionWrapperEl.appendChild(choiceOlEl);

    var choice1El = document.createElement("li");
    choice1El.setAttribute("choice-number", "1");
    choice1El.id = "choice1";
    choice1El.className = "choice";
    choice1El.textContent = questionArray[currentQuestionIndex].choice1;
    choiceOlEl.appendChild(choice1El);

    var choice2El = document.createElement("li");
    choice2El.setAttribute("choice-number", "2");
    choice2El.id = "choice2";
    choice2El.className = "choice";
    choice2El.textContent = questionArray[currentQuestionIndex].choice2;
    choiceOlEl.appendChild(choice2El);

    var choice3El = document.createElement("li");
    choice3El.setAttribute("choice-number", "3");
    choice3El.id = "choice3";
    choice3El.className = "choice";
    choice3El.textContent = questionArray[currentQuestionIndex].choice3;
    choiceOlEl.appendChild(choice3El);

    var choice4El = document.createElement("li");
    choice4El.setAttribute("choice-number", "4");
    choice4El.id = "choice4";
    choice4El.className = "choice";
    choice4El.textContent = questionArray[currentQuestionIndex].choice4;
    choiceOlEl.appendChild(choice4El);

    var feedbackWrapperEl = document.createElement("div");
    feedbackWrapperEl.id = "feedback-wrapper";
    questionWrapperEl.appendChild(feedbackWrapperEl);
    var feedbackDividerEl = document.createElement("hr");
    feedbackWrapperEl.appendChild(feedbackDividerEl);
    var feedbackMsgEl = document.createElement("h3");
    feedbackMsgEl.id = "feedback-message";
    feedbackWrapperEl.appendChild(feedbackMsgEl);

    scoreTimerCountdown();
}

var nextQuestion = function(event) {

    var targetEl = event.target;
    var answer = targetEl.getAttribute("choice-number");

        if (answer){

        var feedbackMsgEl = document.querySelector("#feedback-message");
        if (answer===questionArray[currentQuestionIndex].answer){
            console.log ("Correct!");
            feedbackMsgEl.textContent = "Correct Answer :)";
        }
        else {
            scoreTimer = Math.max(0, scoreTimer-6);
            feedbackMsgEl.textContent = "Wrong";
            console.log ("Wrong Answer :(");
        }
    }

    if (currentQuestionIndex+1 < questionArray.length && (answer)){
        currentQuestionIndex++;
        questionTextEl.textContent = questionArray[currentQuestionIndex].text;
        var choice1El = document.querySelector("#choice1");
        choice1El.textContent = questionArray[currentQuestionIndex].choice1;
        var choice2El = document.querySelector("#choice2");
        choice2El.textContent = questionArray[currentQuestionIndex].choice2;
        var choice3El = document.querySelector("#choice3");
        choice3El.textContent = questionArray[currentQuestionIndex].choice3;
        var choice4El = document.querySelector("#choice4");
        choice4El.textContent = questionArray[currentQuestionIndex].choice4;
    }

    if (targetEl.id === "initials-button") {
        submitInitials(event);
    }
}

var scoreTimerCountdown = function() {

    timeInterval = setInterval(function() {
        timerEl.textContent = "Time: " + scoreTimer;

        if (scoreTimer > 0) {
            scoreTimer--;
        }
        else if (scoreTimer === 0) {
            quizOver();
        }

        if (currentQuestionIndex+1 === questionArray.length){
            quizOver();
        }
    }, 1000);
}

var quizOver = function () {

    clearInterval(timeInterval);

    var feedbackMsgEl = document.querySelector("#feedback-message");
    feedbackMsgEl.textContent = "";

    var choiceOlEl = document.querySelector("#choice-ol");
    questionWrapperEl.removeChild(choiceOlEl);
    timerEl.textContent = "Time: " + scoreTimer;
    questionTextEl.innerHTML = "All Done! <br> Your Final Score is: " + scoreTimer;

    var initialFormEl = document.createElement("form");
    initialFormEl.id = "initials-form";
    questionWrapperEl.appendChild(initialFormEl);

    var inputWrapperEl = document.createElement("div");
    inputWrapperEl.id = "input-wrapper";
    initialFormEl.appendChild(inputWrapperEl);

    var initialLabelEl = document.createElement("label");
    initialLabelEl.form = "initials";
    initialLabelEl.id = "initials-label";
    initialLabelEl.textContent = "Enter Initials";
    inputWrapperEl.appendChild(initialLabelEl);

    var initialTextEl = document.createElement("input");
    initialTextEl.type = "text";
    initialTextEl.id = "initials";
    initialTextEl.name = "initials";
    inputWrapperEl.appendChild(initialTextEl);

    var initialBtnEl = document.createElement("buton");
    initialBtnEl.className = "btn";
    initialBtnEl.id = "initials-button";
    initialBtnEl.textContent = "Submit";
    initialBtnEl.setAttribute("button-id", "initials-submit");
    initialFormEl.appendChild(initialBtnEl);   
}

var submitInitials = function (event) {
    event.preventDefault();
    var initials = document.querySelector("#initials").value;
    var newScore = {initials: initials, score: scoreTimer};

    var savedScores = localStorage.getItem("scores");

    if (!savedScores){
        savedScores = [{initials: "", score: ""}];
        savedScores = JSON.stringify(savedScores);
    }

    savedScores = JSON.parse(savedScores);
    savedScores.push(newScore);
    localStorage.setItem("scores", JSON.stringify(savedScores));

    window.location.href = "./scores.html";
}

var clearFeedback = function (event) {
    var targetEl = event.target;
    var answer = targetEl.getAttribute("choice-number");

    if (answer) {
        var feedbackMsgEl = document.querySelector("#feedback-message");
        feedbackMsgEl.textContent = "";
    }
}

startBtnEl.addEventListener("click", initializeQuiz);
questionWrapperEl.addEventListener("click",nextQuestion);
questionWrapperEl.addEventListener("submit",submitInitials);
questionWrapperEl.addEventListener("mouseover", clearFeedback);