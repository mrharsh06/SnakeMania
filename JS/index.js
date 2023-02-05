//initially the snake is not in motion,games constant and variables
let inputDir={x:0, y:0};
//Assigning sound to multiple variables
const foodSound=new Audio('music/food.mp3');
const gameOverSound=new Audio('music/gameover.mp3');
const moveSound=new Audio('music/move.mp3');
const musicSound=new Audio('music/music.mp3');
let speed=5;
let lastPiantTime=0;
let Score=0;
let snakeArr=[
    {x: 8, y: 12}
]
food={x:6,y:7};
//game functions
function main(ctime){
window.requestAnimationFrame(main);
if((ctime-lastPiantTime)/1000<1/speed){
    return;
}
lastPiantTime=ctime;
gameEngine();
}

function isCollide(snake){
  //if you pump into yourself
  for(let i=1;i<snakeArr.length;i++){
    if(snake[i].x===snake[0].x && snake[i].y===snake[0].y) {
      return true;
  }
}
  //if you hit wall
  if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 ||snake[0].y<=0){
       return true;
  }
}



function gameEngine(){
  //part 1:Updating the snake array & Food
  if(isCollide(snakeArr)){
    gameOverSound.play();
    musicSound.pause();
    ScoreBox.innerHTML="Score : 0"
    inputDir={x:0,y:0};
    alert("GAme Over,Press any key to play again!");
    snakeArr=[ {x: 8, y: 12}];
    musicSound.play();
    Score=0;
    

  }

  //if you have eaten the food,increment the score and regenerate the food
  if(snakeArr[0].y===food.y && snakeArr[0].x===food.x){
    //Array.unshift() it generally add one element in the starting of the array
    foodSound.play();
    Score+=1;
    if(Score>hiscoreval){
      hiscoreval = Score;
      localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
      HighScoreBox.innerHTML = "HiScore: " + hiscoreval;
  }
    ScoreBox.innerHTML='score: '+Score;
    snakeArr.unshift({x:snakeArr[0].x+inputDir.x,y:snakeArr[0].y+inputDir.y});
    let a=2;
    let b=16;
    //here Math.round(a+(b-a)*Math.random())->it create random number between a and b
  //here food variable update again at some random place
  food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())};

  }

  //moving the snake
  for(let i=snakeArr.length-2;i>=0;i--){
    snakeArr[i+1]={...snakeArr[i]};   //{...snakeArr[i]} here we create new object as new reference we cannot point only single place
  }                                    //otherwise all points to single object
 
  snakeArr[0].x+=inputDir.x;
  snakeArr[0].y+=inputDir.y;




  //part2:Display the Snake and Food
  //Display the snake
    board.innerHTML="";
    snakeArr.forEach((e,index)=>{
        snakeElement=document.createElement('div');
        //here we add class in element to write css
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        
        if(index===0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake')
        }
        board.appendChild(snakeElement);
    });
    //display the Food
    foodElement=document.createElement('div');
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

}


//main function starts from here
musicSound.play();
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    HighScoreBox.innerHTML = "Hi-Score: " + hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  inputDir = { x: 0, y: 1 }; //start the game
  moveSound.play();
  switch (e.key) {
    case "ArrowUp":
      inputDir.x= 0;
      inputDir.y=-1;
      break;
    case "ArrowDown":
      inputDir.x= 0;
      inputDir.y=1 ;
      break;
    case "ArrowLeft":
      inputDir.x=-1 ;
      inputDir.y= 0;
      break;
    case "ArrowRight":
      inputDir.x=1;
      inputDir.y=0 ;
      break;
    default:
      break;
  }
});
 
