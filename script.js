let canvas = document.getElementById('board');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight

let c = canvas.getContext('2d');

let animationId;
let flag = true;
let onloadImageCount = 0;

let currMousePosX = null;
let currMousePosY = null;

let score = 0;

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
    if(e.key.toLocaleLowerCase() === 's' && !flag){
        flag = true;
        gameObjects[1].xPos = Math.random() * 0.9;
        gameObjects[1].yPos = Math.random() * 0.4;
        score = 0;
        animate();
    }
});

canvas.addEventListener('click', (event) =>{
    currMousePosX = event.offsetX;
    currMousePosY = event.offsetY;
    console.log(currMousePosX + " " + currMousePosY);
   
});

function animate(){
    gameObjects.forEach(obj =>{
        if(obj.name === "background"){
            c.drawImage(obj.img, 0, 0, window.innerWidth, window.innerHeight);
        }else if(obj.name === "virus"){
            c.drawImage(obj.img, obj.xPos * window.innerWidth, obj.yPos * window.innerHeight, window.innerWidth * 0.1, window.innerHeight * 0.1);
            if(currMousePosX >= (obj.xPos * window.innerWidth) && currMousePosX <= ((obj.xPos * window.innerWidth) + (window.innerWidth * 0.1)) && currMousePosY >= (obj.yPos * window.innerHeight) && currMousePosY <= ((obj.yPos * window.innerHeight) + (window.innerHeight * 0.1))){
                console.log("success");
                obj.xPos = Math.random() * 0.90;
                obj.yPos = Math.random() * 0.50;
                currMousePosX = null;
                currMousePosY = null;
                score++;
            }else{
                if(obj.xPos < 0.49){
                    obj.xPos += 0.001;
                }else if(obj.xPos > 0.5101){
                    obj.xPos -= 0.001
                }
                if(obj.yPos < 0.8){
                    obj.yPos += 0.001;
                }else{
                    stopGame();
                }
            }
        }else if(obj.name === "charity-water-logo"){
            c.drawImage(obj.img, 0.4 * window.innerWidth, 0.8 * window.innerHeight, 0.2 * window.innerWidth, 0.2 * window.innerHeight);
        }
    });
    

    c.fillStyle = 'white';
    c.font = '30px Arial';
    c.textAlign = 'center';
    c.fillText('click on the viruses', canvas.width / 2, 30);

    c.fillText(`score ${score}`, 120, 30);

    animationId = requestAnimationFrame(animate);
}



function stopGame(){
    cancelAnimationFrame(animationId);
    flag = false;

    c.fillStyle = 'rgba(0, 0, 0, 0.5)';
    c.fillRect(0, 0, canvas.width, canvas.height); // Darken the screen
    
    c.fillStyle = 'white';
    c.font = '30px Arial';
    c.textAlign = 'center';
    c.fillText('Program Stopped press s to run from begining', canvas.width / 2, canvas.height / 2);
}

gameObjects.forEach(obj => {
    obj.img.src = obj.src;
    obj.img.onload = () =>{
        onloadImageCount++;

        if(onloadImageCount === gameObjects.length){
            animate();
        }
    };
});




