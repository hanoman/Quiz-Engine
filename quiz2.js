//define questions
var allQuestions = [{
    question: "Before it was named JavaScript, what was the language called?",
    choices: ["TypeScript", "Java", "JScript", "LiveScript"],
    correctAnswer: 3
}, {
    question: "Who did originally develop JavaScript?",
    choices: ["Bill Gates", "Brendan Eich", "Douglas CrockFord", "Nicholas Zakas", "Steve Jobs"],
    correctAnswer: 1
}, {
    question: "Which browser was the first to implement JavaScript?",
    choices: ["Internet Explorer", "Netscape Navigator", "Opera"],
    correctAnswer: 1
}, {
    question: "Microsoft called JavaScript something else to avoid trademark issues. What was that name?",
    choices: ["MicroScript", "IEScript", "VBScript", "JScript", "BasicScript"],
    correctAnswer: 3
}];


//get static html elements and define global nextBtn element
var questionBox = document.getElementById("question");
var answersBox = document.getElementById("answers");
var scoreBox = document.getElementById("score");
var nextBtn;

//quiz object
var quizEngine = {
    currentQuesionIndex: 0, //begin from first question
    score: 0,

    run_quiz: function() { //main method, runs to print each question
        if (this.currentQuesionIndex < allQuestions.length) { //prins new questions until you have no more
            this.clear_question(); //makes sure theres no question before you print one
            this.print_question();
            this.print_answers();
            this.print_next_btn();
        } else {
            this.compute_score(); //then show the score
        }
    },

    print_question: function() {
        questionBox.innerHTML = allQuestions[this.currentQuesionIndex].question;
    },

    print_answers: function() {
        var numberOfAnswers = allQuestions[this.currentQuesionIndex].choices.length; //get number of answers avilable for current question
        for (i = 0; i < numberOfAnswers; i++) { //loop  trough the avilable choices
            var choiceValue = allQuestions[this.currentQuesionIndex].choices[i]; //get choice value

            var frag = document.createDocumentFragment(); //create document fragment where you put a radio input with label
            var radioNodeDesc = document.createTextNode(choiceValue);
            var radioLabelWrapper = document.createElement("label");

            var radioNode = document.createElement("input");
            radioNode.type = "radio";
            radioNode.className = "radio-answer";
            radioNode.value = choiceValue;
            radioNode.name = "currentAnswer";

            radioLabelWrapper.appendChild(radioNode); //radioNode to be wrapped in label element
            radioLabelWrapper.appendChild(radioNodeDesc); //radioNodeDesc as well wrapped inside label element so when clicked on the description text radio would get checked anyway
            frag.appendChild(radioLabelWrapper); //put all inside document fragment
            answersBox.appendChild(frag); //append to the document
        }
    },

    print_next_btn: function() {
        var nextq = document.createElement("button");
        nextq.id = "next-btn";
        nextq.innerHTML = "NEXT";
        nextq.className = "next-btn";

        answersBox.appendChild(nextq);
        nextBtn = document.getElementById("next-btn");
        nextBtn.addEventListener("click", quizEngine.next_question); //add event listener so next button runs next_queston method
    },

    compute_score: function() {
        quizEngine.clear_question();
        scoreBox.appendChild(document.createTextNode("Your score: " + quizEngine.score));
    },

    next_question: function() {
        quizEngine.check_answer();
        quizEngine.currentQuesionIndex++; //increment this value so when quiz run again it will print next question
        quizEngine.run_quiz();
    },

    clear_question: function() {
        while (questionBox.hasChildNodes()) { //remove all nodes
            questionBox.removeChild(questionBox.lastChild);
        }
        while (answersBox.hasChildNodes()) { //remove all nodes
            answersBox.removeChild(answersBox.lastChild);
        }
    },

    check_answer: function() {
        var radios = answersBox.getElementsByTagName('input'); //get all radio elements
        for (var i = 0; i < radios.length; i++) { //loop trought radios avialable in answersBox element
            if (radios[i].checked) {

                var value = radios[i].value;

                var correct_answer_index = allQuestions[quizEngine.currentQuesionIndex].correctAnswer; //get correct answer index inside the array so you can get its value then
                var currentCorrectAnswer = allQuestions[quizEngine.currentQuesionIndex].choices[correct_answer_index]; //get the correct answer value

                if (value == currentCorrectAnswer) { //if correct increment score
                    quizEngine.score++;
                } else {
                    console.log("wrong answer");
                }
            }
        }
    }
};

quizEngine.run_quiz(); //run the app