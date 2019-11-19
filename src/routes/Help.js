import React from 'react';
import Eat from './help/1.png'; //Imports image.
import Dying_1 from './help/2.png'; //Imports image.
import Dying_2 from './help/3.png'; //Imports image.
import { Link } from 'react-router-dom';


export default class HelpMenu extends React.Component { //Exports component.
    render() {
        return(
            <div className="help">
                <h1>The Eating Snake</h1>
                <br/>
                <h2>Story</h2>
                <p>
                    Once upon a time in a jungle far, far away. There was a snake who recently become a mother.<br/>
                    She gave birth to many eggs. She did so under a wooden log for her off springs protection.<br/>
                    Despite her efforts the predators found the defensless eggs while the mother snake went hunting<br/>
                    When she returned it was too late the eggs have been taken. The bird brought them back to their<br/>
                    nest as a snack for later. Luckly while they were gone the eggs hatched the snakes escaped.<br/>
                    Now take charge and help the little snake grow bigger and survive. 
                </p>
                <br/>
                <h2>Objective of Game</h2>
                <p>
                    The Objective of the game is to help the snake grow. To win you have to eat a certain<br/>
                    amount of mice.<br/>
                    <img src={Eat} alt="Snake hunting"/>
                    This can be achieved by using the arrow directional keys to move the snake.<br/>
                    To eat a mouse move the snake over it, as illustrated in the image above. Once a mouse is<br/>
                    eaten the snake will grow bigger.
                </p>
                <h2>In game dangers</h2>
                <p>
                    During your play there are two obsticles to avoid. If its not avoided your game will be terminated.<br/>   
                    <h2>Dangers below:</h2>
                    <p id="dangers">
                        <b>Touching the edges:</b>
                        <p>
                         If you move the snake out of bounds(to the edges) it will kill the snake<br/>
                         and your game will be terminated. Example in the image below.<br/> 
                         <img src={Dying_1} alt="Moving out of bounds"/>
                        </p>
                        <br/>
                        <b>Moving back / Eating self:</b>
                        <p>
                            Once your snake is at a body length of three or more, you cannot move back.<br/>
                            Moving back would cause the snake to eat it self and thus terminating the game.<br/>
                            The same goes if the snakes head come in to contact with its body. Example in the<br/>
                            image below.<br/>
                            <img src={Dying_2} alt="Eating self"/>
                        </p>
                    </p>  
                </p><br/>
                <h2 id="note">If you feel you understand the rules then press play :)</h2>

                <Link to={"/The_Eating_Snake"} id="play">Play</Link>
            </div>
        )
    }
}