import React, {Component} from 'react';
import './App.css';
import {NavLink, Route, Switch} from "react-router-dom";
import ToDoList from '../components/ToDoList/src/ToDoList';
import MoviesToWatch from '../components/MoviesToWatch/src/containers/MoviesToWatch';
import PersonalDiary from "../components/PersonalDiary/src/containers/PersonalDiary";


class App extends Component {

    render() {
        return (
            <div className="App">
                <button className='to_do_list'><NavLink to='/to_do_list'>To Do List</NavLink></button>
                <button className='movies_to_watch'><NavLink to='/movies_to_watch'>Movies to Watch List</NavLink></button>
                <button className='personal_diary'><NavLink to='/personal_diary'>Personal Diary</NavLink></button>
                <Switch>
                    <Route path="/to_do_list" component={ToDoList} />
                    <Route path="/movies_to_watch" component={MoviesToWatch} />
                    <Route path="/personal_diary" component={PersonalDiary} />
                </Switch>
            </div>

        );
    }
}

export default App;
