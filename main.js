// Adding the title to the game and the page
let title = 'guess the word';
document.title = title;
document.querySelector(".game-title").innerHTML = title;



// Data for the game
let numberOfletters = 5;
let numberOfTrys = 6;
let numberOfHints = 2;
let currentTry = 1;
let level = 1;
let w_5 = ["paris","pilot","messi","pizza","tesla"];
let w_5D = ["the capital of france","a person who operates an aircraft","a famous argentine football player","a popular italian dish ","an american electric vehicle"];
let w_6 = ["sydney","tailor","tomato","toyota","nyemar"];
let w_6D = ["a coastal city in australia","a person who makes or alters clothes","a juicy ,red fruit ","a japanese car brand","a famous brazilian football player"];
let w_7 = ["engineer","musical","chicken","chicago","ronaldo"];
let w_7D = ["a person who designs ,builds projects","a theatrical performance thet combines music","a type of bird ofthen raised for oys meat","a mahor city in the united states","a famous portuguses football player"];
let words = w_5;
let des = w_5D;
let wordToGuess = '';
let randomInd = Math.floor(Math.random() * words.length);
wordToGuess = words[randomInd].toLocaleLowerCase();
let wordDes = `- discreption for the word : <span>${des[randomInd]}</span>`;


//insert the discreption for the word
document.querySelector(".main-container .discreption").innerHTML = wordDes;



// Elements from the document

let inputsFild = document.querySelector(".main-container .inputs");
const messageArea = document.querySelector(".message");
const checkBtn = document.querySelector(".check-btn");
const hintBtn = document.querySelector(".hint-btn");
let levelInput = document.querySelector("select");
let trys = [];



// The functoins of the project
//

// generating inputs
function generatingInputs(){
    for(let i = 1; i<= numberOfTrys ; i++){
        let tempDiv = document.createElement("div");
        tempDiv.classList = `try-div try-${i} `;
        if(i != 1) tempDiv.classList.add("disabled");
        let span = document.createElement("span");
        span.innerHTML = `try-${i}:`;
        tempDiv.appendChild(span);
        for(let j = 1 ; j <= numberOfletters; j++){
            let tempInput = document.createElement("input");
            tempInput.classList = 'letter-input';
            tempInput.id = `try:${i}-letter:${j}`;
            tempInput.setAttribute("maxlength","1");
            tempDiv.appendChild(tempInput);
            if(i != 1) {
                tempInput.disabled = true;
                tempInput.classList.add("disabled-input")
            }
        }
        inputsFild.appendChild(tempDiv);
    }
    trys = document.querySelectorAll(".try-div");
    document.getElementById("try:1-letter:1").focus();
    //

    };
generatingInputs();

//check the word functoin
checkBtn.addEventListener("click",checkWord);

//hint function
hintBtn.innerHTML = `hint-${numberOfHints} <i class="fa fa-search"></i>`;
hintBtn.addEventListener("click",hintF);

// input event
let inputs = document.querySelectorAll(".letter-input:not([disabled])");
inputs.forEach((ele,ind)=>{
    ele.addEventListener("input",()=>{
        if(inputs[ind + 1]) inputs[ind + 1].focus();
    });
});

//change the level function
levelInput.addEventListener("change",(e)=>{
    level = levelInput.value;
    if(level > 2) {
        numberOfHints = 3;
    }else{
        numberOfHints = 2;
    }
    if(level == 1){
        words = w_5;
        des = w_5D;
    }else if(level == 2){
        words = w_6;
        des = w_6D;
    }else{
        words = w_7;
        des = w_7D;
    }
    hintBtn.innerHTML = `hint-${numberOfHints} <i class="fa fa-search"></i>`;
    regenerateInputs(level);
})

// arrows function
document.addEventListener("keydown",(e)=>{
    let tempArr = Array.from(document.querySelectorAll(".letter-input:not([disabled])"));
    if(e.key == "ArrowRight"){
        if(inputs[tempArr.indexOf(e.target) + 1]) inputs[tempArr.indexOf(e.target) + 1].focus();
    }
    if(e.key == "ArrowLeft"){
        if(inputs[tempArr.indexOf(e.target) - 1]) inputs[tempArr.indexOf(e.target) - 1].focus();
    }
    if(e.key == "Backspace"){
        let tempArr = Array.from(document.querySelectorAll(".letter-input:not([disabled])"));
        let currentInd = tempArr.indexOf(e.target);
        if(e.target.value != ""){
            e.target.value = "";
        }else{
            if(currentInd > 0){
                tempArr[currentInd - 1].value = "";
                tempArr[currentInd - 1].focus();

            }
        }
        
    }
    if(e.key == "Delete"){
        e.preventDefault();
    }
})

