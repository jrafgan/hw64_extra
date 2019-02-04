import React from 'react';
import CheckBox from "./CheckBox";


const TasksList = props => {
    return (
        <div className="task">
            <div className='task-text'>{props.movieName}
            <CheckBox check={(event)=>{props.check(event)}}/>
                <img className="btn-dlt" alt='deleteBtn' src={props.image} id={props.id} onClick={(event) => {props.onClick(event)}}/>
            </div>
        </div>
    )
};

export default TasksList;