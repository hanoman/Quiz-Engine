$(document).ready(function () {

    // define questions
    var allQuestions = [
        {
            question: '"Somebody poisoned the waterhole".This is a classic Woody line, said when Sid pulls his string. Which of these Toy Story films is it from?',
            choices: ['Toy Story', 'Toy Story 2', 'Toy Story 3'],
            correctAnswer: 0,
            userAnswer: ''
        },
        {
            question: 'Oh, I know it\'s a rock, I know. But let\'s just pretend for a minute that it\'s a seed, alright? This hilarious phrase is from which Pixar film?',
            choices: ['Up', 'Finding Nemo', 'A Bug\'s Life'],
            correctAnswer: 2,
            userAnswer: ''
        },
        {
            question: 'Kids these days. They just don\'t get scared like they used to.',
            choices: ['Monster, Inc', 'The Incredibles', 'Monster University', 'A Bug\'s Life'],
            correctAnswer: 0,
            userAnswer: ''
        },
        {
            question: '\'P. Sherman, 42 Wallaby Way, Sydney\'. In which movie does this quote appear?',
            choices: ['Monster, Inc', 'Finding Nemo', 'Incredibles', 'Monster University'],
            correctAnswer: 1,
            userAnswer: ''
        },
        {
            question: '\'Greater good?\' I am your wife! I am the greatest \'good\' you are ever gonna get! Which Pixar films contains this quote?',
            choices: ['The Incredibles', 'Monster University', 'A Bug\'s Life', 'Up'],
            correctAnswer: 3,
            userAnswer: ''
        }
    ];

    // get static html elements and define global nextBtn element
    var questionsEl = $('#question'),
        answerEl = $('#answers'),
        scoreEl = $('#score-wrapper');

    var quizEngine = {

        currentQuestionIndex: 0,
        score: 0,
        run_quiz: function () { // runs to print each question
            if (this.currentQuestionIndex < allQuestions.length) { //check if it's the last questions or not
                this.clear_question();
                this.print_question();
                this.print_answers();
                this.print_next_btn();
                this.print_back_btn();
            } else {
                this.display_score();
            }
        },
        clear_question: function () { // clear everything before displaying next answer
            $(questionsEl).hide().empty();
            $(answerEl).hide().empty();
            $('.button-wrapper').hide().empty();
        },
        print_question: function () { // print questions
            var questionString = '<h4>' + allQuestions[this.currentQuestionIndex].question + '</h4>';
            $('#question').fadeIn().html(questionString);
        },
        print_answers: function () { // print answers
            var numberOfAnswer = allQuestions[this.currentQuestionIndex].choices.length; //get all the answer options
            for (i = 0; i < numberOfAnswer; i++) {
                var choiceValue = allQuestions[this.currentQuestionIndex].choices[i];
                $(document.createElement('input')).attr({
                    value: choiceValue,
                    type: "radio",
                    name: "currentAnswer",
                    class: "radio-answer",
                    id: "choice_" + i
                }).appendTo(answerEl);
                $(document.createElement('label')).attr({
                    for: "choice_" + i
                }).html(choiceValue).add("<br>").appendTo(answerEl);
            }
            $(document.createElement('small')).attr({
                class: 'error hidden',
            }).html("Choose an answer").appendTo(answerEl)

            $(answerEl).fadeIn()
            $('.button-wrapper').fadeIn();

        },
        print_next_btn: function () { // print next button
            $(document.createElement('a')).attr({
                class: "button tiny radius",
                href: "#",
                id: "next-btn"
            })
                .html("Next")
                .click(function (e) {
                    e.preventDefault();
                    quizEngine.next_question();
                })
                .appendTo($('.button-wrapper'));
        },
        print_back_btn: function () { // print back button
            $(document.createElement('a')).attr({
                class: "button tiny radius",
                href: "",
                id: "back-btn"
            })
                .html("Back")
                .click(function (e) {
                    e.preventDefault();
                    quizEngine.prev_question();
                })
                .prependTo($('.button-wrapper'));
            if ( this.currentQuestionIndex == 0 ) { // display back button if it's not the first question
                $("#back-btn").addClass('disabled').unbind('click').click(function(e){
                    return false;
                })
            }

        },
        display_score: function () { // display total score
            quizEngine.clear_question();
            var scoreTotal = "Your score is " + quizEngine.score
            $(document.createElement('div')).attr({
                class: "alert-box success radius",
                id: "score",
                'data-alert': ''
            }).html(scoreTotal).appendTo(scoreEl);
        },
        next_question: function () { // go to next question
            quizEngine.check_answer();
            var radiosChecked = $(answerEl).find('input:checked');
            var errorMsg = $('#answers').find('.error');

            if ($(radiosChecked).size() > 0) { // check if the radio checked, otherwise display error message
                quizEngine.currentQuestionIndex++;
                quizEngine.run_quiz();
            } else {
                errorMsg.removeClass('hidden');
            }
            quizEngine.load_answer();
        },
        prev_question: function(){ // go to previous question
            quizEngine.currentQuestionIndex--;
            quizEngine.run_quiz();
            quizEngine.load_answer();
        },
        load_answer: function(){// load the previous answered choice
            var radios = $(answerEl).find('input');
            var userAnsIndex = allQuestions[quizEngine.currentQuestionIndex].userAnswer;
            $(radios[userAnsIndex]).prop("checked", true);
        },
        check_answer: function () { // check answer
            var radios = $(answerEl).find('input');
            for (var i = 0; i < radios.length; i++) {
                if ($(radios[i]).is(':checked')) {
                    var value = radios[i].value;
                    var correct_answer_index = allQuestions[quizEngine.currentQuestionIndex].correctAnswer;
                    var currentCorrectAnswer = allQuestions[quizEngine.currentQuestionIndex].choices[correct_answer_index];
                    if (value == currentCorrectAnswer) {
                        quizEngine.score++;
                    } else {
                        console.log('wrong answer');
                    }
                    // save current answer to allQuestions array
                    allQuestions[quizEngine.currentQuestionIndex].userAnswer = i;
                }
            }
        }
    } //quizEngine end

    quizEngine.run_quiz();

});