// check the word function
function checkWord(){
    let wordState = true;
    for(let i = 0;i< numberOfletters; i++){
        let currentinp = inputs[i];
        if(currentinp.value.toLowerCase() == wordToGuess[i]){
            currentinp.classList.add("yes-in-place");
        }else if(wordToGuess.includes(currentinp.value.toLowerCase()) && currentinp.value != ""){
            currentinp.classList.add("yes-no-place");
            wordState = false;
            
        }else{
            currentinp.classList.add("wrong-letter");
            wordState = false;
            
        }
    }
    let tempspan = document.createElement("span");
    tempspan.innerHTML = `"${wordToGuess}"`;    
    if(wordState){
        messageArea.innerHTML = "good job, the word is :";
        //
        messageArea.appendChild(tempspan);
        messageArea.classList.add("active");
        inputs.forEach((e)=>{
            e.disabled = true;
        })
        checkBtn.disabled = true;
        checkBtn.classList.add("disabled");
        document.querySelector(".overlay").classList.add("active");
        
    }else{
        trys[currentTry - 1].classList.add("disabled");
        trys[currentTry - 1].querySelectorAll(".letter-input").forEach((e)=>{
            e.disabled = true;
        })
        currentTry++;
        if(trys[currentTry - 1]){
            trys[currentTry - 1].classList.remove("disabled");
            trys[currentTry - 1].querySelectorAll(".letter-input").forEach((e,ind)=>{
                e.disabled = false;
                if(ind == 0) e.focus();
            })
            inputs = document.querySelectorAll(".letter-input:not([disabled])");
            inputs.forEach((ele,ind)=>{
                ele.addEventListener("input",()=>{
                if(inputs[ind + 1]) inputs[ind + 1].focus();
            });
});
        }else{
            messageArea.innerHTML = "sorry you losed, the word is :";
            messageArea.appendChild(tempspan);
            messageArea.classList.add("active");
            inputs.forEach((e)=>{
                e.disabled = true;
            })
            checkBtn.disabled = true;
            checkBtn.classList.add("disabled");
            document.querySelector(".overlay").classList.add("active");
        }
    }

}

//hint function
function hintF (){  
    if(numberOfHints ){
        numberOfHints--;
        hintBtn.innerHTML = `hint-${numberOfHints} <i class="fa fa-search"></i>`;
        if(numberOfHints == 0) hintBtn.classList.add("disabled");
        //an array from the active inputs
        let tempInputs = Array.from(document.querySelectorAll(".letter-input:not([disabled])"));
        //an array from the empty inputs
        let emptyInputs = tempInputs.filter((e)=>{return e.value == ""});
        if(emptyInputs.length > 0){
            //random index from the empty elements
            let randomIndex = Math.floor(Math.random() * emptyInputs.length);
            //the random input from the active inputs
            let eI1 = emptyInputs[randomIndex];
            //the index of the letter wich chosed randomly from the empty inputs
            let posetionLetter = tempInputs.indexOf(eI1);
            //the letter wich chosed randomly --> wordToGuess[posetionLetter];
            //insert the letter
            eI1.value = wordToGuess[posetionLetter];

        }

    }
}

//regenerate inputs function
function regenerateInputs(level){

    numberOfletters = 4 + Number.parseInt(level);
    inputsFild.innerHTML = "";
    generatingInputs();
    inputs = document.querySelectorAll(".letter-input:not([disabled])");
    inputs.forEach((ele,ind)=>{
    ele.addEventListener("input",()=>{
        if(inputs[ind + 1]) inputs[ind + 1].focus();
    });
    });
    randomInd =Math.floor(Math.random() * words.length);
    wordToGuess = words[randomInd];
    wordDes = `- discreption for the word : <span>${des[randomInd]}</span>`;
    document.querySelector(".main-container .discreption").innerHTML = wordDes;


};
