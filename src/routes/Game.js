import React from 'react';
import { Link } from 'react-router-dom';
import Snake from './Snake';
import Food from './Food';

/*Sets random coordinates for the snake food to spawn at.*/
const getRandomCoordinates = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random()*(max-min+1)+min)/2)*2; //Generates random number below 100.
  let y = Math.floor((Math.random()*(max-min+1)+min)/2)*2; //Generates random number below 100.
  return [x,y] //Return coords.
}

const getState = () =>  { //Creates the default state of the component below.
  return { 
    food: getRandomCoordinates(), //Sets the coordinates randomly on the game.
    direction: "DOWN", //Makes the snake move down.
    speed: localStorage.getItem("Speed"),
    snakeBody: [ //Sets the position for the snake to spawn at.   
      [45,0], //Spawn position of block 1 .
      [46,0] //Spawn position of block 2.
    ],
    foodCount: 0
  }
}

if(localStorage.getItem("Speed") === null) { //If local storage value is empty it'll give it a defaut value of 100.
  localStorage.setItem("Speed", 100)
}

const changeSpeed = (speed) => { //Changes the speed value in localStorage based on the value of the event 'speed'.
  let speedValue = speed;
  if(speedValue === 'Easy'){
    localStorage.setItem("Speed", 200)
  }

  else if(speedValue === 'Normal'){
    localStorage.setItem("Speed", 100)
  }
  
  else if(speedValue === 'Hard'){
    localStorage.setItem("Speed", 50)
  }

  else{
    localStorage.setItem("Speed", 60)
  }
  window.location.reload()
}

export default class App extends React.Component {
  constructor(){
    super();
    this.state = getState() //Calls on the function 'getState'
  }

  componentDidMount() { 
    setInterval(this.moveSnake, localStorage.getItem("Speed")) 
    document.onkeydown = this.onKeyDown;
  }

  componentDidUpdate() {
    this.checkIfOutOfBorders();
    this.ifAteSelf();
    this.checkIfEat();
  }

  onKeyDown = (keyVal) => {
    keyVal = keyVal || window.event; //Captures the key that the user presses.
    switch (keyVal.keyCode) {
      case 38:
       this.setState({direction: 'UP'});
       break;
       
      case 40:
       this.setState({direction: 'DOWN'});
       break;

      case 37:
       this.setState({direction: 'LEFT'});
       break;

      case 39:
       this.setState({direction: 'RIGHT'});
       break;
    }
  }

  moveSnake= () => { //When activates it removes and add parts to the snake making it appear to be moving.
    let parts = [...this.state.snakeBody]; //Calls on the current position of the snake from the state.
    let head = parts[parts.length -1];

    switch (this.state.direction) { //Calls on the state direction.
      case 'RIGHT':
        head = [head[0] + 2, head[1]]; //head[0] is the y-coords and head[1] is the x-coords.
        break;
      case 'LEFT':
        head = [head[0] - 2, head[1]];
        break;
      case 'DOWN':
        head = [head[0], head[1] + 2];
        break;
      case 'UP':
        head = [head[0], head[1] - 2];
        break;
    }
    parts.push(head); //Adds a block to the snake.
    parts.shift(); //Removes first item of an array the head block of the snake.
    this.setState({
      snakeBody: parts
    })
  }
  
  checkIfOutOfBorders() { //Activates if the snake goes beyond the borders.
    let head = this.state.snakeBody[this.state.snakeBody.length - 1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      this.gameOver(); //Calls function gameOver().
    }
  }

  ifAteSelf() { //Activates if the snake eats it self.
    let snake = [...this.state.snakeBody]; //Calls on the current position of the snake from the state.
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach(body => {
      if (head[0] == body[0] && head[1] == body[1]) { //
        this.gameOver(); //Calls function gameOver().
      }
    })
  }

  checkIfEat() { //Activates once the snake eats the food.
    let head = this.state.snakeBody[this.state.snakeBody.length - 1];
    let food = this.state.food;
    if (head[0] == food[0] && head[1] == food[1]) { //This will activate if the snakes head moves over the food block.
      this.setState({
        food: getRandomCoordinates(), //This calls on function getRandomCoordinates and makes food spawn at random locations.
        foodCount: this.state.foodCount + 1
      })
      this.increaseSize(); //This calls on function increaseSize.
      this.win(); //This calls on function win.
    }
  }

  increaseSize() {
    let newSnake = [...this.state.snakeBody]; //Calls on current position of snake.
    newSnake.unshift([]) //Adds body part to the snake.
    this.setState({
      snakeBody: newSnake //Sets the snakes body length in the state.
    })
  }
  
  win() {
    if(this.state.foodCount === 15) { //Activates once the foodCount is equal to 15.
      alert("Congratulations you've won! \n press any button to restart");
      this.setState( 
        getState() //Resets state to default state.
      )
    }
  }
  
  gameOver() { //Activates once the any of the game restrictions are violated.
    alert("Sorry you lose :(");
    this.setState(
      getState() //Resets state to default state.
    )
  }

//If user gets to a certain level add more food
  render() {  
    return (
      <div>
        <div className="difficultyLevel">
          <Link onClick={(speed) => changeSpeed(speed.target.id)} id="Easy">Easy</Link> {/*Uses the id of the link as an event handler and export it to the changeSpeed function.*/}
          <Link onClick={(speed) => changeSpeed(speed.target.id)} id="Normal">Normal</Link>
          <Link onClick={(speed) => changeSpeed(speed.target.id)} id="Hard">Hard</Link>
          <Link onClick={() => window.location.reload()}>Restart</Link> {/*Refreshes the web page when clicked.*/}
          <Link to={"/"}>Help</Link> {/*Takes the user to the help webpage.*/}
        </div>
        <div className="game-area"> {/*Creates the area where the game takes place.*/}
          <Snake snakeBody={this.state.snakeBody}/> {/*Imports the snake item.*/}
          <Food food={this.state.food}/> {/*Imports the food item.*/}
        </div>
        <h2>{this.state.foodCount}</h2>
      </div>
  );
 }
}
