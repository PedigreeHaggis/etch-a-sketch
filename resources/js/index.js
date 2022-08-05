///////////////////////////////////
// Global Selectors & Variables //
/////////////////////////////////
const DEFAULT_COLOR = '#000'
let color = DEFAULT_COLOR;
const slider = document.querySelector('#grid-slider');
const sliderLabel = document.querySelector('.size-label');
const canvasDiv = document.querySelector('.canvas-container');
const gridToggleButton = document.querySelector('.grid-toggle');
const rainbowModeButton = document.querySelector('.rainbow-mode');
const chosenColorButton = document.querySelector('.chosen-color');
const eraserButton = document.querySelector('.eraser');
const colorPicker = document.querySelector('.color-picker')


//////////////////////////////
// Functions               //
////////////////////////////

function resetGrid(){
    while(canvasDiv.firstChild){
        canvasDiv.removeChild(canvasDiv.firstChild);
    }
    gridToggleButton.classList.remove('on')
}

function setGrid(){
    let GRID_SIZE = slider.value;
    sliderLabel.textContent = `${GRID_SIZE} x ${GRID_SIZE}`;
    canvasDiv.style.gridTemplateColumns = `repeat(${GRID_SIZE}, 1fr )`;
    canvasDiv.style.gridTemplateRows = `repeat(${GRID_SIZE}, 1fr )`;

    resetGrid()

    for(let i = 0; i < GRID_SIZE*GRID_SIZE; i++){
        let sketchDiv = document.createElement('div');
        sketchDiv.classList.add('sketch-div')
        canvasDiv.appendChild(sketchDiv);
    }
}

function toggleGridLines(){
    if(gridToggleButton.classList.contains('on')){
        buttonToggle(gridToggleButton);
        const sketchDivs = document.querySelectorAll('.sketch-div');
        sketchDivs.forEach(div => div.style.border = 'none')
    } else {
        buttonToggle(gridToggleButton)
        const sketchDivs = document.querySelectorAll('.sketch-div');
        sketchDivs.forEach(div => div.style.border = '1px solid black')
    }
}

function buttonToggle(button){
    if(button.classList.contains('on')){
        button.classList.remove('on')
    } else {
        button.classList.add('on');
    }
}

function fillBox(){
    if(rainbowModeButton.classList.contains('on')){
        const red = Math.floor(Math.random() * 255);
        const green = Math.floor(Math.random() * 255);
        const blue = Math.floor(Math.random() * 255);
        this.style.background = `rgb(${red} ${green} ${blue})`;
    } else if(chosenColorButton.classList.contains('on')){
        this.style.background = color;
    } else if(eraserButton.classList.contains('on')){
        this.style.background = '#fff'
    }
}

function startFillBox(){
    const sketchDivs = document.querySelectorAll('.sketch-div');
    sketchDivs.forEach(div => {
        div.addEventListener('mouseover', fillBox)
        div.addEventListener('mousedown', fillBox)
    })
}

function stopFillBox(){
    const sketchDivs = document.querySelectorAll('.sketch-div');
    sketchDivs.forEach(div => div.removeEventListener('mouseover', fillBox))    
}

chosenColorButton.classList.add('on')

canvasDiv.addEventListener('mousedown', startFillBox);
canvasDiv.addEventListener('mouseup', stopFillBox);
gridToggleButton.addEventListener('click', toggleGridLines)

chosenColorButton.addEventListener('click', function(){
    buttonToggle(this);
    if(rainbowModeButton.classList.contains('on')){buttonToggle(rainbowModeButton)}
    if(eraserButton.classList.contains('on')){buttonToggle(eraserButton)}
    if(!this.classList.contains('on') && !rainbowModeButton.classList.contains('on') && !eraserButton.classList.contains('on')){
        buttonToggle(this)
    }
});

rainbowModeButton.addEventListener('click', function(){
    buttonToggle(this);
    if(chosenColorButton.classList.contains('on')){buttonToggle(chosenColorButton)}
    if(eraserButton.classList.contains('on')){buttonToggle(eraserButton)}
    if(!this.classList.contains('on') && !chosenColorButton.classList.contains('on') && !eraserButton.classList.contains('on')){
        buttonToggle(this)
    }
})

eraserButton.addEventListener('click', function(){
    buttonToggle(this);
    if(rainbowModeButton.classList.contains('on')){buttonToggle(rainbowModeButton)}
    if(chosenColorButton.classList.contains('on')){buttonToggle(chosenColorButton)}

    if(!this.classList.contains('on') && !rainbowModeButton.classList.contains('on') && !chosenColorButton.classList.contains('on')){
        buttonToggle(this)
    }
    
})

slider.addEventListener('input', setGrid)

colorPicker.addEventListener('input', function(){
    rainbowModeButton.classList.remove('on')
    eraserButton.classList.remove('on')
    chosenColorButton.classList.add('on')
    color = colorPicker.value;
})

setGrid()
