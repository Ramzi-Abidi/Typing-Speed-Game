
const lvlTwoArr = [
    "One",
    "two",
    "three",
    "four",
    "five",
    "contact",
    "section",
    "header",
    "nav",
    "links",
]

const lvlOneArr = [
    "Console",
    "Node js",
    "React",
    "HTML",
    "CSS",
    "Happy",
    "Words",
    "JSON",
    //"XML VS JSON",
    "Asynchronous",
    "AsyncAwait",
    "EventLoop",
    "class",
    "inheritance",
    "override",
]

const lvlThreeArr = [
    "Rural",
    "Sixth",
    "Sesquipedalian",
    "Phenomenon",
    "Onomatopoeia",
    "Supercalifrag",
    "Worcestershire",
    "Testimonials",
    "foreignKey",
]

const lvls = {
    "easy": 6,
    "normal": 3,
    "hard": 2,
}


let lvl = document.querySelector(".lvl");
let seconds = document.querySelector(".seconds");
let btnStart = document.querySelector(".start");
let time = document.querySelector(".time span");
let total = document.querySelector(".score .total");
let got = document.querySelector(".score .got");
let end = document.querySelector(".end");
let select = document.querySelector("select");


let input = document.querySelector("input");
let theWord = document.querySelector(".the-word");
let upComingWords = document.querySelector(".upcoming-words");


/* let lvlName = "normal";
let lvlSec = lvls[lvlName];

lvl.textContent = lvlName;
seconds.textContent = lvlSec;
time.textContent = lvlSec;
total.textContent = lvlOneArr.length;
 */

got.textContent = 0;

var arr;
var lvlSec ;
var lvlName ;


function generateParams(e) {
    lvlName = e.target.value;
    lvlSec = lvls[lvlName];

    if (e.target.value === "easy")
        arr = lvlTwoArr;
    else
        if (e.target.value === "normal")
            arr = lvlOneArr;
        else
            arr = lvlThreeArr;

    lvl.textContent = lvlName;
    seconds.textContent = lvlSec;
    time.textContent = lvlSec;
    total.textContent = arr.length;
}


//onchange on select
select.addEventListener("input", (e) => {
    generateParams(e);
});


//disabing copy paste event :
input.onpaste = function () {
    return false;
}

const start = () => {
    btnStart.remove();
    input.focus();
}

const generateWord = () => {
    let nb = Math.floor(Math.random() * arr.length);

    start();
    let randomWord = arr[nb];

    theWord.textContent = randomWord;
    //getting the index 
    let index = arr.indexOf(randomWord);

    console.log(index);

    //removing the word from the array 
    arr.splice(index, 1);
    console.log(arr);

    input.textContent = "";

    //dipslaying all the words in the array.
    displayAllWords(arr);

    //calling the timer
    timer();
}

//when we press enter the game starts also :
document.body.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
        start();
        generateWord();
    }
});

//displaying all words :
const displayAllWords = (T) => {
    while (upComingWords.firstChild)
        upComingWords.removeChild(upComingWords.firstChild);

    for (let i = 0; i < T.length; i++) {
        let div = document.createElement("div");
        let txt = document.createTextNode(T[i]);
        div.appendChild(txt);
        upComingWords.appendChild(div);
    }
}

//starting the timer :
let ok = true;
let interval;
let timesRun = 0;

const timer = () => {
    time.textContent = lvlSec;

    interval = setInterval(() => {
        //decreasing number of seconds :
        let nb = Number(time.textContent);
        nb--;
        time.textContent = nb;

        //when the time is up :
        if (timesRun === lvlSec-1) {
            clearInterval(interval);
            timesRun = 0;

            //add the lvl check w lezm el klmtyn kif kif bdhbt fl lvl el hard otherwise aady .



            if (theWord.textContent.toUpperCase() === input.value.toUpperCase().trim()) {
                //console.log("u got it");
                input.value = "";

                got.textContent++;

                if (arr.length !== 0) {
                    // if the upCominWords already has children (to prevent duplication)

                    //generating a new word
                    generateWord();
                }
                else {
                    let span = document.createElement("span");
                    span.className = "good";

                    span.textContent = "u won";
                    end.appendChild(span);
                    swal({
                        title: "Good job u won :)))))!",
                        text: "You clicked the button!",
                        icon: "success",
                    })
                    .then(()=>{
                        location.reload() ;
                    });
                }
            }
            else {
                let span = document.createElement("span");
                span.className = "bad";
                span.textContent = "GAME OVER";
                end.appendChild(span);

                swal({
                    title: "Game Over :((",
                    text: "Time is up! click on ok to reset",
                })
                .then(()=>{             //execute when the user click on the button of the alert. 
                    location.reload() ;
                });
            }

        }
        else
            timesRun++;

    }, 1000);
}


//when click on start the game starts :
btnStart.addEventListener("click", () => {
    if(select.selectedIndex===0) {
        //alert("select a level before u start");
        swal({
            text: "choose a lvl to start the game !",
            icon: "warning",
        });
        return false ;
    }
    else {
        select.disabled =true ;
        generateWord();
    }
});
