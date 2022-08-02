const slider = document.querySelector('#grid-slider');
const sliderLabel = document.querySelector('.size-label');
const canvasDiv = document.querySelector('.canvas-container');


let GRID_SIZE = slider.value;
canvasDiv.style.gridTemplateColumns = `repeat(${GRID_SIZE}, 1fr )`;
canvasDiv.style.gridTemplateRows = `repeat(${GRID_SIZE}, 1fr )`;


for(let i = 0; i < GRID_SIZE*GRID_SIZE; i++){
    let sketchDiv = document.createElement('div');
    sketchDiv.style.border = '1px solid black'
    sketchDiv.classList.add('sketch-div')
    canvasDiv.appendChild(sketchDiv);
}

slider.addEventListener('input', function(e){
    GRID_SIZE = e.target.value;
    sliderLabel.textContent = `${GRID_SIZE} x ${GRID_SIZE}`;
    canvasDiv.style.gridTemplateColumns = `repeat(${GRID_SIZE}, 1fr )`;
    canvasDiv.style.gridTemplateRows = `repeat(${GRID_SIZE}, 1fr )`;

    while(canvasDiv.firstChild){
        canvasDiv.removeChild(canvasDiv.firstChild)
    }

    for(let i = 0; i < GRID_SIZE*GRID_SIZE; i++){

        let sketchDiv = document.createElement('div');
        sketchDiv.style.border = '1px solid black'
        sketchDiv.classList.add('sketch-div')
        canvasDiv.appendChild(sketchDiv);
    }
})


function fillBox(evt){
    evt.preventDefault()
    const red = Math.floor(Math.random() * 255);
    const green = Math.floor(Math.random() * 255);
    const blue = Math.floor(Math.random() * 255);
    
    this.style.background = `rgb(${red} ${green} ${blue})`;
}

function startFillBox(){
    const sketchDivs = document.querySelectorAll('.sketch-div');
    sketchDivs.forEach(div => div.addEventListener('mouseover', fillBox))
}

function stopFillBox(){
    const sketchDivs = document.querySelectorAll('.sketch-div');
    sketchDivs.forEach(div => div.removeEventListener('mouseover', fillBox))
}

canvasDiv.addEventListener('mousedown', startFillBox);
canvasDiv.addEventListener('mouseup', stopFillBox)