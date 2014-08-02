function validateLogin(uname, passwd) {
    if (uname === null || uname === "" || passwd === null || passwd === "") {
        $('#login_needed').show();
        return false;
    } else {
        return true;
    }
}

function setCookie(value) {
    var in_cookie = false;
    var daysToLive = 14;
    var result = getCookie();
    for (var i = 1; i < result.length; i++) {
        if (value === result[i]) {
            in_cookie = true;
        }
    }
    if (!in_cookie) {
        var cookie = "username" + (result[0] + 1) + "=" + encodeURIComponent(value);
        if (typeof daysToLive === "number")
            cookie += "; max-age=" + (daysToLive * 60 * 60 * 24);
        document.cookie = cookie;
    }
}

function getCookie() {
    var all = document.cookie;
    var list;
    if (all === "") {
        list = [];
    } else {
        list = all.split('; ');
    }
    var listlength = list.length;
    var result = [];
    result.push(listlength);
    for (var i = 0; i < list.length; i++) {
        var cookie = list[i];
        var p = cookie.indexOf("=");
        var name = cookie.substring(0, p);
        var value = cookie.substring(p + 1);
        value = decodeURIComponent(value);
        result.push(value);
    }
    return result;
}
var name = [];
var name_exists = false;
//localStorage.removeItem('username');
//document.cookie = "username1" +"=; max-age=0";
$('#login_btn').on('click', function() {
    var uname = $('#username').val();
    uname = uname.toUpperCase();
    var passwd = $('#passwd').val();
    var login_status = validateLogin(uname, passwd);
    if (login_status) {
        if (!localStorage.username) {
            //console.log("No localStorage.username");
            name.push(uname);
            localStorage.username = JSON.stringify(name);
            setCookie(uname);
        } else {
            //console.log("Yes localStorage.username");
            name = JSON.parse(localStorage.username);
            for (var n in name) {
                if (uname === name[n]) {
                    name_exists = true;
                }
            }
            if (!name_exists) {
                //console.log(uname);
                name.push(uname);
                localStorage.username = JSON.stringify(name);
                setCookie(uname);
            }
        }
        //console.log(name);
        /*for (var i in name){
                if (name[i] === uname){
                    $('.user').text(name[i]);
                }
            }*/
        var result = getCookie();
        for (var i = 1; i < result.length; i++) {
            if (result[i] === uname) {
                //alert(result[i]);
                $('.user').text(result[i]);
            }
        }
        $('.login_form').hide();
        $('.welcome_msg').show();
    } else {
        $('#username').val('');
        $('#passwd').val('');
    }
});
$('#start_quiz').on('click', function() {
    $('.welcome_msg').hide();
    $('.quiz_form').show();
});
var allQuestions = [{
    question: "Who is the Prime Minister of United Kingdom?",
    choices: ["David Cameron", "Gordon Brown", "Winston Churchill", "Tony Blair"],
    correctAnswer: 0
}, {
    question: "Who is the President of United States of America?",
    choices: ["George Bush", "Usain Bolt", "Barack Obama", "Tony Blair"],
    correctAnswer: 2
}, {
    question: "Where is Mount Everest?",
    choices: ["USA", "Italy", "South Africa", "India", "Nepal"],
    correctAnswer: 4
}, {
    question: "Who is the current FIFA World Cup Champion?",
    choices: ["Brazil", "Spain", "Germany", "Argentina"],
    correctAnswer: 1
}, {
    question: "Where is Eiffel Tower?",
    choices: ["France", "England", "USA", "Canada", "Japan", "China"],
    correctAnswer: 0
}];
//var allQuestions;
var qno = 0;
var correct_ans = 0;
var selected = -1;
var selected_ans = [];
var backbtn_pressed = false;

function showQuestion(qno) {
    $(".questions").prepend(allQuestions[qno].question);
    for (i = 0; i < allQuestions[qno].choices.length; i++) {
        $('.choices').append('<input type="radio" id="radio_' + i + '" name="ans_choice" value="' + i + '"/>' + allQuestions[qno].choices[i] + '<br/>');
    }
    $('.listing').fadeIn(1000);
}

function checkRadio(selectedAnswer) {
    var radio_id = '#radio_' + selectedAnswer;
    $(radio_id).prop('checked', true);
}
/*$.getJSON('js/dynamic_quest.json', function(data){
        allQuestions = data;
        showQuestion(qno);
    });*/
showQuestion(qno);
$('.next_btn').on('click', function() {
    $("#prompt").hide();
    selected = +$('input:radio[name=ans_choice]:checked').val();
    if (selected >= 0) {
        if (selected === allQuestions[qno].correctAnswer) {
            correct_ans += 1;
        }
        selected_ans[qno] = selected;
        qno += 1;
        if (qno < allQuestions.length) {
            $('.listing').fadeOut(1000, function() {
                $('.questions').text('');
                $('.choices').text('');
                showQuestion(qno);
                $('.back_btn').show();
                if (backbtn_pressed === true) {
                    checkRadio(selected_ans[qno]);
                }
            });

        } else {
            $('.next_btn').hide();
            $('.listing').fadeOut(1000, function() {
                $('.questions').text('');
                $('.choices').text('Your Score is : ' + correct_ans);
            });
            $('.listing').fadeIn(1000);
        }
    } else {
        $("#prompt").show();
    }
});

$('.back_btn').on('click', function() {
    backbtn_pressed = true;
    qno = qno - 1;
    if (selected_ans[qno] === allQuestions[qno].correctAnswer) {
        correct_ans -= 1;
    }
    if (qno === (allQuestions.length - 1)) {
        $('.next_btn').show();
    } else if (qno === 0) {
        $('.back_btn').hide();
    }
    $('.listing').fadeOut(1000, function() {
        $('.questions').text('');
        $('.choices').text('');
        showQuestion(qno);
        checkRadio(selected_ans[qno]);
    });

});