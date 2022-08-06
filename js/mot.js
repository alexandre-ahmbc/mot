var word1 = [];// array to hold word1 of each pair
var word2 = [];// array to hold word2 of each pair
var answersIndexes = [];// array to hold indexes of visible answers to prevent answers repetition in the screen
var correctWordsIndexes = [];// array to hold indexes of solved questions
const nAnswers = 5;// number of answers

// array to hold pairs of word1;word2
const wordPair = ["azul;bleu", "outro;autre", "estranho;bizarre", "engraçado;drôle", "jovem;jeune", "juste;apenas", "doente;malade", "pobre;pauvre"];

const ready = (callback) => {
    if (document.readyState !== "loading")
        callback();
    else
        document.addEventListener("DOMContentLoaded", callback);
};

// runs only if all functions are loaded
ready(() => {
    // preparing pair of words
    explodePair();

    // calling random question
    question("word2");

    // opening full screen on mobile
    document.addEventListener("click", (e) => {
//        openFullscreen();
    });

    // closing loading div
    close("#loading");
});

// explode each element of wordPair array into word1 and word2
const explodePair = () => {
    for (i = 0; i < wordPair.length; i++) {
        word2.push(wordPair[i].split(";")[0]);
        word1.push(wordPair[i].split(";")[1]);
    }
};

// create one new question
const question = (word) => {
    document.querySelector("#answerBox").innerHTML = "";
    document.querySelector("#counter").innerHTML = correctWordsIndexes.length;
    var correctWordIndex = Math.floor(Math.random() * word1.length);

    // filter to prevent repetition of words
    if (!correctWordsIndexes.includes(correctWordIndex)) {
        // create fake answers
        answersIndexes = [];
        for (i = 0; i < nAnswers; i++) {
            addFakeAnswer(correctWordIndex, word);
        }

        // store correct word index
        correctWordsIndexes.push(correctWordIndex);

        // choosing one fake answer to be replaced by the correct answer
        var correctAnswerIndex = Math.floor(Math.random() * nAnswers);
        if (word === "word2" || word === 1) {
            document.querySelector("#question").innerHTML = word1[correctWordIndex];
            correctText = word2[correctWordIndex];
        } else {
            document.querySelector("#question").innerHTML = word2[correctWordIndex];
            correctText = word1[correctWordIndex];
        }
        let correctAnswer = document.querySelectorAll(".answer")[correctAnswerIndex];
        correctAnswer.innerHTML = correctText;
        correctAnswer.classList.replace("fake", "correct");

        document.querySelector(".correct").addEventListener("click", (e) => {
            var nlang = Math.floor(Math.random() * 1);
            animateElement(document.querySelector("#questionBox"), "backInDown", question(nlang));
        });

        document.querySelectorAll(".fake").forEach(fake => {
            fake.addEventListener("click", (e) => {
                animateRemove(e.target);
            });
        });

    } else if (correctWordsIndexes.length < word1.length) {
        question(word);
    } else {
        alert("Great Job!");
        location.reload();
        return;
    }
};

// add fake answer into answerBox
const addFakeAnswer = (correctWordIndex, word) => {
    var fakeIndex = Math.floor(Math.random() * word1.length);
    (word === "word2" || word === 1) ? fakeText = word2[fakeIndex] : fakeText = word1[fakeIndex];
    if (!answersIndexes.includes(fakeIndex) && fakeIndex !== correctWordIndex) {
        let fakeButton = document.createElement("div");
        fakeButton.textContent = fakeText;
        fakeButton.className = "answer fake";
        document.querySelector("#answerBox").appendChild(fakeButton);
        answersIndexes.push(fakeIndex);
    } else {
        addFakeAnswer(correctWordIndex);
    }
};

const animateElement = (element, animationName, callback) => {
    var animationEnd = "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
    element.classList.add("animate__animated", "animate__" + animationName);
    setTimeout(() => {
        element.classList.remove("animate__animated", "animate__" + animationName);
    }, 1000);
};

const animateRemove = (element) => {
    element.classList.add("animate__animated", "animate__zoomOut");
    setTimeout(() => {
        element.remove();
    }, 1000);
};

const close = (selector) => {
    document.querySelector(selector).classList.remove("open");
};

const openFullscreen = () => {
    var elem = document.documentElement;
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
    }
};