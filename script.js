let canvas = document.getElementById('board');
const buttons = document.getElementById('button-container');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight

let c = canvas.getContext('2d');

let animationId;
let flag = true;
let scoreFlag = true;
let onloadImageCount = 0;

let currMousePosX = null;
let currMousePosY = null;

let difficulty = null;
let score = 0;
let startX = Math.random() * 0.90;
let startY = Math.random() * 0.40;
let time = 0;


const gameObjects = [
    {
        img: new Image(),
        src: "images/river-background.png",
        name: "background"
    },
    {
        img: new Image(),
        src: "images/virus.png",
        name: "virus",
        xPos: Math.random() * 0.9,
        yPos: Math.random() * 0.5
    },
    {
        img: new Image(),
        src: "images/charity-water-logo.png",
        name: "charity-water-logo",
    }
];

window.addEventListener('keydown', (e) =>{
    if(e.key.toLowerCase() === 'q' && flag){
        stopGame();
    }
});

canvas.addEventListener('click', (event) =>{
    currMousePosX = event.offsetX;
    currMousePosY = event.offsetY;
});

document.getElementById('easy-button').addEventListener('click', event =>{
    difficulty = 1;
    time = 0;
    restart();
});

document.getElementById('medium-button').addEventListener('click', event =>{
    difficulty = 2;
    time = 0;
    restart();
});

document.getElementById('hard-button').addEventListener('click', event =>{
    difficulty = 3;
    time = 0;
    restart();
});

document.getElementById('donate-link').addEventListener('click', event =>{
    if(!flag){
        scoreFlag = false;
        console.log("sucessfully");
    }
    console.log("triggered")
});

document.getElementById('website-link').addEventListener('click', event =>{
    if(!flag){
        scoreFlag = false;
    }
})

function restart(){
    flag = true;
    gameObjects[1].xPos = Math.random() * 0.9;
    gameObjects[1].yPos = Math.random() * 0.4;
    if(scoreFlag){
        score = 0;
    }
    scoreFlag = true;
    buttons.style.display = "none";
    animate();
}

function animate(){
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    gameObjects.forEach(obj =>{
        if(obj.name === "background"){
            c.drawImage(obj.img, 0, 0, window.innerWidth, window.innerHeight);
        }else if(obj.name === "virus"){
            c.drawImage(obj.img, obj.xPos * window.innerWidth, obj.yPos * window.innerHeight, window.innerWidth * 0.1, window.innerHeight * 0.1);
            if(currMousePosX >= (obj.xPos * window.innerWidth) && currMousePosX <= ((obj.xPos * window.innerWidth) + (window.innerWidth * 0.1)) && currMousePosY >= (obj.yPos * window.innerHeight) && currMousePosY <= ((obj.yPos * window.innerHeight) + (window.innerHeight * 0.1))){
                startX = Math.random() * 0.90;
                startY = Math.random() * 0.40;
                obj.xPos = startX
                obj.yPos = startY
                currMousePosX = null;
                currMousePosY = null;
                time = 0;
                score += difficulty;
            }else{

                obj.xPos = lerp(startX, 0.5, time);
                obj.yPos = lerp(startY, 0.801, time);
                time += difficulty * 0.001;

                if(obj.yPos > 0.8){
                    stopGame();
                }
            }
        }else if(obj.name === "charity-water-logo"){
            c.drawImage(obj.img, 0.4 * window.innerWidth, 0.8 * window.innerHeight, 0.2 * window.innerWidth, 0.2 * window.innerHeight);
        }
    });

    c.fillStyle = 'white';
    c.font = '30px Proxima Nova';
    c.textAlign = 'center';
    c.fillText('click on the viruses', canvas.width / 2, 30);

    c.fillText(`score ${score}`, 120, 30);

    animationId = requestAnimationFrame(animate);
}



function stopGame(){
    cancelAnimationFrame(animationId);
    buttons.style.display = "block";
    flag = false;

    c.fillStyle = 'rgba(0, 0, 0, 0.5)';
    c.fillRect(0, 0, canvas.width, canvas.height); // Darken the screen
    
    c.fillStyle = 'white';
    c.font = '30px Proxima Nova';
    c.textAlign = 'center';
    c.fillText('Program Stopped choose difficulty to begin', canvas.width / 2, canvas.height / 2);
    
    c.font = '15px Proxima Nova';
    c.fillText('(ctrl + click one of the links to keep your score)', canvas.width / 2, ((canvas.height / 2) + 30))

}

function lerp(start, end, time){
    return start + (end-start) * time;
}

gameObjects.forEach(obj => {
    obj.img.src = obj.src;
    obj.img.onload = () =>{
        onloadImageCount++;

        if(onloadImageCount === gameObjects.length){
            stopGame();
        }
    };
});




