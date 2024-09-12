// Adding the title to the game and the page
let title = 'guess the word';
document.title = title;
document.querySelector(".game-title").innerHTML = title;

// Data for the game
let numberOfletters = 5;
let numberOfTrys = 6;
let currentTry = 1;
let levle = 1;
let words = ["jumps","zinky","mujik","kanzu","cozey","pzazz","frizz"];
let wordToGuess = '';
wordToGuess = words[Math.floor(Math.random() * words.length)].toLocaleLowerCase();


// Generating the inputs
// window.addEventListener("load",generatingInputs);

// Elements frome the document
let inputsFild = document.querySelector(".main-container .inputs");





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
    document.getElementById("try:1-letter:1").focus();
    //

    // // input event
    // let inputs = document.querySelectorAll(".letter-input:not([disabled])");
    // inputs.forEach((ele,ind)=>{
    //     ele.addEventListener("input",()=>{
    //         if(inputs[ind + 1]) inputs[ind + 1].focus();
    //     })
    // })


    };
generatingInputs();

// input event
let inputs = document.querySelectorAll(".letter-input:not([disabled])");
inputs.forEach((ele,ind)=>{
    ele.addEventListener("input",()=>{
        if(inputs[ind + 1]) inputs[ind + 1].focus();
    });
});

// arrows function
document.addEventListener("keydown",(e)=>{
    let tempArr = Array.from(document.querySelectorAll(".letter-input:not([disabled])"));
    if(e.key == "ArrowRight"){
        if(inputs[tempArr.indexOf(e.target) + 1]) inputs[tempArr.indexOf(e.target) + 1].focus();
    }
    if(e.key == "ArrowLeft"){
        if(inputs[tempArr.indexOf(e.target) - 1]) inputs[tempArr.indexOf(e.target) - 1].focus();
    }
})

// check the word function
function checkWord(){
    let wordState = true;
    for(let i = 0;i< numberOfletters; i++){
        let currentinp = inputs[i];
        // console.log(currentinp.value.toLowerCase() == wordToGuess[i]);
        // console.log(wordToGuess.includes(currentinp.value.toLowerCase()))
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

}

document.querySelector(".check-btn").addEventListener("click",checkWord);