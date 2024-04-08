let columnsAndRows;
let board = document.querySelector(".board");
let currentChoice;
let eraserToggled = 0;
newSketchPad();

function newSketchPad(type){
    if (!columnsAndRows){
        columnsAndRows=16;
        GridResize();   
        basicCanvas();
    } else {
        columnsAndRows = cellNumberPrompt();
        GridResize();
        if (currentChoice=="colorful"){
            colorfulCanvas();
        } else if (currentChoice =="basic" ){
            basicCanvas();    
        }
    }
}

function cellNumberPrompt(){
    return prompt("How many rows and columns should your sketchpad have?",)
}
function GridResize(){
    let gridSize = "auto ".repeat(columnsAndRows);
    board.setAttribute("style", `grid-template-columns: ${gridSize}; grid-template-rows: ${gridSize};`); //resizes grid to desired size
}
function createDivs(){ //creates the squares inside the sketchpad as DIVs
    for (let x = 0; x < columnsAndRows*columnsAndRows; x++){
        var sketchCell = document.createElement('div');
        sketchCell.className = "sketchcell";
        board.appendChild(sketchCell);
    }
}

function makeCellBlack(){ // changes class on HOVER, hover color becomes black
  
    const allSketchCells = document.querySelectorAll(".sketchCell");
    allSketchCells.forEach(cell=>cell.addEventListener('mouseover',(e)=>{
        if(eraserToggled){
            eraseOnHover(cell);
        } else {
            cell.style.backgroundColor = "black";
        }    
        }))
}

function randomColorOnHover(){ // gives random color to cell on hover
    const allSketchCells = document.querySelectorAll(".sketchCell");
    allSketchCells.forEach(cell=>cell.addEventListener('mouseover',(e)=>{
        if(eraserToggled){
            eraseOnHover(cell);
        }else if(cell.className =="colorful"){
            cell.style.backgroundColor = darkenRandomColor(cell);
        } else {
            cell.className="colorful"
            cell.style.backgroundColor = getRandomRGBColor();
        }
        
    }))
}
function eraseOnHover(cell){ // makes cell white
        cell.className="sketchcell";
        cell.style.backgroundColor="white";
        }

function clearCanvas(){
    if (currentChoice=="colorful"){
        colorfulCanvas()
    } else if (currentChoice =="basic" ){
        basicCanvas()    
    }
}

function darkenRandomColor(cell){
    let strLength = cell.style.backgroundColor.length - 1 ; //getting string lenght - 1 because that's where we will slice it 
    let newColors = cell.style.backgroundColor.slice(4, strLength).split(", ");
    //reducing each value by 10%
    newColors[0] = Math.floor(newColors[0] - newColors[0]/10);
    newColors[1] = Math.floor(newColors[1] - newColors[1]/10);
    newColors[2] = Math.floor(newColors[2] - newColors[2]/10);
    return "rgb(" + newColors[0] +", " + newColors[1] + ", " + newColors[2] + (")")
}

function getRandomRGBColor(){ // returns random rgb color, each random value between 0-255
    let red = Math.floor(Math.random()*255);
    let green = Math.floor(Math.random()*255);
    let blue = Math.floor(Math.random()*255);
    return "rgb(" + red +", " + green + ", " + blue + (")")
}

function colorfulCanvas(){
    currentChoice = "colorful"; //remembersmyCurrentChoice
    board.innerHTML=""; // removes initial divs   
    createDivs();
    randomColorOnHover();
}
function basicCanvas(){
    currentChoice = "basic"; //remembers My Current Choice
    board.innerHTML=""; // removes initial divs   
    createDivs();
    makeCellBlack();
}
function eraserToggle(button){
    if(!eraserToggled){
        button.innerText = "Eraser: Off";
        button.style.backgroundColor = "ccc472";
        eraserToggled=!eraserToggled;
        } else {
            button.innerText = "Eraser: ON";
            button.style.backgroundColor = "khaki";
            eraserToggled=!eraserToggled;
        }
}

let clickableButtons = Array.from(document.querySelectorAll('button'));
clickableButtons.forEach(button=>button.addEventListener('click',(e)=>{
    if (button.className == "resizeCanvas"){
        newSketchPad();
    } else if(button.className=="clearCanvas"){
        clearCanvas();
    } else if (button.className=="colorfulCanvas"){
        if(currentChoice=="colorful"){
            alert("Canvas is already colorful!");
        } else colorfulCanvas();
    } else if (button.className=="basicCanvas"){
        if(currentChoice=="basic"){
            alert("Canvas is already in basic mode!");
        } else basicCanvas();
    } else if (button.className == "eraseCell"){
       eraserToggle(button);
    } else if (button.className == "instructionsOFF"){
        document.querySelector("div.instruction").style.display = "block";
        button.className = "instructionsON";     
    } else if (button.className == "instructionsON"){
        document.querySelector("div.instruction").style.display = "none";
        button.className = "instructionsOFF";
    }

}))