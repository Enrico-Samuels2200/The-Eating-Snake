import React from 'react';

export default (props) => {
    return (
        <div>
            {props.snakeBody.map((part, i) => { //Iterates through array of 'part'.
                const style = { //Creates the body of the snake.
                    left: `${part[0]}%`,
                    top: `${part[1]}%`
                }
                return (
                    <div className="snake-part" key={i} style={style}></div>
                )
            })}
        </div>
    ) 
}