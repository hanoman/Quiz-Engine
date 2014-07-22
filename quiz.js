$(document).ready(function() {
    // define questions
    var allQuestions = [{
        question: '"Somebody poisoned the waterhole".This is a classic Woody line, said when Sid pulls his string. Which of these Toy Story films is it from?',
        choices: ['Toy Story', 'Toy Story 2', 'Toy Story 3'],
        correctAnswer: 0
    }, {
        question: 'Oh, I know it\'s a rock, I know. But let\'s just pretend for a minute that it\'s a seed, alright? This hilarious phrase is from which Pixar film?',
        choices: ['Up', 'Finding Nemo', 'A Bug\'s Life'],
        correctAnswer: 2
    }, {
        question: 'Kids these days. They just don\'t get scared like they used to.',
        choices: ['Monster, Inc', 'The Incredibles', 'Monster University', 'A Bug\'s Life'],
        correctAnswer: 0
    }, {
        question: '\'P. Sherman, 42 Wallaby Way, Sydney\'. In which movie does this quote appear?',
        choices: ['Monster, Inc', 'Finding Nemo', 'Incredibles', 'Monster University'],
        correctAnswer: 1
    }, {
        question: '\'Greater good?\' I am your wife! I am the greatest \'good\' you are ever gonna get! Which Pixar films contains this quote?',
        choices: ['The Incredibles', 'Monster University', 'A Bug\'s Life', 'Up'],
        correctAnswer: 3
    }];

    // get static html elements and define global nextBtn element
    var questionsEl = $('#question'),
        answerEl = $('#answers'),
        scoreEl = $('#score-wrapper'),
        nextBtn;

    var quizEngine = {
            currentQuestionIndex: 0,
            score: 0,
            run_quiz: function() { // runs to print each question
                if (this.currentQuestionIndex < allQuestions.length) { //check if it's the last questions or not
                    this.clear_question();
                    this.print_question();
                    this.print_answers();
                    this.print_btn();
                } else {
                    this.display_score();
                }
            },
            clear_question: function() {
                $(questionsEl).empty();
                $(answerEl).empty();
                $('.button-wrapper').empty();
            },
            print_question: function() {
                // console.log(allQuestions[this.currentQuestionIndex].question)
                questionString = '<h4>' + allQuestions[this.currentQuestionIndex].question + '</h4>';
                $('#question').html(questionString);
            },
            print_answers: function() {
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
            },
            print_btn: function() {
                $(document.createElement('a')).attr({
                    class: "button tiny radius",
                    href: "#",
                    id: "next-btn"
                })
                    .html("Next")
                    .click(function(e) {
                        e.preventDefault();
                        quizEngine.next_question();
                    })
                    .appendTo($('.button-wrapper'));

            },
            display_score: function() {
                quizEngine.clear_question();
                scoreTotal = "Your score " + quizEngine.score
                $(document.createElement('div')).attr({
                    class: "alert-box success radius",
                    id: "score",
                    'data-alert': ''
                }).html(scoreTotal).appendTo(scoreEl);
                $(document.createElement('a')).attr({
                    class: "close",
                    href: "#"
                }).html('&times;').prependTo($('#score'));
            },
            next_question: function() {
                quizEngine.check_answer();
                quizEngine.currentQuestionIndex++;
                quizEngine.run_quiz();
            },
            check_answer: function() {
                var radios = $(answerEl).find('input');
                for (var i = 0; i < radios.length; i++) {
                    if ($(radios[i]).is(':checked')) {
                        var value = radios[i].value;
                        var correct_answer_index = allQuestions[quizEngine.currentQuestionIndex].correctAnswer;
                        var currentCorrectAnswer = allQuestions[quizEngine.currentQuestionIndex].choices[correct_answer_index];
                        if (value == currentCorrectAnswer) {
                            quizEngine.score++;
                        } else {
                            console.log('wrong answer')
                        }
                    }
                }
            }
        } //quizEngine end

    quizEngine.run_quiz();

});