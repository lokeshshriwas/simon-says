let gameSeq = [];
let userSeq = [];

let gameStart = false;
let level = 0;
let btns = ["yellow", "red", "green", "blue"]

let start = document.querySelector(".start")
let h2 = document.querySelector("h2")
let container = document.querySelector(".container")
let scorePara = document.getElementById("highScorePara")
let resetBtn = document.getElementById("resetScore")
let topScore = document.getElementById('topScore')


// checking the condition false or true
start.addEventListener("click", function (){
    if(gameStart == false){
        gameStart = true;
        start.innerHTML = "END"
        start.style.backgroundColor = "red"
        levelUp()
        tScore()
    } else{
        reset()
        tScore()
        // window.location.reload()
    }
})


// flash color for computer
function gameBtn(btn){
    btn.classList.add("gameflash")
    setTimeout(() => {
        btn.classList.remove("gameflash")
    }, 250);
}

// flash color for user
function userBtn(btn){
    btn.classList.add("userflash")
    setTimeout(() => {
        btn.classList.remove("userflash")
    }, 100);
}

// increase level and chose random index form the array btns
function levelUp(){
    level++
    userSeq = []
    h2.innerHTML = `Level - ${level}`

    let randIdx = Math.floor(Math.random()*3)
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`)

    // console.log(randIdx)
    // console.log(randColor)
    // console.log(randBtn)

    gameSeq.push(randColor)
    // console.log(gameSeq)
    gameBtn(randBtn)
}


// check the answer according to the sequence of the gameSeq and userSeq

let highScore = localStorage.getItem("highscore")

function checkAns(idx){
    if(gameSeq[idx] === userSeq[idx]){
        if(gameSeq.length === userSeq.length){
            setTimeout(levelUp, 1000);
        }
    } else{
        container.classList.add("alert")
        setTimeout(() => {
            container.classList.remove("alert")
        }, 100);
        
        h2.innerHTML = `Game over! Your Score is <b>${level}</b> click "START" button to start again`
        start.innerHTML = "finish"
        start.style.backgroundColor = "green"

// checking the score and highscore
        
        if(highScore ===  null){
            highScore = 0;
        }

        highScore = parseInt(highScore);
        let currentScore = level;
        if(currentScore > highScore){
            highScore = currentScore
            localStorage.setItem("highScore", highScore)
            // console.log(highScore)
            scorePara.innerText = `Current highest is : ${highScore}` 
        }else{
            // console.log(highScore)
            scorePara.innerText = `Current highest: ${highScore}`
            localStorage.setItem("highScore", highScore)
        }
    }
}

// checking the score and highscore

function tScore(){
    let MainScore = localStorage.getItem("highScore")
    if(level < MainScore){
    // console.log(MainScore)
    topScore.innerText = ` The top score is : ${MainScore}`
    }
}



resetBtn.addEventListener("click",function (){
    window.location.reload()
    localStorage.removeItem("highScore")
})



// calls the userBtn function for the button pressed
function btnPress(){
    let btn = this
    userBtn(btn)
    console.log(btn)

    userColor = btn.getAttribute("id")
    userSeq.push(userColor)
    
    checkAns(userSeq.length-1)
}


// loop event for each button user press
let allBtns = document.querySelectorAll(".btn")
for(btn of allBtns){
    btn.addEventListener("click", btnPress)
}


// reset function to reset the value 
function reset(){
    gameSeq =[]
    start.innerHTML = "START"
    start.style.backgroundColor = "white"
    level = 0
    userSeq = []
    return gameStart = false
}





