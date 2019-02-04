import React, {Component, Fragment} from 'react';
import TasksList from './components/TasksList.js';
import './ToDoList.css';
import InputForm from "./components/InputForm";
import image from './assets/ic-remove.png';
import axios from '../../../axios-url';
import Preloader from "../../Preloader/Preloader";

class ToDoList extends Component {
    state = {
        toDoList: [],
        loading: false,
    };

    beforeRenderText;

    keepNewText = (event) => {
        this.beforeRenderText = event.target.value;
    };

    componentDidMount() {
        this.setState({loading: true});
        axios.get('toDoList.json').then(response => {
            if (response.data === null) return;
            let copy = this.state.toDoList;
            copy = Object.keys(response.data).map(id => {
                return {...response.data[id], id}
            });
            this.setState({toDoList: copy});
        }).finally(()=>{
            this.setState({loading: false})
        });
    }

    addNewText = (e) => {
        e.preventDefault();
        if (this.beforeRenderText) {
            let copy = this.state.toDoList;
            copy.push({toDoTask: this.beforeRenderText});
            this.setState({toDoList: copy});
            this.setState({loading: true});
            axios.post('toDoList.json', {toDoTask: this.beforeRenderText}).finally(()=>{
                this.setState({loading: false})
            });
        }
    };

    delete(event) {
        const id = event.currentTarget.id;
        const copy = this.state.toDoList;
        const index = copy.findIndex(item => item.id === id);
        copy.splice(index, 1);
        this.setState({loading: true});
        axios.delete('toDoList/' + id + '.json').then(response => {
            this.setState({toDoList: copy});
        }).finally(()=>{
            this.setState({loading: false})
        });
    }

    render() {

        let form = (<Fragment>
            <InputForm onChange={(event) => {
                this.keepNewText(event)
            }} onClick={this.addNewText} onSubmit={this.addNewText}/>
            <div className="list-block">
            {this.state.toDoList.map((text, index) => {
                    return <TasksList image={image} key={index} id={text.id} movieName={text.toDoTask}
                                      onClick={(event) => {
                                          this.delete(event)
                                      }} check={(event) => {
                        if (event.currentTarget.parentNode.parentNode.className === 'task-text') {
                            event.currentTarget.parentNode.parentNode.className = 'task-text green';
                        } else {
                            event.currentTarget.parentNode.parentNode.className = 'task-text';
                        }
                    }}/>
                })}

    </div>
        </Fragment>);

        if (this.state.loading) {
            form = <Preloader />
        }

        return (
            <div className="App grid-container">
                {form}
            </div>
        )
    }
}

export default ToDoList;
