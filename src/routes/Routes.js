import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom' //Switch(allows for multiple paths.) Redirect(allows for redircting if certain values are inputted)

//Imports the webpages to this js file
import Landing from './Help';
import Game from './Game';

//Allows for the webpages to be called on by the use of the words in "path='/'"
export default() => (
    <BrowserRouter>
        <Switch> 
            <Route path="/" exact component={ Landing } />
            <Route path="/The_Eating_Snake" exact component={ Game } />
        </Switch>
    </BrowserRouter>
)
