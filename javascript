let timerEl = document.getElementById("timer");
let quoteDisplayEl = document.getElementById("quoteDisplay");
let quoteInputEl = document.getElementById("quoteInput");
let spinnerEl = document.getElementById("spinner");

let resultEl = document.getElementById("result");

let submitBtnEl = document.getElementById("submitBtn");
let resetBtnEl = document.getElementById("resetBtn");

let actualQuote = "";

let timerId;

resetBtnEl.addEventListener("click", function() {
    reset();
});

let counter = 0;

function startTest() {

    let uniqueId = setInterval(function() {
        counter = counter + 1;
        timerEl.textContent = counter;
        timerId = uniqueId;
        console.log(counter);
    }, 1000);

    let options = {
        methond: "GET"
    };

    spinnerEl.classList.remove("d-none");
    fetch("https://apis.ccbp.in/random-quote", options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            spinnerEl.classList.add("d-none");
            actualQuote = jsonData.content;
            quoteDisplayEl.textContent = actualQuote;
            console.log(actualQuote);
        });
}

function submitTest() {
    let typedText = quoteInputEl.value;
    if (typedText === actualQuote) {
        clearInterval(timerId);
        resultEl.textContent = `You typed sentence in ${counter} seconds`;
    } else {
        resultEl.textContent = "You typed incorrect sentence";
    }
}

submitBtnEl.addEventListener("click", function() {
    submitTest();
});

function reset() {
    clearInterval(timerId);
    quoteInputEl.value = "";
    startTest();
    resultEl.textContent = "";
    counter = 0;
}

startTest();
